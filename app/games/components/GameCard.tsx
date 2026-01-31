"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import { IconServer, IconRocket } from "@tabler/icons-react";

interface Game {
  id: number;
  name: string;
  slug: string;
  category: string;
  imageUrl: string;
  planCount: number;
}

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link passHref href={"https://clients.raehost.com/new-order"}>
      <div
        className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer h-[300px] md:h-[500px] flex flex-col transform transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Game Image with Overlay */}
        <div className="relative w-full h-full">
          {/* Background Image - Next.js Image Optimized */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              fill
              alt={game.name}
              className={`object-cover transition-transform duration-700 ease-in-out ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={game.imageUrl}
            />
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

          {/* Category Badge */}
          <div className="absolute top-3 right-3 z-20">
            <Chip
              className="font-medium text-xs"
              color="primary"
              radius="md"
              variant="shadow"
            >
              {game.category}
            </Chip>
          </div>

          {/* Game Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col space-y-2 z-20">
            <h3 className="text-xl font-bold text-white">{game.name}</h3>

            {/* Plans info */}
            <div className="flex items-center text-white/80 text-sm">
              <IconServer className="mr-1 h-4 w-4" />
              <span>Available</span>
            </div>
          </div>
        </div>

        {/* Hover Content - Reveals on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 flex flex-col justify-center items-center p-5 space-y-4 transition-opacity duration-300 z-30 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center space-y-3">
            <h3 className="text-xl font-bold text-white">{game.name}</h3>
            <p className="text-white/80 text-sm">
              Deploy your {game.name} server in minutes with our optimized
              configurations.
            </p>
          </div>

          <Button className="mt-3" color="primary" radius="md">
            <IconRocket className="mr-2 h-4 w-4" />
            Deploy Server
          </Button>
        </div>
      </div>
    </Link>
  );
};
