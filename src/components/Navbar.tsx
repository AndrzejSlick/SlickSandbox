import React from "react";
import {
  SquareGanttChart,
  MessageCircle,
  Files,
  Map,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ─── Custom Timeline active icon ───────────────────────────────────────────────
function TimelineActiveIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 17 17"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14.083 0C15.4177 0 16.5 1.0823 16.5 2.41699V14.083C16.5 15.4177 15.4177 16.5 14.083 16.5H2.41699C1.0823 16.5 0 15.4177 0 14.083V2.41699C0 1.0823 1.0823 0 2.41699 0H14.083ZM7.41699 10.835C7.15725 10.835 6.92757 10.9664 6.79297 11.167C6.71243 11.2865 6.66602 11.4309 6.66602 11.5859C6.66602 12.0002 7.0018 12.3359 7.41602 12.3359H11.583C11.8935 12.3358 12.1596 12.1469 12.2734 11.8779C12.3118 11.7879 12.333 11.689 12.333 11.585C12.333 11.1707 11.9972 10.835 11.583 10.835H7.41699ZM4.91699 7.50098C4.66884 7.50098 4.44999 7.6229 4.31348 7.80859C4.2216 7.93307 4.16602 8.08635 4.16602 8.25293C4.16619 8.66699 4.50191 9.00293 4.91602 9.00293H9.91602C10.2517 9.00293 10.5313 8.78064 10.627 8.47656C10.6496 8.40502 10.667 8.33002 10.667 8.25098C10.6668 7.83702 10.3309 7.50115 9.91699 7.50098H4.91699ZM5.75 4.16797C5.43899 4.16797 5.17224 4.35729 5.05859 4.62695C5.02057 4.7167 4.99907 4.81534 4.99902 4.91895C4.99902 5.33305 5.33496 5.66877 5.74902 5.66895H11.583C11.8936 5.66881 12.1596 5.48009 12.2734 5.21094C12.3117 5.12088 12.333 5.02199 12.333 4.91797C12.333 4.50376 11.9972 4.16797 11.583 4.16797H5.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Custom Fleet icon ─────────────────────────────────────────────────────────
function FleetIcon({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      width="16" height="16" viewBox="6 6 20 20"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M23.9493 18.5013H20.166C19.724 18.5013 19.3001 18.6769 18.9875 18.9895C18.6749 19.302 18.4993 19.7259 18.4993 20.168V23.9513M11.8327 8.78471V10.168C11.8327 10.8311 12.0961 11.467 12.5649 11.9358C13.0338 12.4046 13.6696 12.668 14.3327 12.668C14.7747 12.668 15.1986 12.8436 15.5112 13.1562C15.8238 13.4688 15.9993 13.8927 15.9993 14.3347C15.9993 15.2514 16.7493 16.0014 17.666 16.0014C18.108 16.0014 18.532 15.8258 18.8445 15.5132C19.1571 15.2007 19.3327 14.7767 19.3327 14.3347C19.3327 13.418 20.0827 12.668 20.9993 12.668H23.641M15.1659 24.293V21.0013C15.1659 20.5593 14.9903 20.1354 14.6777 19.8228C14.3651 19.5102 13.9412 19.3346 13.4992 19.3346C13.0572 19.3346 12.6332 19.159 12.3207 18.8465C12.0081 18.5339 11.8325 18.11 11.8325 17.668V16.8346C11.8325 16.3926 11.6569 15.9687 11.3444 15.6561C11.0318 15.3436 10.6079 15.168 10.1659 15.168H7.70752M24.3327 16.0013C24.3327 20.6037 20.6017 24.3346 15.9993 24.3346C11.397 24.3346 7.66602 20.6037 7.66602 16.0013C7.66602 11.3989 11.397 7.66797 15.9993 7.66797C20.6017 7.66797 24.3327 11.3989 24.3327 16.0013Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Nav items config ──────────────────────────────────────────────────────────
type NavItemConfig = {
  id: string;
  label: string;
  Icon: LucideIcon | React.ComponentType<{ className?: string; strokeWidth?: number }>;
  ActiveIcon?: React.ComponentType<{ className?: string }>;
  fillOnActive?: boolean;
  badge?: boolean;
};

const NAV_ITEMS: NavItemConfig[] = [
  { id: "chat",     label: "Chat",          Icon: MessageCircle,    fillOnActive: true, badge: true },
  { id: "timeline", label: "Timeline",      Icon: SquareGanttChart, ActiveIcon: TimelineActiveIcon },
  { id: "crm",      label: "CRM",           Icon: Files            },
  { id: "fleet",    label: "Fleet",         Icon: FleetIcon        },
  { id: "route",    label: "Plan route",    Icon: Map              },
  { id: "reports",  label: "Reports",       Icon: BarChart3        },
];

// ─── Navbar ────────────────────────────────────────────────────────────────────
export function Navbar({
  activeId,
  onActiveChange,
}: {
  activeId: string;
  onActiveChange: (id: string) => void;
}) {
  return (
    <nav className="flex flex-col items-center justify-between shrink-0 h-full w-12 bg-muted border-r border-border/50">
      {/* Icon list */}
      <div className="flex flex-col items-center gap-3 px-2 pb-2" style={{ paddingTop: "16px" }}>
        {NAV_ITEMS.map(({ id, label, Icon, ActiveIcon, fillOnActive, badge }) => {
          const isActive = activeId === id;
          const filled = isActive && fillOnActive;
          const DisplayIcon = isActive && ActiveIcon ? ActiveIcon : Icon;
          return (
            <button
              key={id}
              aria-label={label}
              onClick={() => onActiveChange(id)}
              className={cn(
                "relative flex items-center justify-center size-8 rounded-md shrink-0 cursor-pointer",
                "transition-colors duration-150 ease-in-out",
                "active:opacity-70",
                isActive ? "bg-input text-foreground" : "text-muted-foreground hover:bg-input/50 hover:text-foreground"
              )}
            >
              <DisplayIcon
                className={cn("size-4", filled && "[&_path]:fill-current [&_path]:stroke-none")}
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              {badge && (
                <span className="absolute top-1 right-1 size-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Avatar */}
      <div className="p-2 w-full">
        <Avatar>
          <AvatarFallback className="bg-green-200 text-foreground text-sm font-normal">
            AW
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
