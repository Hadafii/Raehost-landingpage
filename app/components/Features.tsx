"use client";

import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  IconRocket,
  IconBolt,
  IconShieldCheck,
  IconHeadset,
  IconDeviceSdCard,
  IconCpu,
  IconCreditCard,
  IconCloudComputing,
} from "@tabler/icons-react";

import AnimatedContent from "@/components/AnimatedContent";

const features = [
  {
    title: "Deploy Instan",
    description: "Buat servermu dalam hitungan detik, ga perlu nunggu lama!",
    icon: <IconRocket size={24} />,
    color: "bg-pink-500/20 text-pink-500",
    hoverShadow: "hover:shadow-pink-500/50",
  },
  {
    title: "Ping Rendah",
    description: "Main mulus tanpa lag, ping rendah kaya kilat.",
    icon: <IconBolt size={24} />,
    color: "bg-blue-500/20 text-blue-500",
    hoverShadow: "hover:shadow-blue-500/50",
  },
  {
    title: "Proteksi DDoS",
    description:
      "Server kita dilengkapi proteksi DDoS canggih hingga 8+Tbit/s.",
    icon: <IconShieldCheck size={24} />,
    color: "bg-green-500/20 text-green-500",
    hoverShadow: "hover:shadow-green-500/50",
  },
  {
    title: "Support 24/7",
    description: "Tim kece standby nonstop! chat aja kapan pun.",
    icon: <IconHeadset size={24} />,
    color: "bg-purple-500/20 text-purple-500",
    hoverShadow: "hover:shadow-purple-500/50",
  },
  {
    title: "SSD NVMe Kilat",
    description: "Load game super cepat, ga ada lagi loading lama!",
    icon: <IconDeviceSdCard size={24} />,
    color: "bg-yellow-500/20 text-yellow-500",
    hoverShadow: "hover:shadow-yellow-500/50",
  },
  {
    title: "CPU Unggulan",
    description:
      "Prosesor AMD EPYC & Ryzen terbaru! performa maksimal buat game berat.",
    icon: <IconCpu size={24} />,
    color: "bg-orange-500/20 text-orange-500",
    hoverShadow: "hover:shadow-orange-500/50",
  },
  {
    title: "Payment Mudah",
    description: "Checkout simpel, banyak opsi pembayaran, tinggal tap!",
    icon: <IconCreditCard size={24} />,
    color: "bg-teal-500/20 text-teal-500",
    hoverShadow: "hover:shadow-teal-500/50",
  },
  {
    title: "Uptime 99.9%",
    description: "Server selalu online, main tanpa gangguan.",
    icon: <IconCloudComputing size={24} />,
    color: "bg-red-500/20 text-red-500",
    hoverShadow: "hover:shadow-red-500/50",
  },
];

export default function HighlightFeatures() {
  return (
    <section className="py-16 " id="features">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Kenapa Pilih Raehost?
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Semua yang kamu butuhin buat server gaming-mu ada di sini, Bro!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feat) => (
          <AnimatedContent
            key={feat.title} // Pindah key ke sini
            animateOpacity
            reverse
            config={{ friction: 10, tension: 100 }}
            direction="vertical"
            distance={100}
          >
            <Card
              // key tidak perlu di sini lagi
              className={`min-h-[220px] md:min-h-fit
                backdrop-blur-md c border border-white/10 rounded-xl 
                shadow-lg transition-all duration-300 ease-in-out
                ${feat.hoverShadow} hover:scale-105
              `}
            >
              <CardHeader className="flex items-center gap-3 p-4">
                <div
                  className={`
                  w-12 h-12 aspect-square rounded-full flex items-center justify-center 
                  ${feat.color}
                `}
                >
                  {React.cloneElement(feat.icon, {
                    className: "opacity-90",
                  })}
                </div>
                <span className="text-lg font-medium">{feat.title}</span>
              </CardHeader>

              {/* <Divider className="border-white/10" /> */}

              <CardBody className="pt-4 p-4">
                <p className="text-sm leading-relaxed opacity-80">
                  {feat.description}
                </p>
              </CardBody>
            </Card>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
