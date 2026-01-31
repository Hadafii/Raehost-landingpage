"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Chip,
  Link,
  Input,
  Progress,
} from "@heroui/react";
import {
  IconRocket,
  IconCode,
  IconHomeFilled,
  IconSettings,
  IconBrandGithub,
  IconBrandDiscord,
  IconBrandInstagram,
  IconMail,
  IconClock,
  IconUsers,
  IconServer,
  IconBell,
  IconCheck,
  IconLoader,
  IconCoffee,
  IconBulb,
  IconBolt,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import SpotlightCard from "@/components/SpotlightCard";
import { Spotlight } from "@/components/ui/spotlight-new";

interface Milestone {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "completed" | "in-progress" | "pending";
  estimatedDate: string;
  icon: React.ComponentType<any>;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  status: "coding" | "designing" | "testing" | "sleeping";
}

export default function UnderDevelopmentPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const milestones: Milestone[] = [
    {
      id: "auth",
      title: "Authentication System",
      description: "User registration, login, dan session management",
      progress: 100,
      status: "completed",
      estimatedDate: "Jan 15, 2025",
      icon: IconUsers,
    },
    {
      id: "dashboard",
      title: "User Dashboard",
      description: "Control panel untuk manage servers dan billing",
      progress: 100,
      status: "completed",
      estimatedDate: "Feb 1, 2025",
      icon: IconSettings,
    },
    {
      id: "deployment",
      title: "Auto Deployment",
      description: "Automated server deployment dan configuration",
      progress: 100,
      status: "completed",
      estimatedDate: "Feb 15, 2025",
      icon: IconRocket,
    },
    {
      id: "Other information page",
      title: "Other Information Page",
      description:
        "Halaman informasi lainnya seperti Dokumentasi, FAQ, dan Kontak",
      progress: 60,
      status: "in-progress",
      estimatedDate: "Mar 1, 2025",
      icon: IconServer,
    },
    {
      id: "api",
      title: "API Documentation",
      description: "RESTful API untuk developers dan integrations",
      progress: 10,
      status: "pending",
      estimatedDate: "Mar 15, 2025",
      icon: IconCode,
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Dafi Utomo",
      role: "Lead Developer",
      avatar: "https://www.dafiutomo.com/DAFIUTOMO.jpg",
      status: "coding",
    },
    {
      name: "Raisa",
      role: "UI/UX Designer",
      avatar: "/assets/people/raisa.jpg",
      status: "designing",
    },
  ];

  const stats = [
    {
      label: "Lines of Code",
      value: "812547",
      icon: IconCode,
      color: "primary",
    },
    {
      label: "Coffee Consumed",
      value: "247",
      icon: IconCoffee,
      color: "warning",
    },
    { label: "Features Built", value: "34", icon: IconBulb, color: "success" },
    { label: "Bugs Fixed", value: "89", icon: IconBolt, color: "danger" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      case "pending":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <IconCheck size={16} />;
      case "in-progress":
        return <IconLoader className="animate-spin" size={16} />;
      case "pending":
        return <IconClock size={16} />;
      default:
        return <IconClock size={16} />;
    }
  };

  const getTeamStatusEmoji = (status: string) => {
    switch (status) {
      case "coding":
        return "💻";
      case "designing":
        return "🎨";
      case "testing":
        return "🧪";
      case "sleeping":
        return "😴";
      default:
        return "🚀";
    }
  };

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case "coding":
        return "primary";
      case "designing":
        return "secondary";
      case "testing":
        return "warning";
      case "sleeping":
        return "default";
      default:
        return "primary";
    }
  };

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
    }
  };

  const launchDate = new Date("2025-06-20T00:00:00");
  const timeUntilLaunch = launchDate.getTime() - currentTime.getTime();
  const daysLeft = Math.max(
    0,
    Math.floor(timeUntilLaunch / (1000 * 60 * 60 * 24)),
  );
  const hoursLeft = Math.max(
    0,
    Math.floor((timeUntilLaunch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const minutesLeft = Math.max(
    0,
    Math.floor((timeUntilLaunch % (1000 * 60 * 60)) / (1000 * 60)),
  );

  return (
    <>
      <div className="min-h-dvh overflow-hidden">
        {/* Spotlight Background */}
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.03) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 80%, transparent 100%)"
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full top-10 -left-48 animate-pulse" />
          <div className="absolute w-80 h-80 bg-purple-500/5 rounded-full bottom-10 -right-40 animate-pulse delay-1000" />
          <div className="absolute w-64 h-64 bg-pink-500/5 rounded-full top-1/2 left-1/4 animate-pulse delay-2000" />
        </div>

        {/* Hero Section */}
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <AnimatedContent delay={200} direction="vertical" distance={50}>
              <div className="mb-8">
                <motion.div
                  animate={{ scale: 1, rotate: 0 }}
                  className="inline-flex p-6 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <IconRocket className="text-primary-600" size={64} />
                </motion.div>
                <BlurText
                  animateBy="words"
                  className="text-4xl md:text-6xl font-bold mb-4"
                  delay={100}
                  direction="top"
                  text="We're Building Something Amazing"
                />
              </div>
            </AnimatedContent>

            <AnimatedContent delay={600} direction="vertical" distance={30}>
              <div className="max-w-4xl mx-auto mb-8">
                <TextGenerateEffect
                  className="text-xl md:text-2xl leading-relaxed"
                  duration={0.8}
                  words="Raehost sedang dalam tahap pengembangan intensif. Kami membangun platform hosting game terdepan dengan teknologi terbaru untuk memberikan pengalaman gaming terbaik untuk komunitas Indonesia."
                />
              </div>
            </AnimatedContent>

            {/* Countdown Timer */}
            <AnimatedContent delay={1000} direction="vertical" distance={30}>
              <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-2 border-primary-200 mb-8">
                <CardHeader>
                  <div className="text-center w-full">
                    <h3 className="text-2xl font-bold mb-2">
                      🚀 Expected Launch
                    </h3>
                    <p className="text-default-600">
                      Target tanggal peluncuran beta testing
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-primary-600">
                        {daysLeft}
                      </div>
                      <div className="text-sm text-default-600">Days</div>
                    </div>
                    <div className="p-4 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-secondary-600">
                        {hoursLeft}
                      </div>
                      <div className="text-sm text-default-600">Hours</div>
                    </div>
                    <div className="p-4 bg-warning-100 dark:bg-warning-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-warning-600">
                        {minutesLeft}
                      </div>
                      <div className="text-sm text-default-600">Minutes</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </AnimatedContent>

            {/* Newsletter Signup */}
            <AnimatedContent delay={1200} direction="vertical" distance={30}>
              <Card className="max-w-lg mx-auto bg-white/10 backdrop-blur-sm">
                <CardBody className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Get Notified When We Launch! 🔔
                  </h3>
                  <AnimatePresence mode="wait">
                    {!subscribed ? (
                      <motion.div
                        key="form"
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                      >
                        <Input
                          placeholder="Enter your email"
                          startContent={
                            <IconMail className="text-default-400" size={18} />
                          }
                          type="email"
                          value={email}
                          variant="bordered"
                          onValueChange={setEmail}
                        />
                        <Button
                          className="w-full"
                          color="primary"
                          isDisabled={!email}
                          startContent={<IconBell size={18} />}
                          variant="shadow"
                          onPress={handleSubscribe}
                        >
                          Notify Me!
                        </Button>
                        <p className="text-xs text-default-500">
                          Dapatkan update progress dan early access saat launch
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="text-4xl">🎉</div>
                        <h3 className="text-lg font-semibold text-success-600">
                          Thanks for subscribing!
                        </h3>
                        <p className="text-sm text-default-600">
                          Kami akan mengirim update menarik tentang progress
                          development
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardBody>
              </Card>
            </AnimatedContent>
          </div>
        </div>

        {/* Development Stats */}
        <AnimatedContent delay={400} direction="vertical" distance={50}>
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Development Stats
              </h2>
              <p className="text-xl text-default-600">
                Progress yang telah kami capai
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <AnimatedContent
                  key={stat.label}
                  delay={500 + index * 100}
                  direction="vertical"
                  distance={30}
                >
                  <SpotlightCard className="h-full">
                    <div className="text-center p-6">
                      <div
                        className={`inline-flex p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20 mb-4`}
                      >
                        {React.createElement(stat.icon, {
                          size: 24,
                          className: `text-${stat.color}-600`,
                        })}
                      </div>
                      <div
                        className={`text-2xl font-bold text-${stat.color}-600 mb-1`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-default-600">
                        {stat.label}
                      </div>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </AnimatedContent>

        {/* Development Progress */}
        <AnimatedContent delay={600} direction="vertical" distance={50}>
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Development Roadmap
              </h2>
              <p className="text-xl text-default-600">
                Tracking progress fitur-fitur utama
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {milestones.map((milestone, index) => (
                <AnimatedContent
                  key={milestone.id}
                  delay={700 + index * 150}
                  direction="horizontal"
                  distance={30}
                  reverse={index % 2 === 0}
                >
                  <Card className="bg-white/10 backdrop-blur-sm">
                    <CardBody className="p-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 bg-${getStatusColor(milestone.status)}-100 dark:bg-${getStatusColor(milestone.status)}-900/20 rounded-lg`}
                        >
                          {React.createElement(milestone.icon, {
                            size: 24,
                            className: `text-${getStatusColor(milestone.status)}-600`,
                          })}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {milestone.title}
                            </h3>
                            <Chip
                              color={getStatusColor(milestone.status) as any}
                              size="sm"
                              startContent={getStatusIcon(milestone.status)}
                              variant="flat"
                            >
                              {milestone.status.replace("-", " ")}
                            </Chip>
                          </div>
                          <p className="text-default-600 text-sm mb-3">
                            {milestone.description}
                          </p>

                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span className="font-medium">
                                  {milestone.progress}%
                                </span>
                              </div>
                              <Progress
                                color={getStatusColor(milestone.status) as any}
                                size="sm"
                                value={milestone.progress}
                              />
                            </div>
                            <div className="text-sm text-default-500">
                              {milestone.estimatedDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </AnimatedContent>

        {/* Team Section */}
        {/* <AnimatedContent distance={50} direction="vertical" delay={800}>
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
              <p className="text-xl text-default-600">Tim passionate di balik Raehost</p>
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <AnimatedContent
                  key={member.name}
                  distance={30}
                  direction="vertical"
                  delay={900 + index * 200}
                >
                  <SpotlightCard>
                    <div className="text-center p-6">
                      <div className="relative inline-block mb-4">
                        <Avatar src={member.avatar} size="lg" />
                        <Badge
                          content={getTeamStatusEmoji(member.status)}
                          color={getTeamStatusColor(member.status) as any}
                          placement="bottom-right"
                          size="lg"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                      <Chip
                        size="sm"
                        color={getTeamStatusColor(member.status) as any}
                        variant="flat"
                      >
                        {member.status.replace("-", " ")}
                      </Chip>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </AnimatedContent> */}

        {/* Social Links */}
        <AnimatedContent delay={1000} direction="vertical" distance={50}>
          <div className="container mx-auto px-6 mb-16">
            <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-2 border-secondary-200">
              <CardHeader>
                <div className="text-center w-full">
                  <h2 className="text-2xl font-bold mb-2">Stay Connected 🌐</h2>
                  <p className="text-default-600">
                    Follow perkembangan terbaru di social media
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    isExternal
                    as={Link}
                    className="w-full"
                    color="secondary"
                    href="https://discord.gg/c8zC5Qfkvh"
                    startContent={<IconBrandDiscord size={20} />}
                    variant="flat"
                  >
                    Discord
                  </Button>
                  <Button
                    isExternal
                    as={Link}
                    className="w-full"
                    color="default"
                    href="https://github.com/hadafii"
                    startContent={<IconBrandGithub size={20} />}
                    variant="flat"
                  >
                    GitHub
                  </Button>
                  <Button
                    isExternal
                    as={Link}
                    className="w-full"
                    color="danger"
                    href="https://instagram.com/raehost"
                    startContent={<IconBrandInstagram size={20} />}
                    variant="flat"
                  >
                    Instagram
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </AnimatedContent>

        {/* Footer CTA */}
        <AnimatedContent delay={1200} direction="vertical" distance={50}>
          <div className="container mx-auto px-6 pb-16">
            <Card className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 backdrop-blur-sm border-2 border-primary-200">
              <CardBody className="p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="text-4xl mb-4">❤️</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Built with Love for Indonesian Gamers
                  </h2>
                  <p className="text-lg text-default-600 mb-6">
                    Kami membangun Raehost dengan dedikasi tinggi untuk
                    memberikan pengalaman hosting game terbaik untuk komunitas
                    gaming Indonesia. Terima kasih atas kesabaran Anda!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      color="primary"
                      size="lg"
                      startContent={<IconHomeFilled size={20} />}
                      variant="shadow"
                      onPress={() => {
                        router.push("/");
                      }}
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </AnimatedContent>
      </div>
    </>
  );
}
