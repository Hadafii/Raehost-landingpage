"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Link,
  Tabs,
  Tab,
  Spinner,
  Accordion,
  AccordionItem,
  Divider,
} from "@heroui/react";
import {
  IconCheck,
  IconX,
  IconStar,
  IconRocket,
  IconShield,
  IconHeadphones,
  IconCpu,
  IconCloud,
  IconTrophy,
  IconQuestionMark,
  IconArrowRight,
  IconServer2,
  IconDatabase,
  IconDeviceFloppy,
  IconSparkles,
  IconTag,
} from "@tabler/icons-react";
import {
  HardDrive,
  Sparkles,
  HandCoins,
  MemoryStick,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { logger } from "@/lib/logs";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import ServerCalculator from "@/app/components/ServerCalculator";
interface Product {
  id: number;
  name: string;
  gameId: number | null;
  cpu: number;
  ram: number;
  storage: number;
  database: number;
  backup: number;
  price: number;
  original_price?: number | null; // Original price before promo
  is_promo?: boolean; // Is this product on promo
  discount_percentage?: number; // Calculated discount percentage
  category_id: number;
  category_name: string;
  category_slug: string;
  category_is_private?: boolean; // Added private category support
  description: string | null;
  status: "active" | "inactive";
  features: string[];
  popular: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PricingData {
  categories: Record<string, Product[]>;
  stats: {
    total_products: number;
    promo_count?: number; // Added promo count
    price_range: {
      min: number;
      max: number;
    };
    categories: Record<
      string,
      {
        count: number;
        name: string;
        is_private?: boolean; // Added private category support
      }
    >;
  };
  user_access?: {
    role: string;
    can_access_private: boolean;
  };
}

interface FAQ {
  question: string;
  answer: string;
}

// Map of category slugs to their icon and color configuration
const CATEGORY_CONFIG: Record<
  string,
  {
    icon: React.ElementType;
    color: "primary" | "secondary" | "warning" | "danger" | "success";
    description: string;
    features: string[];
  }
> = {
  // Default configurations
  basic: {
    icon: IconRocket,
    color: "primary",
    description:
      "Perfect untuk server kecil hingga menengah. cocok untuk pemula yang ingin memulai server gaming dengan budget terjangkau.",
    features: ["DDoS Protection", "24/7 Support", "Easy Setup"],
  },
  premium: {
    icon: IconTrophy,
    color: "secondary", // Changed to secondary as requested
    description:
      "Untuk server gaming serius yang membutuhkan performa stabil. memberikan prioritas resource dan reliability yang lebih tinggi.",
    features: ["Priority Resources", "Premium Support", "Advanced Protection"],
  },
  enterprise: {
    icon: Target,
    color: "warning",
    description:
      "Untuk bisnis dan organisasi yang membutuhkan performa enterprise dengan dedicated resources dan support prioritas tertinggi.",
    features: ["Dedicated Resources", "Enterprise Support", "SLA Guarantee"],
  },
  // Default for any other category
  default: {
    icon: IconCloud,
    color: "success",
    description:
      "Hosting solution designed to meet your specific needs with balanced resources and reliable performance.",
    features: ["Reliable Hosting", "Technical Support", "Resource Management"],
  },
};

// Enhanced color mapping for different categories (matching ProductCard)
const getCategoryColor = (
  slug: string,
): "primary" | "secondary" | "success" | "warning" | "danger" => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "secondary";
    case "basic":
      return "primary";
    case "enterprise":
      return "warning";
    default:
      return "success";
  }
};

// Get category gradient classes (matching ProductCard)
const getCategoryGradient = (slug: string): string => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "from-violet-500/10 via-purple-500/5 to-fuchsia-500/10";
    case "basic":
      return "from-blue-500/10 via-cyan-500/5 to-blue-500/10";
    case "enterprise":
      return "from-amber-500/10 via-orange-500/5 to-yellow-500/10";
    default:
      return "from-green-500/10 via-emerald-500/5 to-teal-500/10";
  }
};

