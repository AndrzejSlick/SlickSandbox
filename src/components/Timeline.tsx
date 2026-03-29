import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ChatMap, ChatMessages } from '@/components/ChatMain';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ─── Sparkle icon ─────────────────────────────────────────────────────────────

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M4.46774 7.25012C4.4231 7.07709 4.33291 6.91918 4.20655 6.79282C4.08019 6.66646 3.92227 6.57626 3.74924 6.53162L0.681738 5.74062C0.629403 5.72577 0.583342 5.69425 0.550544 5.65085C0.517745 5.60744 0.5 5.55453 0.5 5.50012C0.5 5.44572 0.517745 5.39281 0.550544 5.3494C0.583342 5.306 0.629403 5.27448 0.681738 5.25962L3.74924 4.46812C3.92221 4.42353 4.08008 4.33341 4.20644 4.20714C4.33279 4.08088 4.42302 3.92307 4.46774 3.75012L5.25874 0.682625C5.27344 0.630084 5.30493 0.583795 5.3484 0.550822C5.39187 0.517848 5.44493 0.5 5.49949 0.5C5.55405 0.5 5.60711 0.517848 5.65058 0.550822C5.69405 0.583795 5.72553 0.630084 5.74024 0.682625L6.53074 3.75012C6.57538 3.92316 6.66557 4.08107 6.79193 4.20743C6.91829 4.33379 7.0762 4.42399 7.24924 4.46862L10.3167 5.25912C10.3695 5.27367 10.416 5.30513 10.4492 5.34866C10.4823 5.3922 10.5003 5.44541 10.5003 5.50012C10.5003 5.55484 10.4823 5.60805 10.4492 5.65159C10.416 5.69512 10.3695 5.72657 10.3167 5.74112L7.24924 6.53162C7.0762 6.57626 6.91829 6.66646 6.79193 6.79282C6.66557 6.91918 6.57538 7.07709 6.53074 7.25012L5.73974 10.3176C5.72503 10.3702 5.69355 10.4165 5.65008 10.4494C5.60661 10.4824 5.55355 10.5002 5.49899 10.5002C5.44443 10.5002 5.39137 10.4824 5.3479 10.4494C5.30443 10.4165 5.27294 10.3702 5.25824 10.3176L4.46774 7.25012Z"
        fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

const DATES = ['28.03.2026', '29.03.2026', '30.03.2026', '31.03.2026'];

// Today line position — 62.5% = halfway through day 3 (30.03)
const TODAY_PCT = 62.5;

type Color = 'green' | 'red' | 'outline';

type RouteBar = {
  from?: string;
  to?: string;
  fromFlag?: string;
  toFlag?: string;
  startPct: number;
  widthPct: number;
  color: Color;
};

