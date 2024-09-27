import { HomeCard } from "@/components/wrappers/home/home-card";
import { MeetingActions } from "@/components/wrappers/meeting/meeting-actions";
import { Grid } from "@radix-ui/themes";
// import { Metadata } from "next";
export default function HomePage() {
  return (
    <Grid className="grid grid-rows-auto space-y-4">
      <HomeCard />
      <MeetingActions />
    </Grid>
  );
}

// export const metadata: Metadata = {
//   title: "Mahu-meeting | Home",
//   description:
//     "Mahu-meeting is a modern video conferencing application built with Next.js, offering high-quality, secure, and reliable online meeting experiences.",
// };
