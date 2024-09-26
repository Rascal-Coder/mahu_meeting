"use client";

import { BackgroundBeams } from "./background-beams";
import { useRouter } from "next/navigation";
export function HeroLanding() {
  const router = useRouter();
  return (
    // bg-neutral-950
    <div className="h-screen w-full  bg-dark-1  relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Mahu-meeting
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-xl text-center relative z-10">
          the most popular instant messaging and video conferencing platform.
        </p>
        <div className="flex items-center justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <button
            onClick={()=>router.push("/sign-in")}
            className="w-40 h-10 rounded-xl bg-dark-2 border border-white hover:border-blue-500 hover:text-blue-500 text-white text-sm z-50"
          >
            Join now
          </button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default HeroLanding;
