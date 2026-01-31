// components/Pricing.tsx
"use client";

import React from "react";
import { Card, CardBody, Button, Chip, Link, Divider } from "@heroui/react";
import {
  IconCheck,
  IconStar,
  IconCpu,
  IconServer2,
  IconShield,
  IconHeadphones,
  IconSparkles,
  IconArrowRight,
  IconTagsFilled,
  IconDiscount2,
} from "@tabler/icons-react";
import { HardDrive, MemoryStick } from "lucide-react";
import { motion } from "framer-motion";
import LogoLoop from "@/components/ui/LogoLoop";

import AnimatedContent from "@/components/AnimatedContent";

const pricingPlans = [
  {
    id: 1,
    name: "Basic Hosting",
    category: "basic",
    description: "Cocok buat server kecil atau komunitas baru",
    originalPrice: "17999", // Harga asli
    price: "15000", // Harga setelah diskon
    discount: 17, // Persentase diskon
    perPeriod: "/bulan",
    cpu: "AMD Ryzen 7 9700X",
    ram: "DDR5",
    storage: "NVMe",
    features: [
      "Lower CPU Performance",
      "Uptime 99,9%",
      "Support 24/7",
      "Proteksi DDoS",
      "Unlimited Player Slot",
      "Unbeatable Value",
      "Setup Instan",
    ],
    cta: "Mulai Sekarang",
    ctaLink: "/new-order",
    isPopular: false,
    hasDiscount: true,
  },
  {
    id: 2,
    name: "Premium Hosting",
    category: "premium",
    description: "Performa maksimal untuk Komunitas server yang Besar",
    originalPrice: "24900", // Harga asli
    price: "19900", // Harga setelah diskon
    discount: 20, // Persentase diskon
    perPeriod: "/bulan",
    cpu: "AMD Ryzen 9 9950X",
    ram: "DDR5",
    storage: "NVMe",
    features: [
      "Ultimate CPU Performance",
      "Uptime 99,9%",
      "Support 24/7",
      "Proteksi DDoS",
      "Unlimited Player Slots",
      "Lower Latency",
      "Optimized Performance",
      "Enterprise Hardware",
      "Setup Instan",
    ],
    cta: "Mulai Sekarang",
    ctaLink: "/new-order",
    isPopular: true,
    hasDiscount: true,
  },
];
const imageLogos = [
  {
    src: "/assets/payment/QRIS.svg",
    alt: "QRIS",
  },
  {
    src: "/assets/payment/OVO.svg",
    alt: "OVO",
  },
  {
    src: "/assets/payment/BNI.svg",
    alt: "BNI VA",
  },
  {
    src: "/assets/payment/BRI.svg",
    alt: "BRI VA",
  },
  {
    src: "/assets/payment/Mandiri.svg",
    alt: "Mandiri VA",
  },
];
// Helper functions
const formatMB = (mb: number): string => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(0)} GB`;
  }

  return `${mb} MB`;
};

const formatPrice = (price: string): string => {
  return new Intl.NumberFormat("id-ID").format(parseInt(price));
};

const calculateSavings = (
  originalPrice: string,
  currentPrice: string
): string => {
  const original = parseInt(originalPrice);
  const current = parseInt(currentPrice);
  const savings = original - current;

  return new Intl.NumberFormat("id-ID").format(savings);
};

// Get category color
const getCategoryColor = (category: string): "primary" | "secondary" => {
  switch (category) {
    case "premium":
      return "secondary";
    case "basic":
    default:
      return "primary";
  }
};

// Get category gradient classes
const getCategoryGradient = (category: string): string => {
  switch (category) {
    case "premium":
      return "from-violet-500/10 via-purple-500/5 to-fuchsia-500/10";
    case "basic":
    default:
      return "from-blue-500/10 via-cyan-500/5 to-blue-500/10";
  }
};

// Get category border classes
const getCategoryBorder = (category: string): string => {
  switch (category) {
    case "premium":
      return "border-violet-200/60 dark:border-violet-500/30";
    case "basic":
    default:
      return "border-blue-200/60 dark:border-blue-500/30";
  }
};

// Get category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "premium":
      return <IconSparkles className="w-5 h-5" />;
    case "basic":
    default:
      return <IconServer2 className="w-5 h-5" />;
  }
};

// Get category icon/text color classes
const getCategoryIconColor = (category: string): string => {
  switch (category) {
    case "premium":
      return "text-secondary";
    case "basic":
    default:
      return "text-primary";
  }
};

// Get category background with opacity classes
const getCategoryBgOpacity = (category: string): string => {
  switch (category) {
    case "premium":
      return "bg-secondary/20";
    case "basic":
    default:
      return "bg-primary/20";
  }
};

// Get category border with opacity classes
const getCategoryBorderOpacity = (category: string): string => {
  switch (category) {
    case "premium":
      return "border-secondary/30";
    case "basic":
    default:
      return "border-primary/30";
  }
};

// Get category border with lower opacity for grid items
const getCategoryBorderLight = (category: string): string => {
  switch (category) {
    case "premium":
      return "border-secondary/10";
    case "basic":
    default:
      return "border-primary/10";
  }
};

// Get category button gradient classes
const getCategoryButtonGradient = (category: string): string => {
  switch (category) {
    case "premium":
      return "bg-gradient-to-r from-violet-500 to-purple-600";
    case "basic":
    default:
      return "bg-gradient-to-r from-blue-500 to-sky-400";
  }
};

// Section Header Component
const SectionHeader = () => (
  <div className="text-center mb-12 space-y-6">
    {/* Title Section */}
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <IconTagsFilled className="text-primary" size={32} />
        </div>
        <Chip color="primary" size="lg" variant="flat">
          Pricing
        </Chip>
      </div>

      <div className="space-y-3">
        <h2 className="text-4xl font-bold">
          Harga Terjangkau, Performa Maksimal
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Pilih paket yang cocok untuk kebutuhan server game kamu
        </p>
      </div>
    </div>

    {/* Discount Banner */}
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-200/50 dark:border-cyan-500/30 rounded-full px-4 py-2">
      <IconDiscount2 className="text-cyan-500" size={20} />
      <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
        ❄️ Winter Sale - Diskon Spesial Akhir Tahun
      </span>
    </div>
  </div>
);

export default function Pricing() {
  return (
    <section
      className="py-20  text-gray-900 dark:text-white transition-colors"
      id="pricing"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <AnimatedContent config={{ tension: 100, friction: 15 }} distance={50}>
          <SectionHeader />
        </AnimatedContent>

        {/* Pricing Cards */}
        <AnimatedContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto z-10">
            {pricingPlans.map((plan, index) => {
              const categoryColor = getCategoryColor(plan.category);
              const gradientClass = getCategoryGradient(plan.category);
              const borderClass = getCategoryBorder(plan.category);
              const iconColor = getCategoryIconColor(plan.category);
              const bgOpacity = getCategoryBgOpacity(plan.category);
              const borderOpacity = getCategoryBorderOpacity(plan.category);
              const borderLight = getCategoryBorderLight(plan.category);
              const buttonGradient = getCategoryButtonGradient(plan.category);

              return (
                <motion.div
                  key={plan.id}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative hover:scale-105 transition-all duration-300">
                    {plan.isPopular && (
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

                    {/* Discount Badge */}

                    <Card
                      className={`h-full bg-white dark:bg-slate-950 shadow-2xl 
                        border-2 ${borderClass} 
                        hover:shadow-3xl transition-all duration-500 overflow-hidden relative group min-h-[750px]`}
                    >
                      {/* Gradient Background Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} pointer-events-none transition-all duration-500 group-hover:opacity-80`}
                      />
                      {plan.hasDiscount && (
                        <div className="absolute top-7 right-4 z-20">
                          <Chip
                            className="font-semibold backdrop-blur-sm"
                            color="danger"
                            size="sm"
                            startContent={<IconDiscount2 size={12} />}
                            variant="flat"
                          >
                            DISKON {plan.discount}%
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
                                {getCategoryIcon(plan.category)}
                              </div>
                            </div>
                            <div className="text-center">
                              <h3 className="text-2xl font-bold leading-tight">
                                {plan.name}
                              </h3>
                              <div className="flex justify-center mt-1">
                                <Chip
                                  className="capitalize backdrop-blur-sm"
                                  color={categoryColor}
                                  size="sm"
                                  variant="flat"
                                >
                                  {plan.category}
                                </Chip>
                              </div>
                            </div>
                          </div>

                          {/* Price Section with Discount */}
                          <div className="text-center mb-6">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Mulai dari
                            </div>

                            {/* Original Price (Crossed Out) */}
                            {plan.hasDiscount && (
                              <div className="flex items-center justify-center mb-1">
                                <span className="text-lg text-gray-400 line-through">
                                  Rp {formatPrice(plan.originalPrice)}
                                </span>
                                {/* <Chip
                                  color="success"
                                  size="sm"
                                  variant="flat"
                                  className="ml-2 text-xs"
                                >
                                  Hemat Rp{" "}
                                  {calculateSavings(
                                    plan.originalPrice,
                                    plan.price
                                  )}
                                </Chip> */}
                              </div>
                            )}

                            {/* Current Price */}
                            <div className="flex items-baseline justify-center">
                              <span className="text-lg font-bold">Rp</span>
                              <span
                                className={`text-4xl font-bold ${iconColor} ${plan.hasDiscount ? "" : ""}`}
                              >
                                {formatPrice(plan.price)}
                              </span>
                              <span className="text-sm ml-1 text-gray-500 dark:text-gray-400">
                                {plan.perPeriod}
                              </span>
                            </div>

                            <p className="text-sm text-default-600 mt-2">
                              {plan.description}
                            </p>
                          </div>

                          <Divider className="my-4" />

                          {/* Specifications Grid */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <div
                              className={`bg-default-100/20 backdrop-blur-sm rounded-xl p-3 text-center border ${borderLight}`}
                            >
                              <IconCpu
                                className={`w-5 h-5 mx-auto ${iconColor} mb-1`}
                              />
                              <p className="text-xs text-default-600">CPU</p>
                              <p className="font-bold text-xs">{plan.cpu}</p>
                            </div>

                            <div
                              className={`bg-default-100/20 backdrop-blur-sm rounded-xl p-3 text-center border ${borderLight}`}
                            >
                              <MemoryStick
                                className={`w-5 h-5 mx-auto ${iconColor} mb-1`}
                              />
                              <p className="text-xs text-default-600">RAM</p>
                              <p className="font-bold">{plan.ram}</p>
                            </div>

                            <div
                              className={`bg-default-100/20 backdrop-blur-sm rounded-xl p-3 text-center border ${borderLight}`}
                            >
                              <HardDrive
                                className={`w-5 h-5 mx-auto ${iconColor} mb-1`}
                              />
                              <p className="text-xs text-default-600">
                                Storage
                              </p>
                              <p className="font-bold">{plan.storage}</p>
                            </div>
                          </div>

                          {/* Features List */}
                          <div className="space-y-2 mb-6">
                            {plan.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center"
                              >
                                <IconCheck
                                  className={`${iconColor} flex-shrink-0 mr-2`}
                                  size={16}
                                />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="space-y-3 mt-auto">
                          <Button
                            as={Link}
                            className={`w-full font-semibold backdrop-blur-sm text-white transition-all duration-300 ${buttonGradient} hover:scale-105 shadow-lg ${plan.hasDiscount ? "" : ""}`}
                            endContent={<IconArrowRight className="w-4 h-4" />}
                            href={plan.ctaLink}
                            size="lg"
                            variant="shadow"
                          >
                            {plan.cta}
                          </Button>

                          <p className="text-xs text-center text-default-500">
                            ✨ Setup instan • Support 24/7 included
                            {/* {plan.hasDiscount && (
                              <span className="block text-orange-500 font-medium mt-1">
                                🔥 Promo terbatas!
                              </span>
                            )} */}
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedContent>
        <div className="text-center pt-12">
          {/* Title Section */}
          <h3 className="text-2xl font-semibold">
            Pembayaran Mudah dengan Metode Populer di Indonesia
          </h3>
        </div>

        <div className="py-4 relative">
          <LogoLoop
            logos={imageLogos}
            speed={50}
            direction="left"
            logoHeight={20}
            gap={40}
            pauseOnHover
            scaleOnHover
            ariaLabel="Technology partners"
          />
        </div>
        {/* Additional Features Section */}
        <AnimatedContent delay={300}>
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 ">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconShield className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Keamanan Terjamin</h3>
                <p className="text-sm text-default-600">
                  Proteksi DDoS dan firewall untuk melindungi server Anda
                </p>
              </div>

              <div className="text-center p-6 ">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconHeadphones className="text-secondary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Support 24/7</h3>
                <p className="text-sm text-default-600">
                  Tim support siap membantu Anda kapan saja dibutuhkan
                </p>
              </div>

              <div className="text-center p-6 ">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconSparkles className="text-success" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Performance Optimal</h3>
                <p className="text-sm text-default-600">
                  Hardware premium untuk performa server yang maksimal
                </p>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
