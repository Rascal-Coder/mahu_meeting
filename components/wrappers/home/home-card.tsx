"use client";
import { Button } from "@/components/ui/button";
export const HomeCard = ({
  standardTime,
  currentTime,
  today,
}: {
  standardTime: string;
  currentTime: string;
  today: string;
}) => {
  return (
    <div className="w-full h-full bg-[url('/images/card_bg.webp')] bg-cover rounded-lg p-12">
      <div className="flex flex-col justify-between gap-1 items-center md:items-start h-full">
        <Button className="bg-dark-2 text-white w-fit text-sm font-normal">
          {standardTime}
        </Button>
        <div className="flex flex-col gap-2 h-full mt-auto items-center md:items-start justify-end">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white">
            {currentTime}
          </h1>
          <p className="text-white text-base lg:text-[24px] capitalize">
            {today}
          </p>
        </div>
      </div>
    </div>
  );
};
