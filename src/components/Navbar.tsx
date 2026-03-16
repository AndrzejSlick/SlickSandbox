import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ─── Default icons ─────────────────────────────────────────────────────────────
const URL_TIMELINE_DEFAULT   = "https://www.figma.com/api/mcp/asset/c223539f-f8a3-4efe-bf77-d73809af2d61";
const URL_CHAT_DEFAULT       = "https://www.figma.com/api/mcp/asset/7b52c5fc-5429-41e6-b7d5-cb899bc2ff0e";
const URL_CRM_DEFAULT        = "https://www.figma.com/api/mcp/asset/447331c8-a7bd-4223-8923-8e7be13fd675";
const URL_FLEET_DEFAULT      = "https://www.figma.com/api/mcp/asset/5bdb11da-353b-495d-97d9-f43d3ef8662e";
const URL_ROUTE_DEFAULT_1    = "https://www.figma.com/api/mcp/asset/ce7a4c5f-54e0-4b3a-a911-940de7d0b9b6";
const URL_ROUTE_DEFAULT_2    = "https://www.figma.com/api/mcp/asset/63076f45-1cbc-42fe-9615-5eee6732ab26";
const URL_REPORTS_DEFAULT    = "https://www.figma.com/api/mcp/asset/45665873-f1c4-4e4c-b1fd-71dad7cb8121";

// ─── Active icons ──────────────────────────────────────────────────────────────
const URL_TIMELINE_ACTIVE    = "https://www.figma.com/api/mcp/asset/8fe7bb99-831c-443e-83be-d96cf261a8e8";
const URL_CHAT_ACTIVE        = "https://www.figma.com/api/mcp/asset/ed7f29fc-ce2e-4397-a759-edd961bbe053";
const URL_CRM_ACTIVE         = "https://www.figma.com/api/mcp/asset/9a7a9731-df3b-4d50-94d8-8cd3b80bbacc";
const URL_FLEET_ACTIVE_1     = "https://www.figma.com/api/mcp/asset/a6d7cab3-5f25-4d99-be77-6787f959ce16";
const URL_FLEET_ACTIVE_2     = "https://www.figma.com/api/mcp/asset/fce24c16-9d43-4628-a85b-fd0c078e2a7b";
const URL_ROUTE_ACTIVE_1     = "https://www.figma.com/api/mcp/asset/5a3d611d-c3b5-45a3-a416-531368cc7997";
const URL_ROUTE_ACTIVE_2     = "https://www.figma.com/api/mcp/asset/1f5d00e2-d0d3-4d83-a73c-55a6abeacf6e";
const URL_REPORTS_ACTIVE_1   = "https://www.figma.com/api/mcp/asset/ac9e05a1-2a60-48c7-ae09-703c34fdc0a6";
const URL_REPORTS_ACTIVE_2   = "https://www.figma.com/api/mcp/asset/6be8938e-279e-4b68-bee3-6607665e08f6";

// ─── Crossfade helper ──────────────────────────────────────────────────────────
// Keeps both states in the DOM and fades between them — no DOM swap = no blink.
function Crossfade({
  active,
  inactive: inactiveEl,
  activeEl,
}: {
  active: boolean;
  inactive: React.ReactNode;
  activeEl: React.ReactNode;
}) {
  return (
    <div className="relative size-5">
      <div
        className="absolute inset-0 transition-opacity duration-150 ease-in-out"
        style={{ opacity: active ? 0 : 1 }}
      >
        {inactiveEl}
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-150 ease-in-out"
        style={{ opacity: active ? 1 : 0 }}
      >
        {activeEl}
      </div>
    </div>
  );
}

// ─── Icon primitives ───────────────────────────────────────────────────────────
const IconTimeline = ({ active }: { active: boolean }) => (
  <Crossfade
    active={active}
    inactive={
      <div className="relative w-full h-full overflow-hidden">
        <img src={URL_TIMELINE_DEFAULT} alt="" className="absolute block w-full h-full" />
      </div>
    }
    activeEl={
      <div className="relative w-full h-full overflow-hidden">
        <img src={URL_TIMELINE_ACTIVE} alt="" className="absolute block w-full h-full" />
      </div>
    }
  />
);

const IconChat = ({ active }: { active: boolean }) => (
  <Crossfade
    active={active}
    inactive={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "12.47% 12.47% 8.33% 8.33%" }}>
          <div className="absolute" style={{ inset: "-4.73% -4.73% -4.74% -4.74%" }}>
            <img src={URL_CHAT_DEFAULT} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
    activeEl={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "12.47% 12.47% 8.33% 8.33%" }}>
          <div className="absolute" style={{ inset: "-4.73% -4.73% -4.74% -4.74%" }}>
            <img src={URL_CHAT_ACTIVE} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
  />
);

