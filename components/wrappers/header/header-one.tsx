"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Row } from "@/components/ui/row";
import { UserButton } from "@clerk/nextjs";
import { useTranslation } from "@/app/i18n/client";
import { IconLanguage } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname ,useRouter} from "next/navigation";
function HeaderOne({ lng }: { lng: string }) {
  const { i18n } = useTranslation(lng, "common");
  const [language, setLanguage] = useState(i18n.language);

  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (lng: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = lng;
    return segments.join("/");
  };
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    const redirectUrl= redirectedPathName(lng);
    router.push(redirectUrl);
  };

  return (
    <header className="h-[72px] bg-dark-2 w-full px-4 md:px-0">
      <Container className="xl:p-inherit">
        <Row className="justify-between h-full">
          <Logo />

          <div className="ms-auto me-8 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="mr-4">
                <div className="text-white hover:text-primary-400 cursor-pointer transform duration-500 flex items-center gap-2">
                  <IconLanguage />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={changeLanguage}
                >
                  <DropdownMenuRadioItem value="zh">中文</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">
                    English
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-[32px] h-[32px]",
                  userButtonAvatarBox: "w-[32px] h-[32px]",
                  userButtonTrigger: "focus:shadow-none",
                },
              }}
            />
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default HeaderOne;
