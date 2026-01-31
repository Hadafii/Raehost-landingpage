"use client";
import React, { useEffect, useState } from "react";
import { Spinner, Button } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Gamepad2, Clock, Server } from "lucide-react";
import { Chip } from "@heroui/react";

import { GameCard } from "./GameCard";
import GameCategoryFilter from "./GameCategoryFilter";

import BlurText from "@/components/ui/BlurText";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";

interface Game {
  id: number;
  name: string;
  slug: string;
  category: string;
  imageUrl: string;
  planCount: number;
}

export default function GamesClient() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/games");

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();

        setGames(data.games);
        setFilteredGames(data.games);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load games. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredGames(
        games.filter((game) => game.category === selectedCategory),
      );
    } else {
      setFilteredGames(games);
    }
  }, [selectedCategory, games]);

  // Extract unique categories from games
  const categories = Array.from(new Set(games.map((game) => game.category)));

  return (
    <>
      {/* Game Banner Section */}
      <section className="relative overflow-hidden text-white py-10">
        {/* Background Image dengan Next.js Image */}
        <div className="absolute inset-0">
          <Image
            fill
            priority
            alt="Games Background"
            className="object-cover"
            quality={85}
            src="/assets/landing/Banner6.png"
          />
          {/* Blur Effect */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20 dark:bg-black/60" />
        </div>

        <div className="relative container mx-auto px-6 py-16">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <Gamepad2 className="text-white" size={48} />
              </div>
            </div>
            <BlurText
              animateBy="words"
              className="text-4xl md:text-5xl font-bold mb-4"
              delay={200}
              direction="top"
              text="Game Server Kece Badai!"
            />
            <TextGenerateEffect
              className="text-2xl  max-w-3xl mx-auto mb-6"
              duration={0.8}
              words="Bikin server game impian lo cuma dalam hitungan menit, gak pake ribet! Pilih aja game favorit, klik deploy, langsung gas main bareng squad!"
            />
            <div className="flex flex-wrap justify-center gap-3">
              <Chip
                className="text-white bg-white/20 backdrop-blur-sm border border-white/10"
                color="primary"
                startContent={<Server size={16} />}
                variant="flat"
              >
                Deploy dalam &lt;1 Menit
              </Chip>
              <Chip
                className="text-white bg-white/20 backdrop-blur-sm border border-white/10"
                color="success"
                startContent={<Clock size={16} />}
                variant="flat"
              >
                Support 24/7
              </Chip>
              <Chip
                className="text-white bg-white/20 backdrop-blur-sm border border-white/10"
                color="warning"
                variant="flat"
              >
                {games.length || 20}+ Game Tersedia
              </Chip>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="relative">
        <div className="container mx-auto py-10 px-4">
          {/* Game Categories Filter */}
          {categories.length > 0 && (
            <GameCategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}

          {/* Games Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button color="primary" onPress={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No games found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-8">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
