import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-full min-h-screen  w-full bg-dark-1 flex justify-center items-center gb-dark-1",
        className
      )}
    >
      <ClipLoader color="#3498db" size={50} className="text-white" />
    </div>
  );
};
