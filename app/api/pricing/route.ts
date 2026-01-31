// app/api/pricing/route.ts - Public Access Only
import { NextResponse } from "next/server";

import { logger } from "@/lib/logs";
import { db } from "@/lib/db";

export async function GET() {
  try {
    logger.log("[PRICING_API] Fetching pricing data for landing page...");

    // Only allow access to public categories
    const categoryFilter = "pc.id IS NOT NULL AND pc.is_private = 0";

    const [productRows] = await db.execute(
      `SELECT 
    p.id,
    p.name,
    p.price,
    p.original_price,
    p.is_promo,
    p.cpu_limit,
    p.ram_limit,
    p.storage_limit,
    p.database_limit,
    p.backup_limit,
    p.description,
    p.status,
    p.category_id,
    p.created_at,
    p.updated_at,
    pc.name as category_name,
    pc.slug as category_slug,
    pc.oversell_factor,
    pc.is_private as category_is_private,
    -- Calculate discount percentage if on promo
    CASE 
      WHEN p.is_promo = 1 AND p.original_price > 0 
      THEN ROUND(((p.original_price - p.price) / p.original_price) * 100)
      ELSE 0 
    END as discount_percentage
  FROM products p
  LEFT JOIN product_categories pc ON p.category_id = pc.id
  WHERE p.status = 'active' 
    AND p.is_private = 0
    AND ${categoryFilter}
  ORDER BY pc.name ASC, p.price ASC`,
    );

    const products = productRows as any[];

    if (products.length === 0) {
      logger.log("[PRICING_API] No public products found");

      return NextResponse.json({
        categories: {},
        stats: {
          total_products: 0,
          price_range: { min: 0, max: 0 },
          categories: {},
        },
      });
    }

    logger.log(`[PRICING_API] Found ${products.length} public products`);

    // Only display public products
    const displayProducts = products.filter(
      (product) => !product.category_is_private,
    );

    // Get node availability untuk setiap category (only public categories)
    const [nodeAvailability] = await db.execute(
      `SELECT 
        pc.id as category_id,
        pc.name as category_name,
        pc.slug as category_slug,
        pc.is_private,
        COUNT(n.id) as total_nodes,
        SUM(CASE WHEN n.status = 'active' AND (n.expired_at IS NULL OR n.expired_at > NOW()) THEN 1 ELSE 0 END) as available_nodes
      FROM product_categories pc
      LEFT JOIN nodes n ON pc.id = n.category_id
      WHERE pc.is_private = 0
      GROUP BY pc.id, pc.name, pc.slug, pc.is_private
      ORDER BY pc.name ASC`,
    );

    const nodeStats = (nodeAvailability as any[]).reduce(
      (acc, stat) => {
        acc[stat.category_slug] = {
          total_nodes: stat.total_nodes || 0,
          available_nodes: stat.available_nodes || 0,
          is_private: stat.is_private,
        };

        return acc;
      },
      {} as Record<string, any>,
    );

    // Group products by category dan transform untuk pricing page
    const categorizedProducts: Record<string, any[]> = {};
    const categoryStats: Record<string, any> = {};

    // Calculate min/max prices
    const prices = displayProducts.map((p) => p.price);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    // Count promo products
    let promoCount = 0;

    displayProducts.forEach((product) => {
      const categorySlug = product.category_slug;
      const isPromo = product.is_promo === 1;

      if (isPromo) promoCount++;

      if (!categorizedProducts[categorySlug]) {
        categorizedProducts[categorySlug] = [];
        categoryStats[categorySlug] = {
          count: 0,
          name: product.category_name,
          slug: categorySlug,
          min_price: product.price,
          max_price: product.price,
          is_private: product.category_is_private,
        };
      }

      // Transform product untuk pricing page format
      const transformedProduct = {
        id: product.id,
        name: product.name,
        gameId: null,
        cpu: product.cpu_limit,
        ram: product.ram_limit,
        storage: product.storage_limit,
        database: product.database_limit,
        backup: product.backup_limit,
        price: product.price,
        original_price: product.original_price,
        is_promo: isPromo,
        discount_percentage: product.discount_percentage,
        category_id: product.category_id,
        category_name: product.category_name,
        category_slug: product.category_slug,
        description: product.description,
        status: product.status,
        features: generateProductFeatures(product, nodeStats[categorySlug]),
        popular: isPopularProduct(product, categorizedProducts[categorySlug]),
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      };

      categorizedProducts[categorySlug].push(transformedProduct);

      // Update category stats
      categoryStats[categorySlug].count++;
      categoryStats[categorySlug].min_price = Math.min(
        categoryStats[categorySlug].min_price,
        product.price,
      );
      categoryStats[categorySlug].max_price = Math.max(
        categoryStats[categorySlug].max_price,
        product.price,
      );
    });

    // Sort products dalam setiap category by price
    Object.keys(categorizedProducts).forEach((categorySlug) => {
      categorizedProducts[categorySlug].sort((a, b) => a.price - b.price);
    });

    const response = {
      categories: categorizedProducts,
      stats: {
        total_products: displayProducts.length,
        promo_count: promoCount,
        price_range: {
          min: minPrice,
          max: maxPrice,
        },
        categories: categoryStats,
      },
      node_availability: nodeStats,
      last_updated: new Date().toISOString(),
    };

    logger.log("[PRICING_API] Pricing data compiled successfully:", {
      total_products: displayProducts.length,
      promo_count: promoCount,
      categories: Object.keys(categorizedProducts).length,
      price_range: `${minPrice} - ${maxPrice}`,
    });

    // Set headers untuk prevent caching pricing data
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    logger.error("[PRICING_API] Error fetching pricing data:", error);

    return NextResponse.json(
      { error: "Failed to fetch pricing data" },
      { status: 500 },
    );
  }
}

