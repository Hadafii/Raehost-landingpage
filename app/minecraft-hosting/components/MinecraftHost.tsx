"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Link,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  IconRocket,
  IconArrowLeft,
  IconShield,
  IconBolt,
  IconCpu,
  IconCheck,
  IconSettings,
  IconPuzzle,
  IconQuestionMark,
  IconHeadphones,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Pickaxe, Sparkles, Puzzle, Zap } from "lucide-react";
import Image from "next/image";

import ServerTypeCard from "./ServerTypeCard";

import Pricing from "@/app/components/Pricing";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
interface ServerType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  recommended: boolean;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
}

interface FAQ {
  question: string;
  answer: string;
}

export default function MinecraftHostingPage(): JSX.Element {
  const [selectedServerType, setSelectedServerType] = useState("vanilla");

  const serverTypes: ServerType[] = [
    {
      id: "vanilla",
      name: "Vanilla Minecraft",
      description: "Experience Minecraft murni tanpa modifikasi",
      icon: Pickaxe,
      features: [
        "Pure Minecraft experience",
        "Official Mojang updates",
        "Compatible dengan semua client",
      ],
      recommended: true,
      color: "success",
    },
    {
      id: "bukkit",
      name: "Bukkit/Spigot",
      description: "Support plugin untuk enhance gameplay",
      icon: Puzzle,
      features: [
        "Thousands of plugins available",
        "Economy systems",
        "Mini-games support",
      ],
      recommended: true,
      color: "primary",
    },
    {
      id: "paper",
      name: "Paper",
      description: "High performance fork dari Spigot",
      icon: Zap,
      features: [
        "Better performance",
        "Anti-cheat improvements",
        "Advanced configuration",
      ],
      recommended: false,
      color: "warning",
    },
    {
      id: "forge",
      name: "Forge Modded",
      description: "Support mod untuk gameplay yang lebih rich",
      icon: IconSettings,
      features: ["Mod support", "Tech & magic mods", "Adventure modpacks"],
      recommended: false,
      color: "secondary",
    },
  ];

  const features = [
    {
      title: "Setup Instan",
      description: "Server siap dalam hitungan detik",
      icon: IconBolt,
      color: "text-yellow-500",
    },
    {
      title: "Performance Optimized",
      description: "Hardware terbaik untuk gameplay mulus",
      icon: IconCpu,
      color: "text-blue-500",
    },
    {
      title: "Plugin & Mod Support",
      description: "Dukung ribuan plugin dan mod populer",
      icon: IconPuzzle,
      color: "text-purple-500",
    },
    {
      title: "Advanced Protection",
      description: "Keamanan server terjamin 24/7",
      icon: IconShield,
      color: "text-green-500",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "Versi Minecraft apa saja yang didukung?",
      answer:
        "Kami mendukung semua versi Minecraft Java dan Bedrock, mulai dari versi 1.8 hingga yang terbaru.",
    },
    {
      question: "Apakah bisa install plugin dan mod custom?",
      answer:
        "Ya! Anda memiliki akses penuh untuk mengupload dan menginstall plugin custom, mod, atau bahkan modpack lengkap. Kami juga menyediakan one-click installer untuk plugin populer.",
    },

    {
      question: "Apakah ada batasan jumlah pemain?",
      answer:
        "Tidak ada batasan hard limit untuk jumlah pemain. Namun, performa server tergantung pada spesifikasi paket yang Anda pilih. Kami memberikan rekomendasi jumlah pemain optimal untuk setiap paket.",
    },
    {
      question: "Bagaimana dengan keamanan dan proteksi DDoS?",
      answer:
        "Semua server kami dilengkapi dengan proteksi DDoS tingkat lanjut untuk menjaga server Anda tetap online dan aman dari serangan. Kami juga melakukan backup rutin untuk melindungi data Anda.",
    },
    {
      question: "Bisakah saya upgrade paket di kemudian hari?",
      answer:
        "Untuk Upgrade paket, silahkan membuat tiket support, dan tim kami akan membantu Anda.",
    },
    {
      question:
        "Bisakah saya mengganti jenis server (misal dari Vanilla ke Spigot)?",
      answer:
        "Tentu! Anda dapat mengganti jenis server kapan saja melalui panel kontrol. Kami menyediakan opsi untuk mengubah jenis server tanpa kehilangan data.",
    },
  ];

  return (
    <>
      <div className="">
        {/* Hero Section */}
        <div className="relative overflow-hidden text-white">
          <div className="absolute inset-0">
            <Image
              fill
              priority
              alt="Minecraft Hosting Background"
              className="object-cover"
              quality={85}
              src="/assets/landing/Banner.png"
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
                  <Pickaxe className="text-white" size={48} />
                </div>
              </div>

              <BlurText
                animateBy="words"
                className="text-4xl md:text-6xl font-bold mb-6"
                delay={200}
                direction="top"
                text="Minecraft Hosting Terbaik"
              />

              <TextGenerateEffect
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
                duration={0.8}
                words="Server Minecraft premium dengan performa tinggi, setup instan, dan support 24/7. Dari vanilla hingga modded, siap untuk adventure Anda!"
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-2xl font-bold mb-1">{`< 30s`}</div>
                  <div className="text-sm text-white/80">Setup Time</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-2xl font-bold mb-1">1.8+</div>
                  <div className="text-sm text-white/80">All Versions</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-2xl font-bold mb-1">1000+</div>
                  <div className="text-sm text-white/80">Plugins Available</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-white/80">Expert Support</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        <div className="container mx-auto px-6 py-4">
          <Button
            as={Link}
            className="text-default-600 hover:text-primary"
            href="/games"
            startContent={<IconArrowLeft size={18} />}
            variant="light"
          >
            Kembali ke Game Servers
          </Button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-16">
          <ServerTypeCard />

          {/* Features Section */}
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Kenapa Pilih Minecraft Hosting Kami?
                </h2>
                <p className="text-xl text-default-600 max-w-2xl mx-auto">
                  Dirancang khusus untuk memberikan experience Minecraft terbaik
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <AnimatedContent
                    key={feature.title}
                    delay={200}
                    direction="vertical"
                    distance={30}
                  >
                    <div className="h-full">
                      <Card className="h-full text-center flex flex-col">
                        <CardBody className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex justify-center mb-4">
                              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                                <feature.icon
                                  className={feature.color}
                                  size={28}
                                />
                              </div>
                            </div>
                            <h3 className="text-lg text-center font-semibold mb-2">
                              {feature.title}
                            </h3>
                          </div>
                          <p className="text-default-600 text-sm text-center">
                            {feature.description}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Pricing Section */}
          <section className="py-20" id="pricing">
            <Pricing />
          </section>

          {/* FAQ Section */}
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-default-600 max-w-2xl mx-auto">
                  Pertanyaan yang sering diajukan tentang Minecraft hosting
                </p>
              </div>

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
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
              <CardBody className="p-12 text-center">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-6">
                    <Sparkles className="text-primary mx-auto mb-4" size={48} />
                    <h2 className="text-3xl font-bold mb-4">
                      Siap Memulai Adventure Minecraft Anda?
                    </h2>
                    <p className="text-lg text-default-600 mb-6">
                      Join ribuan player yang sudah mempercayai Raehost untuk
                      server Minecraft mereka. Setup instan, performa tinggi,
                      dan support terbaik!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button
                      as={Link}
                      className="text-white"
                      color="primary"
                      href="/new-order"
                      size="lg"
                      startContent={<IconRocket size={20} />}
                      variant="shadow"
                    >
                      Order Server Sekarang
                    </Button>
                    <Button
                      as={Link}
                      href="/contact"
                      size="lg"
                      startContent={<IconHeadphones size={20} />}
                      variant="bordered"
                    >
                      Konsultasi dengan Tim
                    </Button>
                  </div>

                  <div className="flex justify-center gap-8 text-sm text-default-500">
                    <div className="flex items-center gap-1">
                      <IconCheck className="text-success" size={16} />
                      <span>{`Setup < 30 detik`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconCheck className="text-success" size={16} />
                      <span>Support 24/7</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconCheck className="text-success" size={16} />
                      <span>99.9% uptime</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </AnimatedContent>
        </div>
      </div>
    </>
  );
}
