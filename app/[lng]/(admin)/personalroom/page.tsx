import { Heading } from "@/components/ui/heading";
import { Personnal } from "@/components/wrappers/personnalinfo/personnal";
import { Metadata } from "next";

export default function Page() {
  return (
    <>
      <Heading title="我的会议个人房间" />
      <Personnal />
    </>
  );
}

export const metadata: Metadata = {
  title: "Mahu-meeting - 个人房间",
  description: "视频通话应用",
  icons: {
    icon: "/logo/logo.png",
  },
};
