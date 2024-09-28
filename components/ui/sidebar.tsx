"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconPinned,
  IconPinnedOff,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

export interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  pinned: boolean;
  setPinned: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  setPinned: setPinnedProp,
  animate = true,
  pinned: pinnedProp,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setPinned?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  pinned?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const [pinnedState, setPinnedState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;
  const pinned = pinnedProp !== undefined ? pinnedProp : pinnedState;
  const setPinned =
    setPinnedProp !== undefined ? setPinnedProp : setPinnedState;

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, animate, pinned, setPinned }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar: React.FC<
  Partial<SidebarContextProps> & React.PropsWithChildren
> = ({ children, open, setOpen, setPinned, animate, pinned }) => {
  return (
    <SidebarProvider
      open={open}
      setOpen={setOpen}
      setPinned={setPinned}
      animate={animate}
      pinned={pinned}
    >
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate, pinned, setPinned } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4  hidden md:flex md:flex-col bg-dark-2 text-white w-[300px] flex-shrink-0 relative",
          className
        )}
        animate={{
          width: animate ? (open || pinned ? "300px" : "68px") : "300px",
        }}
        onMouseEnter={() => !pinned && setOpen(true)}
        onMouseLeave={() => !pinned && setOpen(false)}
        {...props}
      >
        <button
          className="absolute top-4 right-6 text-white"
          onClick={() => setPinned(!pinned)}
        >
          {pinned ? <IconPinned size={20} /> : <IconPinnedOff size={20} />}
        </button>
        <>{children}</>
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
    {/* h-[72px] px-4 py-4 */}
      <div
        className={cn(
          "h-[72px] flex flex-row md:hidden items-center justify-between absolute top-0 bg-transparent right-4"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2 className="text-white" onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-[264px] inset-0 bg-dark-2 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-white"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();
  const isActive = link.href === pathname;

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-2 group/sidebar py-2 rounded-md  justify-start px-2 transition-colors duration-200",
        isActive 
          ? "bg-primary-400 text-white" 
          : "bg-transparent text-gray-300 hover:bg-primary-400/30 hover:text-white",
        className
      )}
      {...props}
    >
      <span className={cn(
        "transition-transform duration-200",
        isActive ? "text-white" : "text-gray-300 group-hover/sidebar:text-white"
      )}>
        {link.icon}
      </span>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "text-sm whitespace-pre inline-block !p-0 !m-0 transition-all duration-200",
          isActive ? "font-medium" : "group-hover/sidebar:translate-x-1"
        )}
      >
        {/* 强制大驼峰 */}
        {link.label.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')}
      </motion.span>
    </Link>
  );
};


export default Sidebar;
