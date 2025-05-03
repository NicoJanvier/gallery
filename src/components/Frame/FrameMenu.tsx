import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { SquareDashed, X } from "lucide-react";

export const FrameMenu = ({
  children,
  toggleMask,
  handleDelete,
}: React.PropsWithChildren<{
  toggleMask: () => void;
  handleDelete: () => void;
}>) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={toggleMask}>
          <SquareDashed /> Mask
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete}>
          <X /> Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
