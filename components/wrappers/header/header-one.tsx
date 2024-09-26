import React from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Row } from "@/components/ui/row";
import { UserButton } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";

function HeaderOne() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="h-[72px] fixed top-0 bg-dark-2 w-full ">
      <Container className="xl:p-inherit">
        <Row className="justify-between h-full">
          <Logo />

          <div className="ms-auto me-8">
            <UserButton afterSignOutUrl="/" />
          </div>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </Row>
      </Container>
    </header>
  );
}

export default HeaderOne;
