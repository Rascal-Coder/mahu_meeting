import React from "react";
import {MahuClerkProvider} from "./clerk"
// 全局所有注入
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MahuClerkProvider
      >
        {children}
      </MahuClerkProvider>
    </>
  );
};