// Helper functions remain the same
function generateProductFeatures(product: any, nodeStats?: any): string[] {
  const features: string[] = [];

  features.push(`${product.cpu_limit}% CPU Power`);
  features.push(`${(product.ram_limit / 1024).toFixed(1)}GB RAM`);
  features.push(`${(product.storage_limit / 1024).toFixed(1)}GB NVMe Storage`);

  if (product.database_limit > 0) {
    features.push(
      `${product.database_limit} MySQL Database${product.database_limit > 1 ? "s" : ""}`,
    );
  }

  if (product.backup_limit > 0) {
    features.push(
      `${product.backup_limit} Daily Backup${product.backup_limit > 1 ? "s" : ""}`,
    );
  }

  if (product.is_promo === 1 && product.original_price > product.price) {
    const savings = product.original_price - product.price;

    features.push(`Save Rp ${savings.toLocaleString()}`);
  }

  const categoryFeatures = {
    basic: [
      "DDoS Protection",
      "24/7 Support",
      "Easy Setup",
      "Control Panel Access",
    ],
    premium: [
      "Priority Support",
      "Enhanced DDoS Protection",
      "Premium Network",
      "Advanced Monitoring",
    ],
    enterprise: [
      "Enterprise Support",
      "Custom Configuration",
      "Advanced Security",
      "SLA Guarantee",
    ],
  };

  const categorySlug = product.category_slug as keyof typeof categoryFeatures;

  if (categoryFeatures[categorySlug]) {
    features.push(...categoryFeatures[categorySlug]);
  } else {
    features.push("24/7 Support", "DDoS Protection", "Easy Management");
  }

  if (nodeStats && nodeStats.available_nodes > 0) {
    features.push(
      `Available on ${nodeStats.available_nodes} node${nodeStats.available_nodes > 1 ? "s" : ""}`,
    );
  }

  return features;
}

function isPopularProduct(product: any, categoryProducts: any[]): boolean {
  const cpuToRamRatio = product.cpu_limit / (product.ram_limit / 1024);
  const isBalanced = cpuToRamRatio >= 10 && cpuToRamRatio <= 50;
  const isPriceSweet = product.price >= 59000 && product.price <= 80000;

  return isBalanced && isPriceSweet;
}
