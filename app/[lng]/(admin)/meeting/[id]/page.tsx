import { Metadata } from "next";
import { Meeting } from "./components/meeting";

export default function Page({ params }: { params: { id: string } }) {

  return (
    <Meeting id={params.id} />
  );
}

export const metadata: Metadata = {
  title: "Mahu-meeting - 会议配置",
  description: "Mahu-meeting - 会议配置",
  icons: {
    icon: "/logo/logo.svg",
  },
}