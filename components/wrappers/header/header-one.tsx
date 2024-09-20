import React from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Row } from "@/components/ui/row";
import { UserButton } from "@clerk/nextjs";
function HeaderOne() {
  return (
    <header className="h-[72px] fixed top-0 bg-dark-2 w-full ">
      <Container className="xl:p-inherit">
        <Row className="justify-between h-full">
          <Logo />

          <div className="ms-auto me-8">
            <UserButton afterSignOutUrl="/" />
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default HeaderOne;
