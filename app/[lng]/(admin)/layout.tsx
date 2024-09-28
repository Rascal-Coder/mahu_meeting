"use client";
import { Providers } from "@/providers";
import HeaderOne from "@/components/wrappers/header/header-one";
import { SidebarOne } from "@/components/wrappers/sidebar/sidebar-one";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { useTranslation } from "@/app/i18n/client";
import {
  IconHome,
  IconCalendarEvent,
  IconCheckbox,
  IconVideo,
  IconDoorEnter,
} from "@tabler/icons-react";

export default function AdminLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const { t } = useTranslation(lng, "common");
  const SIDEBAR_LINKS = [
    {
      label: t("home"),
      href: "/home",
      icon: <IconHome className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("planned"),
      href: "/meeting/upcoming",
      icon: <IconCalendarEvent className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("completed"),
      href: "/meeting/previous",
      icon: <IconCheckbox className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("recorded"),
      href: "/meeting/recordings",
      icon: <IconVideo className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t("meetingRoom"),
      href: "/personalroom",
      icon: <IconDoorEnter className="text-white h-5 w-5 flex-shrink-0" />,
    },
  ];
  return (
    <Providers>
      <div className="flex flex-col h-screen">
        <HeaderOne  lng={lng}/>
        <motion.main className="h-[calc(100vh-72px)]  flex ">
          <SidebarOne
            open={open}
            pinned={pinned}
            setOpen={setOpen}
            setPinned={setPinned}
            links={SIDEBAR_LINKS}
          />
          <section className="flex-1 pt-[48px] bg-dark-1 text-white">
            <Container>{children}</Container>
          </section>
        </motion.main>
      </div>
    </Providers>
  );
}
