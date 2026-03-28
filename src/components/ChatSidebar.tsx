import { Search, Plus, ChevronDown, ShoppingCart, Eye, Thermometer, MapPin, AlertTriangle, Car, Archive, SquarePen, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

// ─── Types ────────────────────────────────────────────────────────────────────

type Chip =
  | { type: 'distance'; label: string }
  | { type: 'route'; label: string }
  | { type: 'temp'; label: string }
  | { type: 'pin' }
  | { type: 'alert'; label: string }
  | { type: 'status'; label: string };

type DriverEntry = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  timeBlue?: boolean;
  unread?: number;
  hasCarIcon?: boolean;
  chips: Chip[];
};

type GroupEntry = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const GROUPS: GroupEntry[] = [
  { id: 'biuro', name: 'Biuro', lastMessage: 'Michał Bugno: Ops', time: '14:41' },
  { id: 'feedback', name: 'Feedback', lastMessage: 'Jan Kowalski: Brak możliwości dostawy', time: 'Yesterday' },
];

const DRIVERS: DriverEntry[] = [
  {
    id: 'feliks',
    name: 'Feliks Solovev',
    lastMessage: 'Cześć! Jedź na załadunek na autostradę A1',
    time: '14:33',
    chips: [{ type: 'distance', label: '80 km' }, { type: 'route', label: 'On Route' }],
  },
  {
    id: 'dominik',
    name: 'KRDRV13 Dominik Dziuban',
    lastMessage: 'Załadunek jest gotowy, gdzie dziś jedziesz?',
    time: '08:15',
    chips: [{ type: 'distance', label: '40 km' }, { type: 'temp', label: '6.5°' }, { type: 'pin' }],
  },
  {
    id: 'szymon',
    name: 'Szymon Pietrov',
    lastMessage: 'Jan Kowalski: jedź na załadunek na południe',
    time: '11:52',
    chips: [{ type: 'distance', label: '195 km' }, { type: 'route', label: 'On Route' }],
  },
  {
    id: 'valerian',
    name: 'Valerian Umsky',
    lastMessage: 'Tomasz Nowak, Niemcy',
    time: 'Yesterday',
    chips: [{ type: 'distance', label: '429 km' }, { type: 'status', label: 'Na trasie' }],
  },
  {
    id: 'maciej',
    name: 'Maciej Nowicki',
    lastMessage: 'Jan Kowalski: jedź na załadunek na południe',
    time: 'Tuesday',
    chips: [{ type: 'distance', label: '129 km' }, { type: 'alert', label: '1+ Na trasie' }],
  },
  {
    id: 'kazimierz',
    name: 'Kazimierz Marczewski',
    lastMessage: 'Załadunek jest gotowy, gdzie dziś jedziesz?',
    time: 'Mar 24',
    chips: [{ type: 'distance', label: '40 km' }],
  },
];

const SHARED_DRIVERS: DriverEntry[] = [
  {
    id: 'piotr',
    name: 'Piotr Kowaleczko',
    lastMessage: 'Załadunek jest gotowy, gdzie dziś jedziesz?',
    time: 'Mar 20',
    chips: [{ type: 'distance', label: '429 km' }, { type: 'alert', label: 'Alert' }],
  },
  {
    id: 'szymon2',
    name: 'Szymon Pietrov',
    lastMessage: 'Jan Kowalski: jedź na załadunek na południe',
    time: 'Mar 15',
    chips: [],
  },
];

// ─── Chip component ────────────────────────────────────────────────────────────

