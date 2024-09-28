"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import React from "react";
import {
  IconPlus,
  IconUserPlus,
  IconCalendarEvent,
  IconVideo,
} from "@tabler/icons-react";
export const MeetingActions = () => {
  return <HoverEffect items={cards} />;
};

export const cards = [
  {
    id: 0,
    color: "bg-meeting",
    icon: <IconPlus />,
    title: "创建会议",
    description: "设置录音。",
    option: "isInstantMeeting",
  },
  {
    id: 1,
    color: "bg-primary-400",
    icon: <IconUserPlus />,
    title: "加入会议",
    description: "通过邀请链接。",
    option: "isJoiningMeeting",
  },
  {
    id: 2,
    color: "bg-schedule",
    icon: <IconCalendarEvent />,
    title: "计划会议",
    description: "通过邀请链接。",
    option: "isScheduleMeeting",
  },
  {
    id: 3,
    color: "bg-recording",
    icon: <IconVideo />,
    title: "查看录音",
    description: "会议录音。",
    option: undefined,
  },
];
