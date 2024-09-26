import { useTranslation } from 'react-i18next';
import {
  IconHome,
  IconCalendarEvent,
  IconCheckbox,
  IconVideo,
  IconDoorEnter,
} from "@tabler/icons-react";

export const useSidebarLinks = () => {
  const { t } = useTranslation();

  const SIDEBAR_LINKS = [
    {
      label: t('home'),
      href: "/home",
      icon: <IconHome className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t('planned'),
      href: "/meeting/upcoming",
      icon: <IconCalendarEvent className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t('completed'),
      href: "/meeting/previous",
      icon: <IconCheckbox className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t('recorded'),
      href: "/meeting/recordings",
      icon: <IconVideo className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: t('meetingRoom'),
      href: "/personalroom",
      icon: <IconDoorEnter className="text-white h-5 w-5 flex-shrink-0" />,
    },
  ];

  return { SIDEBAR_LINKS };
};