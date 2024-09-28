import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import acceptLanguage from "accept-language";
import { CustomMiddleware } from "@/lib/utils";
import { fallbackLng, languages, cookieName } from "@/app/i18n/settings";
export const withI18n = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    if (
      request.nextUrl.pathname.indexOf("icon") > -1 ||
      request.nextUrl.pathname.indexOf("chrome") > -1
    )
      return await middleware(request, event, response);
    let lng: string | undefined | null;
    if (request.cookies.has(cookieName))
      lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
    if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    // Redirect if lng in path is not supported
    if (
      !languages.some((loc) =>
        request.nextUrl.pathname.startsWith(`/${loc}`)
      ) &&
      !request.nextUrl.pathname.startsWith("/_next")
    ) {
      const response = NextResponse.redirect(
        new URL(
          `/${lng}${request.nextUrl.pathname}${request.nextUrl.search}`,
          request.url
        )
      );
      return await middleware(request, event, response);
    }

    if (request.headers.has("referer")) {
      const refererUrl = new URL(request.headers.get("referer") || "");
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return await middleware(request, event, response);
    }

    return await middleware(request, event, response);
  };
};
