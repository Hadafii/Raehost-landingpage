"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
  Link,
  Input,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import {
  IconSearch,
  IconClock,
  IconUser,
  IconEye,
  IconArrowRight,
  IconPlayerPlay,
  IconDownload,
  IconBookmark,
  IconShare,
  IconX,
  IconStar,
  IconHeart,
  IconAlertTriangle,
} from "@tabler/icons-react";
import {
  HardDrive,
  Sparkles,
  HandCoins,
  Shield,
  Upload,
  Settings,
  Gamepad2,
  Zap,
  Database,
  Lock,
  BookOpen,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  views: number;
  likes: number;
  author: string;
  publishedAt: string;
  tags: string[];
  icon: React.ComponentType<any>;
  featured: boolean;
  videoUrl?: string;
  steps: TutorialStep[];
}

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  code?: string;
  image?: string;
  warning?: string;
  tip?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  count: number;
}

export default function TutorialsPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(
    null,
  );

  const categories: Category[] = [
    {
      id: "all",
      name: "All Tutorials",
      icon: BookOpen,
      color: "primary",
      count: 0,
    },
    {
      id: "server-setup",
      name: "Server Setup",
      icon: Settings,
      color: "success",
      count: 0,
    },
    {
      id: "file-management",
      name: "File Management",
      icon: HardDrive,
      color: "warning",
      count: 0,
    },
    {
      id: "modpack",
      name: "ModPack",
      icon: Sparkles,
      color: "secondary",
      count: 0,
    },
    {
      id: "security",
      name: "Security",
      icon: Shield,
      color: "danger",
      count: 0,
    },
    {
      id: "optimization",
      name: "Optimization",
      icon: Zap,
      color: "warning",
      count: 0,
    },
  ];

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "Cara Crack atau Offline Player bisa masuk server",
      description:
        "Panduan lengkap untuk mengizinkan player offline atau cracked masuk ke server Minecraft Anda. Cocok untuk server komunitas lokal.",
      category: "security",
      difficulty: "beginner",
      duration: "5 menit",
      views: 15420,
      likes: 892,
      author: "Tim Raehost",
      publishedAt: "2024-12-01",
      tags: ["minecraft", "offline", "crack", "authentication"],
      icon: Lock,
      featured: true,
      steps: [
        {
          id: 1,
          title: "Akses Panel Kontrol Server",
          content:
            "Login ke panel kontrol Raehost dan pilih server Minecraft Anda. Klik menu 'Files' untuk mengakses file manager.",
          tip: "Pastikan server dalam kondisi offline sebelum mengedit file konfigurasi.",
        },
        {
          id: 2,
          title: "Edit File server.properties",
          content:
            "Cari dan buka file 'server.properties' di root folder server Anda.",
          code: "online-mode=false",
        },
        {
          id: 3,
          title: "Restart Server",
          content:
            "Setelah menyimpan perubahan, restart server Anda melalui panel kontrol.",
          warning:
            "Menggunakan offline mode membuat server rentan terhadap impersonation. Gunakan plugin keamanan tambahan.",
        },
        {
          id: 4,
          title: "Verifikasi Pengaturan",
          content:
            "Coba join server menggunakan launcher cracked untuk memastikan pengaturan berhasil.",
          tip: "Disarankan menggunakan plugin seperti AuthMe untuk keamanan tambahan.",
        },
      ],
    },
    {
      id: 2,
      title: "Cara mengupload file menggunakan SFTP (FileZilla)",
      description:
        "Tutorial step-by-step menggunakan FileZilla untuk upload file ke server game Anda melalui SFTP connection.",
      category: "file-management",
      difficulty: "intermediate",
      duration: "10 menit",
      views: 23150,
      likes: 1456,
      author: "Tim Raehost",
      publishedAt: "2024-11-28",
      tags: ["sftp", "filezilla", "upload", "file-management"],
      icon: Upload,
      featured: true,
      steps: [
        {
          id: 1,
          title: "Download dan Install FileZilla",
          content:
            "Download FileZilla Client dari website resmi dan install di komputer Anda.",
          tip: "Pastikan download dari situs resmi filezilla-project.org untuk menghindari malware.",
        },
        {
          id: 2,
          title: "Dapatkan Kredensial SFTP",
          content:
            "Login ke panel Raehost, masuk ke server Anda dan copy informasi SFTP (Host, Username, Password, Port).",
          code: "Host: your-server-ip\nPort: 22\nUsername: your-username\nPassword: your-password",
        },
        {
          id: 3,
          title: "Koneksi ke Server",
          content:
            "Buka FileZilla, masukkan kredensial SFTP dan klik 'Quickconnect' atau simpan sebagai Site Manager.",
          warning: "Jangan bagikan kredensial SFTP Anda kepada orang lain.",
        },
        {
          id: 4,
          title: "Upload File",
          content:
            "Drag and drop file dari panel kiri (komputer) ke panel kanan (server) atau klik kanan dan pilih 'Upload'.",
          tip: "Upload file saat server offline untuk menghindari korupsi data.",
        },
      ],
    },
    {
      id: 3,
      title: "Cara Memasang ModPack di Raehost",
      description:
        "Panduan instalasi modpack populer seperti Tekkit, FTB, atau custom modpack di server hosting Raehost.",
      category: "modpack",
      difficulty: "intermediate",
      duration: "15 menit",
      views: 18750,
      likes: 1205,
      author: "Tim Raehost",
      publishedAt: "2024-11-25",
      tags: ["modpack", "forge", "fabric", "installation"],
      icon: Sparkles,
      featured: false,
      steps: [
        {
          id: 1,
          title: "Pilih ModPack dan Download",
          content:
            "Pilih modpack yang ingin diinstall (FTB, Tekkit, dll) dan download server files-nya.",
          tip: "Pastikan modpack kompatibel dengan versi Minecraft yang didukung server Anda.",
        },
        {
          id: 2,
          title: "Backup Data Server",
          content:
            "Buat backup lengkap server Anda sebelum melakukan perubahan besar.",
          warning:
            "Instalasi modpack akan mengganti semua file server. Backup sangat penting!",
        },
        {
          id: 3,
          title: "Upload File ModPack",
          content:
            "Upload semua file modpack ke folder server menggunakan SFTP atau panel file manager.",
          code: "Struktur folder:\n- mods/\n- config/\n- server.jar\n- server.properties",
        },
        {
          id: 4,
          title: "Konfigurasi Startup",
          content:
            "Update startup command di panel untuk menjalankan server jar yang baru.",
          tip: "Periksa dokumentasi modpack untuk startup command yang tepat.",
        },
      ],
    },
    {
      id: 4,
      title: "Cara Membuat Server di Raehost",
      description:
        "Tutorial lengkap dari awal membuat akun sampai server game Anda online dan siap dimainkan.",
      category: "server-setup",
      difficulty: "beginner",
      duration: "8 menit",
      views: 34560,
      likes: 2134,
      author: "Tim Raehost",
      publishedAt: "2024-12-03",
      tags: ["setup", "pemula", "server", "deployment"],
      icon: Gamepad2,
      featured: true,
      steps: [
        {
          id: 1,
          title: "Daftar Akun Raehost",
          content:
            "Kunjungi website Raehost dan buat akun baru. Verifikasi email Anda untuk mengaktifkan akun.",
          tip: "Gunakan email yang aktif karena notifikasi server akan dikirim ke email ini.",
        },
        {
          id: 2,
          title: "Pilih Paket Hosting",
          content:
            "Pilih paket yang sesuai dengan kebutuhan server Anda. Basic untuk server kecil, Premium untuk performa lebih baik.",
          code: "Basic: 1-20 pemain\nPremium: 20-50+ pemain",
        },
        {
          id: 3,
          title: "Konfigurasi Server",
          content:
            "Pilih game, versi, dan konfigurasi dasar server. Beri nama server yang mudah diingat.",
          tip: "Nama server tidak bisa diubah setelah dibuat, jadi pilih dengan hati-hati.",
        },
        {
          id: 4,
          title: "Pembayaran dan Deployment",
          content:
            "Lakukan pembayaran dan tunggu proses deployment otomatis. Server akan online dalam 1-2 menit.",
          tip: "Catat IP dan port server yang diberikan untuk dibagikan ke pemain.",
        },
      ],
    },
    {
      id: 5,
      title: "Optimasi Performa Server Minecraft",
      description:
        "Tips dan trik untuk meningkatkan performa server Minecraft agar lebih smooth dan mengurangi lag.",
      category: "optimization",
      difficulty: "advanced",
      duration: "20 menit",
      views: 12340,
      likes: 756,
      author: "Tim Raehost",
      publishedAt: "2024-11-20",
      tags: ["performance", "optimization", "lag", "server-tuning"],
      icon: Zap,
      featured: false,
      steps: [
        {
          id: 1,
          title: "Konfigurasi server.properties",
          content: "Optimasi pengaturan dasar server untuk performa terbaik.",
          code: "view-distance=8\nsimulation-distance=6\nmax-tick-time=60000",
        },
        {
          id: 2,
          title: "Optimasi Spigot/Paper Config",
          content:
            "Atur konfigurasi spigot.yml dan paper.yml untuk mengurangi beban server.",
          tip: "Paper server memberikan performa lebih baik dibanding Spigot untuk server besar.",
        },
        {
          id: 3,
          title: "Manajemen Plugin",
          content:
            "Audit plugin yang tidak perlu dan optimasi plugin yang resource-heavy.",
          warning: "Terlalu banyak plugin dapat menyebabkan lag signifikan.",
        },
      ],
    },
    {
      id: 6,
      title: "Setup Database MySQL untuk Plugin",
      description:
        "Cara mengatur koneksi database MySQL untuk plugin yang memerlukan database eksternal.",
      category: "server-setup",
      difficulty: "advanced",
      duration: "12 menit",
      views: 8930,
      likes: 445,
      author: "Tim Raehost",
      publishedAt: "2024-11-15",
      tags: ["mysql", "database", "plugin", "configuration"],
      icon: Database,
      featured: false,
      steps: [
        {
          id: 1,
          title: "Request Database MySQL",
          content:
            "Hubungi support Raehost untuk mendapatkan kredensial database MySQL.",
          tip: "Database MySQL tersedia untuk paket Premium ke atas.",
        },
        {
          id: 2,
          title: "Konfigurasi Plugin",
          content:
            "Edit file config plugin untuk menggunakan database MySQL instead of SQLite.",
          code: "host: your-db-host\nport: 3306\ndatabase: your-db-name\nusername: your-username\npassword: your-password",
        },
      ],
    },
  ];

  // Filter tutorials berdasarkan search dan category
  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || tutorial.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      tutorial.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Update category counts
  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count:
      cat.id === "all"
        ? tutorials.length
        : tutorials.filter((t) => t.category === cat.id).length,
  }));

  const featuredTutorials = tutorials.filter((t) => t.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "danger";
      default:
        return "default";
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }

    return views.toString();
  };
  const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <tutorial.icon className="text-primary-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                {tutorial.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Chip
                  color={getDifficultyColor(tutorial.difficulty)}
                  size="sm"
                  variant="flat"
                >
                  {tutorial.difficulty}
                </Chip>
                <Chip size="sm" variant="flat">
                  {tutorial.category.replace("-", " ")}
                </Chip>
                {tutorial.featured && (
                  <Chip
                    color="warning"
                    size="sm"
                    startContent={<IconStar size={12} />}
                    variant="flat"
                  >
                    Featured
                  </Chip>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="pt-0 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-default-600 text-sm line-clamp-3 mb-4">
            {tutorial.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-default-500 mb-4">
            <div className="flex items-center gap-1">
              <IconClock size={14} />
              <span>{tutorial.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconEye size={14} />
              <span>{formatViews(tutorial.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconHeart size={14} />
              <span>{tutorial.likes}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {tutorial.tags.slice(0, 3).map((tag, idx) => (
              <Chip key={idx} className="text-xs" size="sm" variant="light">
                #{tag}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <Button
            className="w-full"
            color="primary"
            endContent={<IconArrowRight size={16} />}
            variant="flat"
            onPress={() => setSelectedTutorial(tutorial)}
          >
            Lihat Tutorial
          </Button>
        </div>
      </CardBody>
    </Card>
  );

  const TutorialDetail = ({ tutorial }: { tutorial: Tutorial }) => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between pt-16">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-xl">
            <tutorial.icon className="text-primary-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
            <p className="text-lg text-default-600 mb-4">
              {tutorial.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Chip
                color={getDifficultyColor(tutorial.difficulty)}
                variant="flat"
              >
                {tutorial.difficulty}
              </Chip>
              <div className="flex items-center gap-1">
                <IconClock size={14} />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconUser size={14} />
                <span>{tutorial.author}</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          isIconOnly
          variant="light"
          onPress={() => setSelectedTutorial(null)}
        >
          <IconX size={20} />
        </Button>
      </div>

      {/* Steps */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Tutorial Steps</h2>
        </CardHeader>
        <CardBody>
          <Accordion variant="splitted">
            {tutorial.steps.map((step, index) => (
              <AccordionItem
                key={step.id}
                title={
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </div>
                }
              >
                <div className="space-y-4 pl-11">
                  <p className="text-default-600 leading-relaxed">
                    {step.content}
                  </p>

                  {step.code && (
                    <Card className="bg-default-100 dark:bg-default-900/20">
                      <CardBody className="p-4">
                        <pre className="text-sm text-default-700 whitespace-pre-wrap font-mono">
                          <code>{step.code}</code>
                        </pre>
                      </CardBody>
                    </Card>
                  )}

                  {step.warning && (
                    <Card className="border-danger-200 bg-danger-50 dark:bg-danger-900/10">
                      <CardBody className="p-4">
                        <div className="flex items-start gap-2">
                          <IconAlertTriangle
                            className="text-danger-600 mt-0.5 flex-shrink-0"
                            size={16}
                          />
                          <p className="text-sm text-danger-700 dark:text-danger-400">
                            {step.warning}
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                  )}

                  {step.tip && (
                    <Card className="border-success-200 bg-success-50 dark:bg-success-900/10">
                      <CardBody className="p-4">
                        <div className="flex items-start gap-2">
                          <Zap
                            className="text-success-600 mt-0.5 flex-shrink-0"
                            size={16}
                          />
                          <p className="text-sm text-success-700 dark:text-success-400">
                            {step.tip}
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </div>
  );

  if (selectedTutorial) {
    return (
      <>
        <div className="">
          <div className="container mx-auto px-6 py-8">
            <TutorialDetail tutorial={selectedTutorial} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-10">
          <div className="absolute inset-0">
            <Image
              fill
              priority
              alt="Tutorial Background"
              className="object-cover"
              quality={85}
              src="/assets/landing/landing2.png"
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
                  <BookOpen className="text-white" size={48} />
                </div>
              </div>

              <BlurText
                animateBy="words"
                className="text-4xl md:text-6xl font-bold mb-6"
                delay={200}
                direction="top"
                text="Tutorial & Panduan"
              />

              <TextGenerateEffect
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
                duration={0.8}
                words="Pelajari cara memaksimalkan server game Anda dengan tutorial step-by-step dari para ahli Raehost"
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-2xl font-bold mb-1">
                    {tutorials.length}
                  </div>
                  <div className="text-sm text-white/80">Total Tutorials</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-2xl font-bold mb-1">
                    {featuredTutorials.length}
                  </div>
                  <div className="text-sm text-white/80">Featured</div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-2xl font-bold mb-1">
                    {Math.round(
                      tutorials.reduce((acc, t) => acc + t.views, 0) / 1000,
                    )}
                    K
                  </div>
                  <div className="text-sm text-white/80">Total Views</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="container mx-auto px-6 py-8">
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    endContent={
                      searchQuery && (
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => setSearchQuery("")}
                        >
                          <IconX size={14} />
                        </Button>
                      )
                    }
                    placeholder="Cari tutorial, tips, atau panduan..."
                    size="lg"
                    startContent={
                      <IconSearch className="text-default-400" size={18} />
                    }
                    value={searchQuery}
                    variant="bordered"
                    onValueChange={setSearchQuery}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="px-4 py-2 rounded-lg border border-default-300 bg-white dark:bg-default-100"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categoriesWithCount.map((category) => (
                  <Button
                    key={category.id}
                    color={
                      selectedCategory === category.id
                        ? category.color
                        : "default"
                    }
                    size="sm"
                    startContent={<category.icon size={16} />}
                    variant={
                      selectedCategory === category.id ? "flat" : "light"
                    }
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Featured Tutorials */}
          {selectedCategory === "all" && !searchQuery && (
            <AnimatedContent delay={200} direction="vertical" distance={30}>
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <IconStar className="text-warning" size={24} />
                  Featured Tutorials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))}
                </div>
              </div>
            </AnimatedContent>
          )}

          {/* All Tutorials */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "all"
                    ? "All Tutorials"
                    : categoriesWithCount.find((c) => c.id === selectedCategory)
                        ?.name}
                </h2>
                <div className="text-sm text-default-500">
                  {filteredTutorials.length} tutorial
                  {filteredTutorials.length !== 1 ? "s" : ""} found
                </div>
              </div>

              {filteredTutorials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardBody>
                    <div className="mb-4">
                      <IconSearch
                        className="text-default-400 mx-auto"
                        size={48}
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No Tutorials Found
                    </h3>
                    <p className="text-default-600 mb-6">
                      Tidak ditemukan tutorial yang sesuai dengan pencarian
                      Anda.
                    </p>
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSelectedDifficulty("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardBody>
                </Card>
              )}
            </div>
          </AnimatedContent>

          {/* Popular Topics */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: "Server Setup", icon: Settings, count: 6 },
                  { name: "ModPack", icon: Sparkles, count: 1 },
                  { name: "SFTP", icon: Upload, count: 1 },
                  { name: "Security", icon: Shield, count: 0 },
                  { name: "Optimization", icon: Zap, count: 1 },
                  { name: "Database", icon: Database, count: 1 },
                ].map((topic, index) => (
                  <Card
                    key={topic.name}
                    className="hover:shadow-md transition-all duration-300  group"
                    isPressable
                    // onPress={() => {
                    //   setSearchQuery(topic.name.toLowerCase());
                    //   setSelectedCategory("all");
                    // }}
                  >
                    <CardBody className="p-4 text-center">
                      <topic.icon
                        className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform"
                        size={32}
                      />
                      <h4 className="font-medium text-sm mb-1">{topic.name}</h4>
                      <p className="text-xs text-default-500">
                        {topic.count} tutorials
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Help Section */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="mt-16">
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50  border-primary-200">
                <CardBody className="p-8 text-center">
                  <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                      <HandCoins
                        className="text-primary mx-auto mb-4"
                        size={48}
                      />
                      <h2 className="text-2xl font-bold mb-4">
                        Butuh Tutorial Khusus?
                      </h2>
                      <p className="text-lg text-default-600 mb-6">
                        Tidak menemukan tutorial yang Anda cari? Tim ahli kami
                        siap membantu membuat panduan khusus untuk kebutuhan
                        server Anda.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        as={Link}
                        color="primary"
                        href="/contact"
                        size="lg"
                        startContent={<IconPlayerPlay size={20} />}
                        variant="shadow"
                      >
                        Request Tutorial
                      </Button>
                      <Button
                        isExternal
                        as={Link}
                        href="https://youtube.com/@raehost"
                        size="lg"
                        startContent={<Video size={20} />}
                        variant="bordered"
                      >
                        YouTube Channel
                      </Button>
                    </div>

                    <div className="flex justify-center gap-8 mt-6 text-sm text-default-500">
                      <div className="flex items-center gap-1">
                        <IconBookmark className="text-success" size={16} />
                        <span>Save tutorials</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconShare className="text-success" size={16} />
                        <span>Share with team</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconDownload className="text-success" size={16} />
                        <span>Offline access</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </AnimatedContent>

          {/* Latest Updates */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
              <div className="space-y-4">
                {tutorials
                  .sort(
                    (a, b) =>
                      new Date(b.publishedAt).getTime() -
                      new Date(a.publishedAt).getTime(),
                  )
                  .slice(0, 3)
                  .map((tutorial) => (
                    <Card
                      key={tutorial.id}
                      className="hover:shadow-md transition-all duration-300"
                    >
                      <CardBody className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary-100  rounded-lg">
                            <tutorial.icon
                              className="text-primary-600"
                              size={20}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold line-clamp-1">
                              {tutorial.title}
                            </h4>
                            <p className="text-sm text-default-600 line-clamp-1">
                              {tutorial.description}
                            </p>
                          </div>
                          <div className="text-sm text-default-500">
                            {new Date(tutorial.publishedAt).toLocaleDateString(
                              "id-ID",
                            )}
                          </div>
                          <Button
                            endContent={<IconArrowRight size={14} />}
                            size="sm"
                            variant="light"
                            onPress={() => setSelectedTutorial(tutorial)}
                          >
                            Read
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </>
  );
}
