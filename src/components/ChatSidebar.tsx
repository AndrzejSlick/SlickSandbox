import { ShoppingCart, Eye, Thermometer, MapPin, AlertTriangle, Car, Archive, SquarePen, MoreVertical, Plus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

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
  { id: 'biuro',    name: 'Biuro',    lastMessage: 'Michał Bugno: Ops',                      time: '14:41' },
  { id: 'feedback', name: 'Feedback', lastMessage: 'Jan Kowalski: Brak możliwości dostawy',  time: 'Yesterday' },
];

const DRIVERS: DriverEntry[] = [
  { id: 'feliks',    name: 'Feliks Solovev',          lastMessage: 'Cześć! Jedź na załadunek na autostradę A1',         time: '14:33', unread: 1, chips: [{ type: 'distance', label: '80 km' }, { type: 'route', label: 'On Route' }] },
  { id: 'dominik',  name: 'KRDRV13 Dominik Dziuban',  lastMessage: 'Załadunek jest gotowy, gdzie dziś jedziesz?',       time: '08:15', chips: [{ type: 'distance', label: '40 km' }, { type: 'temp', label: '6.5°' }, { type: 'pin' }] },
  { id: 'szymon',   name: 'Szymon Pietrov',            lastMessage: 'Jan Kowalski: jedź na załadunek na południe',       time: '11:52', chips: [{ type: 'distance', label: '195 km' }, { type: 'route', label: 'On Route' }] },
  { id: 'valerian', name: 'Valerian Umsky',            lastMessage: 'Tomasz Nowak, Niemcy',                              time: 'Yesterday', chips: [{ type: 'distance', label: '429 km' }, { type: 'status', label: 'Na trasie' }] },
  { id: 'maciej',   name: 'Maciej Nowicki',            lastMessage: 'Jan Kowalski: jedź na załadunek na południe',       time: 'Tuesday', chips: [{ type: 'distance', label: '129 km' }, { type: 'alert', label: '1+ Na trasie' }] },
  { id: 'kazimierz',name: 'Kazimierz Marczewski',      lastMessage: 'Załadunek jest gotowy, gdzie dziś jedziesz?',       time: 'Mar 24', chips: [{ type: 'distance', label: '40 km' }] },
  { id: 'roman',    name: 'Roman Marczewski',          lastMessage: 'Jestem na miejscu, czekam na rozładunek.',          time: 'Mar 23', chips: [{ type: 'distance', label: '310 km' }, { type: 'route', label: 'On Route' }] },
  { id: 'andriy',   name: 'Andriy Novak',              lastMessage: 'Przekroczyłem granicę, wszystko ok.',               time: 'Mar 22', chips: [{ type: 'distance', label: '520 km' }, { type: 'status', label: 'Na trasie' }] },
  { id: 'tomasz',   name: 'Tomasz Piątek',             lastMessage: 'Opóźnienie ok 2h ze względu na korek.',            time: 'Mar 21', chips: [{ type: 'distance', label: '180 km' }, { type: 'alert', label: 'Opóźnienie' }] },
  { id: 'kamil',    name: 'Kamil Przystupa',           lastMessage: 'Dobra, jadę na załadunek jutro rano.',              time: 'Mar 20', chips: [{ type: 'distance', label: '95 km' }] },
  { id: 'karol',    name: 'Karol Staroscic',           lastMessage: 'Temperatura ładunku w normie.',                     time: 'Mar 19', chips: [{ type: 'distance', label: '740 km' }, { type: 'temp', label: '-18°' }, { type: 'route', label: 'On Route' }] },
];

const SHARED_DRIVERS: DriverEntry[] = [
  { id: 'piotr',   name: 'Piotr Kowaleczko', lastMessage: 'Załadunek jest gotowy, gdzie dziś jedziesz?', time: 'Mar 20', chips: [{ type: 'distance', label: '429 km' }, { type: 'alert', label: 'Alert' }] },
  { id: 'szymon2', name: 'Szymon Pietrov',   lastMessage: 'Jan Kowalski: jedź na załadunek na południe', time: 'Mar 15', chips: [] },
];

// ─── Chip ─────────────────────────────────────────────────────────────────────

