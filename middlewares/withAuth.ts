// import { getAuth, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { CustomMiddleware } from "@/lib/utils";

export const withAuth = (middleware: CustomMiddleware) => {
  return clerkMiddleware(async (auth, request, event) => {
    const publicRoutes = createRouteMatcher([
      `/sign-in(.*)`,
      `/sign-up(.*)`,
      `/`,
    ]);
    // 检查是否为公共路由,如果是公共路由，直接放行
    if (publicRoutes(request)) {
      const response = NextResponse.next();
      // return response;
      return await middleware(request, event, response);
    }

    const { userId } = auth();

    // 如果用户未登录（没有userId） 重定向至落地页
    if (!userId) {
      const landingUrl = new URL("/", request.url);
      const response = NextResponse.redirect(landingUrl);
      // return response;
      return await middleware(request, event, response);
    }
    const response = NextResponse.next();
    // return response;
    return await middleware(request, event, response);
  });
};
