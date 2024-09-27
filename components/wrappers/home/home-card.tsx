// "use client";
// import React from "react";
// import { Button } from '@/components/ui/button'
// import { useTranslation } from 'next-i18next';

// export const HomeCard = () => {
//   const { t, i18n } = useTranslation();
//   const now = new Date();

//   const time = now.toLocaleTimeString(i18n.language, {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   });
//   const date = new Intl.DateTimeFormat(i18n.language, { dateStyle: "full" }).format(now);

//   return (
//     <div className="w-full h-full bg-[url('/images/card_bg.webp')] bg-cover rounded-lg p-12">
//       <div className="flex flex-col justify-between gap-1 items-center md:items-start h-full">
//         <Button className='bg-dark-2 text-white w-fit text-sm font-normal'>
//           {t('standardTime')}
//         </Button>
//         <div className="flex flex-col gap-2 h-full mt-auto items-center md:items-start justify-end">
//           <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white">
//             {t('currentTime', { time })}
//           </h1>
//           <p className="text-white text-base lg:text-[24px] capitalize">
//             {t('today', { date })}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import React, { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { useTranslation } from 'next-i18next';

export const HomeCard = () => {
  const { t, i18n } = useTranslation();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }));
      setDate(new Intl.DateTimeFormat(i18n.language, { dateStyle: "full" }).format(now));
    };

    updateTime(); // 初始化时间和日期
    const interval = setInterval(updateTime, 1000); // 每秒更新

    return () => clearInterval(interval); // 清理定时器
  }, [i18n.language]);

  return (
    <div className="w-full h-full bg-[url('/images/card_bg.webp')] bg-cover rounded-lg p-12">
      <div className="flex flex-col justify-between gap-1 items-center md:items-start h-full">
        <Button className='bg-dark-2 text-white w-fit text-sm font-normal'>
          {t('standardTime')}
        </Button>
        <div className="flex flex-col gap-2 h-full mt-auto items-center md:items-start justify-end">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white">
            {t('currentTime', { time })}
          </h1>
          <p className="text-white text-base lg:text-[24px] capitalize">
            {t('today', { date })}
          </p>
        </div>
      </div>
    </div>
  );
};
