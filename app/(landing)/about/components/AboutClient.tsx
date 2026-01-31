"use client";

import React from "react";
import { Card, CardBody, Button, Chip, Avatar, Link } from "@heroui/react";
import {
  IconRocket,
  IconUsers,
  IconHeart,
  IconTarget,
  IconBulb,
  IconShield,
  IconArrowLeft,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconServer,
  IconClock,
  IconAward,
  IconStar,
  IconHelp,
} from "@tabler/icons-react";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import SpotlightCard from "@/components/SpotlightCard";
import { Spotlight } from "@/components/ui/spotlight-new";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
}

interface Value {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function AboutPage(): JSX.Element {
  const teamMembers: TeamMember[] = [
    {
      name: "Dafi Utomo",
      role: "Founder, CEO & Lead Developer",
      avatar: "https://www.dafiutomo.com/DAFIUTOMO.jpg",
      bio: "Computer Science student at Telkom University with a strong passion for software development, system security, and web development.",
      skills: [
        "Fullstack Developer",
        "System Security",
        "Web Development",
        "Cloud Computing",
      ],
      socials: {
        github: "https://github.com/Hadafii",
        linkedin: "https://linkedin.com/in/dafiutomo",
        instagram: "https://isntagram.com/hadafii_",
      },
    },
    {
      name: "Rizqy Aulia",
      role: "Admin & Support Lead",
      avatar: "",
      bio: "",
      skills: [],
      socials: {
        github: "",
        linkedin: "",
        instagram: "",
      },
    },
    {
      name: "Raisa",
      role: "Community Manager",
      avatar: "/assets/people/raisa.jpg",
      bio: "Computer Science student at Telkom University with a passion for community building and designer.",
      skills: [
        "Designer",
        "web development",
        "Community Management",
        "Social Media",
      ],
      socials: {
        github: "",
        linkedin: "",
        instagram: "https://instagram.com/raisa.lh",
      },
    },
    {
      name: "Next Team Member 4",
      role: "  ",
      avatar: "",
      bio: "",
      skills: [],
      socials: {
        github: "",
        linkedin: "",
        instagram: "",
      },
    },
  ];

  const milestones: Milestone[] = [
    {
      year: "Jan 2025",
      title: "Founding Raehost",
      description:
        "Dimulai dari passion gaming dan frustasi dengan hosting yang lambat",
      icon: IconRocket,
      color: "primary",
    },
    {
      year: "Feb 2025",
      title: "Research & Development",
      description:
        "Melakukan riset mendalam tentang kebutuhan dan harapan pengguna",
      icon: IconClock,
      color: "secondary",
    },
    {
      year: "Apr 2025",
      title: "Website Development",
      description:
        "Mengembangkan website dengan fokus pada user experience dan kemudahan akses",
      icon: IconServer,
      color: "success",
    },
    {
      year: "Jul 2025",
      title: "Website Launch",
      description:
        "Meluncurkan website dengan fokus pada user experience dan kemudahan akses",
      icon: IconAward,
      color: "warning",
    },
    {
      year: "Aug 2025",
      title: "Premium Infrastructure",
      description:
        "Upgrade ke AMD EPYC servers dan NVMe storage untuk performa maksimal",
      icon: IconStar,
      color: "danger",
    },
    {
      year: "2025",
      title: "Next Achievement",
      description:
        "Terus berinovasi dengan teknologi terbaru dan memperluas layanan",
      icon: IconHelp,
      color: "primary",
    },
  ];

  const values: Value[] = [
    {
      title: "Gamer First",
      description:
        "Kami memahami kebutuhan gamers karena kami juga gamers. Setiap keputusan dibuat dengan perspektif gamer.",
      icon: IconHeart,
      color: "text-red-500",
    },
    {
      title: "Performance Obsessed",
      description:
        "Lag adalah musuh utama gaming. Kami obsesi dengan low latency dan high performance.",
      icon: IconTarget,
      color: "text-blue-500",
    },
    {
      title: "Innovation Driven",
      description:
        "Selalu mengadopsi teknologi terbaru untuk memberikan pengalaman gaming terbaik.",
      icon: IconBulb,
      color: "text-yellow-500",
    },
    {
      title: "Security Focused",
      description:
        "DDoS protection dan security measures untuk menjaga server dan data Anda tetap aman.",
      icon: IconShield,
      color: "text-green-500",
    },
  ];

  const stats = [
    { label: "Server Aktif", value: "100+", color: "primary" },
    { label: "Uptime", value: "99.9%", color: "success" },
    { label: "Komunitas", value: "1,500+", color: "secondary" },
    { label: "Support Response", value: "<30 min", color: "warning" },
  ];

