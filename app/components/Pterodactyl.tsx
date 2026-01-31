"use client";
import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import {
  IconRocket,
  IconPuzzle,
  IconDownload,
  IconSettings,
  IconEye,
  IconShield,
  IconCpu,
  IconCloud,
  IconTerminal,
  IconFiles,
  IconChartBar,
  IconPlug,
} from "@tabler/icons-react";
import Image from "next/image";

import AnimatedContent from "@/components/AnimatedContent";
import CardSwap, { Card as SwapCard } from "@/components/CardSwap";

const features = [
  {
    title: "Easy to Use",
    description:
      "Interface yang intuitif dan mudah dipahami, bahkan untuk pemula sekalipun.",
    icon: <IconEye size={24} />,
    color: "bg-blue-500/20 text-blue-500",
    delay: 0,
  },
  {
    title: "Egg Changer",
    description:
      "Ganti game server dengan mudah menggunakan sistem egg yang fleksibel.",
    icon: <IconPuzzle size={24} />,
    color: "bg-green-500/20 text-green-500",
    delay: 200,
  },
  {
    title: "Plugin & Mod Manager",
    description:
      "Install dan kelola plugin/mod dengan sekali klik tanpa ribet.",
    icon: <IconDownload size={24} />,
    color: "bg-purple-500/20 text-purple-500",
    delay: 400,
  },
  {
    title: "Instant Deployment",
    description:
      "Deploy server dalam hitungan detik dengan sistem otomatis yang canggih.",
    icon: <IconRocket size={24} />,
    color: "bg-orange-500/20 text-orange-500",
    delay: 600,
  },
  {
    title: "Beautiful UI",
    description:
      "Interface modern dan responsive yang nyaman untuk digunakan setiap hari.",
    icon: <IconSettings size={24} />,
    color: "bg-pink-500/20 text-pink-500",
    delay: 800,
  },
  {
    title: "Advanced Security",
    description:
      "Sistem keamanan berlapis dengan enkripsi dan monitoring real-time.",
    icon: <IconShield size={24} />,
    color: "bg-red-500/20 text-red-500",
    delay: 1000,
  },
];

const cardData = [
  {
    title: "Dashboard Overview",
    icon: <IconChartBar size={20} />,
    image: "/assets/pterodactyl/dashboardsplit.png",
  },
  {
    title: "Console Access",
    icon: <IconTerminal size={20} />,
    image: "/assets/pterodactyl/console.png",
  },
  {
    title: "File Manager",
    icon: <IconFiles size={20} />,
    image: "/assets/pterodactyl/file.png",
  },
  {
    title: "Plugin Manager",
    icon: <IconPlug size={20} />,
    image: "/assets/pterodactyl/plugins.png",
  },
  {
    title: "File Manager",
    icon: <IconSettings size={20} />,
    image: "/assets/pterodactyl/file.png",
  },
];

const Pterodactyl = () => {
  return (
    <section className="py-20   transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-4 lg:mb-16">
          <AnimatedContent
            config={{ tension: 100, friction: 15 }}
            distance={50}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <IconCloud className="text-primary" size={32} />
              </div>
              <Chip color="primary" size="lg" variant="flat">
                Powered by Pterodactyl Panel
              </Chip>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Panel Management
              <span className="text-primary"> Terdepan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kelola server game kamu dengan mudah menggunakan Pterodactyl Panel
              yang powerful dan user-friendly
            </p>
          </AnimatedContent>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Side - Features */}
          <div className="order-2 lg:order-1">
            <AnimatedContent
              config={{ tension: 100, friction: 15 }}
              delay={200}
              distance={50}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3">
                  Apa keunggulan panel kami?
                </h3>
                <p className="text-muted-foreground">
                  Panel kami dirancang untuk memudahkan manajemen server game
                  kamu dengan berbagai fitur canggih dan intuitif.
                </p>
              </div>
            </AnimatedContent>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <AnimatedContent
                  key={feature.title}
                  config={{ tension: 100, friction: 15 }}
                  delay={feature.delay}
                  distance={30}
                >
                  <Card className="h-full border border-default bg-background   transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <CardBody className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${feature.color} flex-shrink-0`}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </AnimatedContent>
              ))}
            </div>

            {/* Stats */}
            <AnimatedContent
              config={{ tension: 100, friction: 15 }}
              delay={1200}
              distance={30}
            >
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 backdrop-blur-sm rounded-lg border border-default">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <IconCpu className="text-primary" size={16} />
                    <span className="text-sm lg:text-xl font-bold">99.9%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center p-4 backdrop-blur-sm rounded-lg border border-default">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <IconRocket className="text-primary" size={16} />
                    <span className="text-sm lg:text-xl font-bold">&lt;5s</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Deploy Time</p>
                </div>
                <div className="text-center p-4 backdrop-blur-sm rounded-lg border border-default">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <IconShield className="text-primary" size={16} />
                    <span className="text-sm lg:text-xl font-bold">DDOS</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Protection</p>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Right Side - CardSwap */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end ">
            <AnimatedContent
              config={{ tension: 100, friction: 15 }}
              delay={400}
              distance={50}
            >
              {/* CardSwap Container */}
              <div
                className="relative  -top-40 lg:top-0"
                style={{ height: "400px", width: "100%" }}
              >
                <CardSwap
                  cardDistance={50}
                  delay={5000}
                  height={350}
                  pauseOnHover={false}
                  verticalDistance={50}
                  width={600}
                >
                  {cardData.map((card, index) => (
                    <SwapCard
                      key={index}
                      className="overflow-hidden shadow-2xl border-2 bg-white dark:bg-black transition-colors"
                    >
                      {/* Card Header */}
                      <div className="border-b border-border/30 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm p-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-primary/20 rounded-md text-primary">
                            {card.icon}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {card.title}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-2 ">
                        <div className="relative mb-3 rounded-lg overflow-hidden">
                          <Image
                            unoptimized
                            alt={card.title}
                            className="w-full object-cover rounded-md"
                            height={250}
                            src={card.image}
                            width={300}
                          />
                        </div>
                      </div>
                    </SwapCard>
                  ))}
                </CardSwap>
              </div>
            </AnimatedContent>
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimatedContent
          config={{ tension: 100, friction: 15 }}
          delay={1400}
          distance={30}
        >
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              <IconRocket size={16} />
              Siap memulai adventure gaming mu?
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Deploy Server Impianmu Sekarang
            </h3>
            <p className="text-muted-foreground mb-6">
              Dengan Pterodactyl Panel yang powerful, kelola server game jadi
              semudah mengklik tombol
            </p>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default Pterodactyl;
