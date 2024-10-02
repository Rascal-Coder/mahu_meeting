import { Heading } from "@/components/ui/heading";
import { Meeting } from "@/components/wrappers/meeting/meeting";
import { Metadata } from "next";

export default function Page() {
  return (
    <>
      <Heading title="录制的会议" />  
      <Meeting show={6} type="recordings" />
    </>
  );
}

export const metadata: Metadata = {
  title: "Mahu-meeting - 录制的会议",  
  description: "视频通话应用", 
  icons: {
    icon: "/logo/logo.svg",
  },
};
