import React from "react";
import { MahuClerkProvider } from "./clerk";
import { Toaster } from "react-hot-toast";
// 全局所有注入
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MahuClerkProvider>
        <Toaster />
        {children}
      </MahuClerkProvider>
    </>
  );
};
