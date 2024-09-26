"use client";
import React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarContextProps,
} from "@/components/ui/sidebar";
import { useSidebarLinks } from "@/lib/hooks/useSidebarLinks";
export function SidebarOne({
  open,
  setOpen,
  pinned,
  setPinned,
  animate
}: Partial<SidebarContextProps>) {
  const { SIDEBAR_LINKS } = useSidebarLinks();
  return (
    <>
      <Sidebar
        open={open}
        setOpen={setOpen}
        setPinned={setPinned}
        pinned={pinned}
        animate={animate}
      >
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {SIDEBAR_LINKS.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </>
  );
}
