"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import React from "react";
import {
  IconPlus,
  IconUserPlus,
  IconCalendarEvent,
  IconVideo,
} from "@tabler/icons-react";
export const MeetingActions = ({ lng, t }: { lng: string; t: any }) => {
  const cards = [
    {
      id: 0,
      color: "bg-meeting",
      icon: <IconPlus />,
      title: t("createMeeting"), // 国际化
      description: t("setRecording"), // 国际化
      option: "isInstantMeeting",
    },
    {
      id: 1,
      color: "bg-primary-400",
      icon: <IconUserPlus />,
      title: t("joinMeeting"), // 国际化
      description: t("viaInviteLink"), // 国际化
      option: "isJoiningMeeting",
    },
    {
      id: 2,
      color: "bg-schedule",
      icon: <IconCalendarEvent />,
      title: t("scheduleMeeting"), // 国际化
      description: t("viaInviteLink"), // 国际化
      option: "isScheduleMeeting",
    },
    {
      id: 3,
      color: "bg-recording",
      icon: <IconVideo />,
      title: t("viewRecordings"), // 国际化
      description: t("meetingRecordings"), // 国际化
      option: undefined,
    },
  ];
  return <HoverEffect items={cards} lng={lng}  t={t} />;
};

// export
