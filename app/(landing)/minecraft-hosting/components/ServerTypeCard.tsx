import { useState } from "react";
import { motion } from "framer-motion";

// Icons from Lucide
import { Pickaxe, Puzzle, Zap, Settings } from "lucide-react";

const ServerTypeCard = () => {
  const [selectedServerType, setSelectedServerType] = useState("vanilla");

  type ColorType = "green" | "blue" | "yellow" | "purple";

  interface ServerType {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    features: string[];
    recommended: boolean;
    color: ColorType;
  }

  const serverTypes: ServerType[] = [
    {
      id: "vanilla",
      name: "Vanilla Minecraft",
      description: "Experience Minecraft murni tanpa modifikasi",
      icon: Pickaxe,
      features: [
        "Pure Minecraft experience",
        "Official Mojang updates",
        "Compatible dengan semua client",
      ],
      recommended: true,
      color: "green",
    },
    {
      id: "bukkit",
      name: "Bukkit/Spigot",
      description: "Support plugin untuk enhance gameplay",
      icon: Puzzle,
      features: [
        "Thousands of plugins available",
        "Economy systems",
        "Mini-games support",
      ],
      recommended: true,
      color: "blue",
    },
    {
      id: "paper",
      name: "Paper",
      description: "High performance fork dari Spigot",
      icon: Zap,
      features: [
        "Better performance",
        "Anti-cheat improvements",
        "Advanced configuration",
      ],
      recommended: false,
      color: "yellow",
    },
    {
      id: "forge",
      name: "Forge Modded",
      description: "Support mod untuk gameplay yang lebih rich",
      icon: Settings,
      features: ["Mod support", "Tech & magic mods", "Adventure modpacks"],
      recommended: false,
      color: "purple",
    },
  ];

  // Color mapping for dynamic classes
  const colorClasses: Record<
    ColorType,
    {
      border: string;
      bg: string;
      bgLight: string;
      text: string;
      hoverBg: string;
    }
  > = {
    green: {
      border: "border-green-500",
      bg: "bg-green-500",
      bgLight: "bg-green-100",
      text: "text-green-600",
      hoverBg: "group-hover:bg-green-50 dark:group-hover:bg-green-900/10",
    },
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-500",
      bgLight: "bg-blue-100",
      text: "text-blue-600",
      hoverBg: "group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-500",
      bgLight: "bg-yellow-100",
      text: "text-yellow-600",
      hoverBg: "group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/10",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-500",
      bgLight: "bg-purple-100",
      text: "text-purple-600",
      hoverBg: "group-hover:bg-purple-50 dark:group-hover:bg-purple-900/10",
    },
  };

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pilih Tipe Server
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Dari vanilla murni hingga modded server
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {serverTypes.map((type) => {
          const colors = colorClasses[type.color];
          const Icon = type.icon;

          return (
            <motion.div
              key={type.id}
              className="h-full"
              transition={{ duration: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div
                className={`group cursor-pointer h-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedServerType === type.id
                    ? colors.border
                    : "border-gray-200 dark:border-gray-700 hover:shadow-lg"
                }`}
                role="button"
                onClick={() => setSelectedServerType(type.id)}
              >
                <div
                  className={`p-6 ${colors.hoverBg} transition-colors duration-300 h-full flex flex-col`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg ${colors.bgLight} flex-shrink-0`}
                    >
                      <Icon className={colors.text} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{type.name}</h3>
                      {type.recommended && (
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full text-white ${colors.bg} mt-1`}
                        >
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mt-auto">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServerTypeCard;
