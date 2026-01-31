"use client";
import Image from "next/image";
import { Button } from "@heroui/react";
import React from "react";
import { IconRocket, IconShieldLock } from "@tabler/icons-react";

import Layout from "./(landing)/layout";
import HighlightFeatures from "./components/Features";
import Pricing from "./components/Pricing";
import ServerSpecs from "./components/ServerSpecs";
import CTASection from "./components/CTASection";
import Pterodactyl from "./components/Pterodactyl";

import { title } from "@/components/primitives";
import BlurText from "@/components/ui/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import GlareHover from "@/components/ui/GlareHover";
import { DiscordIcon } from "@/components/icons";
export default function Home() {
  return (
    <>
      <Layout>
        <section className="relative w-full h-dvh">
          <div className="absolute inset-0 z-0">
            {/*  <Image
              fill
              priority
              alt="Hero Banner"
              className="object-cover"
              src="/assets/landing/artworkmc.png"
              style={{ objectPosition: "center 25%" }}
            /> */}
            <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-700">
              <Image
                fill
                priority
                alt="Hero Banner"
                className="object-cover "
                src="/assets/landing/winter-theme-minecraft-day.webp"
                style={{ objectPosition: "center 25%" }}
              />
            </div>
            <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700">
              <Image
                fill
                priority
                alt="Hero Banner"
                className="object-cover "
                src="/assets/landing/winter-theme-minecraft.webp"
                style={{ objectPosition: "center 25%" }}
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10 dark:bg-black/40  z-10" />
          <div className="relative z-20 flex flex-col justify-center items-center text-center h-full   backdrop-blur-[6px] px-4 text-white">
            {/* <div className="flex justify-center items-center mb-4">
              <Image
                alt="Raehost Logo"
                src="/assets/Raehost_logo.svg"
                width={30}
                height={30}
              />
            </div> */}
            <div className="mb-4  ">
              <AnimatedContent
                reverse
                config={{ tension: 100, friction: 15 }}
                distance={100}
                initialOpacity={0}
                scale={0}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="border bg-white/10 dark:bg-black/10  p-1 w-fit border-white/20 rounded-full flex items-center font-medium hover:-translate-y-1.5 hover:scale-105 hover:shadow-blue-300/50 hover:shadow-2xl transition-all">
                    <div
                      className="bg-gradient-to-br from-[#8EC9FF] via-[#2F84FF] to-[#006FEE]
                    dark:from-[#0B2F6F] dark:via-[#0A49BF] dark:to-[#006FEE]
                      shadow shadow-blue-600 dark:shadow-blue-900/40
                      ring-1 ring-white/30 dark:ring-white/10
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-[#006FEE]
                      focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 transition-colors rounded-full p-2 me-2 text-sm md:text-base"
                    >
                      100%
                    </div>
                    Terpercaya & Aman
                    <IconShieldLock className="w-6 h-6 mx-2" />
                  </div>
                </div>
              </AnimatedContent>

              <h1>
                <div className="inline-flex flex-wrap justify-center">
                  <span className={title()}>
                    <BlurText
                      animateBy="letters"
                      className="text-4xl md:text-5xl font-bold"
                      delay={50}
                      direction="top"
                      initialDelay={0} // First text starts immediately
                      text="Solusi "
                    />
                  </span>
                  <span className={title({ color: "blue" })}>
                    <BlurText
                      animateBy="letters"
                      className="text-blue-500 text-4xl md:text-5xl font-bold"
                      delay={50}
                      direction="top"
                      initialDelay={300} // This text starts after 300ms
                      text="Server Terbaik"
                    />
                  </span>
                </div>
                <div>
                  <span className={title()}>
                    <BlurText
                      animateBy="letters"
                      className="text-4xl md:text-5xl font-bold"
                      delay={50}
                      direction="top"
                      initialDelay={900} // This text starts after 600ms
                      text="Untuk Komunitasmu"
                    />
                  </span>
                </div>
              </h1>
              <TextGenerateEffect
                className="text-xs md:text-xl mb-6 max-w-2xl text-white pt-4"
                duration={0.5}
                words={
                  "Raehost hadir untuk para gamer yang butuh performa tanpa kompromi. Bangun server impianmu, taklukkan dunia virtualmu."
                }
              />
            </div>
            <div className="flex gap-2">
              <AnimatedContent
                config={{ tension: 100, friction: 15 }}
                delay={1000}
                distance={100}
                initialOpacity={0}
                scale={0}
              >
                <GlareHover>
                  <Button
                    as={"a"}
                    className={`group p-5 px-8 font-semibold text-white transition-all duration-300
                      bg-gradient-to-br from-[#8EC9FF] via-[#2F84FF] to-[#006FEE]
                      hover:from-[#75BEFF] hover:via-[#1C77FF] hover:to-[#005BE6]
                      dark:from-[#0B2F6F] dark:via-[#0A49BF] dark:to-[#006FEE]
                      dark:hover:from-[#0E3B8A] dark:hover:via-[#0B55D6] dark:hover:to-[#0063FF]
                      shadow shadow-blue-600 dark:shadow-blue-900/40
                      ring-1 ring-white/30 dark:ring-white/10
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-[#006FEE]
                      focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950`}
                    color="primary"
                    href="/register"
                    radius="full"
                    size="lg"
                    startContent={<IconRocket size={20} />}
                    variant="shadow"
                  >
                    Deploy Sekarang
                  </Button>
                </GlareHover>
              </AnimatedContent>
              <AnimatedContent
                config={{ tension: 100, friction: 15 }}
                delay={1200}
                distance={100}
                initialOpacity={0}
                scale={0}
              >
                <GlareHover>
                  <Button
                    isIconOnly
                    as={"a"}
                    className={`group font-semibold text-white transition-all duration-300
                    bg-gradient-to-br from-[#8EC9FF] via-[#2F84FF] to-[#006FEE]
                      hover:from-[#75BEFF] hover:via-[#1C77FF] hover:to-[#005BE6]
                      dark:from-[#0B2F6F] dark:via-[#0A49BF] dark:to-[#006FEE]
                      dark:hover:from-[#0E3B8A] dark:hover:via-[#0B55D6] dark:hover:to-[#0063FF]
                      shadow-lg shadow-blue-300/40 dark:shadow-blue-900/40
                      ring-1 ring-white/30 dark:ring-white/10
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-[#006FEE]
                      focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950`}
                    color="primary"
                    href="https://discord.gg/c8zC5Qfkvh"
                    radius="full"
                    size="lg"
                    startContent={<DiscordIcon size={30} />}
                    target="_blank"
                    variant="shadow"
                  />
                </GlareHover>
              </AnimatedContent>
            </div>
          </div>
        </section>
        <div className="relative">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(100, 100, 100, 1) 1.2px, transparent 1px), radial-gradient(circle at 75% 75%,rgba(100, 100, 100, 1) 1.2px, transparent 1px)`,
              backgroundSize: "50px 50px",
              maskImage: `radial-gradient(ellipse 95% 95% at center, black 40%, transparent 70%)`,
            }}
          />
          <HighlightFeatures />
          <Pricing />
          <ServerSpecs />
          <Pterodactyl />
        </div>
        <CTASection />
      </Layout>
    </>
  );
}
