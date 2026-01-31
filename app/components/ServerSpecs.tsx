"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, Chip, Link } from "@heroui/react";
import { IconCpu, IconServer2, IconChartBar } from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

import AnimatedContent from "@/components/AnimatedContent";

// CPU Single Thread Performance Data
const cpuSingleThreadData = [
  {
    name: "AMD Ryzen 7\n5800X",
    shortName: "Ryzen 7 5800X",
    score: 3446,
    category: "comparison",
    description: "Previous Gen Gaming CPU",
    color: "#6b7280",
    isOurs: false,
  },
  {
    name: "AMD EPYC\n4344P",
    shortName: "EPYC 4344P",
    score: 3560,
    category: "comparison",
    description: "Entry Level Server",
    color: "#f59e0b",
    isOurs: false,
  },
  {
    name: "Intel Core i9\n13900HK",
    shortName: "i9-13900HK",
    score: 3783,
    category: "comparison",
    description: "High-End Mobile CPU",
    color: "#06b6d4",
    isOurs: false,
  },
  {
    name: "AMD Ryzen 7\n9700X",
    shortName: "Ryzen 7 9700X",
    score: 4657,
    category: "premium",
    description: "Latest Zen 5 Architecture",
    color: "#3b82f6",
    isOurs: true,
  },
  {
    name: "AMD Ryzen 9\n9950X",
    shortName: "Ryzen 9 9950X",
    score: 4735,
    category: "premium",
    description: "Premium Gaming CPU",
    color: "#8b5cf6",
    isOurs: true,
  },
];

// CPU Mark (Multi-Thread) Performance Data
const cpuMarkData = [
  {
    name: "Intel Core i9\n13900HK",
    shortName: "i9-13900HK",
    score: 27443,
    category: "comparison",
    description: "High-End Mobile CPU",
    color: "#06b6d4",
    isOurs: false,
  },
  {
    name: "AMD Ryzen 7\n5800X",
    shortName: "Ryzen 7 5800X",
    score: 27716,
    category: "comparison",
    description: "Previous Gen Gaming CPU",
    color: "#6b7280",
    isOurs: false,
  },
  {
    name: "AMD EPYC\n4344P",
    shortName: "EPYC 4344P",
    score: 33690,
    category: "comparison",
    description: "Entry Level Server",
    color: "#f59e0b",
    isOurs: false,
  },
  {
    name: "AMD Ryzen 7\n9700X",
    shortName: "Ryzen 7 9700X",
    score: 37172,
    category: "premium",
    description: "Latest Zen 5 Architecture",
    color: "#3b82f6",
    isOurs: true,
  },
  {
    name: "AMD Ryzen 9\n9950X",
    shortName: "Ryzen 9 9950X",
    score: 65949,
    category: "premium",
    description: "Premium Gaming CPU",
    color: "#8b5cf6",
    isOurs: true,
  },
];

// Format number with comma separator
const formatScore = (score: number): string => {
  return new Intl.NumberFormat("en-US").format(score);
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-default-200">
        <p className="font-semibold text-sm">{data.shortName}</p>
        <p className="text-xs text-default-600 mb-2">{data.description}</p>
        <p className="text-sm font-bold" style={{ color: data.color }}>
          Score: {formatScore(data.score)}
        </p>
        {data.isOurs && (
          <Chip className="mt-1" color="primary" size="sm" variant="flat">
            Our Server
          </Chip>
        )}
      </div>
    );
  }

  return null;
};

// Section Header Component
const SectionHeader = () => (
  <div className="text-center mb-12 space-y-6">
    {/* Title Section */}
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <IconServer2 className="text-primary" size={32} />
        </div>
        <Chip color="primary" size="lg" variant="flat">
          Server Specifications
        </Chip>
      </div>

      <div className="space-y-3">
        <h2 className="text-4xl font-bold">
          Hardware Premium untuk Performa Maksimal
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Kami menggunakan processor server terdepan untuk memberikan pengalaman
          gaming terbaik
        </p>
      </div>
    </div>
  </div>
);

