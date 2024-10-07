"use client";

import { HomeCard } from "@/components/wrappers/home/home-card";
import { MeetingActions } from "@/components/wrappers/meeting/meeting-actions";
import { Grid } from "@radix-ui/themes";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";


export default  function HomePage({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = useTranslation(lng, "common");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(lng, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setDate(new Intl.DateTimeFormat(lng, { dateStyle: "full" }).format(now));
    };

    updateTime(); // 初始化时间和日期
    const interval = setInterval(updateTime, 1000); // 每秒更新

    return () => clearInterval(interval); // 清理定时器
  }, [lng]);

  useEffect(() => {
    // 设置元数据
    document.title = "Mahu-meeting | Home";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Mahu-meeting is a modern video conferencing application built with Next.js, offering high-quality, secure, and reliable online meeting experiences."
      );
    }
  }, []);
  return (
    <Grid className="grid grid-rows-auto space-y-4">
      <HomeCard
        standardTime={t("standardTime")}
        today={date}
        currentTime={time}
      />
      <MeetingActions lng={lng} t={t} />
    </Grid>
  );
}
