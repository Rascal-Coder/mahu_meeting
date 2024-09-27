import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  // DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/themes";
import { DialogTitle } from "@radix-ui/react-dialog";

const ModalMeeting = ({
  children,
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className: string;
  buttonText: string;
  handleClick: any;
  setLoading?: any;
  loading?: boolean;
  children?: any;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="bg-dark-1 text-white border-0"
      >
        <DialogHeader>
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
        </DialogHeader>
        <VisuallyHidden asChild>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        <DialogDescription className="flex flex-col gap-4 py-4">
          {children}
        </DialogDescription>

        <DialogFooter className="w-full flex justify-center">
          <Button
            onClick={handleClick}
            variant="default"
            className="w-full bg-primary-400"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMeeting;
