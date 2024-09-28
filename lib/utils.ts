import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";
import { NextMiddlewareResult } from 'next/dist/server/web/types'
import type { NextFetchEvent, NextRequest } from 'next/server'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware

export function chain(
  functions: MiddlewareFactory[],
  index = 0
): CustomMiddleware {
  const current = functions[index]

  if (current) {
    const next = chain(functions, index + 1)
    return current(next)
  }
  return (
    _request: NextRequest,
    _event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response
  }
}
