"use client";
import { Providers } from "@/providers";
import HeaderOne from "@/components/wrappers/header/header-one";
import { SidebarOne } from "@/components/wrappers/sidebar/sidebar-one";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  return (
    <Providers>
      <div className="flex flex-col h-screen">
        <HeaderOne />
        <motion.main className="h-[calc(100vh-72px)]  flex ">
          <SidebarOne
            open={open}
            pinned={pinned}
            setOpen={setOpen}
            setPinned={setPinned}
          />
          <section className="flex-1 pt-[48px] bg-dark-1 text-white">
            <Container>{children}</Container>
          </section>
        </motion.main>
      </div>
    </Providers>
  );
}
