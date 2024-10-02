import { Heading } from "@/components/ui/heading";
import { Meeting } from "@/components/wrappers/meeting/meeting";
import { Metadata } from "next";

export default function Page() {
  return (
    <>
      <Heading title="即将举行的会议" />
      <Meeting show={6} type="upcoming" />
    </>
  );
}

export const metadata: Metadata = {
  title: "Mahu-meeting - 计划中的会议",
  description: "视频通话应用",
  icons: {
    icon: "/logo/logo.svg",
  },
};
