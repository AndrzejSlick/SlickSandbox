import { X, EyeOff, Locate, ShoppingCart, PackageCheck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAP_IMAGE  = "https://www.figma.com/api/mcp/asset/fa247927-1451-421f-bfb5-dc1294aee824";
const ROUTE_PATH = "https://www.figma.com/api/mcp/asset/15689b96-5b58-4a36-8a99-dbf6c2dbb84c";

const STOPS = [
  { Icon: Locate,       label: "PL, 30-123 Czerwionka" },
  { Icon: ShoppingCart, label: "PL, 31-154 Kraków" },
  { Icon: PackageCheck, label: "CZ, 130 00 Vinohrady" },
];

function MapBadge({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="flex items-center justify-center size-6 rounded-full bg-foreground shadow-sm shrink-0">
      <Icon className="size-3 text-background" />
    </div>
  );
}

export function RouteSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full w-full bg-[#fafafa] border-l border-border">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 h-12 px-4 border-b border-border shrink-0">
        <h2 className="text-xl font-bold leading-none text-foreground">Transport order</h2>
        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          onClick={onClose}
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Map */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {/* Base map image — covers full area */}
        <img
          src={MAP_IMAGE}
          alt="Route map"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Route path overlay */}
        <div
          className="absolute pointer-events-none"
          style={{ left: "5%", top: "30%", width: "93%", height: "25%" }}
        >
          <img src={ROUTE_PATH} alt="" className="w-full h-full" style={{ objectFit: "fill" }} />
        </div>

        {/* Map pins */}
        <div className="absolute" style={{ left: "5%", top: "30%" }}>
          <MapBadge Icon={Package} />
        </div>
        <div className="absolute" style={{ left: "49%", top: "51%" }}>
          <MapBadge Icon={Package} />
        </div>
        <div className="absolute" style={{ left: "90%", top: "47%" }}>
          <MapBadge Icon={ShoppingCart} />
        </div>

        {/* Stop tracking button */}
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-4 left-4 h-8 text-xs font-medium text-destructive shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-background"
        >
          <EyeOff className="size-4 text-destructive" />
          Stop tracking
        </Button>
      </div>

      {/* Route list */}
      <div className="flex flex-col shrink-0 px-4 py-2">
        {STOPS.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-2 py-2">
            <div className="flex items-center justify-center size-8 shrink-0">
              <Icon className="size-4 text-foreground" />
            </div>
            <p className="text-xs font-medium text-accent-foreground truncate">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
