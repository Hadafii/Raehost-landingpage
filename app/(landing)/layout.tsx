"use client";
import React from "react";
import { usePathname } from "next/navigation";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SnowfallBackground } from "@/components/ui/Snowflakes";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Rule: untuk halaman home ("/") gunakan isTransparent={false}, selainnya true
  const isTransparent = pathname !== "/awda";

  return (
    <>
      <SnowfallBackground
        count={150}
        speed={0.1}
        minSize={1}
        maxSize={40}
        minOpacity={0}
        maxOpacity={1}
        color={"#ffffff"}
        wind={true}
        zIndex={999}
      />
      <div className="flex flex-col min-h-dvh ">
        <Navbar isTransparent={isTransparent} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default layout;
