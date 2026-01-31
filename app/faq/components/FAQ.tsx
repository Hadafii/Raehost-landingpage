"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Input,
  Chip,
  Accordion,
  AccordionItem,
  Link,
} from "@heroui/react";
import {
  IconQuestionMark,
  IconSearch,
  IconArrowLeft,
  IconServer,
  IconCreditCard,
  IconShield,
  IconHeadphones,
  IconRocket,
  IconSettings,
  IconMail,
  IconBrandDiscord,
  IconClock,
  IconX,
  IconAlertCircle,
  IconInfoCircleFilled,
  IconStar,
  IconThumbUp,
  IconThumbDown,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Clock, HelpCircle, BookOpen } from "lucide-react";
import Image from "next/image";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import SpotlightCard from "@/components/SpotlightCard";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  popularity: number;
  helpful: number;
  notHelpful: number;
  lastUpdated: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  description: string;
  count: number;
}

export default function FAQPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [helpfulVotes, setHelpfulVotes] = useState<
    Record<string, "helpful" | "not-helpful" | null>
  >({});

  const categories: Category[] = [
    {
      id: "all",
      name: "Semua",
      icon: IconQuestionMark,
      color: "primary",
      description: "Semua pertanyaan yang sering diajukan",
      count: 0,
    },
    {
      id: "getting-started",
      name: "Memulai",
      icon: IconRocket,
      color: "success",
      description: "Panduan awal menggunakan Raehost",
      count: 0,
    },
    {
      id: "server-management",
      name: "Kelola Server",
      icon: IconServer,
      color: "primary",
      description: "Mengelola dan konfigurasi server",
      count: 0,
    },
    {
      id: "billing",
      name: "Billing & Pembayaran",
      icon: IconCreditCard,
      color: "warning",
      description: "Pertanyaan seputar pembayaran dan tagihan",
      count: 0,
    },
    {
      id: "technical",
      name: "Teknis",
      icon: IconSettings,
      color: "secondary",
      description: "Masalah teknis dan troubleshooting",
      count: 0,
    },
    {
      id: "security",
      name: "Keamanan",
      icon: IconShield,
      color: "danger",
      description: "Keamanan server dan proteksi DDoS",
      count: 0,
    },
    {
      id: "support",
      name: "Support",
      icon: IconHeadphones,
      color: "secondary",
      description: "Bantuan dan layanan pelanggan",
      count: 0,
    },
  ];

  const faqData: FAQItem[] = [
    {
      id: "gs-1",
      question: "Bagaimana cara membuat server pertama saya?",
      answer:
        "Untuk membuat server pertama:\n\n1. Daftar akun di dashboard Raehost\n2. Pilih paket hosting yang sesuai\n3. Pilih game server yang ingin dibuat\n4. Lakukan pembayaran\n5. Server akan otomatis di-deploy dalam <1 Menit \n\nAnda akan mendapat email konfirmasi dengan detail akses server.",
      category: "getting-started",
      tags: ["pemula", "setup", "deployment"],
      popularity: 95,
      helpful: 124,
      notHelpful: 8,
      lastUpdated: "2024-12-01",
    },
    {
      id: "gs-2",
      question: "Berapa lama waktu setup server baru?",
      answer:
        "Server baru biasanya siap dalam <1 Menit setelah pembayaran dikonfirmasi.\n\nAnda akan mendapat notifikasi email dan SMS ketika server sudah siap digunakan.",
      category: "getting-started",
      tags: ["waktu", "deployment", "setup"],
      popularity: 87,
      helpful: 89,
      notHelpful: 5,
      lastUpdated: "2024-11-28",
    },
    {
      id: "gs-3",
      question: "Apakah ada trial gratis untuk mencoba layanan?",
      answer:
        "Ya! Kami menyediakan trial gratis 24 jam untuk paket Basic. Anda bisa mencoba semua fitur tanpa perlu kartu kredit.\n\nSetelah trial berakhir, Anda bisa upgrade ke paket berbayar jika puas dengan layanan kami.",
      category: "getting-started",
      tags: ["trial", "gratis", "mencoba"],
      popularity: 92,
      helpful: 156,
      notHelpful: 12,
      lastUpdated: "2024-12-03",
    },
    {
      id: "sm-1",
      question: "Bagaimana cara restart server saya?",
      answer:
        "Anda bisa restart server melalui dashboard:\n\n1. Login ke panel kontrol\n2. Pilih server yang ingin di-restart\n3. Klik tombol 'Restart' di menu actions\n4. Konfirmasi restart\n\nServer akan restart dalam 30-60 detik. Pastikan untuk memberitahu players sebelum restart.",
      category: "server-management",
      tags: ["restart", "kontrol", "dashboard"],
      popularity: 78,
      helpful: 67,
      notHelpful: 3,
      lastUpdated: "2024-11-25",
    },
    {
      id: "sm-2",
      question: "Bisakah saya install plugin/mod custom?",
      answer:
        "Tentu saja! Anda memiliki akses full control ke server. Untuk Minecraft, Anda bisa install plugin Bukkit/Spigot/Paper atau mod Forge/Fabric.\n\nUpload file melalui File Manager di dashboard atau gunakan FTP. Pastikan plugin/mod kompatibel dengan versi server Anda.",
      category: "server-management",
      tags: ["plugin", "mod", "custom", "install"],
      popularity: 85,
      helpful: 91,
      notHelpful: 7,
      lastUpdated: "2024-11-30",
    },
    {
      id: "b-1",
      question:
        "Mengapa status transaksi saya Pending/Failure padahal dana sudah berkurang?",
      answer:
        "Ini bisa terjadi karena masalah jaringan saat proses pembayaran. Jika dana sudah terdebet tapi status transaksi gagal, dana akan dikembalikan otomatis oleh payment provider dalam 1-3 hari kerja.\n\nJika lebih dari 3 hari tidak dikembalikan, hubungi support kami dengan screenshot bukti transaksi.",
      category: "billing",
      tags: ["pembayaran", "pending", "failure", "refund"],
      popularity: 94,
      helpful: 187,
      notHelpful: 15,
      lastUpdated: "2024-12-01",
    },
    {
      id: "b-2",
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menerima:\n\n• Bank Transfer (BCA, Mandiri, BRI, BNI)\n• E-Wallet (OVO, DANA, GoPay, LinkAja)\n• Virtual Account\n• Kartu Kredit (Visa, Mastercard)\n• QRIS\n\nSemua pembayaran diproses melalui gateway resmi dan aman.",
      category: "billing",
      tags: ["metode", "pembayaran", "transfer", "ewallet"],
      popularity: 76,
      helpful: 54,
      notHelpful: 2,
      lastUpdated: "2024-11-20",
    },
    {
      id: "t-1",
      question: "Server saya sering lag, apa penyebabnya?",
      answer:
        "Lag bisa disebabkan:\n\n1. Plugin/mod yang berat\n2. Terlalu banyak player untuk spesifikasi server\n3. Memory leak\n4. Chunk loading berlebihan\n\nCek penggunaan RAM dan CPU di dashboard. Untuk troubleshooting detail, hubungi support kami dengan log server.",
      category: "technical",
      tags: ["lag", "performance", "troubleshooting"],
      popularity: 89,
      helpful: 96,
      notHelpful: 11,
      lastUpdated: "2024-12-01",
    },
    {
      id: "s-1",
      question: "Seberapa aman server saya dari serangan DDoS?",
      answer:
        "Semua server dilindungi DDoS protection multi-layer:\n\n1. Network-level filtering\n2. Application-level protection\n3. Rate limiting\n4. Geographic blocking\n\nProteksi menangani serangan hingga 100 Gbps untuk paket Premium. Monitoring 24/7 dengan response time < 30 detik.",
      category: "security",
      tags: ["ddos", "protection", "keamanan", "serangan"],
      popularity: 86,
      helpful: 112,
      notHelpful: 6,
      lastUpdated: "2024-12-02",
    },
    {
      id: "sup-1",
      question: "Bagaimana cara menghubungi support jika ada masalah?",
      answer:
        "Support tersedia 24/7 melalui:\n\n1. Live Chat di dashboard\n2. Support ticket system\n3. WhatsApp +62-812-3456-7890\n4. Email support@raehost.com\n5. Discord server community\n\nResponse time: < 5 menit untuk live chat, < 30 menit untuk ticket, < 1 jam untuk email.",
      category: "support",
      tags: ["support", "bantuan", "contact", "ticket"],
      popularity: 77,
      helpful: 89,
      notHelpful: 3,
      lastUpdated: "2024-12-03",
    },
  ];

  // Calculate category counts
  const categoriesWithCount = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      count:
        cat.id === "all"
          ? faqData.length
          : faqData.filter((faq) => faq.category === cat.id).length,
    }));
  }, [faqData]);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return filtered.sort((a, b) => b.popularity - a.popularity);
  }, [searchQuery, selectedCategory, faqData]);

  // Get popular FAQs
  const popularFAQs = useMemo(() => {
    return faqData.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  }, [faqData]);

  const handleVote = (faqId: string, type: "helpful" | "not-helpful") => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [faqId]: prev[faqId] === type ? null : type,
    }));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div className="">
        {/* Hero Section with Background Image */}
        <div className="relative overflow-hidden text-white">
          {/* Background Image dengan Next.js Image */}
          <div className="absolute inset-0">
            <Image
              fill
              priority
              alt="FAQ Background"
              className="object-cover"
              quality={85}
              src="/assets/landing/stock/landing.png" // atau path gambar yang sesuai
            />
            {/* Blur Effect */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/20 dark:bg-black/60" />
          </div>

          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                  <HelpCircle className="text-white" size={48} />
                </div>
              </div>
              <BlurText
                animateBy="words"
                className="text-4xl md:text-5xl font-bold mb-4"
                delay={200}
                direction="top"
                text="Frequently Asked Questions"
              />
              <TextGenerateEffect
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-6"
                duration={0.8}
                words="Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan hosting game Raehost"
              />
              <Chip
                className="text-white bg-white/20 backdrop-blur-sm border border-white/10"
                color="warning"
                startContent={<Clock size={16} />}
                variant="flat"
              >
                Diperbarui setiap hari • {faqData.length} Pertanyaan
              </Chip>
            </motion.div>
          </div>
        </div>

        {/* FAQ Stats */}
        <div className="container mx-auto px-6 ">
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="dark:bg-slate-800/50 backdrop-blur-sm text-center">
                <CardBody className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {faqData.length}
                  </div>
                  <div className="text-sm text-default-600">
                    Total Pertanyaan
                  </div>
                </CardBody>
              </Card>
              <Card className="dark:bg-slate-800/50 backdrop-blur-sm text-center">
                <CardBody className="p-6">
                  <div className="text-3xl font-bold text-success mb-2">
                    {Math.round(
                      faqData.reduce(
                        (acc, faq) =>
                          acc +
                          (faq.helpful / (faq.helpful + faq.notHelpful)) * 100,
                        0,
                      ) / faqData.length,
                    )}
                    %
                  </div>
                  <div className="text-sm text-default-600">
                    Tingkat Kepuasan
                  </div>
                </CardBody>
              </Card>
              <Card className="dark:bg-slate-800/50 backdrop-blur-sm text-center">
                <CardBody className="p-6">
                  <div className="text-3xl font-bold text-warning mb-2">
                    {categoriesWithCount.filter((c) => c.id !== "all").length}
                  </div>
                  <div className="text-sm text-default-600">Kategori</div>
                </CardBody>
              </Card>
              <Card className="dark:bg-slate-800/50 backdrop-blur-sm text-center">
                <CardBody className="p-6">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-default-600">
                    Support Available
                  </div>
                </CardBody>
              </Card>
            </div>
          </AnimatedContent>

          {/* Navigation Breadcrumb */}
          <div className="container mx-auto px-6 py-4">
            <Button
              as={Link}
              className="text-default-600 hover:text-primary"
              href="/"
              startContent={<IconArrowLeft size={18} />}
              variant="light"
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <AnimatedContent delay={200} direction="horizontal" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <IconSearch size={20} />
                      Cari Pertanyaan
                    </h3>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="space-y-3">
                      <Input
                        endContent={
                          searchQuery && (
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={handleClearSearch}
                            >
                              <IconX size={14} />
                            </Button>
                          )
                        }
                        placeholder="Ketik pertanyaan Anda..."
                        startContent={
                          <IconSearch className="text-default-400" size={18} />
                        }
                        value={searchQuery}
                        variant="bordered"
                        onValueChange={setSearchQuery}
                      />
                      {searchQuery && (
                        <p className="text-sm text-default-600">
                          Ditemukan {filteredFAQs.length} pertanyaan
                        </p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Categories */}
              <AnimatedContent delay={200} direction="horizontal" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen size={20} />
                      Kategori
                    </h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="p-0">
                    <nav className="space-y-1">
                      {categoriesWithCount.map((category) => (
                        <Button
                          key={category.id}
                          className="w-full justify-start h-auto p-4"
                          color={
                            selectedCategory === category.id
                              ? category.color
                              : "default"
                          }
                          endContent={<div>{category.count}</div>}
                          startContent={<category.icon size={18} />}
                          variant={
                            selectedCategory === category.id ? "flat" : "light"
                          }
                          onPress={() => setSelectedCategory(category.id)}
                        >
                          <div className="flex-1 text-left">
                            <div className="font-medium">{category.name}</div>
                            <div className="text-xs text-default-500 hidden sm:block">
                              {category.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </nav>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Popular FAQs */}
              <AnimatedContent delay={200} direction="horizontal" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <IconStar size={20} />
                      Paling Populer
                    </h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-3">
                    {popularFAQs.map((faq, index) => (
                      <div
                        key={faq.id}
                        className="p-3 bg-white/10 rounded-lg hover:bg-default-100 dark:hover:bg-default-900/30 transition-colors cursor-pointer"
                        role="button"
                        onClick={() => {
                          const element = document.getElementById(
                            `faq-${faq.id}`,
                          );

                          element?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary-100  flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-2">
                              {faq.question}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Chip color="success" size="sm" variant="flat">
                                {faq.popularity}% populer
                              </Chip>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Contact Support */}
              <AnimatedContent delay={200} direction="horizontal" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-primary-200 ">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100  rounded-lg">
                        <IconHeadphones
                          className="text-primary-600 dark:text-primary-400"
                          size={20}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Butuh Bantuan?
                        </h3>
                        <p className="text-sm text-default-600">
                          Tim support siap membantu
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-3">
                    <Button
                      as={Link}
                      className="w-full"
                      color="primary"
                      href="/contact"
                      startContent={<IconMail size={18} />}
                      variant="flat"
                    >
                      Hubungi Support
                    </Button>
                    <Button
                      isExternal
                      as={Link}
                      className="w-full"
                      href="https://discord.gg/c8zC5Qfkvh"
                      startContent={<IconBrandDiscord size={18} />}
                      variant="bordered"
                    >
                      Join Discord
                    </Button>
                  </CardBody>
                </Card>
              </AnimatedContent>
            </div>

            {/* Main FAQ Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search Results Header */}
              {(searchQuery || selectedCategory !== "all") && (
                <AnimatedContent delay={200} direction="vertical" distance={30}>
                  <Card className="bg-white/10 backdrop-blur-sm">
                    <CardBody className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">
                            {searchQuery
                              ? `Hasil pencarian "${searchQuery}"`
                              : `Kategori: ${categoriesWithCount.find((c) => c.id === selectedCategory)?.name}`}
                          </h2>
                          <p className="text-sm text-default-600">
                            Ditemukan {filteredFAQs.length} pertanyaan
                          </p>
                        </div>
                        {(searchQuery || selectedCategory !== "all") && (
                          <Button
                            size="sm"
                            variant="light"
                            onPress={() => {
                              setSearchQuery("");
                              setSelectedCategory("all");
                            }}
                          >
                            Reset Filter
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </AnimatedContent>
              )}

              {/* FAQ List */}
              {filteredFAQs.length > 0 ? (
                <AnimatedContent delay={200} direction="vertical" distance={30}>
                  <Accordion
                    className="px-0"
                    selectionMode="multiple"
                    variant="splitted"
                  >
                    {filteredFAQs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        aria-label={faq.question}
                        className="mb-4"
                        title={
                          <div
                            className="flex items-start gap-3 py-2"
                            id={`faq-${faq.id}`}
                          >
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-left">
                                {faq.question}
                              </h3>
                              <div className="flex items-center gap-2 mt-2">
                                <Chip color="primary" size="sm" variant="flat">
                                  {
                                    categoriesWithCount.find(
                                      (c) => c.id === faq.category,
                                    )?.name
                                  }
                                </Chip>
                                <Chip color="success" size="sm" variant="flat">
                                  {faq.popularity}% populer
                                </Chip>
                                <div className="flex items-center gap-1 text-xs text-default-500">
                                  <IconClock size={12} />
                                  {new Date(faq.lastUpdated).toLocaleDateString(
                                    "id-ID",
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <div className="space-y-4 pb-4">
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <p className="text-default-700 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag) => (
                              <Chip
                                key={tag}
                                className="text-xs cursor-pointer"
                                size="sm"
                                variant="flat"
                                onClick={() => setSearchQuery(tag)}
                              >
                                #{tag}
                              </Chip>
                            ))}
                          </div>

                          {/* Helpful Rating */}
                          <Divider />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-medium">
                                Apakah ini membantu?
                              </span>
                              <div className="flex items-center gap-2">
                                <Button
                                  color={
                                    helpfulVotes[faq.id] === "helpful"
                                      ? "success"
                                      : "default"
                                  }
                                  size="sm"
                                  startContent={<IconThumbUp size={14} />}
                                  variant={
                                    helpfulVotes[faq.id] === "helpful"
                                      ? "flat"
                                      : "light"
                                  }
                                  onPress={() => handleVote(faq.id, "helpful")}
                                >
                                  {faq.helpful +
                                    (helpfulVotes[faq.id] === "helpful"
                                      ? 1
                                      : 0)}
                                </Button>
                                <Button
                                  color={
                                    helpfulVotes[faq.id] === "not-helpful"
                                      ? "danger"
                                      : "default"
                                  }
                                  size="sm"
                                  startContent={<IconThumbDown size={14} />}
                                  variant={
                                    helpfulVotes[faq.id] === "not-helpful"
                                      ? "flat"
                                      : "light"
                                  }
                                  onPress={() =>
                                    handleVote(faq.id, "not-helpful")
                                  }
                                >
                                  {faq.notHelpful +
                                    (helpfulVotes[faq.id] === "not-helpful"
                                      ? 1
                                      : 0)}
                                </Button>
                              </div>
                            </div>
                            <div className="text-xs text-default-500">
                              {Math.round(
                                (faq.helpful / (faq.helpful + faq.notHelpful)) *
                                  100,
                              )}
                              % helpful
                            </div>
                          </div>
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AnimatedContent>
              ) : (
                <AnimatedContent delay={200} direction="vertical" distance={30}>
                  <Card className="dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardBody className="p-12 text-center">
                      <div className="mb-4">
                        <IconAlertCircle
                          className="text-default-400 mx-auto"
                          size={48}
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Tidak Ada Hasil
                      </h3>
                      <p className="text-default-600 mb-6">
                        Tidak ditemukan pertanyaan yang sesuai dengan pencarian
                        Anda.
                      </p>
                      <div className="space-y-3">
                        <Button
                          color="primary"
                          variant="flat"
                          onPress={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                          }}
                        >
                          Lihat Semua FAQ
                        </Button>
                        <div>
                          <Button
                            as={Link}
                            href="/contact"
                            startContent={<IconMail size={18} />}
                            variant="light"
                          >
                            Tanyakan ke Support
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </AnimatedContent>
              )}

              {/* Quick Help Section */}
              <AnimatedContent delay={200} direction="vertical" distance={30}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SpotlightCard>
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-4">
                        <IconRocket className="text-primary-600" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Getting Started Guide
                      </h3>
                      <p className="text-default-600 text-sm mb-4">
                        Panduan lengkap untuk memulai menggunakan Raehost dari
                        nol hingga server siap digunakan.
                      </p>
                      <Button
                        as={Link}
                        color="primary"
                        href="/docs/getting-started"
                        size="sm"
                        variant="flat"
                      >
                        Lihat Panduan
                      </Button>
                    </div>
                  </SpotlightCard>

                  <SpotlightCard>
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-secondary-100 dark:bg-secondary-900/20 mb-4">
                        <IconSettings
                          className="text-secondary-600"
                          size={24}
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Server Configuration
                      </h3>
                      <p className="text-default-600 text-sm mb-4">
                        Tips dan trik untuk mengoptimalkan konfigurasi server
                        game Anda agar performa maksimal.
                      </p>
                      <Button
                        as={Link}
                        color="secondary"
                        href="/docs/configuration"
                        size="sm"
                        variant="flat"
                      >
                        Pelajari
                      </Button>
                    </div>
                  </SpotlightCard>
                </div>
              </AnimatedContent>

              {/* Still Need Help */}
              <AnimatedContent delay={200} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-warning-200 ">
                  <CardBody className="p-8 text-center">
                    <div className="max-w-2xl mx-auto">
                      <div className="inline-flex p-3 rounded-full bg-warning-100 dark:bg-warning-900/20 mb-4">
                        <IconInfoCircleFilled
                          className="text-warning-600"
                          size={24}
                        />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        Masih Butuh Bantuan?
                      </h2>
                      <p className="text-lg text-default-600 mb-6">
                        Tidak menemukan jawaban yang Anda cari? Tim support kami
                        siap membantu 24/7!
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button
                          as={Link}
                          className="w-full"
                          color="primary"
                          href="/contact"
                          startContent={<IconMail size={18} />}
                          variant="flat"
                        >
                          Email Support
                        </Button>
                        <Button
                          isExternal
                          as={Link}
                          className="w-full"
                          color="success"
                          href="https://wa.me/6281284900989"
                          startContent={<IconHeadphones size={18} />}
                          variant="flat"
                        >
                          WhatsApp
                        </Button>
                        <Button
                          isExternal
                          as={Link}
                          className="w-full"
                          color="secondary"
                          href="https://discord.gg/c8zC5Qfkvh"
                          startContent={<IconBrandDiscord size={18} />}
                          variant="flat"
                        >
                          Discord
                        </Button>
                      </div>
                      <div className="mt-6 p-4 bg-default-50 dark:bg-default-900/20 rounded-lg">
                        <div className="flex items-center justify-center gap-4 text-sm text-default-600">
                          <div className="flex items-center gap-1">
                            <IconClock size={16} />
                            <span>Response time: &lt; 30 menit</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IconStar size={16} />
                            <span>4.9/5 rating</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>
              {/* Footer */}
              <AnimatedContent delay={200} direction="vertical" distance={30}>
                {/* Legal Footer */}
                <Card className="bg-white/10">
                  <CardBody>
                    <div className="text-center space-y-2">
                      <p className="text-sm text-default-600">
                        © {new Date().getFullYear()} Raehost. Seluruh hak cipta
                        dilindungi undang-undang.
                      </p>
                      <p className="text-xs text-default-500">
                        Dokumen ini dapat berubah sewaktu-waktu tanpa
                        pemberitahuan sebelumnya. Versi terbaru selalu tersedia
                        di website resmi Raehost.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
