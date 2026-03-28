import { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const DRIVERS = [
  {
    id: 'feliks',
    name: 'Feliks Solovev',
    vehicle: 'KK 43211',
    jobs: [
      { id: 1, label: 'FR 70123 → Warszawa', start: 6, end: 11.5, color: 'blue' },
      { id: 2, label: 'FR 70456 → Kraków', start: 13, end: 19, color: 'blue' },
    ],
  },
  {
    id: 'dominik',
    name: 'KRDRV13 Dominik Dziuban',
    vehicle: 'KK 57200',
    jobs: [
      { id: 3, label: 'FR 70789 → Gdańsk', start: 8, end: 15, color: 'blue' },
    ],
  },
  {
    id: 'szymon',
    name: 'Szymon Pietrov',
    vehicle: 'KK 57112',
    jobs: [
      { id: 4, label: 'FR 1370 → Berlin', start: 5, end: 18, color: 'blue' },
    ],
  },
  {
    id: 'valerian',
    name: 'Valerian Umsky',
    vehicle: 'KK 33401',
    jobs: [
      { id: 5, label: 'FR 20011 → Poznań', start: 10, end: 14, color: 'blue' },
      { id: 6, label: 'FR 20012 → Wrocław', start: 15.5, end: 22, color: 'blue' },
    ],
  },
  {
    id: 'maciej',
    name: 'Maciej Nowicki',
    vehicle: 'KK 12900',
    jobs: [
      { id: 7, label: 'FR 55001 → Łódź', start: 7, end: 10, color: 'orange' },
      { id: 8, label: 'FR 55002 → Lublin', start: 12, end: 20, color: 'blue' },
    ],
  },
  {
    id: 'kazimierz',
    name: 'Kazimierz Marczewski',
    vehicle: 'KK 98710',
    jobs: [
      { id: 9, label: 'FR 88001 → Katowice', start: 9, end: 17, color: 'blue' },
    ],
  },
];

const TODAY = new Date(2026, 2, 28); // March 28, 2026

function formatDate(date: Date) {
  return date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-500 text-white',
  orange: 'bg-orange-400 text-white',
  green: 'bg-green-500 text-white',
};

const ROW_HEIGHT = 56;
const SIDEBAR_WIDTH = 200;
const HOUR_WIDTH = 64;

export function Timeline() {
  const [date, setDate] = useState(TODAY);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const prevDay = () => setDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1));
  const nextDay = () => setDate(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));
  const goToday = () => setDate(TODAY);

  const nowHour = 11.8; // ~11:48

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-muted py-2 pr-2">
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden rounded-xl border border-border/50 bg-white shadow-xs" style={{ borderWidth: '0.5px' }}>

        {/* Toolbar */}
        <div className="shrink-0 flex items-center gap-3 px-4 h-14 border-b border-border bg-white">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50" onClick={prevDay}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-7 rounded hover:bg-input/50" onClick={nextDay}>
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <span className="text-sm font-semibold text-foreground capitalize">
            {formatDate(date)}
          </span>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs rounded hover:bg-input/50 text-muted-foreground ml-1"
            onClick={goToday}
          >
            <CalendarDays className="size-3.5 mr-1" />
            Today
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
              {DRIVERS.length} drivers
            </Badge>
          </div>
        </div>

        {/* Gantt body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Driver sidebar */}
          <div className="shrink-0 border-r border-border overflow-y-auto" style={{ width: SIDEBAR_WIDTH }}>
            {/* Header spacer */}
            <div className="h-8 border-b border-border bg-muted/40" />

            {DRIVERS.map((driver, i) => (
              <div
                key={driver.id}
                className={cn(
                  'flex flex-col justify-center px-3 border-b border-border',
                  i % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                )}
                style={{ height: ROW_HEIGHT }}
              >
                <span className="text-xs font-medium text-foreground truncate">{driver.name}</span>
                <span className="text-[10px] text-muted-foreground">{driver.vehicle}</span>
              </div>
            ))}
          </div>

          {/* Timeline scroll area */}
          <div className="flex-1 min-w-0 overflow-x-auto overflow-y-auto">
            <div style={{ width: HOURS.length * HOUR_WIDTH, minWidth: '100%' }}>

              {/* Hour headers */}
              <div className="flex h-8 border-b border-border bg-muted/40 sticky top-0 z-10">
                {HOURS.map(h => (
                  <div
                    key={h}
                    className="shrink-0 flex items-center justify-start pl-2 border-r border-border/50"
                    style={{ width: HOUR_WIDTH }}
                  >
                    <span className="text-[10px] text-muted-foreground">
                      {h.toString().padStart(2, '0')}:00
                    </span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="relative">
                {/* Now line */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-blue-500/60 z-20 pointer-events-none"
                  style={{ left: nowHour * HOUR_WIDTH }}
                >
                  <div className="absolute -top-0 -left-1 size-2 rounded-full bg-blue-500" />
                </div>

                {DRIVERS.map((driver, i) => (
                  <div
                    key={driver.id}
                    className={cn(
                      'relative border-b border-border flex items-center',
                      i % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                    )}
                    style={{ height: ROW_HEIGHT, width: HOURS.length * HOUR_WIDTH }}
                  >
                    {/* Hour grid lines */}
                    {HOURS.map(h => (
                      <div
                        key={h}
                        className="absolute top-0 bottom-0 border-r border-border/30"
                        style={{ left: h * HOUR_WIDTH }}
                      />
                    ))}

                    {/* Jobs */}
                    {driver.jobs.map(job => (
                      <button
                        key={job.id}
                        onClick={() => setSelectedJobId(selectedJobId === job.id ? null : job.id)}
                        className={cn(
                          'absolute rounded-md px-2 flex items-center transition-opacity cursor-pointer',
                          COLOR_MAP[job.color],
                          selectedJobId === job.id ? 'ring-2 ring-offset-1 ring-blue-400' : 'hover:opacity-90'
                        )}
                        style={{
                          left: job.start * HOUR_WIDTH + 2,
                          width: (job.end - job.start) * HOUR_WIDTH - 4,
                          height: 34,
                        }}
                      >
                        <span className="text-[10px] font-medium truncate">{job.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
