"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  Slider,
  Button,
  Chip,
  Divider,
  Spinner,
  Progress,
} from "@heroui/react";
import {
  Users,
  Package,
  Cpu,
  HardDrive,
  Database,
  Zap,
  Sparkles,
  Server,
  CheckCircle,
  Gamepad2,
  Calculator,
  Target,
} from "lucide-react";
import { IconServer, IconArrowRight } from "@tabler/icons-react";

import AnimatedContentV2 from "@/components/AnimatedContent";
import SplitText from "@/components/SplitText";
import FadeContent from "@/components/FadeContent";
import { logger } from "@/lib/logs";

interface Product {
  id: number;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  database: number;
  backup: number;
  price: number;
  category_id: number;
  category_slug: string;
  features: string[];
}

interface ServerType {
  id: string;
  name: string;
  description: string;
  baseRam: number;
  perPlayerRam: number;
  perModRam?: number;
  perPluginRam?: number;
  icon: React.ReactNode;
  color: "success" | "primary" | "secondary" | "warning" | "danger";
  supportsMods?: boolean;
  supportsPlugins?: boolean;
}

const serverTypes: ServerType[] = [
  {
    id: "vanilla",
    name: "Vanilla",
    description: "Java Edition",
    baseRam: 1024,
    perPlayerRam: 300,
    icon: <Package className="w-5 h-5" />,
    color: "success",
  },
  {
    id: "optimized",
    name: "Optimized",
    description: "Paper/Spigot",
    baseRam: 1024,
    perPlayerRam: 300,
    perPluginRam: 250,
    icon: <Zap className="w-5 h-5" />,
    color: "primary",
    supportsPlugins: true,
  },
  {
    id: "modded",
    name: "Modded",
    description: "Forge/Fabric",
    baseRam: 2048,
    perPlayerRam: 350,
    perModRam: 300,
    icon: <Sparkles className="w-5 h-5" />,
    color: "secondary",
    supportsMods: true,
  },
  {
    id: "bedrock",
    name: "Bedrock",
    description: "Bedrock Edition",
    baseRam: 512,
    perPlayerRam: 300,
    icon: <Gamepad2 className="w-5 h-5" />,
    color: "warning",
  },
];

