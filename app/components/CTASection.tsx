// Call to Action Component dengan HeroUI dan TailwindCSS
"use client";
import React from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { TestimonialCard } from "@/components/ui/Testimonials";
import AnimatedContent from "@/components/AnimatedContent";
const CTASection = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden transition-colors">
      <div className="absolute inset-0 z-0">
        <Image
          fill
          alt="CTA Background"
          className="object-cover object-center"
          src="/assets/landing/winter-theme-minecraft-2.webp"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-default/50 z-10 backdrop-blur-[6px]" />

      {/* Animated particles */}
      <div className="absolute inset-0 dark:bg-black/40  ">
        <div className="absolute w-20 h-20 bg-white rounded-full top-1/4 left-1/4 animate-pulse blur-xl" />
        <div className="absolute w-16 h-16 bg-blue-400 rounded-full bottom-1/3 right-1/3 animate-pulse blur-xl delay-700" />
        <div className="absolute w-24 h-24 bg-primary rounded-full top-1/2 right-1/4 animate-pulse blur-xl delay-1000" />
      </div>

      <div className="relative z-20 container mx-auto px-4">
        <AnimatedContent config={{ tension: 100, friction: 15 }} distance={100}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left side text */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-6 leading-tight">
                Tunggu Apa Lagi? <br />
                <span className="text-primary">Server Impianmu</span> Hanya
                Sekali Klik!
              </h2>

              <p className="text-lg /90 mb-8 max-w-xl">
                {`Deploy server dalam hitungan detik dengan performa tinggi, harga
                terjangkau, dan support 24/7. Uptime 99.9% guaranteed!`}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  as="a"
                  color="primary"
                  href="/login"
                  size="lg"
                  variant="shadow"
                >
                  Mulai Sekarang
                </Button>
                <Button
                  as="a"
                  color="default"
                  href="/pricing"
                  size="lg"
                  variant="shadow"
                >
                  Lihat Paket
                </Button>
              </div>
            </div>

            {/* Right side testimonial card */}
            {/* <div className="lg:w-1/3 w-full max-w-md hidden">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2  font-medium">5.0/5.0</span>
                </div>

                <p className="/90 italic mb-4">
                  &quot;Server Minecraft kami berjalan lancar tanpa lag meskipun
                  pemain mencapai 50+ orang. Support team Raehost super
                  responsif! Recommended banget!&quot;
                </p>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center  font-bold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className=" font-medium">Andi Wijaya</p>
                    <p className="/70 text-sm">Owner, Skyblock Indonesia</p>
                  </div>
                </div>
              </div>
            </div> */}

            <TestimonialCard />
          </div>

          {/* Stats section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <p className="text-4xl font-bold  mb-2">600+</p>
              <p className="/80">Server Aktif</p>
            </div>
            <div className="text-center p-4">
              <p className="text-4xl font-bold  mb-2">99.9%</p>
              <p className="/80">Uptime Bulanan</p>
            </div>
            <div className="text-center p-4">
              <p className="text-4xl font-bold  mb-2">24/7</p>
              <p className="/80">Dukungan Teknis</p>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default CTASection;
