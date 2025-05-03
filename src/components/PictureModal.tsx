import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const PictureModal = ({
  trigger,
  url,
  name,
}: {
  trigger: React.ReactNode;
  url: string;
  name: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div>
          <img src={url} className="h-80" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