function ChipBadge({ chip }: { chip: Chip }) {
  if (chip.type === 'distance') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-green-700 border-green-200 bg-green-50 font-medium">
      <ShoppingCart className="size-3" />{chip.label}
    </Badge>
  );
  if (chip.type === 'route') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-green-700 border-green-200 bg-green-50 font-medium">
      <Eye className="size-3" />{chip.label}
    </Badge>
  );
  if (chip.type === 'temp') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-muted-foreground font-medium">
      <Thermometer className="size-3" />{chip.label}
    </Badge>
  );
  if (chip.type === 'pin') return (
    <Badge variant="outline" className="px-1 py-0 h-5 text-muted-foreground">
      <MapPin className="size-3" />
    </Badge>
  );
  if (chip.type === 'alert') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-red-600 border-red-200 bg-red-50 font-medium">
      <AlertTriangle className="size-3" />{chip.label}
    </Badge>
  );
  if (chip.type === 'status') return (
    <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-muted-foreground font-medium">
      <Car className="size-3" />{chip.label}
    </Badge>
  );
  return null;
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
        <span className="text-xl font-semibold text-foreground">Chats</span>
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50">
            <Archive className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50">
            <SquarePen className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50">
            <MoreVertical className="size-4" />
          </Button>
        </div>
      </div>

      {/* Command: search + grouped list */}
      <Command
        className="flex-1 min-h-0 bg-transparent rounded-none! p-0 [&>[cmdk-root]]:flex [&>[cmdk-root]]:flex-col [&>[cmdk-root]]:h-full"
      >
        <CommandInput placeholder="Search…" className="text-sm" />

        <CommandList className="max-h-none flex-1 overflow-y-auto px-1 pb-2">
          <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
            No results found.
          </CommandEmpty>

          {/* Groups */}
          <CommandGroup
            heading={
              <div className="flex items-center justify-between w-full pr-1">
                <span>Groups</span>
                <div className="flex items-center gap-1.5">
                  <Plus className="size-3.5 text-foreground/60" />
                  <ChevronDown className="size-3.5 text-foreground/60" />
                </div>
              </div>
            }
          >
            {GROUPS.map((group) => (
              <CommandItem
                key={group.id}
                value={group.id}
                keywords={[group.name, group.lastMessage]}
                className="flex-col items-start gap-0.5 py-1.5 rounded-md cursor-pointer [&>svg:last-child]:hidden"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium text-foreground truncate">{group.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{group.time}</span>
                </div>
                <span className="text-xs text-muted-foreground truncate w-full">{group.lastMessage}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1" />

          {/* Drivers */}
          <CommandGroup
            heading={
              <div className="flex items-center justify-between w-full pr-1">
                <span>Drivers</span>
                <ChevronDown className="size-3.5 text-foreground/60" />
              </div>
            }
          >
            {DRIVERS.map((driver) => (
              <CommandItem
                key={driver.id}
                value={driver.id}
                keywords={[driver.name, driver.lastMessage]}
                onSelect={() => onSelect?.(driver.id)}
                className={cn(
                  "flex-col items-start gap-1 py-2 rounded-md cursor-pointer [&>svg:last-child]:hidden",
                  selectedId === driver.id && "bg-input! data-selected:bg-input"
                )}
              >
                <div className="flex items-center justify-between w-full gap-1">
                  <span className="text-sm font-medium text-foreground truncate flex-1 min-w-0">{driver.name}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={cn('text-xs', driver.unread ? 'text-blue-600 font-medium' : 'text-muted-foreground')}>
                      {driver.time}
                    </span>
                    {driver.unread ? (
                      <span className="inline-flex items-center justify-center size-4 rounded-full bg-blue-600 text-white text-[10px] font-semibold leading-none">
                        {driver.unread}
                      </span>
                    ) : null}
                  </div>
                </div>
                <span className={cn('text-xs truncate w-full', driver.unread ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                  {driver.lastMessage}
                </span>
                {driver.chips.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {driver.chips.map((chip, i) => <ChipBadge key={i} chip={chip} />)}
                  </div>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="my-1" />

          {/* Shared Drivers */}
          <CommandGroup
            heading={
              <div className="flex items-center justify-between w-full pr-1">
                <span>Shared drivers</span>
                <ChevronDown className="size-3.5 text-foreground/60" />
              </div>
            }
          >
            {SHARED_DRIVERS.map((driver) => (
              <CommandItem
                key={driver.id}
                value={driver.id}
                keywords={[driver.name, driver.lastMessage]}
                onSelect={() => onSelect?.(driver.id)}
                className="flex-col items-start gap-1 py-2 rounded-md cursor-pointer [&>svg:last-child]:hidden"
              >
                <div className="flex items-center justify-between w-full gap-1">
                  <span className="text-sm font-medium text-foreground truncate flex-1 min-w-0">{driver.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{driver.time}</span>
                </div>
                <span className="text-xs text-muted-foreground truncate w-full">{driver.lastMessage}</span>
                {driver.chips.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {driver.chips.map((chip, i) => <ChipBadge key={i} chip={chip} />)}
                  </div>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
