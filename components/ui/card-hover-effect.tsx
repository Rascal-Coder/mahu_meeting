"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconButton } from "@radix-ui/themes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ModalMeeting from "./modal-meeting";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Input } from "./input";
import { Textarea } from "./textarea";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { zhCN } from "date-fns/locale/zh-CN";
import { enUS } from "date-fns/locale/en-US";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

export const HoverEffect = ({
  items,
  className,
  lng,
  t,
}: {
  items: {
    title: string;
    description: string;
    id: number;
    color: string;
    icon: React.ReactNode;
    option: any;
  }[];
  className?: string;
  lng: string;
  t: any;
}) => {
  registerLocale(lng === "zh" ? "zh-CN" : "en-US", lng === "zh" ? zhCN : enUS);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  const [titleMeeting, setTitleMeeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  const createMeeting = async () => {
    if (!client || !user) {
      toast.error(" Stream-io Client not found");
      setMeetingState(undefined)
      return;
    }
    try {
      if (!values.dateTime) {
        toast(t("selectDateTime"));
        return;
      }

      if (meetingState === "isScheduleMeeting" && !values.description) {
        toast(t("reenterMeetingTitle"));
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error(t("linkCreationError"));
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || t("frontendDevelopment");
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast(t("meetingCreated"));
    } catch (error) {
      console.error(error);
      toast(t("meetingFailed"));
    }
  };

  const handleClick = (item: any) => {
    setMeetingState(item.option);
    setTitleMeeting(item.title);
    if (item.option === undefined) {
      router.push("/meeting/recordings");
    }
  };

  return (
    <div className={cn("grid grid-cols-1", className)}>
      <Carousel>
        <CarouselContent>
          {items.map((item, idx) => (
            <CarouselItem
              className="basis-1/1 md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
              key={idx}
            >
              <div
                key={item?.id}
                className="relative group block p-2 h-full w-full  cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full  bg-white dark:bg-slate-800/[0.8] block rounded-3xl w-full"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                <div
                  onClick={() => handleClick(item)}
                  className={cn(
                    "relative z-50 px-4 py-6 rounded-[14px] w-[300px] md:w-full md:min-w-[280px] cursor-pointer",
                    item.color
                  )}
                >
                  <div className="flex justify-between flex-col w-full h-full">
                    <div>
                      <IconButton
                        color="gray"
                        radius="large"
                        variant="soft"
                        className="p-2 text-gray-50"
                      >
                        {item.icon}
                      </IconButton>
                    </div>

                    <div className="mt-6">
                      <h1 className="capitalize text-base lg:text-xl font-bold">
                        {item.title}
                      </h1>
                      <p className="text-sm font-normal">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ModalMeeting
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => {
          setMeetingState(undefined);
          setLoading(!loading);
        }}
        title={titleMeeting}
        className="text-center"
        buttonText={t("start")}
        handleClick={() => router.push(values.link)}
        loading={loading}
        setLoading={setLoading}
      >
        <Input
          placeholder={t("pasteLinkHere")}
          onChange={(e: any) => setValues({ ...values, link: e.target.value })}
          className="border-none text-center text-black text-xl bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </ModalMeeting>

      <ModalMeeting
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
          setLoading(false);
        }}
        title={titleMeeting}
        className="text-center"
        buttonText={t("start")}
        handleClick={createMeeting}
        loading={loading}
        setLoading={setLoading}
      ></ModalMeeting>

      {!callDetail ? (
        <ModalMeeting
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
            setLoading(false);
          }}
          title={t("scheduleMeeting")}
          handleClick={createMeeting}
          loading={loading}
          setLoading={setLoading}
          className="bg-dark-1"
          buttonText={t("scheduleMeeting")}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              {t("description")}
            </label>
            <Textarea
              autoFocus
              required
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e: any) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              {t("chooseDateTime")}
            </label>
            <ReactDatePicker
              required
              locale={lng === "zh" ? "zh-CN" : "en-US"}
              selected={values.dateTime}
              onChange={(date: any) =>
                setValues({ ...values, dateTime: date! })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption={lng === "zh" ? "时间" : "Time"}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </ModalMeeting>
      ) : (
        <ModalMeeting
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
            setLoading(false);
          }}
          title={t("meetingCreated")}
          loading={loading}
          setLoading={setLoading}
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast(t("linkCopied"));
          }}
          className="text-center"
          buttonText={t("copyLink")}
        />
      )}
    </div>
  );
};