type DriverRow = {
  truckId: string;
  name: string;
  bars: RouteBar[];
  automations: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const DRIVERS: DriverRow[] = [
  {
    truckId: 'LB 43534',
    name: 'Szymon Pietrov',
    bars: [
      { startPct: 2, widthPct: 20, color: 'green' },
      { from: 'PL, 45-10HU', to: 'HU, 01-222', fromFlag: '🇵🇱', toFlag: '🇭🇺', startPct: 51, widthPct: 48, color: 'outline' },
    ],
    automations: ['Jedzie wytyczoną trasą', 'Przerwa za 45 min'],
  },
  {
    truckId: 'LBL 42435',
    name: 'Valerian Umsky',
    bars: [
      { startPct: 2, widthPct: 20, color: 'green' },
      { from: 'PL, 12-433', to: 'PL, 23-400', fromFlag: '🇵🇱', toFlag: '🇵🇱', startPct: 51, widthPct: 48, color: 'outline' },
    ],
    automations: ['Paliwo: 65%, tankowanie jutro', 'Bez opóźnień na trasie'],
  },
  {
    truckId: 'LBL 43523',
    name: 'Feliks Solovev',
    bars: [
      { from: 'PL, 23-110', to: 'CZ, 40-200', fromFlag: '🇵🇱', toFlag: '🇨🇿', startPct: 2, widthPct: 97, color: 'red' },
    ],
    automations: ['Opóźnienie 3 min · 394 km', 'Następna praca zagrożona'],
  },
  {
    truckId: 'LB 23432',
    name: 'Roman Marczewski',
    bars: [
      { from: 'PL, 30-200', to: 'FR, 02-020', fromFlag: '🇵🇱', toFlag: '🇫🇷', startPct: 2, widthPct: 97, color: 'green' },
    ],
    automations: ['Jedzie wytyczoną trasą', 'ETA Paryż: 30.03 14:30'],
  },
  {
    truckId: 'LBL 53422',
    name: 'Karol Staroscic',
    bars: [
      { from: 'PL, 45-10HU', to: 'HU, 01-222', fromFlag: '🇵🇱', toFlag: '🇭🇺', startPct: 51, widthPct: 48, color: 'outline' },
    ],
    automations: ['Temp. ładunku: -18°C ✓', 'Bez alertów na trasie'],
  },
  {
    truckId: 'LBL 54210',
    name: 'Marek Zawisza',
    bars: [
      { from: 'DE, 33-100', to: 'PL, 31-580', fromFlag: '🇩🇪', toFlag: '🇵🇱', startPct: 26, widthPct: 73, color: 'green' },
    ],
    automations: ['Powrót z DE do PL', 'ETA Kraków: 30.03 18:00'],
  },
  {
    truckId: 'LB 62311',
    name: 'Andriy Novak',
    bars: [
      { from: 'PL, 80-180', to: 'PL, 05-820', fromFlag: '🇵🇱', toFlag: '🇵🇱', startPct: 26, widthPct: 73, color: 'green' },
    ],
    automations: ['Jedzie wytyczoną trasą', 'Granica PL za 2h'],
  },
  {
    truckId: 'LBL 77841',
    name: 'Tomasz Piatek',
    bars: [
      { from: 'CZ, 60-200', to: 'PL, 31-100', fromFlag: '🇨🇿', toFlag: '🇵🇱', startPct: 76, widthPct: 23, color: 'red' },
    ],
    automations: ['Opóźnienie: korek na A1', 'Nowa ETA: +1h 30 min'],
  },
  {
    truckId: 'LB 80192',
    name: 'Kamil Przystupa',
    bars: [
      { from: 'PL, 10-110', to: 'DE, 80-538', fromFlag: '🇵🇱', toFlag: '🇩🇪', startPct: 26, widthPct: 73, color: 'green' },
    ],
    automations: ['Jedzie wytyczoną trasą', 'Załadunek jutro o 09:00'],
  },
  {
    truckId: 'LBL 11230',
    name: 'Dominik Dziuban',
    bars: [
      { from: 'PL, 40-100', to: 'DE, 10-115', fromFlag: '🇵🇱', toFlag: '🇩🇪', startPct: 2, widthPct: 60, color: 'green' },
    ],
    automations: ['Temp. -18°C w normie', 'ETA Warszawa: 14:30'],
  },
  {
    truckId: 'LB 34521',
    name: 'Maciej Nowicki',
    bars: [
      { from: 'DE, 20-354', to: 'PL, 00-001', fromFlag: '🇩🇪', toFlag: '🇵🇱', startPct: 26, widthPct: 48, color: 'outline' },
    ],
    automations: ['Oczekiwanie na rozładunek', 'Postój: 35 min'],
  },
  {
    truckId: 'LBL 65432',
    name: 'Kazimierz Marczewski',
    bars: [
      { from: 'PL, 50-100', to: 'FR, 75-001', fromFlag: '🇵🇱', toFlag: '🇫🇷', startPct: 51, widthPct: 48, color: 'outline' },
    ],
    automations: ['Jedzie wytyczoną trasą', 'ETA Paryż: 31.03 10:00'],
  },
  {
    truckId: 'LB 92310',
    name: 'Piotr Kowaleczko',
    bars: [
      { from: 'CZ, 11-150', to: 'PL, 60-001', fromFlag: '🇨🇿', toFlag: '🇵🇱', startPct: 2, widthPct: 73, color: 'red' },
    ],
    automations: ['Alert: przekroczenie czasu', 'Skontaktuj się z kierowcą'],
  },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const BAR_COLORS: Record<Color, string> = {
  green:   'bg-green-100 border border-green-200 text-foreground',
  red:     'bg-red-100 border border-red-200 text-foreground',
  outline: 'bg-gray-100 border border-border text-foreground',
};

// Driver col = w-44 = 176px, Automations col = w-32 = 128px, Gantt = 4 × 200px = 800px
const DRIVER_COL_W = 176;
const AUTO_COL_W   = 128;
const GANTT_W      = 800;
const TODAY_LEFT   = DRIVER_COL_W + AUTO_COL_W + GANTT_W * (TODAY_PCT / 100);

// ─── DriverMapHeader ──────────────────────────────────────────────────────────

function DriverMapHeader({ driver, onClose }: { driver: DriverRow; onClose: () => void }) {
  return (
    <div className="relative flex items-center gap-2 px-3 h-14 bg-white border-b border-border shrink-0">
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-sm font-medium text-foreground leading-tight truncate">{driver.name}</span>
        <span className="text-xs text-muted-foreground truncate">{driver.truckId}</span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <TabsList className="h-8">
          <TabsTrigger value="map" className="text-xs px-5 h-6">Map</TabsTrigger>
          <TabsTrigger value="chat" className="text-xs px-5 h-6">Chat</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex items-center gap-0.5 shrink-0 ml-auto">
        <Button variant="ghost" size="icon" className="size-7" onClick={onClose}><X className="size-4" /></Button>
      </div>
    </div>
  );
}

// ─── GanttTable ───────────────────────────────────────────────────────────────

function GanttTable({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="h-full overflow-auto relative">
      {/* Single today line spanning the full table height */}
      <div
        className="absolute top-10 bottom-0 w-px bg-blue-500 pointer-events-none z-[5]"
        style={{ left: `${TODAY_LEFT}px` }}
      />
      <Table className="border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {/* Drivers sticky header */}
            <TableHead className="sticky left-0 z-20 bg-muted w-44 min-w-[176px] text-xs font-medium text-muted-foreground border-b border-r border-border">
              Drivers
            </TableHead>
            {/* Automations sticky header */}
            <TableHead className="sticky left-44 z-20 bg-muted w-32 min-w-[128px] text-xs font-medium text-muted-foreground border-b border-r border-border">
              Automations
            </TableHead>
            {/* Date headers */}
            {DATES.map(date => (
              <TableHead
                key={date}
                className="w-[200px] min-w-[200px] bg-muted/60 text-xs font-medium text-muted-foreground border-b border-r border-border last:border-r-0 text-center"
              >
                {date}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {DRIVERS.map(driver => (
            <TableRow
              key={driver.truckId}
              className={cn(
                'cursor-pointer',
                selectedId === driver.truckId ? 'bg-muted/40' : 'hover:bg-muted/30',
              )}
              onClick={() => onSelect(driver.truckId)}
            >
              {/* Driver cell — sticky left */}
              <TableCell className={cn(
                'sticky left-0 z-20 py-2 w-44 min-w-[176px] border-b border-r border-border/50',
                selectedId === driver.truckId ? 'bg-muted' : 'bg-white',
              )}>
                <div className="flex flex-col min-w-0 gap-0.5 px-1">
                  <span className="text-sm font-medium text-foreground leading-tight truncate">{driver.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{driver.truckId}</span>
                </div>
              </TableCell>

              {/* Automations cell — sticky after driver col */}
              <TableCell className={cn(
                'sticky left-44 z-20 py-2 w-32 min-w-[128px] border-b border-r border-border/50',
                selectedId === driver.truckId ? 'bg-muted' : 'bg-white',
              )}>
                <div className="flex flex-col gap-1 px-1">
                  {driver.automations.map((text, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <SparkleIcon className="text-purple-700 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-snug truncate">{text}</span>
                    </div>
                  ))}
                </div>
              </TableCell>

              {/* Gantt area — spans all 4 date columns */}
              <TableCell colSpan={4} className="relative p-0 border-b border-border/50" style={{ height: 56 }}>
                {[25, 50, 75].map(pct => (
                  <div
                    key={pct}
                    className="absolute top-0 bottom-0 w-px bg-border/40 pointer-events-none"
                    style={{ left: `${pct}%` }}
                  />
                ))}
                {driver.bars.filter(bar => bar.from).map((bar, i) => (
                  <div
                    key={i}
                    className={cn(
                      'absolute top-1/2 -translate-y-1/2 h-8 rounded-md flex items-center px-2.5 gap-1.5 text-xs font-medium overflow-hidden',
                      BAR_COLORS[bar.color],
                    )}
                    style={{ left: `calc(${bar.startPct}% + 4px)`, width: `calc(${bar.widthPct}% - 8px)` }}
                  >
                    <span className="shrink-0 text-sm leading-none">{bar.fromFlag}</span>
                    <span className="truncate">{bar.from} → {bar.to}</span>
                    <span className="shrink-0 text-sm leading-none">{bar.toFlag}</span>
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

export function Timeline() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedDriver = DRIVERS.find(d => d.truckId === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Gantt table — shrinks to 50% when map is open */}
      <div className={cn('h-full overflow-hidden transition-all duration-200', selectedId ? 'w-1/2 border-r border-border' : 'flex-1')}>
        <GanttTable selectedId={selectedId} onSelect={handleSelect} />
      </div>

      {/* Map panel — slides in from right */}
      {selectedDriver && (
        <Tabs defaultValue="map" className="w-1/2 h-full flex flex-col overflow-hidden gap-0">
          <DriverMapHeader driver={selectedDriver} onClose={() => setSelectedId(null)} />
          <TabsContent value="map" className="flex-1 min-h-0 overflow-hidden mt-0">
            <ChatMap />
          </TabsContent>
          <TabsContent value="chat" className="flex-1 min-h-0 overflow-hidden mt-0">
            <ChatMessages />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
