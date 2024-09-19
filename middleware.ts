import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 定义白名单
const publicRoutes = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware((auth, request) => {
  // 检查是否为公共路由,如果是公共路由，直接放行
  if (publicRoutes(request)) {
    return NextResponse.next();
  }

  const { userId } = auth();
  console.log('userId',userId);
  
  // 如果用户未登录（没有userId） 重定向至落地页
  if (!userId) {
    const landingUrl = new URL("/", request.url);
    return NextResponse.redirect(landingUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
