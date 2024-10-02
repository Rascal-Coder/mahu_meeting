import React from "react";
import { MahuClerkProvider } from "./clerk";
import { Toaster } from "react-hot-toast";
import { StreamVideoProvider } from "./streamapi";
// 全局所有注入
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MahuClerkProvider>
        <StreamVideoProvider>
          <Toaster />
          {children}
        </StreamVideoProvider>
      </MahuClerkProvider>
    </>
  );
};