// Get category border classes (matching ProductCard)
const getCategoryBorder = (slug: string): string => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "border-violet-200/60 dark:border-violet-500/30";
    case "basic":
      return "border-blue-200/60 dark:border-blue-500/30";
    case "enterprise":
      return "border-amber-200/60 dark:border-amber-500/30";
    default:
      return "border-emerald-200/60 dark:border-emerald-500/30";
  }
};

// Get category button gradient classes (matching ProductCard)
const getCategoryButtonGradient = (slug: string): string => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "bg-gradient-to-r from-violet-500 to-purple-600";
    case "basic":
      return "bg-gradient-to-r from-blue-500 to-sky-400";
    case "enterprise":
      return "bg-gradient-to-r from-amber-500 to-orange-600";
    default:
      return "bg-gradient-to-r from-emerald-500 to-teal-600";
  }
};

// Get category icon/text color classes (matching ProductCard)
const getCategoryIconColor = (slug: string): string => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "text-secondary";
    case "basic":
      return "text-primary";
    case "enterprise":
      return "text-warning";
    default:
      return "text-success";
  }
};

// Get category background with opacity classes (matching ProductCard)
const getCategoryBgOpacity = (slug: string): string => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "bg-secondary/20";
    case "basic":
      return "bg-primary/20";
    case "enterprise":
      return "bg-warning/20";
    default:
      return "bg-success/20";
  }
};

// Get category border with opacity classes (matching ProductCard)
const getCategoryBorderOpacity = (slug: string): string => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "border-secondary/30";
    case "basic":
      return "border-primary/30";
    case "enterprise":
      return "border-warning/30";
    default:
      return "border-success/30";
  }
};

// Get category border with lower opacity for grid items (matching ProductCard)
const getCategoryBorderLight = (slug: string): string => {
  switch (slug.toLowerCase()) {
    case "premium":
      return "border-secondary/10";
    case "basic":
      return "border-primary/10";
    case "enterprise":
      return "border-warning/10";
    default:
      return "border-success/10";
  }
};

