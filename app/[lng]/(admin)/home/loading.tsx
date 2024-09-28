'use client'
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";

export default function Page() {
  const [divCount, setDivCount] = useState(4); // 默认显示 4 个

  useEffect(() => {
    const updateDivCount = () => {
      if (window.innerWidth < 640) setDivCount(1); // 小屏幕
      else if (window.innerWidth < 768) setDivCount(2); // 中小屏幕
      else if (window.innerWidth < 1024) setDivCount(3); // 中屏幕
      else setDivCount(4); // 大屏幕
    };

    updateDivCount(); // 初始化时调用一次
    window.addEventListener("resize", updateDivCount); // 监听窗口大小变化

    return () => {
      window.removeEventListener("resize", updateDivCount); // 清理事件监听器
    };
  }, []);

  return (
    <section className="pt-6 py-6 bg-dark-1 flex-1 text-white">
      <Container>
        <div className="flex flex-col gap-8 animate-pulse h-full items-center px-6 md:px-0">
          <div className="flex-1 w-full max-h-[260px] rounded-lg p-12 bg-slate-200"></div>

          <div className="flex-1 flex gap-8 max-h-40 w-full">
            {Array.from({ length: divCount }).map((_, index) => (
              <div key={index} className="relative z-50 flex-1 min-w-[100px] py-8 rounded-[14px] bg-slate-200"></div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}