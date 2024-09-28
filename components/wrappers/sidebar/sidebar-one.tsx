"use client";
import React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarContextProps,
} from "@/components/ui/sidebar";

import { Links } from "@/components/ui/sidebar";
interface SidebarOneProps extends SidebarContextProps {
  links: Links[];
}
export function SidebarOne({
  open,
  setOpen,
  pinned,
  setPinned,
  animate,
  links,
}: Partial<SidebarOneProps>) {
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
              {links && links?.length
                ? links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))
                : null}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </>
  );
}