const ServerCalculator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ServerType>(serverTypes[0]);
  const [playerCount, setPlayerCount] = useState<number>(10);
  const [modCount, setModCount] = useState<number>(0);
  const [pluginCount, setPluginCount] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pricing");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const allProducts: Product[] = [];

        Object.values(data.categories).forEach((categoryProducts: any) => {
          const premiumProducts = categoryProducts.filter(
            (product: any) => product.category_id > 1,
          );

          allProducts.push(...premiumProducts);
        });

        setProducts(allProducts);
        setError(null);
      } catch (err) {
        logger.error("Failed to fetch products:", err);
        setError("Failed to load server packages");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate required RAM
  const requiredRam = useMemo(() => {
    let ram = selectedType.baseRam;

    ram += playerCount * selectedType.perPlayerRam;

    if (selectedType.supportsMods && selectedType.perModRam) {
      ram += modCount * selectedType.perModRam;
    }

    if (selectedType.supportsPlugins && selectedType.perPluginRam) {
      ram += pluginCount * selectedType.perPluginRam;
    }

    return Math.ceil(ram / 1024) * 1024;
  }, [selectedType, playerCount, modCount, pluginCount]);

  // Find recommended product
  const recommendedProduct = useMemo(() => {
    if (!products.length) return null;

    const suitableProducts = products
      .filter((p) => p.ram >= requiredRam)
      .sort((a, b) => a.ram - b.ram);

    return suitableProducts[0] || null;
  }, [products, requiredRam]);

  // Check if we need custom requirements
  const needsCustomRequirements = useMemo(() => {
    return products.length > 0 && !recommendedProduct;
  }, [products, recommendedProduct]);

  // Calculate the actual required values for display
  const calculatedRAM = useMemo(() => {
    return Math.ceil(requiredRam / 1024);
  }, [requiredRam]);
  const ramCoveragePercentage = useMemo(() => {
    if (!recommendedProduct) return 0;

    return Math.round((recommendedProduct.ram / requiredRam) * 100);
  }, [recommendedProduct, requiredRam]);

  const isOverCapacity = useMemo(() => {
    return ramCoveragePercentage > 100;
  }, [ramCoveragePercentage]);

  return (
    <div>
      <AnimatedContentV2>
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center border border-primary/20">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="text-center ">
          <SplitText
            className="text-3xl md:text-4xl font-bold"
            delay={100}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 50 }}
            splitType="words"
            text="Temukan Paket Server Ideal Anda"
            threshold={0.1}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
        <div className="text-center ">
          <SplitText
            className="text-lg text-default-600 max-w-2xl mx-auto"
            delay={80}
            duration={0.6}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            initialDelay={0.3}
            splitType="words"
            text="Kalkulator cerdas untuk menentukan spesifikasi server Minecraft yang tepat sesuai kebutuhan Anda"
            threshold={0.1}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
      </AnimatedContentV2>

      <FadeContent blur delay={500}>
        {/* Main Calculator Card */}
        <Card className="backdrop-blur-xl bg-white/5 dark:bg-slate-800/40  overflow-hidden shadow-2xl ">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          <CardBody className="p-8 relative">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Configuration Section */}
              <div className="xl:col-span-2 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Konfigurasi Server</h3>
                    <p className="text-sm text-default-600">
                      Sesuaikan dengan kebutuhan server Anda
                    </p>
                  </div>
                </div>

                {/* Server Type Selection */}
                <div className="space-y-3">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Tipe Server
                  </span>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {serverTypes.map((type) => (
                      <Button
                        key={type.id}
                        className="h-auto py-4 backdrop-blur-sm"
                        color={
                          selectedType.id === type.id ? type.color : "default"
                        }
                        variant={
                          selectedType.id === type.id ? "flat" : "bordered"
                        }
                        onPress={() => {
                          setSelectedType(type);
                          if (!type.supportsMods) setModCount(0);
                          if (!type.supportsPlugins) setPluginCount(0);
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {type.icon}
                          <span className="font-semibold text-xs">
                            {type.name}
                          </span>
                          <span className="text-xs opacity-70">
                            {type.description}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Player Count */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Jumlah Pemain Aktif
                    </span>
                    <Chip
                      className="backdrop-blur-sm"
                      color="primary"
                      size="sm"
                      variant="flat"
                    >
                      {playerCount} {playerCount === 1 ? "Pemain" : "Pemain"}
                    </Chip>
                  </div>
                  <div className="bg-default-100/80 backdrop-blur-sm rounded-xl p-4">
                    <Slider
                      showTooltip
                      className="w-full"
                      color="primary"
                      maxValue={100}
                      minValue={1}
                      size="lg"
                      step={1}
                      value={playerCount}
                      onChange={(value) => setPlayerCount(value as number)}
                    />
                    <div className="flex justify-between text-xs text-default-500 mt-2">
                      <span>1</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100+</span>
                    </div>
                  </div>
                </div>

                {/* Conditional Mod Count */}
                {selectedType.supportsMods && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Jumlah Mod
                      </span>
                      <Chip
                        className="backdrop-blur-sm"
                        color="secondary"
                        size="sm"
                        variant="flat"
                      >
                        {modCount} Mod
                      </Chip>
                    </div>
                    <div className="bg-default-100/80 backdrop-blur-sm rounded-xl p-4">
                      <Slider
                        showTooltip
                        className="w-full"
                        color="secondary"
                        maxValue={100}
                        minValue={0}
                        size="lg"
                        step={1}
                        value={modCount}
                        onChange={(value) => setModCount(value as number)}
                      />
                      <p className="text-xs text-default-500 mt-2">
                        Ringan (10-30), Sedang (50-100), Berat (100+)
                      </p>
                    </div>
                  </div>
                )}

                {/* Conditional Plugin Count */}
                {selectedType.supportsPlugins && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Jumlah Plugin
                      </span>
                      <Chip
                        className="backdrop-blur-sm"
                        color="warning"
                        size="sm"
                        variant="flat"
                      >
                        {pluginCount} Plugin
                      </Chip>
                    </div>
                    <div className="bg-default-100/80 backdrop-blur-sm rounded-xl p-4">
                      <Slider
                        showTooltip
                        className="w-full"
                        color="warning"
                        maxValue={100}
                        minValue={0}
                        size="lg"
                        step={1}
                        value={pluginCount}
                        onChange={(value) => setPluginCount(value as number)}
                      />
                      <p className="text-xs text-default-500 mt-2">
                        Ringan (5-15), Sedang (20-50), Berat (60+)
                      </p>
                    </div>
                  </div>
                )}

                {/* RAM Estimation */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">
                      Estimasi RAM Dibutuhkan
                    </span>
                    <Chip
                      className="backdrop-blur-sm"
                      color="primary"
                      size="lg"
                      variant="shadow"
                    >
                      {(requiredRam / 1024).toFixed(1)} GB
                    </Chip>
                  </div>
                  <Progress
                    className="mb-2"
                    color="primary"
                    size="lg"
                    value={Math.min((requiredRam / 32768) * 100, 100)}
                  />
                  <p className="text-xs text-default-600">
                    Berdasarkan {playerCount} pemain
                    {selectedType.supportsMods &&
                      modCount > 0 &&
                      ` dengan ${modCount} mod`}
                    {selectedType.supportsPlugins &&
                      pluginCount > 0 &&
                      ` dan ${pluginCount} plugin`}
                  </p>
                </div>
              </div>

              {/* Recommendation Section */}
              <div className="xl:col-span-1">
                <div className="sticky top-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-success/20 backdrop-blur-sm flex items-center justify-center border border-success/30">
                      <Target className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Rekomendasi</h3>
                      <p className="text-sm text-default-600">
                        Paket terbaik untuk Anda
                      </p>
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-default-100/50 backdrop-blur-sm rounded-xl">
                      <Spinner color="primary" size="lg" />
                      <p className="text-default-600 mt-4 text-sm">
                        Memuat paket...
                      </p>
                    </div>
                  ) : error ? (
                    <div className="bg-danger/10 backdrop-blur-sm rounded-xl p-6 text-center border border-danger/20">
                      <p className="text-danger font-medium">{error}</p>
                    </div>
                  ) : needsCustomRequirements ? (
                    <div className="bg-warning/10 backdrop-blur-sm rounded-xl p-6 border border-warning/20">
                      <div className="text-center space-y-4">
                        <IconServer className="w-12 h-12 mx-auto text-warning" />
                        <div>
                          <h4 className="font-bold text-warning mb-2">
                            Kebutuhan Khusus
                          </h4>
                          <p className="text-sm text-default-600 mb-4">
                            Spesifikasi Anda melebihi paket premium kami. Tim
                            kami dapat membuat solusi khusus.
                          </p>
                        </div>
                        <div className="bg-warning/20 rounded-lg p-3 text-sm">
                          <div className="font-semibold text-warning-600">
                            {calculatedRAM} GB RAM • {playerCount} Pemain
                            {selectedType.supportsMods &&
                              modCount > 0 &&
                              ` • ${modCount} Mod`}
                            {selectedType.supportsPlugins &&
                              pluginCount > 0 &&
                              ` • ${pluginCount} Plugin`}
                          </div>
                        </div>
                        <Button
                          as="a"
                          className="w-full backdrop-blur-sm text-white"
                          color="warning"
                          endContent={<IconArrowRight className="w-4 h-4" />}
                          href="/contact"
                          variant="shadow"
                        >
                          Hubungi Tim Kami
                        </Button>
                      </div>
                    </div>
                  ) : recommendedProduct ? (
                    <div className="bg-gradient-to-br from-success/5 to-primary/5 backdrop-blur-sm rounded-xl p-1 border border-success/20">
                      <div className="bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm rounded-lg p-6 space-y-4">
                        <div className="text-center">
                          <Chip className="mb-2" color="success" variant="flat">
                            Direkomendasikan
                          </Chip>
                          <h4 className="text-2xl font-bold text-primary mb-1">
                            {recommendedProduct.name}
                          </h4>
                          <p className="text-sm text-default-600 capitalize mb-3">
                            Paket {recommendedProduct.category_slug}
                          </p>
                          <div className="text-3xl font-bold">
                            Rp{recommendedProduct.price.toLocaleString()}
                            <span className="text-sm text-default-600 font-normal">
                              /bulan
                            </span>
                          </div>
                        </div>

                        <Divider />

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-default-200/80 backdrop-blur-sm rounded-lg p-3 text-center">
                            <Cpu className="w-5 h-5 mx-auto text-primary mb-1" />
                            <p className="text-xs text-default-600">CPU</p>
                            <p className="font-bold">
                              {recommendedProduct.cpu}%
                            </p>
                          </div>
                          <div className="bg-default-200/80 backdrop-blur-sm rounded-lg p-3 text-center">
                            <Server className="w-5 h-5 mx-auto text-success mb-1" />
                            <p className="text-xs text-default-600">RAM</p>
                            <p className="font-bold">
                              {(recommendedProduct.ram / 1024).toFixed(1)} GB
                            </p>
                          </div>
                          <div className="bg-default-200/80 backdrop-blur-sm rounded-lg p-3 text-center">
                            <HardDrive className="w-5 h-5 mx-auto text-warning mb-1" />
                            <p className="text-xs text-default-600">Storage</p>
                            <p className="font-bold">
                              {(recommendedProduct.storage / 1024).toFixed(1)}{" "}
                              GB
                            </p>
                          </div>
                          <div className="bg-default-200/80 backdrop-blur-sm rounded-lg p-3 text-center">
                            <Database className="w-5 h-5 mx-auto text-secondary mb-1" />
                            <p className="text-xs text-default-600">Database</p>
                            <p className="font-bold">
                              {recommendedProduct.database}
                            </p>
                          </div>
                        </div>

                        {/* RAM Coverage */}
                        <div className="bg-success/10 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold">
                              Cakupan RAM
                            </span>
                            <span className="text-sm font-bold text-success">
                              {ramCoveragePercentage}%
                            </span>
                          </div>
                          <Progress
                            className="mb-1"
                            color="success"
                            isStriped={isOverCapacity}
                            size="md"
                            value={
                              isOverCapacity
                                ? 100
                                : Math.min(
                                    (requiredRam / recommendedProduct.ram) *
                                      100,
                                    100,
                                  )
                            }
                          />
                          <p className="text-xs text-default-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-success" />
                            {(
                              (recommendedProduct.ram - requiredRam) /
                              1024
                            ).toFixed(1)}{" "}
                            GB cadangan
                          </p>
                        </div>

                        {/* Features Preview */}
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">Fitur Utama:</p>
                          {recommendedProduct.features
                            .slice(0, 3)
                            .map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                                <span className="text-default-700">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          {recommendedProduct.features.length > 3 && (
                            <p className="text-xs text-default-500">
                              +{recommendedProduct.features.length - 3} fitur
                              lainnya
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button
                            className="w-full backdrop-blur-sm"
                            color="primary"
                            size="lg"
                            variant="shadow"
                            onPress={() =>
                              (window.location.href = "/new-order")
                            }
                          >
                            Pesan Sekarang
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-default-100/50 backdrop-blur-sm rounded-xl p-6 text-center">
                      <p className="text-default-600">
                        Tidak ada paket yang sesuai ditemukan
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </FadeContent>
    </div>
  );
};

export default ServerCalculator;
