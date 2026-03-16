import { Search, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <div className="flex items-center justify-between h-12 pl-4 pr-6 bg-[#fafafa] border-b border-border shrink-0">
      <h1 className="text-2xl font-bold leading-8 text-foreground">CMR Documents</h1>
      <div className="flex items-center gap-0.5">
        <Button variant="ghost" size="icon" className="size-7 rounded-md">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-7 rounded-md">
          <EllipsisVertical className="size-4" />
        </Button>
      </div>
    </div>
  );
}
