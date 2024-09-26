'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: "Home",
          planned: "Planned",
          completed: "Completed",
          recorded: "Recorded",
          meetingRoom: "Meeting Room"
        }
      },
      zh: {
        translation: {
          home: "首页",
          planned: "计划中",
          completed: "已完成",
          recorded: "已录制",
          meetingRoom: "会议室"
        }
      }
    },
    lng: "zh", // 默认语言
    fallbackLng: "en", // 后备语言
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;