// Format MB helper (matching ProductCard)
const formatMB = (mb: number): string => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(0)} GB`;
  }

  return `${mb} MB`;
};

export default function PricingPage(): JSX.Element {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [userAccess, setUserAccess] = useState({
    role: "guest",
    can_access_private: false,
  });

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch("/api/pricing");

        if (!response.ok) {
          throw new Error("Failed to fetch pricing data");
        }
        const data = await response.json();

        setPricingData(data);

        // Store user access info
        if (data.user_access) {
          setUserAccess(data.user_access);
        }

        // Filter out private categories for public users
        const canAccessPrivate = data.user_access?.can_access_private || false;
        const publicCategories = Object.keys(data.categories).filter(
          (categorySlug) => {
            // If user can access private categories, show all
            if (canAccessPrivate) return true;

            // Check if this category has private products
            const categoryProducts = data.categories[categorySlug];
            const hasPrivateProducts = categoryProducts.some(
              (product: Product) => product.category_is_private,
            );

            return !hasPrivateProducts;
          },
        );

        // Get available categories and set default selected category
        setAvailableCategories(publicCategories);

        // Set first category as default if available
        if (publicCategories.length > 0) {
          setSelectedCategory(publicCategories[0]);
        }
      } catch (err) {
        setError("Failed to load pricing data. Please try again later.");
        logger.error("Pricing fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricingData();
  }, []);

  const faqs: FAQ[] = [
    {
      question: "Apa perbedaan antara Basic dan Premium Hosting?",
      answer:
        "Basic Hosting cocok untuk server kecil hingga menengah dengan resource terbatas, sedangkan Premium Hosting menawarkan performa lebih tinggi dengan prioritas resource dan dukungan premium.",
    },
    {
      question: "Apakah ada garansi uptime?",
      answer:
        "Ya, kami menjamin uptime 99.9% untuk semua paket hosting. Jika ada downtime yang tidak terduga, Anda berhak mendapatkan kompensasi sesuai kebijakan kami.",
    },
    {
      question: "Apakah bisa install plugin/mod custom?",
      answer:
        "Tentu saja! Anda memiliki akses penuh ke server untuk install plugin, mod, atau konfigurasi custom sesuai kebutuhan game Anda.",
    },
    {
      question: "Bagaimana cara pembayaran?",
      answer:
        "Kami menerima berbagai metode pembayaran: Bank Transfer, E-Wallet (OVO, DANA, GoPay), QRIS, dan Kartu Kredit. Pembayaran diproses otomatis dan server akan aktif dalam hitungan menit.",
    },
    {
      question: "Apakah promo berlaku untuk semua durasi?",
      answer:
        "Ya! Harga promo yang ditampilkan berlaku untuk semua durasi pembayaran. Hemat lebih banyak dengan berlangganan tahunan dan dapatkan diskon tambahan.",
    },
  ];

  const calculateDiscountedPrice = (
    price: number,
    annual: boolean = false,
  ): number => {
    if (annual) {
      return Math.round(price * 12 * 0.85); // 15% discount for annual
    }

    return price;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  // Get category configuration (icon, color, etc) based on category slug
  const getCategoryConfig = (categorySlug: string) => {
    return CATEGORY_CONFIG[categorySlug] || CATEGORY_CONFIG.default;
  };

  // Get category icon (matching ProductCard)
  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug.toLowerCase()) {
      case "premium":
        return <IconSparkles className="w-5 h-5" />;
      case "enterprise":
        return <Target className="w-5 h-5" />;
      default:
        return <IconServer2 className="w-5 h-5" />;
    }
  };

  // Get styling classes for a category
  const getCategoryClasses = (categorySlug: string) => {
    const config = getCategoryConfig(categorySlug);

    // Define gradient and border colors based on category color
    const colorMap: Record<
      string,
      {
        iconBg: string;
        iconColor: string;
        gradientBg: string;
        borderColor: string;
      }
    > = {
      primary: {
        iconBg: "bg-primary-100 dark:bg-primary-900/20",
        iconColor: "text-primary-600",
        gradientBg:
          "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
        borderColor: "border-primary",
      },
      secondary: {
        iconBg: "bg-secondary-100 dark:bg-secondary-900/20",
        iconColor: "text-secondary-600",
        gradientBg:
          "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
        borderColor: "border-secondary",
      },
      warning: {
        iconBg: "bg-warning-100 dark:bg-warning/20",
        iconColor: "text-warning",
        gradientBg:
          "bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20",
        borderColor: "border-warning",
      },
      success: {
        iconBg: "bg-success-100 dark:bg-success/20",
        iconColor: "text-success",
        gradientBg:
          "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        borderColor: "border-success",
      },
      danger: {
        iconBg: "bg-danger-100 dark:bg-danger/20",
        iconColor: "text-danger",
        gradientBg:
          "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20",
        borderColor: "border-danger",
      },
    };

    return colorMap[config.color] || colorMap.primary;
  };

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Spinner color="primary" size="lg" />
            <p className="mt-4 text-default-600">Loading pricing data...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !pricingData || availableCategories.length === 0) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-danger mb-4">
              {error || "No pricing data available"}
            </p>
            <Button color="primary" onPress={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </>
    );
  }

  const currentProducts = pricingData.categories[selectedCategory] || [];

  // Filter products based on private access
  const visibleProducts = currentProducts.filter((product: Product) => {
    // If user can access private categories, show all products
    if (userAccess.can_access_private) return true;

    // Otherwise, only show public products
    return !product.category_is_private;
  });

  return (
    <>
      <div className="">
        {/* Hero Section - Enhanced with Promo Info */}
        <div className="relative overflow-hidden text-white py-10">
          <div className="absolute inset-0">
            <Image
              fill
              priority
              alt="Pricing Background"
              className="object-cover"
              quality={85}
              src="/assets/landing/stock/landingover.png"
            />
            <div className="absolute inset-0 backdrop-blur-sm bg-black/20 dark:bg-black/60" />
          </div>

          <div className="relative container mx-auto px-6 py-20">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                  <HandCoins className="text-white" size={48} />
                </div>
              </div>

              <BlurText
                animateBy="words"
                className="text-4xl md:text-6xl font-bold mb-6"
                delay={200}
                direction="top"
                text="Harga Terjangkau, Performa Maksimal"
              />

              <TextGenerateEffect
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
                duration={0.8}
                words="Pilih paket hosting yang sesuai dengan kebutuhan server game Anda. Dari pemula hingga profesional, kami punya solusinya!"
              />

              {/* Stats - Enhanced with Promo Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-2xl font-bold mb-1">
                    {pricingData.stats.total_products}
                  </div>
                  <div className="text-sm text-white/80">Total Plans</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-2xl font-bold mb-1">
                    Rp {formatPrice(pricingData.stats.price_range.min)}
                  </div>
                  <div className="text-sm text-white/80">Starting From</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-2xl font-bold mb-1">
                    {pricingData.stats.promo_count || 0}
                  </div>
                  <div className="text-sm text-white/80">Active Promos</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-white/80">Support</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="container mx-auto px-6 py-8">
          {/* User Access Status */}
          {userAccess.role !== "guest" && (
            <AnimatedContent delay={100} direction="vertical" distance={20}>
              <div className="flex justify-center mb-6">
                <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center gap-2">
                        <IconShield className="text-primary" size={20} />
                        <span className="font-medium">
                          Access Level: {userAccess.role.toUpperCase()}
                        </span>
                      </div>
                      {userAccess.can_access_private && (
                        <Chip
                          className="font-semibold"
                          color="warning"
                          size="sm"
                          startContent={<IconSparkles className="w-3 h-3" />}
                          variant="flat"
                        >
                          VIP ACCESS
                        </Chip>
                      )}
                      <div className="text-sm text-default-600">
                        {userAccess.can_access_private
                          ? "You can view all pricing plans including VIP categories"
                          : "Public plans only • Contact support for VIP access"}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </AnimatedContent>
          )}

          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="flex justify-center mb-12">
              <Tabs
                color="primary"
                selectedKey={selectedCategory}
                size="lg"
                variant="bordered"
                onSelectionChange={(key) => setSelectedCategory(key as string)}
              >
                {availableCategories.map((categorySlug) => {
                  const catConfig = getCategoryConfig(categorySlug);
                  const catStats = pricingData.stats.categories[categorySlug];
                  const isPrivateCategory = catStats.is_private;

                  return (
                    <Tab
                      key={categorySlug}
                      title={
                        <div className="flex items-center gap-2">
                          {React.createElement(catConfig.icon, { size: 20 })}
                          <span className="text-lg font-semibold hidden lg:inline">
                            {catStats.name} Hosting
                          </span>
                          <span className="text-lg font-semibold inline lg:hidden">
                            {catStats.name}
                            {isPrivateCategory && (
                              <Chip
                                className="ml-1"
                                color="warning"
                                size="sm"
                                variant="flat"
                              >
                                VIP
                              </Chip>
                            )}
                          </span>
                          <Chip
                            className="text-black dark:text-white"
                            color="default"
                            size="sm"
                            variant="flat"
                          >
                            {catStats.count}
                          </Chip>
                        </div>
                      }
                    />
                  );
                })}
              </Tabs>
            </div>
          </AnimatedContent>

          {/* Category Description */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="text-center mb-12">
              <div className="max-w-4xl mx-auto">
                <Card
                  className={`${getCategoryClasses(selectedCategory).gradientBg} ${getCategoryClasses(selectedCategory).borderColor}`}
                >
                  <CardBody className="p-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {React.createElement(
                        getCategoryConfig(selectedCategory).icon,
                        {
                          size: 32,
                          className:
                            getCategoryClasses(selectedCategory).iconColor,
                        },
                      )}
                      <h2 className="text-2xl font-bold">
                        {pricingData.stats.categories[selectedCategory].name}{" "}
                        Hosting
                      </h2>
                    </div>
                    <p className="text-lg text-default-600">
                      {getCategoryConfig(selectedCategory).description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {getCategoryConfig(selectedCategory).features.map(
                        (feature, idx) => (
                          <Chip
                            key={idx}
                            color={getCategoryConfig(selectedCategory).color}
                            startContent={<IconShield size={16} />}
                            variant="flat"
                          >
                            {feature}
                          </Chip>
                        ),
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </AnimatedContent>

          {/* Pricing Cards - Enhanced with Promo Support */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            {visibleProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <IconShield className="mx-auto mb-4 text-warning" size={64} />
                  <h3 className="text-2xl font-bold mb-4">
                    VIP Access Required
                  </h3>
                  <p className="text-default-600 mb-6">
                    The products in this category are available for VIP users
                    only. Contact our support team to upgrade your access level.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      as={Link}
                      color="primary"
                      href="/contact"
                      startContent={<IconHeadphones size={18} />}
                    >
                      Contact Support
                    </Button>
                    <Button
                      color="default"
                      variant="flat"
                      onClick={() => {
                        // Switch to first public category
                        const firstPublicCategory = availableCategories.find(
                          (cat) => {
                            const products = pricingData.categories[cat] || [];

                            return products.some((p) => !p.category_is_private);
                          },
                        );

                        if (firstPublicCategory) {
                          setSelectedCategory(firstPublicCategory);
                        }
                      }}
                    >
                      View Public Plans
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="wait">
                  {visibleProducts.map((product, index) => {
                    const categoryColor = getCategoryColor(
                      product.category_slug,
                    );
                    const gradientClass = getCategoryGradient(
                      product.category_slug,
                    );
                    const borderClass = getCategoryBorder(
                      product.category_slug,
                    );
                    const iconColor = getCategoryIconColor(
                      product.category_slug,
                    );
                    const bgOpacity = getCategoryBgOpacity(
                      product.category_slug,
                    );
                    const borderOpacity = getCategoryBorderOpacity(
                      product.category_slug,
                    );
                    const borderLight = getCategoryBorderLight(
                      product.category_slug,
                    );
                    const buttonGradient = getCategoryButtonGradient(
                      product.category_slug,
                    );
                    const isAvailable = true; // Assuming all products are available

                    return (
                      <motion.div
                        key={`${selectedCategory}-${product.id}`}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                        exit={{ opacity: 0, y: -20 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          key={product.name}
                          className="relative hover:scale-105 transition-all"
                        >
                          {product.popular && (
                            <div className="absolute -top-3 left-0 right-0 mx-auto w-fit z-10">
                              <Chip
                                className="font-bold text-white"
                                color={categoryColor}
                                size="sm"
                                startContent={<IconStar size={14} />}
                                variant="shadow"
                              >
                                MOST POPULAR
                              </Chip>
                            </div>
                          )}
                          <Card
                            className={`h-full backdrop-blur-xl bg-white/5 dark:bg-slate-800/40 shadow-2xl 
                          border-2 ${borderClass} 
                           hover:shadow-3xl transition-all duration-500 overflow-hidden relative group`}
                          >
                            {/* Gradient Background Overlay */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${gradientClass} pointer-events-none transition-all duration-500 group-hover:opacity-80`}
                            />

                            {/* Private Category Badge */}
                            {product.category_is_private && (
                              <div className="absolute top-4 left-4 z-20">
                                <Chip
                                  className="font-semibold backdrop-blur-sm"
                                  color="warning"
                                  size="sm"
                                  startContent={
                                    <IconSparkles className="w-3 h-3" />
                                  }
                                  variant="flat"
                                >
                                  VIP ONLY
                                </Chip>
                              </div>
                            )}

                            {/* Promo Badge - Simple Corner Badge */}
                            {product.is_promo &&
                              product.discount_percentage && (
                                <div className="absolute top-4 right-4 z-20">
                                  <Chip
                                    className="font-semibold backdrop-blur-sm"
                                    color="danger"
                                    size="sm"
                                    startContent={
                                      <IconTag className="w-3 h-3" />
                                    }
                                    variant="flat"
                                  >
                                    DISKON {product.discount_percentage}%
                                  </Chip>
                                </div>
                              )}

                            <CardBody className="p-6 relative z-10 flex flex-col justify-between h-full">
                              {/* Header Section */}
                              <div>
                                <div className="relative mb-4">
                                  <div className="absolute left-0 top-0">
                                    <div
                                      className={`w-10 h-10 rounded-xl ${bgOpacity} backdrop-blur-sm flex items-center justify-center border ${borderOpacity}`}
                                    >
                                      {getCategoryIcon(product.category_slug)}
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <h3 className="text-2xl font-bold leading-tight">
                                      {product.name}
                                    </h3>
                                    <div className="flex justify-center mt-1">
                                      <Chip
                                        className="capitalize backdrop-blur-sm"
                                        color={categoryColor}
                                        size="sm"
                                        variant="flat"
                                      >
                                        {product.category_name}
                                      </Chip>
                                    </div>
                                  </div>
                                </div>

                                {/* Price Section - Enhanced with Promo Display */}
                                <div className="text-center mb-6">
                                  {product.is_promo &&
                                  product.original_price ? (
                                    <div className="space-y-1">
                                      {/* Original Price - Crossed Out */}
                                      <div className="text-lg text-default-500 line-through">
                                        Rp{" "}
                                        {formatPrice(
                                          calculateDiscountedPrice(
                                            product.original_price,
                                            isAnnual,
                                          ),
                                        )}
                                      </div>
                                      {/* Current Promo Price */}
                                      <div
                                        className={`text-3xl font-bold ${iconColor} mb-1`}
                                      >
                                        Rp{" "}
                                        {formatPrice(
                                          calculateDiscountedPrice(
                                            product.price,
                                            isAnnual,
                                          ),
                                        )}
                                        <span className="text-lg font-normal text-default-600">
                                          /{isAnnual ? "tahun" : "bulan"}
                                        </span>
                                      </div>
                                      {/* Savings Amount */}
                                      {/* <div className="text-sm text-success font-medium">
                                      Hemat Rp{" "}
                                      {formatPrice(
                                        calculateDiscountedPrice(
                                          product.original_price -
                                            product.price,
                                          isAnnual
                                        )
                                      )}
                                    </div> */}
                                    </div>
                                  ) : (
                                    <div
                                      className={`text-3xl font-bold ${iconColor} mb-1`}
                                    >
                                      Rp{" "}
                                      {formatPrice(
                                        calculateDiscountedPrice(
                                          product.price,
                                          isAnnual,
                                        ),
                                      )}
                                      <span className="text-lg font-normal text-default-600">
                                        /{isAnnual ? "tahun" : "bulan"}
                                      </span>
                                    </div>
                                  )}

                                  {product.description && (
                                    <p className="text-sm text-default-600 mt-1 h-[20px]">
                                      {product.description}
                                    </p>
                                  )}

                                  {isAnnual && !product.is_promo && (
                                    <div className="text-sm text-default-500 line-through">
                                      Rp {formatPrice(product.price * 12)}
                                    </div>
                                  )}
                                </div>

                                <Divider className="my-4" />

                                {/* Specifications Grid - Core Specs Only */}
                                <div className="grid grid-cols-3 gap-3 pb-4">
                                  <div
                                    className={`bg-default-100/20 backdrop-blur-sm rounded-xl p-3 text-center border ${borderLight}`}
                                  >
                                    <IconCpu
                                      className={`w-5 h-5 mx-auto ${iconColor}`}
                                    />
                                    <p className="text-xs text-default-600 ">
                                      CPU
                                    </p>
                                    <p className="font-bold">{product.cpu}%</p>
                                  </div>

                                  <div
                                    className={`bg-default-100/20 backdrop-blur-sm rounded-xl p-3 text-center border ${borderLight}`}
                                  >
                                    <MemoryStick
                                      className={`w-5 h-5 mx-auto ${iconColor}`}
                                    />
                                    <p className="text-xs text-default-600 ">
                                      RAM
                                    </p>
                                    <p className="font-bold">
                                      {formatMB(product.ram)}
                                    </p>
                                  </div>
                                  <div
                                    className={`bg-default-100/20 backdrop-blur-sm rounded-xl p-3 text-center border ${borderLight}`}
                                  >
                                    <HardDrive
                                      className={`w-5 h-5 mx-auto ${iconColor}`}
                                    />
                                    <p className="text-xs text-default-600 ">
                                      Storage
                                    </p>
                                    <p className="font-bold">
                                      {formatMB(product.storage)}
                                    </p>
                                  </div>
                                </div>

                                {/* Additional Features - All Specifications */}
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center gap-2">
                                    <IconCpu
                                      className={`w-4 h-4 ${iconColor}`}
                                    />
                                    <span className="text-sm font-medium">
                                      {product.cpu}% CPU
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <MemoryStick
                                      className={`w-4 h-4 ${iconColor}`}
                                    />
                                    <span className="text-sm font-medium">
                                      {formatMB(product.ram)} RAM
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <HardDrive
                                      className={`w-4 h-4 ${iconColor}`}
                                    />
                                    <span className="text-sm font-medium">
                                      {formatMB(product.storage)} Storage
                                    </span>
                                  </div>

                                  {product.database > 0 && (
                                    <div className="flex items-center gap-2">
                                      <IconDatabase
                                        className={`w-4 h-4 ${iconColor}`}
                                      />
                                      <span className="text-sm font-medium">
                                        {product.database} MySQL Database
                                        {product.database > 1 ? "s" : ""}
                                      </span>
                                    </div>
                                  )}

                                  {product.backup > 0 && (
                                    <div className="flex items-center gap-2">
                                      <IconDeviceFloppy
                                        className={`w-4 h-4 ${iconColor}`}
                                      />
                                      <span className="text-sm font-medium">
                                        {product.backup} Automatic Backup
                                        {product.backup > 1 ? "s" : ""}
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex items-center gap-2">
                                    <IconServer2
                                      className={`w-4 h-4 ${iconColor}`}
                                    />
                                    <span className="text-sm font-medium">
                                      {product.category_name} Performance Tier
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Button - Enhanced for Promo */}
                              <div className="space-y-3">
                                <Button
                                  as={Link}
                                  className={`w-full font-semibold backdrop-blur-sm text-white transition-all duration-300 ${buttonGradient} hover:scale-105 shadow-lg`}
                                  endContent={
                                    <IconArrowRight className="w-4 h-4" />
                                  }
                                  href="https://clients.raehost.com/new-order"
                                  size="lg"
                                  variant="shadow"
                                >
                                  {product.is_promo
                                    ? "Ambil Promo Ini!"
                                    : "Select This Plan"}
                                </Button>

                                <p className="text-xs text-center text-default-500">
                                  {product.is_promo
                                    ? "🎉 Promo terbatas • Instant deployment"
                                    : "✨ Instant deployment • 24/7 support included"}
                                </p>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </AnimatedContent>

          {/* Comparison Table - Enhanced with Promo Info */}
          {visibleProducts.length > 0 && (
            <AnimatedContent delay={200} direction="vertical" distance={30}>
              <div className="mt-20 pb-10">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Plan Comparison
                </h2>
                <Card className="overflow-x-auto">
                  <CardBody className="p-0">
                    <div className="min-w-[800px]">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-default-200">
                            <th className="text-left p-4 font-semibold">
                              Features
                            </th>
                            {visibleProducts.map((product) => (
                              <th key={product.id} className="text-center p-4">
                                <div className="font-semibold">
                                  {product.name}
                                  {product.is_promo && (
                                    <Chip
                                      className="ml-2"
                                      color="danger"
                                      size="sm"
                                    >
                                      PROMO
                                    </Chip>
                                  )}
                                  {product.category_is_private && (
                                    <Chip
                                      className="ml-2"
                                      color="warning"
                                      size="sm"
                                    >
                                      VIP
                                    </Chip>
                                  )}
                                </div>
                                <div className="text-sm text-default-500">
                                  {product.is_promo &&
                                    product.original_price && (
                                      <span className="line-through decoration-red-500 decoration-2 mr-2 flex text-center items-center justify-center">
                                        Rp {formatPrice(product.original_price)}
                                      </span>
                                    )}
                                  Rp {formatPrice(product.price)}/month
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-default-100">
                            <td className="p-4 font-medium">CPU Power</td>
                            {visibleProducts.map((product) => (
                              <td key={product.id} className="text-center p-4">
                                {product.cpu}%
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-default-100">
                            <td className="p-4 font-medium">RAM</td>
                            {visibleProducts.map((product) => (
                              <td key={product.id} className="text-center p-4">
                                {(product.ram / 1024).toFixed(1)}GB
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-default-100">
                            <td className="p-4 font-medium">Storage</td>
                            {visibleProducts.map((product) => (
                              <td key={product.id} className="text-center p-4">
                                {(product.storage / 1024).toFixed(1)}GB
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-default-100">
                            <td className="p-4 font-medium">Backups</td>
                            {visibleProducts.map((product) => (
                              <td key={product.id} className="text-center p-4">
                                {product.backup > 0 ? (
                                  <IconCheck
                                    className="text-success mx-auto"
                                    size={20}
                                  />
                                ) : (
                                  <IconX
                                    className="text-danger mx-auto"
                                    size={20}
                                  />
                                )}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-4 font-medium">
                              Support Priority
                            </td>
                            {visibleProducts.map((product) => (
                              <td key={product.id} className="text-center p-4">
                                {product.category_slug === "premium"
                                  ? "Priority"
                                  : "Standard"}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </AnimatedContent>
          )}

          <ServerCalculator />

          {/* FAQ Section */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="max-w-4xl mx-auto">
                <Accordion variant="splitted">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      aria-label={faq.question}
                      startContent={
                        <IconQuestionMark className="text-primary" size={20} />
                      }
                      title={faq.question}
                    >
                      <p className="text-default-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </AnimatedContent>

          {/* CTA Section */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="mt-20">
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50  border-primary-200">
                <CardBody className="p-12 text-center">
                  <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                      <Sparkles
                        className="text-primary mx-auto mb-4 "
                        size={48}
                      />
                      <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Your Gaming Journey?
                      </h2>
                      <p className="text-lg text-default-600 mb-6">
                        Join thousands of gamers who trust Raehost for their
                        server hosting needs. Deploy your server in minutes and
                        start playing today!
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        as={Link}
                        className="text-white"
                        color="primary"
                        href="https://clients.raehost.com/new-order"
                        size="lg"
                        startContent={<IconRocket size={20} />}
                        variant="shadow"
                      >
                        Start Your Server Now
                      </Button>
                      <Button
                        as={Link}
                        href="/contact"
                        size="lg"
                        startContent={<IconHeadphones size={20} />}
                        variant="bordered"
                      >
                        Talk to Sales
                      </Button>
                    </div>

                    <div className="flex justify-center gap-8 mt-8 text-sm text-default-500">
                      <div className="flex items-center gap-1">
                        <IconCheck className="text-success" size={16} />
                        <span>No setup fees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconCheck className="text-success" size={16} />
                        <span>24/7 support</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconCheck className="text-success" size={16} />
                        <span>99.9% uptime SLA</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </>
  );
}
