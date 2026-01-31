"use client";
import React from "react";
import { Chip, Button } from "@heroui/react";
import { IconFilter, IconX } from "@tabler/icons-react";

interface GameCategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const GameCategoryFilter: React.FC<GameCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="mb-8 bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          <IconFilter className="text-gray-500" size={18} />
          <span className="text-sm font-medium">Filter by category:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip
            key="all"
            className="cursor-pointer transition-all duration-300"
            color={selectedCategory === null ? "primary" : "default"}
            radius="md"
            variant={selectedCategory === null ? "solid" : "flat"}
            onClick={() => onCategoryChange(null)}
          >
            All Games
          </Chip>

          {categories.map((category) => (
            <Chip
              key={category}
              className="cursor-pointer transition-all duration-300"
              color={selectedCategory === category ? "primary" : "default"}
              radius="md"
              variant={selectedCategory === category ? "solid" : "flat"}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Chip>
          ))}

          {selectedCategory && (
            <Button
              isIconOnly
              className="ml-2"
              color="danger"
              radius="full"
              size="sm"
              variant="light"
              onPress={() => onCategoryChange(null)}
            >
              <IconX size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCategoryFilter;