  return (
    <>
      {/* Spotlight Container - Absolute positioning hanya untuk hero section */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.03) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 80%, transparent 100%)"
        />
      </div>
      <div className="min-h-dvh">
        {/* Hero Section with Spotlight */}

        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <AnimatedContent delay={200} direction="vertical" distance={50}>
              <div className="mb-6">
                <BlurText
                  animateBy="words"
                  className="text-4xl md:text-6xl font-bold "
                  delay={200}
                  direction="top"
                  text="Tentang Raehost"
                />
              </div>
            </AnimatedContent>

            <AnimatedContent delay={200} direction="vertical" distance={30}>
              <div className="max-w-4xl mx-auto mb-8">
                <TextGenerateEffect
                  className="text-xl md:text-2xl  leading-relaxed"
                  duration={0.8}
                  words="Kami adalah tim passionate gamers yang membangun infrastruktur hosting khusus untuk komunitas gaming Indonesia. Dari gamer, oleh gamer, untuk gamer."
                />
              </div>
            </AnimatedContent>

            <AnimatedContent delay={200} direction="vertical" distance={30}>
              <div className="flex flex-wrap justify-center gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="bg-default/50 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[140px]"
                  >
                    <div
                      className={`text-2xl font-bold text-${stat.color}-300`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm ">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </div>
        </div>

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

        {/* Main Content */}
        <div className="container mx-auto px-6 pb-16">
          {/* Our Story Section */}
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Cerita Kami
              </h2>
              <div className="mx-auto">
                <Card className=" backdrop-blur-sm p-2">
                  <CardBody className="text-justify">
                    <p>
                      <strong className="text-primary">R.A.E</strong> -
                      singkatan dari <strong>Reliable</strong>,{" "}
                      <strong>Affordable</strong>, dan{" "}
                      <strong>Experience</strong> - menjadi fondasi lahirnya
                      Raehost. Kami memulai perjalanan dari frustasi para gamer
                      Indonesia yang kesulitan mencari hosting server yang
                      benar-benar{" "}
                      <strong className="text-primary">reliable</strong> dengan
                      uptime tinggi, sekaligus{" "}
                      <strong className="text-primary">affordable</strong> untuk
                      semua kalangan gamer.
                    </p>
                    <p className="mt-4">
                      Sebagai gamers sejati, kami paham betul rasanya lag di
                      tengah-tengah raid penting atau PvP match yang intense.
                      Dari sinilah komitmen kami untuk memberikan{" "}
                      <strong className="text-primary">experience</strong>{" "}
                      gaming yang optimal - tidak ada lagi gangguan teknis yang
                      merusak momen gaming terbaik Anda.
                    </p>
                    <p className="mt-4">
                      Berangkat dari passion gaming dan background teknis, kami
                      memutuskan membangun solusi hosting yang benar-benar
                      memahami kebutuhan gaming community. Tidak hanya sekedar
                      menyediakan server, tapi membangun ekosistem yang
                      mendukung komunitas gaming Indonesia dengan tiga pilar
                      R.A.E sebagai panduan.
                    </p>
                    <p className="mt-4">
                      Hari ini, lebih dari 1.500 gamers mempercayai Raehost
                      untuk menjalankan server mereka - mulai dari server
                      Minecraft untuk anak-anak hingga server game skala
                      enterprise. Semua merasakan pengalaman yang sama: hosting
                      yang reliable, harga yang affordable, dan experience
                      gaming yang tak terlupakan.
                    </p>
                    {/* <p>
                      Raehost lahir dari frustasi para gamer Indonesia yang
                      kesulitan mencari hosting server yang reliable dan
                      affordable. Sebagai gamers sejati, kami paham betul
                      rasanya lag di tengah-tengah raid penting atau PvP match
                      yang intense. Berangkat dari passion gaming dan background
                      teknis, kami memutuskan untuk membangun solusi hosting
                      yang benar-benar memahami kebutuhan gaming community.
                      Tidak hanya sekedar menyediakan server, tapi membangun
                      ekosistem yang mendukung komunitas gaming Indonesia. Hari
                      ini, lebih dari 1.500 gamers mempercayai Raehost untuk
                      menjalankan server mereka. Dari server Minecraft untuk
                      anak-anak hingga server game untuk skala menengah dan
                      besar.
                    </p> */}
                  </CardBody>
                </Card>
              </div>
            </div>
          </AnimatedContent>

          {/* Values Section */}
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Nilai-Nilai Kami
                </h2>
                <p className="text-xl text-default-600 max-w-2xl mx-auto">
                  Prinsip yang memandu setiap keputusan dan tindakan kami
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <AnimatedContent
                    key={value.title}
                    delay={200}
                    direction="vertical"
                    distance={30}
                  >
                    <SpotlightCard className="h-full">
                      <div className="text-center">
                        <div
                          className={`inline-flex p-3 rounded-full bg-gray-100 dark:bg-gray-800 mb-4`}
                        >
                          <value.icon className={value.color} size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-3">
                          {value.title}
                        </h3>
                        <p className="text-default-600 text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </SpotlightCard>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Timeline Section */}
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Perjalanan Kami
                </h2>
                <p className="text-xl text-default-600 max-w-2xl mx-auto">
                  Dari startup kecil hingga menjadi pilihan utama gaming
                  community Indonesia
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {milestones.map((milestone, index) => (
                  <AnimatedContent
                    key={milestone.year}
                    delay={200}
                    direction="horizontal"
                    distance={50}
                    reverse={index % 2 === 0}
                  >
                    <div className="flex items-center mb-8 last:mb-4">
                      <div className="flex-shrink-0 w-1/4 text-right pr-8">
                        <Chip
                          className="font-bold"
                          color={milestone.color}
                          variant="flat"
                        >
                          {milestone.year}
                        </Chip>
                      </div>

                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-12 h-12 rounded-full bg-${milestone.color}-100 dark:bg-${milestone.color}-50 flex items-center justify-center`}
                        >
                          <milestone.icon
                            className={`text-${milestone.color}-600 dark:text-${milestone.color}-400`}
                            size={24}
                          />
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-default-300 to-transparent" />
                        )}
                      </div>

                      <div className="flex-1 pl-8">
                        <Card className=" backdrop-blur-sm">
                          <CardBody className="p-4">
                            <h3 className="text-lg font-semibold mb-2">
                              {milestone.title}
                            </h3>
                            <p className="text-default-600 text-sm">
                              {milestone.description}
                            </p>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Team Section */}
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Tim Kami
                </h2>
                <p className="text-xl text-default-600 max-w-2xl mx-auto">
                  Kenalan dengan orang-orang passionate di balik Raehost
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <AnimatedContent
                    key={member.name}
                    delay={200}
                    direction="vertical"
                    distance={30}
                  >
                    <Card className=" backdrop-blur-sm h-full">
                      <CardBody className="p-6 text-center">
                        <Avatar
                          className="mx-auto mb-4"
                          size="lg"
                          src={member.avatar}
                        />
                        <h3 className="text-lg font-semibold mb-1">
                          {member.name}
                        </h3>
                        <p className="text-primary text-sm font-medium mb-3">
                          {member.role}
                        </p>
                        <p className="text-default-600 text-sm mb-4 leading-relaxed">
                          {member.bio}
                        </p>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {member.skills.slice(0, 2).map((skill) => (
                              <Chip
                                key={skill}
                                className="text-xs"
                                size="sm"
                                variant="flat"
                              >
                                {skill}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-center gap-2">
                          {member.socials.github && (
                            <Button
                              isExternal
                              isIconOnly
                              as={Link}
                              href={member.socials.github}
                              size="sm"
                              variant="light"
                            >
                              <IconBrandGithub size={18} />
                            </Button>
                          )}
                          {member.socials.linkedin && (
                            <Button
                              isExternal
                              isIconOnly
                              as={Link}
                              href={member.socials.linkedin}
                              size="sm"
                              variant="light"
                            >
                              <IconBrandLinkedin size={18} />
                            </Button>
                          )}
                          {member.socials.instagram && (
                            <Button
                              isExternal
                              isIconOnly
                              as={Link}
                              href={member.socials.instagram}
                              size="sm"
                              variant="light"
                            >
                              <IconBrandInstagram size={18} />
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* CTA Section */}
          <AnimatedContent delay={200} direction="vertical" distance={50}>
            <Card className=" backdrop-blur-sm border-2 border-primary-200 ">
              <CardBody className="p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Siap Bergabung dengan Gaming Community Kami?
                  </h2>
                  <p className="text-lg text-default-600 mb-6">
                    Ribuan gamers sudah mempercayai Raehost untuk server mereka.
                    Saatnya Anda merasakan perbedaannya!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      as={Link}
                      color="primary"
                      href="/new-order"
                      size="lg"
                      startContent={<IconRocket size={20} />}
                      variant="shadow"
                    >
                      Mulai Sekarang
                    </Button>
                    <Button
                      as={Link}
                      href="/contact"
                      size="lg"
                      startContent={<IconUsers size={20} />}
                      variant="bordered"
                    >
                      Hubungi Tim Kami
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </AnimatedContent>

          {/* Footer */}
          <AnimatedContent delay={200} direction="vertical" distance={30}>
            <div className="text-center mt-12">
              <p className="text-sm text-default-600">
                © {new Date().getFullYear()} Raehost. Dibuat dengan ❤️ untuk
                gaming community Indonesia.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </>
  );
}