export default function ServerSpecs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section
      className="py-20 text-gray-900 dark:text-white transition-colors"
      id="server-specs"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <AnimatedContent config={{ tension: 100, friction: 15 }} distance={50}>
          <SectionHeader />
        </AnimatedContent>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Single Thread Chart */}
          <AnimatedContent delay={200}>
            <Card className="bg-white dark:bg-slate-950 shadow-2xl border-2 border-default-200/60 dark:border-default-500/30">
              <CardBody className="p-6">
                {/* Chart Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <IconChartBar className="text-primary" size={20} />
                    <h3 className="text-lg font-bold">
                      CPU Single Thread Rating
                    </h3>
                  </div>
                  <p className="text-xs text-default-600 mb-1">
                    As of 19th of October 2025
                  </p>
                  <p className="text-xs text-default-500 mb-2">
                    Higher results represent better performance
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <p className="text-default-500">
                      PassMark Software © 2008-2025
                    </p>
                    <span className="text-default-400">•</span>
                    <Link
                      isExternal
                      className="text-[12px]"
                      color="primary"
                      href="https://www.cpubenchmark.net/compare/3869vs6071vs5448vs6205vs6211/AMD-Ryzen-7-5800X-vs-AMD-EPYC-4344P-vs-Intel-i9-13900HK-vs-AMD-Ryzen-7-9700X-vs-AMD-Ryzen-9-9950X"
                      size="sm"
                      underline="hover"
                    >
                      Check here
                    </Link>
                  </div>
                </div>

                {/* Chart */}
                <div className={isMobile ? "h-64" : "h-80"}>
                  <ResponsiveContainer height="100%" width="100%">
                    <BarChart
                      barCategoryGap="15%"
                      data={cpuSingleThreadData}
                      margin={{
                        top: 30,
                        right: isMobile ? 10 : 20,
                        left: isMobile ? 5 : 10,
                        bottom: isMobile ? 5 : 10,
                      }}
                    >
                      <CartesianGrid
                        className="opacity-30"
                        stroke="currentColor"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        axisLine={false}
                        dataKey={isMobile ? "shortName" : "name"}
                        height={isMobile ? 40 : 50}
                        interval={0}
                        tick={{
                          fontSize: isMobile ? 8 : 9,
                          fill: "currentColor",
                          textAnchor: "middle",
                        }}
                        tickLine={false}
                      />
                      <YAxis
                        axisLine={false}
                        tick={{ fontSize: 10, fill: "currentColor" }}
                        tickFormatter={(value) =>
                          `${(value / 1000).toFixed(0)}K`
                        }
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="score" radius={[3, 3, 0, 0]}>
                        {cpuSingleThreadData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList
                          className="text-xs font-medium fill-current"
                          dataKey="score"
                          formatter={(value: any) => formatScore(Number(value))}
                          position="top"
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Compact Legend */}
                <div className="mt-4 pt-4 border-t border-default-200">
                  <div className="flex flex-wrap justify-center gap-3">
                    {cpuSingleThreadData.map((cpu) => (
                      <div
                        key={cpu.shortName}
                        className="flex items-center gap-1"
                      >
                        <div
                          className="w-2 h-2 rounded"
                          style={{ backgroundColor: cpu.color }}
                        />
                        <span className="text-xs text-default-600">
                          {cpu.shortName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </AnimatedContent>

          {/* CPU Mark Chart */}
          <AnimatedContent delay={300}>
            <Card className="bg-white dark:bg-slate-950 shadow-2xl border-2 border-default-200/60 dark:border-default-500/30">
              <CardBody className="p-6">
                {/* Chart Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <IconChartBar className="text-secondary" size={20} />
                    <h3 className="text-lg font-bold">CPU Mark Rating</h3>
                  </div>
                  <p className="text-xs text-default-600 mb-1">
                    As of 19th of October 2025
                  </p>
                  <p className="text-xs text-default-500 mb-2">
                    Higher results represent better performance
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <p className="text-default-500">
                      PassMark Software © 2008-2025
                    </p>
                    <span className="text-default-400">•</span>
                    <Link
                      isExternal
                      className="text-[12px]"
                      color="primary"
                      href="https://www.cpubenchmark.net/compare/3869vs6071vs5448vs6205vs6211/AMD-Ryzen-7-5800X-vs-AMD-EPYC-4344P-vs-Intel-i9-13900HK-vs-AMD-Ryzen-7-9700X-vs-AMD-Ryzen-9-9950X"
                      size="sm"
                      underline="hover"
                    >
                      Check here
                    </Link>
                  </div>
                </div>

                {/* Chart */}
                <div className={isMobile ? "h-64" : "h-80"}>
                  <ResponsiveContainer height="100%" width="100%">
                    <BarChart
                      barCategoryGap="15%"
                      data={cpuMarkData}
                      margin={{
                        top: 30,
                        right: isMobile ? 10 : 20,
                        left: isMobile ? 5 : 10,
                        bottom: isMobile ? 5 : 10,
                      }}
                    >
                      <CartesianGrid
                        className="opacity-30"
                        stroke="currentColor"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        axisLine={false}
                        dataKey={isMobile ? "shortName" : "name"}
                        height={isMobile ? 40 : 50}
                        interval={0}
                        tick={{
                          fontSize: isMobile ? 8 : 9,
                          fill: "currentColor",
                          textAnchor: "middle",
                        }}
                        tickLine={false}
                      />
                      <YAxis
                        axisLine={false}
                        tick={{ fontSize: 10, fill: "currentColor" }}
                        tickFormatter={(value) =>
                          `${(value / 1000).toFixed(0)}K`
                        }
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="score" radius={[3, 3, 0, 0]}>
                        {cpuMarkData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList
                          className="text-xs font-medium fill-current"
                          dataKey="score"
                          formatter={(value: any) => formatScore(Number(value))}
                          position="top"
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Compact Legend */}
                <div className="mt-4 pt-4 border-t border-default-200">
                  <div className="flex flex-wrap justify-center gap-3">
                    {cpuMarkData.map((cpu) => (
                      <div
                        key={cpu.shortName}
                        className="flex items-center gap-1"
                      >
                        <div
                          className="w-2 h-2 rounded"
                          style={{ backgroundColor: cpu.color }}
                        />
                        <span className="text-xs text-default-600">
                          {cpu.shortName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </AnimatedContent>
        </div>

        {/* Info Cards Section */}
        <AnimatedContent delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-4xl mx-auto">
            {/* Ryzen 7 9700X Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/30 dark:border-blue-500/20 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <IconCpu className="text-blue-500" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Standard Hosting</h4>
                  <Chip
                    className="text-xs mt-1"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    Our Server
                  </Chip>
                </div>
              </div>
              <p className="text-sm text-default-600 mb-3 font-medium">
                AMD Ryzen 7 9700X
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-default-500">Single Thread</p>
                  <p className="text-sm font-bold text-blue-600">4,657</p>
                </div>
                <div>
                  <p className="text-xs text-default-500">CPU Mark</p>
                  <p className="text-sm font-bold text-blue-600">37,172</p>
                </div>
              </div>
            </div>

            {/* Premium Hosting Card */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/30 dark:border-purple-500/20 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <IconCpu className="text-purple-500" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Premium Hosting</h4>
                  <Chip
                    className="text-xs mt-1"
                    color="secondary"
                    size="sm"
                    variant="flat"
                  >
                    Our Server
                  </Chip>
                </div>
              </div>
              <p className="text-sm text-default-600 mb-3 font-medium">
                AMD Ryzen 9 9950X
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-default-500">Single Thread</p>
                  <p className="text-sm font-bold text-purple-600">4,735</p>
                </div>
                <div>
                  <p className="text-xs text-default-500">CPU Mark</p>
                  <p className="text-sm font-bold text-purple-600">65,949</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