const IconCRM = ({ active }: { active: boolean }) => (
  <Crossfade
    active={active}
    inactive={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "8.33% 16.67% 8.33% 12.5%" }}>
          <div className="absolute" style={{ inset: "-4.5% -5.29%" }}>
            <img src={URL_CRM_DEFAULT} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
    activeEl={
      <div className="relative w-full h-full overflow-hidden">
        <img src={URL_CRM_ACTIVE} alt="" className="absolute block w-full h-full" />
      </div>
    }
  />
);

const IconFleet = ({ active }: { active: boolean }) => (
  <Crossfade
    active={active}
    inactive={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "8.33%" }}>
          <div className="absolute" style={{ inset: "-4.5%" }}>
            <img src={URL_FLEET_DEFAULT} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
    activeEl={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "8.33%" }}>
          <div className="absolute" style={{ inset: "-4.5%" }}>
            <img src={URL_FLEET_ACTIVE_1} alt="" className="block w-full h-full" />
          </div>
        </div>
        <div className="absolute" style={{ inset: "11.46% 11.79% 10.25% 8.54%" }}>
          <div className="absolute" style={{ inset: "-4.79% -4.71%" }}>
            <img src={URL_FLEET_ACTIVE_2} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
  />
);

const IconRoute = ({ active }: { active: boolean }) => (
  <Crossfade
    active={active}
    inactive={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "9.32% 16.67% 17.65% 8.33%" }}>
          <div className="absolute" style={{ inset: "-5.13% -5%" }}>
            <img src={URL_ROUTE_DEFAULT_1} alt="" className="block w-full h-full" />
          </div>
        </div>
        <div className="absolute" style={{ inset: "70.83% 4.17% 4.17% 70.83%" }}>
          <div className="absolute" style={{ inset: "-15%" }}>
            <img src={URL_ROUTE_DEFAULT_2} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
    activeEl={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "9.32% 16.67% 17.65% 8.33%" }}>
          <div className="absolute" style={{ inset: "-5.13% -5%" }}>
            <img src={URL_ROUTE_ACTIVE_1} alt="" className="block w-full h-full" />
          </div>
        </div>
        <div className="absolute" style={{ inset: "70.83% 4.17% 4.17% 70.83%" }}>
          <div className="absolute" style={{ inset: "-15%" }}>
            <img src={URL_ROUTE_ACTIVE_2} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
  />
);

const IconReports = ({ active }: { active: boolean }) => (
  <Crossfade
    active={active}
    inactive={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "12.5%" }}>
          <div className="absolute" style={{ inset: "-5%" }}>
            <img src={URL_REPORTS_DEFAULT} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
    activeEl={
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute" style={{ inset: "12.5%" }}>
          <div className="absolute" style={{ inset: "-5%" }}>
            <img src={URL_REPORTS_ACTIVE_1} alt="" className="block w-full h-full" />
          </div>
        </div>
        <div className="absolute" style={{ inset: "20.83% 20.83% 29.17% 29.17%" }}>
          <div className="absolute" style={{ inset: "-7.5%" }}>
            <img src={URL_REPORTS_ACTIVE_2} alt="" className="block w-full h-full" />
          </div>
        </div>
      </div>
    }
  />
);

// ─── Nav items config ──────────────────────────────────────────────────────────
type NavItemConfig = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ active: boolean }>;
};

const NAV_ITEMS: NavItemConfig[] = [
  { id: "timeline", label: "Timeline",      Icon: IconTimeline },
  { id: "chat",     label: "Chat",           Icon: IconChat     },
  { id: "crm",      label: "CRM",            Icon: IconCRM      },
  { id: "fleet",    label: "Fleet overview", Icon: IconFleet    },
  { id: "route",    label: "Plan route",     Icon: IconRoute    },
  { id: "reports",  label: "Reports",        Icon: IconReports  },
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
    <nav className="flex flex-col items-center justify-between shrink-0 h-full w-12 bg-muted border-r border-border">
      {/* Icon list */}
      <div className="flex flex-col items-center gap-3 px-2 pb-2" style={{ paddingTop: "16px" }}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              aria-label={label}
              onClick={() => onActiveChange(id)}
              className={cn(
                "relative flex items-center justify-center size-8 rounded-md shrink-0 cursor-pointer",
                "transition-colors duration-150 ease-in-out",
                "active:opacity-70",
                isActive ? "bg-input" : "hover:bg-input/50"
              )}
            >
              <Icon active={isActive} />
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
