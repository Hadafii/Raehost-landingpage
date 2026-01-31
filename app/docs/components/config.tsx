"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Chip,
  Link,
  Alert,
  Accordion,
  AccordionItem,
  Code,
  Snippet,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  IconSettings,
  IconArrowLeft,
  IconCpu,
  IconDatabase,
  IconShield,
  IconRocket,
  IconCode,
  IconDeviceDesktop,
  IconDownload,
  IconNetwork,
  IconUsers,
  IconAlertCircle,
  IconCheck,
  IconInfoSquareRounded,
  IconAlertTriangle,
  IconTool,
  IconChartBar,
  IconHeadphones,
  IconBrandDiscord,
  IconClock,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import Image from "next/image";

import Footer from "../../components/Footer";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import SpotlightCard from "@/components/SpotlightCard";
import Navbar from "@/components/navbar";

interface ConfigSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

interface ConfigExample {
  title: string;
  description: string;
  code: string;
  type: "properties" | "yaml" | "json" | "command";
  warning?: string;
}

export default function ConfigurationPage(): JSX.Element {
  const [selectedGame, setSelectedGame] = useState("minecraft");
  const [selectedSection, setSelectedSection] = useState("performance");

  const gameOptions = [
    { key: "minecraft", label: "Minecraft (Java)" },
    { key: "minecraft-bedrock", label: "Minecraft Bedrock" },
    { key: "fivem", label: "FiveM (GTA V)" },
    { key: "csgo", label: "CS:GO" },
    { key: "rust", label: "Rust" },
    { key: "gmod", label: "Garry's Mod" },
    { key: "custom", label: "Custom Server" },
  ];

  const configSections: ConfigSection[] = [
    {
      id: "performance",
      title: "Performance Optimization",
      description: "Optimasi CPU, RAM, dan I/O untuk performa maksimal",
      icon: IconRocket,
      color: "primary",
      difficulty: "intermediate",
      estimatedTime: "10-15 menit",
    },
    {
      id: "security",
      title: "Server Security",
      description: "Konfigurasi keamanan dan proteksi dari griefing",
      icon: IconShield,
      color: "danger",
      difficulty: "intermediate",
      estimatedTime: "5-10 menit",
    },
    {
      id: "network",
      title: "Network Configuration",
      description: "Setup port, whitelist, dan network optimization",
      icon: IconNetwork,
      color: "secondary",
      difficulty: "beginner",
      estimatedTime: "3-5 menit",
    },
    {
      id: "plugins",
      title: "Plugins & Mods",
      description: "Install dan konfigurasi plugin/mod populer",
      icon: IconDownload,
      color: "success",
      difficulty: "intermediate",
      estimatedTime: "15-30 menit",
    },
    {
      id: "monitoring",
      title: "Monitoring & Logging",
      description: "Setup monitoring performa dan log management",
      icon: IconChartBar,
      color: "warning",
      difficulty: "advanced",
      estimatedTime: "10-20 menit",
    },
    {
      id: "backup",
      title: "Backup & Recovery",
      description: "Automatic backup dan disaster recovery planning",
      icon: IconDatabase,
      color: "secondary",
      difficulty: "beginner",
      estimatedTime: "5-10 menit",
    },
  ];

  const performanceExamples: ConfigExample[] = [
    {
      title: "server.properties - Basic Performance",
      description: "Konfigurasi dasar untuk optimasi performa Minecraft server",
      type: "properties",
      code: `# Basic Performance Settings
view-distance=8
simulation-distance=6
max-players=20
spawn-protection=16

# Network Optimization
network-compression-threshold=256
player-idle-timeout=30

# World Generation
max-world-size=29999984
spawn-monsters=true
spawn-animals=true
spawn-npcs=true

# Performance Features
use-native-transport=true
sync-chunk-writes=true`,
      warning: "Jangan set view-distance terlalu tinggi jika RAM terbatas",
    },
    {
      title: "JVM Arguments - Memory Optimization",
      description:
        "Startup arguments untuk optimasi garbage collection dan memory",
      type: "command",
      code: `# For 4GB RAM Server
-Xms2G -Xmx4G
-XX:+UseG1GC
-XX:+UnlockExperimentalVMOptions
-XX:MaxGCPauseMillis=100
-XX:+DisableExplicitGC
-XX:TargetSurvivorRatio=90
-XX:G1NewSizePercent=50
-XX:G1MaxNewSizePercent=80
-XX:G1MixedGCLiveThresholdPercent=35
-XX:+AlwaysPreTouch
-XX:+ParallelRefProcEnabled`,
      warning: "Sesuaikan Xms dan Xmx dengan RAM server Anda",
    },
    {
      title: "Spigot.yml - Advanced Performance",
      description: "Konfigurasi advanced untuk server Spigot/Paper",
      type: "yaml",
      code: `settings:
  timeout-time: 60
  restart-on-crash: true
  bungeecord: false

world-settings:
  default:
    # Mob spawning optimization
    mob-spawn-range: 6
    animal-spawn-limit: 10
    monster-spawn-limit: 50
    water-animal-spawn-limit: 3
    ambient-spawn-limit: 15
    
    # Tick optimization
    entity-activation-range:
      animals: 16
      monsters: 24
      raiders: 32
      misc: 8
      water: 8
      villagers: 16
      flying-monsters: 24
    
    # Growth rates (ticks)
    growth:
      cactus-modifier: 100
      cane-modifier: 100
      melon-modifier: 100
      mushroom-modifier: 100
      pumpkin-modifier: 100
      sapling-modifier: 100
      beetroot-modifier: 100
      carrot-modifier: 100
      potato-modifier: 100
      wheat-modifier: 100`,
      warning: "Backup konfigurasi sebelum mengubah settings advanced",
    },
  ];

  const securityExamples: ConfigExample[] = [
    {
      title: "server.properties - Security Settings",
      description: "Konfigurasi keamanan dasar untuk melindungi server",
      type: "properties",
      code: `# Authentication & Security
online-mode=true
enforce-whitelist=false
white-list=false

# Server Protection
spawn-protection=16
max-players=50
player-idle-timeout=30

# Command & Function Security
enable-command-block=false
function-permission-level=2
op-permission-level=4

# Network Security
prevent-proxy-connections=false
server-ip=
enable-query=false
enable-rcon=false

# Rate Limiting
rate-limit=0`,
      warning: "Set online-mode=false hanya jika menggunakan BungeeCord",
    },
    {
      title: "Anti-Grief Plugin Configuration",
      description: "Contoh konfigurasi plugin WorldGuard untuk proteksi",
      type: "yaml",
      code: `regions:
  spawn:
    priority: 100
    flags:
      pvp: deny
      build: deny
      interact: deny
      damage-animals: deny
      chest-access: deny
      use: deny
      
  server-shop:
    priority: 50
    flags:
      build: deny
      pvp: deny
      interact: allow
      chest-access: allow

global-flags:
  fire-spread: deny
  lava-fire: deny
  lightning: deny
  tnt: deny
  creeper-explosion: deny
  enderdragon-block-damage: deny
  ghast-fireball: deny`,
      warning: "Test konfigurasi di server testing sebelum apply ke production",
    },
  ];

  const networkExamples: ConfigExample[] = [
    {
      title: "server.properties - Network Settings",
      description: "Konfigurasi network dasar dan optimization",
      type: "properties",
      code: `# Server Network Configuration
server-port=25565
server-ip=

# Query & RCON
enable-query=true
query.port=25565
enable-rcon=false
rcon.port=25575
rcon.password=

# Connection Settings
max-players=50
player-idle-timeout=30
network-compression-threshold=256

# Motd & Server Info
motd=\\u00A76Welcome to Raehost Server!
server-name=Raehost-Server-1`,
      warning: "Jangan share RCON password dan aktifkan hanya jika diperlukan",
    },
    {
      title: "Whitelist Configuration",
      description: "Setup whitelist untuk membatasi akses server",
      type: "json",
      code: `[
  {
    "uuid": "069a79f4-44e9-4726-a5be-fca90e38aaf5",
    "name": "PlayerName1"
  },
  {
    "uuid": "61699b2e-d327-4a01-9f1e-0ea8c3f06bc6", 
    "name": "PlayerName2"
  },
  {
    "uuid": "853c80ef-3c37-49fd-aa49-938b674adae6",
    "name": "AdminPlayer"
  }
]`,
      warning: "Gunakan UUID yang valid, bisa didapat dari minecraft.tools",
    },
  ];

  const getExamplesBySection = (section: string): ConfigExample[] => {
    switch (section) {
      case "performance":
        return performanceExamples;
      case "security":
        return securityExamples;
      case "network":
        return networkExamples;
      default:
        return performanceExamples;
    }
  };

  const currentSection = configSections.find((s) => s.id === selectedSection);
  const currentExamples = getExamplesBySection(selectedSection);

  return (
    <>
      <Navbar />
      <div className="min-h-dvh">
        {/* Hero Section */}
        <div className="relative overflow-hidden text-white">
          <div className="absolute inset-0">
            <Image
              fill
              priority
              alt="Configuration Background"
              className="object-cover"
              quality={85}
              src="/assets/landing/landing.png"
            />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
          </div>

          <div className="relative container mx-auto px-6 py-16">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                  <Settings className="text-white" size={48} />
                </div>
              </div>
              <BlurText
                animateBy="words"
                className="text-4xl md:text-5xl font-bold mb-4"
                delay={100}
                direction="top"
                text="Server Configuration Guide"
              />
              <TextGenerateEffect
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-6"
                duration={0.8}
                words="Panduan lengkap untuk mengoptimalkan dan mengkonfigurasi server game Anda agar mencapai performa maksimal"
              />
              <div className="flex justify-center gap-4">
                <Chip
                  className="text-white bg-white/20"
                  color="warning"
                  startContent={<IconTool size={16} />}
                  variant="flat"
                >
                  Advanced Configuration
                </Chip>
                <Chip
                  className="text-white bg-white/20"
                  color="success"
                  startContent={<IconRocket size={16} />}
                  variant="flat"
                >
                  Performance Focused
                </Chip>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <div className="container mx-auto px-6 py-4">
          <Button
            as={Link}
            className="text-default-600 hover:text-primary"
            href="/faq"
            startContent={<IconArrowLeft size={18} />}
            variant="light"
          >
            Kembali ke FAQ
          </Button>
        </div>

        {/* Game Selection */}
        <AnimatedContent delay={200} direction="vertical" distance={30}>
          <div className="container mx-auto px-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Select Game Type</h3>
                  <Chip color="primary" variant="flat">
                    Configuration untuk{" "}
                    {gameOptions.find((g) => g.key === selectedGame)?.label}
                  </Chip>
                </div>
                <Select
                  className="max-w-md"
                  label="Pilih jenis game server"
                  placeholder="Select a game"
                  selectedKeys={[selectedGame]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    setSelectedGame(selectedKey);
                  }}
                >
                  {gameOptions.map((game) => (
                    <SelectItem key={game.key}>{game.label}</SelectItem>
                  ))}
                </Select>
              </CardBody>
            </Card>
          </div>
        </AnimatedContent>

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Configuration Sections */}
              <AnimatedContent delay={200} direction="horizontal" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm sticky top-6">
                  <CardHeader>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <IconSettings size={20} />
                      Configuration Topics
                    </h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="p-0">
                    <nav className="space-y-1">
                      {configSections.map((section) => (
                        <Button
                          key={section.id}
                          className="w-full justify-start h-auto p-3"
                          color={
                            selectedSection === section.id
                              ? section.color
                              : "default"
                          }
                          endContent={
                            <div className="flex flex-col items-end gap-1">
                              <Chip
                                color={
                                  section.difficulty === "beginner"
                                    ? "success"
                                    : section.difficulty === "intermediate"
                                      ? "warning"
                                      : "danger"
                                }
                                size="sm"
                                variant="flat"
                              >
                                {section.difficulty}
                              </Chip>
                            </div>
                          }
                          startContent={<section.icon size={16} />}
                          variant={
                            selectedSection === section.id ? "flat" : "light"
                          }
                          onPress={() => setSelectedSection(section.id)}
                        >
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">
                              {section.title}
                            </div>
                            <div className="text-xs text-default-500 line-clamp-2">
                              {section.description}
                            </div>
                            <div className="text-xs text-default-400 mt-1">
                              {section.estimatedTime}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </nav>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Quick Tips */}
              <AnimatedContent delay={300} direction="horizontal" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-warning-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-warning-100 dark:bg-warning-900/20 rounded-lg">
                        <IconAlertTriangle
                          className="text-warning-600"
                          size={20}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">⚠️ Penting!</h3>
                        <p className="text-sm text-default-600">
                          Sebelum konfigurasi
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Alert
                      color="warning"
                      description="Selalu backup konfigurasi sebelum melakukan perubahan besar. Gunakan fitur backup di dashboard Raehost."
                      title="Backup First!"
                      variant="flat"
                    />
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <IconCheck className="text-success-600" size={14} />
                        <span>Backup konfigurasi existing</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <IconCheck className="text-success-600" size={14} />
                        <span>Test di server development dulu</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <IconCheck className="text-success-600" size={14} />
                        <span>Monitor performa setelah perubahan</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Help Section */}
              <AnimatedContent delay={400} direction="horizontal" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                        <IconHeadphones
                          className="text-primary-600"
                          size={20}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Butuh Bantuan?
                        </h3>
                        <p className="text-sm text-default-600">
                          Expert support available
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-3">
                    <Button
                      isExternal
                      as={Link}
                      className="w-full"
                      color="primary"
                      href="https://discord.gg/c8zC5Qfkvh"
                      startContent={<IconBrandDiscord size={18} />}
                      variant="flat"
                    >
                      Discord Community
                    </Button>
                    <Button
                      as={Link}
                      className="w-full"
                      href="/contact"
                      startContent={<IconHeadphones size={18} />}
                      variant="bordered"
                    >
                      Premium Support
                    </Button>
                  </CardBody>
                </Card>
              </AnimatedContent>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Current Section Header */}
              <AnimatedContent delay={300} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 bg-${currentSection?.color}-100 dark:bg-${currentSection?.color}-900/20 rounded-lg`}
                      >
                        {currentSection && (
                          <currentSection.icon
                            className={`text-${currentSection.color}-600`}
                            size={24}
                          />
                        )}
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold">
                          {currentSection?.title}
                        </h1>
                        <p className="text-default-600">
                          {currentSection?.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Chip
                            color={
                              currentSection?.difficulty === "beginner"
                                ? "success"
                                : currentSection?.difficulty === "intermediate"
                                  ? "warning"
                                  : "danger"
                            }
                            size="sm"
                            variant="flat"
                          >
                            {currentSection?.difficulty}
                          </Chip>
                          <Chip
                            size="sm"
                            startContent={<IconClock size={14} />}
                            variant="flat"
                          >
                            {currentSection?.estimatedTime}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </AnimatedContent>

              {/* Configuration Examples */}
              <AnimatedContent delay={400} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <IconCode size={20} />
                      Configuration Examples
                    </h2>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="space-y-6">
                      {currentExamples.map((example, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                              {example.title}
                            </h3>
                            <Chip color="secondary" size="sm" variant="flat">
                              {example.type}
                            </Chip>
                          </div>
                          <p className="text-sm text-default-600">
                            {example.description}
                          </p>

                          {example.warning && (
                            <Alert
                              color="warning"
                              description={example.warning}
                              title="⚠️ Peringatan"
                              variant="flat"
                            />
                          )}

                          <Snippet
                            hideSymbol
                            className="w-full"
                            tooltipProps={{
                              content: "Copy configuration",
                              color: "primary",
                            }}
                            variant="bordered"
                          >
                            <Code className="whitespace-pre-wrap text-xs">
                              {example.code}
                            </Code>
                          </Snippet>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Performance Monitoring */}
              {selectedSection === "performance" && (
                <AnimatedContent delay={500} direction="vertical" distance={30}>
                  <Card className="bg-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <IconChartBar size={20} />
                        Performance Monitoring
                      </h2>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SpotlightCard>
                          <div className="text-center p-4">
                            <IconCpu
                              className="text-primary-600 mx-auto mb-2"
                              size={32}
                            />
                            <h3 className="font-semibold mb-1">CPU Usage</h3>
                            <p className="text-2xl font-bold text-primary-600 mb-1">
                              45%
                            </p>
                            <p className="text-xs text-default-600">{`Target: 60%`}</p>
                          </div>
                        </SpotlightCard>

                        <SpotlightCard>
                          <div className="text-center p-4">
                            <IconDatabase
                              className="text-success-600 mx-auto mb-2"
                              size={32}
                            />
                            <h3 className="font-semibold mb-1">RAM Usage</h3>
                            <p className="text-2xl font-bold text-success-600 mb-1">
                              2.8GB
                            </p>
                            <p className="text-xs text-default-600">
                              of 4GB allocated
                            </p>
                          </div>
                        </SpotlightCard>

                        <SpotlightCard>
                          <div className="text-center p-4">
                            <IconUsers
                              className="text-warning-600 mx-auto mb-2"
                              size={32}
                            />
                            <h3 className="font-semibold mb-1">Players</h3>
                            <p className="text-2xl font-bold text-warning-600 mb-1">
                              12/50
                            </p>
                            <p className="text-xs text-default-600">
                              Active connections
                            </p>
                          </div>
                        </SpotlightCard>
                      </div>

                      <Alert
                        className="mt-4"
                        color="primary"
                        description="Monitor server performance 24/7 melalui dashboard Raehost. Set up alerts untuk notifikasi otomatis jika usage melebihi threshold."
                        title="💡 Pro Tip"
                        variant="flat"
                      />
                    </CardBody>
                  </Card>
                </AnimatedContent>
              )}

              {/* Common Issues FAQ */}
              <AnimatedContent delay={600} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <IconInfoSquareRounded size={20} />
                      Common Issues & Solutions
                    </h2>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Accordion variant="splitted">
                      <AccordionItem
                        key="lag"
                        aria-label="Server Lag"
                        startContent={
                          <IconAlertCircle
                            className="text-warning-600"
                            size={18}
                          />
                        }
                        title="Server mengalami lag setelah konfigurasi"
                      >
                        <div className="space-y-3">
                          <p className="text-sm text-default-600">
                            Lag setelah konfigurasi biasanya disebabkan oleh:
                          </p>
                          <ul className="text-sm text-default-600 space-y-1 ml-4">
                            <li>
                              • View distance terlalu tinggi untuk RAM yang
                              tersedia
                            </li>
                            <li>• Terlalu banyak plugin/mod yang berat</li>
                            <li>
                              • JVM arguments tidak sesuai dengan hardware
                            </li>
                            <li>• Entity/mob spawning tidak terkontrol</li>
                          </ul>
                          <Alert
                            color="primary"
                            description="Coba turunkan view-distance ke 6-8, restart server, dan monitor performa melalui dashboard."
                            title="Quick Fix"
                            variant="flat"
                          />
                        </div>
                      </AccordionItem>

                      <AccordionItem
                        key="connection"
                        aria-label="Connection Issues"
                        startContent={
                          <IconNetwork className="text-danger-600" size={18} />
                        }
                        title="Player tidak bisa connect setelah network config"
                      >
                        <div className="space-y-3">
                          <p className="text-sm text-default-600">
                            Masalah koneksi setelah konfigurasi network:
                          </p>
                          <ul className="text-sm text-default-600 space-y-1 ml-4">
                            <li>
                              • Port tidak sesuai dengan yang dikonfigurasi
                            </li>
                            <li>• Firewall memblokir port baru</li>
                            <li>• Server IP configuration salah</li>
                            <li>
                              • Whitelist aktif tapi player tidak terdaftar
                            </li>
                          </ul>
                          <Alert
                            color="warning"
                            description="Check server console untuk error messages, verifikasi port di dashboard, dan test koneksi dengan IP:Port yang benar."
                            title="Solution"
                            variant="flat"
                          />
                        </div>
                      </AccordionItem>

                      <AccordionItem
                        key="plugins"
                        aria-label="Plugin Conflicts"
                        startContent={
                          <IconDownload
                            className="text-secondary-600"
                            size={18}
                          />
                        }
                        title="Plugin conflict setelah install multiple plugins"
                      >
                        <div className="space-y-3">
                          <p className="text-sm text-default-600">
                            Plugin conflicts bisa menyebabkan server crash atau
                            error:
                          </p>
                          <ul className="text-sm text-default-600 space-y-1 ml-4">
                            <li>• Dua plugin menggunakan command yang sama</li>
                            <li>• Plugin dependencies tidak terpenuhi</li>
                            <li>• Version compatibility issues</li>
                            <li>
                              • Resource conflicts (database, files, etc.)
                            </li>
                          </ul>
                          <Alert
                            color="danger"
                            description="Disable plugin satu per satu untuk identify conflict source. Check plugin documentation untuk compatibility requirements."
                            title="Troubleshooting"
                            variant="flat"
                          />
                        </div>
                      </AccordionItem>
                    </Accordion>
                  </CardBody>
                </Card>
              </AnimatedContent>

              {/* Next Steps */}
              <AnimatedContent delay={700} direction="vertical" distance={30}>
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-success-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-success-100 dark:bg-success-900/20 rounded-lg">
                        <IconRocket className="text-success-600" size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">
                          Ready to Go Further?
                        </h2>
                        <p className="text-sm text-default-600">
                          Advanced topics dan optimizations
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SpotlightCard>
                        <div className="text-center p-4">
                          <IconDeviceDesktop
                            className="text-primary-600 mx-auto mb-2"
                            size={32}
                          />
                          <h3 className="font-semibold mb-2">
                            Advanced Monitoring
                          </h3>
                          <p className="text-sm text-default-600 mb-3">
                            Setup Grafana dashboards dan custom metrics
                          </p>
                          <Button
                            as={Link}
                            color="primary"
                            href="/docs/monitoring"
                            size="sm"
                            variant="flat"
                          >
                            Learn More
                          </Button>
                        </div>
                      </SpotlightCard>

                      <SpotlightCard>
                        <div className="text-center p-4">
                          <IconShield
                            className="text-danger-600 mx-auto mb-2"
                            size={32}
                          />
                          <h3 className="font-semibold mb-2">
                            Security Hardening
                          </h3>
                          <p className="text-sm text-default-600 mb-3">
                            Advanced security configurations dan best practices
                          </p>
                          <Button
                            as={Link}
                            color="danger"
                            href="/docs/security"
                            size="sm"
                            variant="flat"
                          >
                            Read Guide
                          </Button>
                        </div>
                      </SpotlightCard>
                    </div>
                  </CardBody>
                </Card>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
