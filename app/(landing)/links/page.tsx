//app\(landing)\links\page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconWorld,
} from "@tabler/icons-react";

const AnimatedContent = dynamic(() => import("@/components/AnimatedContent"), {
  ssr: false,
});
const BlurText = dynamic(() => import("@/components/ui/BlurText"), {
  ssr: false,
});
const GlassSurface = dynamic(() => import("@/components/ui/GlassSurface"), {
  ssr: false,
});

interface SocialLink {
  id: number;
  title: string;
  url: string;
  icon: React.ReactNode;
}

const page = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const socialLinks: SocialLink[] = [
    {
      id: 1,
      title: "Our Website",
      url: "https://raehost.com",
      icon: <IconWorld className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Raehost Discord Community",
      url: "https://discord.gg/c8zC5Qfkvh",
      icon: <IconBrandDiscord className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Raehost Official TikTok",
      url: "https://tiktok.com/@raehost.com",
      icon: <IconBrandTiktok className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Raehost Official Instagram",
      url: "https://instagram.com/raehost",
      icon: <IconBrandInstagram className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Raehost Youtube Channel",
      url: "https://youtube.com/@raehost",
      icon: <IconBrandYoutube className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <section className="relative w-full min-h-dvh py-24">
        <div className="absolute inset-0 z-0 ">
          <Image
            fill
            priority
            alt="Hero Banner"
            className="object-cover blur-[6px]"
            src="/assets/landing/airender5enh.png"
            style={{ objectPosition: "center 25%" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10" />

        <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-4 text-white">
          {/* Logo */}
          <AnimatedContent
            config={{ tension: 100, friction: 15 }}
            distance={100}
            initialOpacity={0}
            scale={0}
          >
            <div className="mb-6">
              <Image
                src="/assets/Raehost_full_logo.png"
                alt="Raehost Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </AnimatedContent>

          {/* Username Badge */}
          <AnimatedContent
            reverse
            config={{ tension: 100, friction: 15 }}
            distance={100}
            initialOpacity={0}
            scale={0}
            delay={300}
          >
            <div className="flex items-center justify-center mb-3">
              <div className="border bg-white/10 dark:bg-black/10 p-2 px-4 w-fit border-white/20 rounded-full flex items-center font-medium hover:-translate-y-1.5 hover:scale-105 hover:shadow-blue-300/50 hover:shadow-2xl transition-all">
                @Raehost
              </div>
            </div>
          </AnimatedContent>

          {/* Description */}
          <div className="mb-8">
            <BlurText
              animateBy="letters"
              className="text-sm md:text-base text-white/90"
              delay={50}
              direction="top"
              initialDelay={300}
              text="Game Server Hosting Terbaik Indonesia"
            />
          </div>

          {/* Social Links */}
          <div className="w-full max-w-md mx-auto space-y-3">
            {socialLinks.map((link, index) => (
              <AnimatedContent
                key={link.id}
                config={{ tension: 100, friction: 15 }}
                delay={800 + index * 100}
                distance={50}
                initialOpacity={0}
                scale={0.9}
              >
                <GlassSurface
                  as="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  borderRadius={50}
                  blur={24}
                  width={500}
                  displace={3}
                  key={link.id}
                  className="cursor-pointer mt-4 w-full max-w-xs mx-auto"
                >
                  <div className="flex items-center justify-between gap-3 text-white px-5 py-3.5">
                    <div className="flex-shrink-0">{link.icon}</div>
                    <span className="font-medium text-sm md:text-base">
                      {link.title}
                    </span>
                  </div>
                </GlassSurface>
              </AnimatedContent>
            ))}
          </div>

          {/* Bottom Social Icons */}
          <AnimatedContent
            config={{ tension: 100, friction: 15 }}
            delay={1000}
            distance={50}
            initialOpacity={0}
            scale={0}
          >
            <div className="flex justify-center gap-3 mt-10">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 hover:bg-white/15 rounded-full text-white hover:scale-110 transition-all duration-300"
                  aria-label={link.title}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
};

export default page;