function ChipBadge({ chip }: { chip: Chip }) {
  if (chip.type === 'distance') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-green-700 border-green-200 bg-green-50 font-medium">
      <ShoppingCart className="size-3" />
      {chip.label}
    </Badge>
  );
  if (chip.type === 'route') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-green-700 border-green-200 bg-green-50 font-medium">
      <Eye className="size-3" />
      {chip.label}
    </Badge>
  );
  if (chip.type === 'temp') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-muted-foreground font-medium">
      <Thermometer className="size-3" />
      {chip.label}
    </Badge>
  );
  if (chip.type === 'pin') return (
    <Badge variant="outline" className="px-1 py-0 h-5 text-muted-foreground">
      <MapPin className="size-3" />
    </Badge>
  );
  if (chip.type === 'alert') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-red-600 border-red-200 bg-red-50 font-medium">
      <AlertTriangle className="size-3" />
      {chip.label}
    </Badge>
  );
  if (chip.type === 'status') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-muted-foreground font-medium">
      <Car className="size-3" />
      {chip.label}
    </Badge>
  );
  return null;
}

// ─── Tile components ──────────────────────────────────────────────────────────

function GroupTile({ group }: { group: GroupEntry }) {
  return (
    <button className="w-full text-left flex flex-col gap-1 px-2 py-2 rounded-md hover:bg-input/50 transition-colors">
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-medium text-foreground truncate">{group.name}</span>
        <span className="text-xs text-muted-foreground shrink-0 ml-2">{group.time}</span>
      </div>
      <span className="text-xs text-muted-foreground truncate w-full">{group.lastMessage}</span>
    </button>
  );
}

function DriverTile({ driver, selected, onClick }: { driver: DriverEntry; selected?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left flex flex-col gap-1 px-2 py-2 rounded-md transition-colors',
        selected ? 'bg-input' : 'hover:bg-input/50'
      )}
    >
      <div className="flex items-center justify-between w-full gap-1">
        <span className="text-xs font-medium text-foreground truncate flex-1 min-w-0">{driver.name}</span>
        <span className="text-xs shrink-0 text-muted-foreground">{driver.time}</span>
      </div>

      <div className="flex items-center gap-1 w-full">
        <span className="text-xs text-muted-foreground truncate flex-1 min-w-0">{driver.lastMessage}</span>
      </div>

      {driver.chips.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {driver.chips.map((chip, i) => (
            <ChipBadge key={i} chip={chip} />
          ))}
        </div>
      )}
    </button>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionLabel({ label, showPlus }: { label: string; showPlus?: boolean }) {
  return (
    <div className="flex items-center justify-between px-2 pt-4 pb-1 opacity-70">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {showPlus && <Plus className="size-4 text-foreground" />}
        <ChevronDown className="size-4 text-foreground" />
      </div>
    </div>
  );
}

// ─── ChatSidebar ──────────────────────────────────────────────────────────────

export function ChatSidebar({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col w-[280px] h-full bg-muted shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-4 pb-2 shrink-0">
        <span className="text-xl font-semibold text-foreground">Chat</span>
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50">
            <Archive className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50">
            <Search className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50">
            <SquarePen className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50">
            <MoreVertical className="size-4" />
          </Button>
        </div>
      </div>

      {/* Search — hidden for now */}

      {/* Scrollable content */}
      <ScrollArea className="flex-1 min-h-0">
        {/* Groups */}
        <div className="px-2">
          <SectionLabel label="Groups" showPlus />
          <div className="flex flex-col gap-1">
            {GROUPS.map((group) => (
              <GroupTile key={group.id} group={group} />
            ))}
          </div>
        </div>

        {/* Drivers */}
        <div className="px-2">
          <SectionLabel label="Drivers" />
          <div className="flex flex-col gap-1">
            {DRIVERS.map((driver) => (
              <DriverTile
                key={driver.id}
                driver={driver}
                selected={selectedId === driver.id}
                onClick={() => onSelect?.(driver.id)}
              />
            ))}
          </div>
        </div>

        {/* Shared Drivers */}
        <div className="px-2 pb-2">
          <SectionLabel label="Shared drivers" />
          <div className="flex flex-col gap-1">
            {SHARED_DRIVERS.map((driver) => (
              <DriverTile key={driver.id} driver={driver} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
