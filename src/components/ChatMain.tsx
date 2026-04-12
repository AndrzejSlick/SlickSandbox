import { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Search, MoreVertical, Paperclip, Smile, ArrowUp, Plus, Phone, ChevronDown, Locate, ShoppingCart, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: number;
  role: 'me' | 'driver';
  text: string;
  time: string;
  date: string;
};

type StopIcon = 'locate' | 'cart' | 'package';

type RouteStop = {
  icon: StopIcon;
  label: string;
  distance?: string;
};

type DriverData = {
  name: string;
  plate: string;
  meta: string;
  messages: Message[];
  routeDone: [number, number][];
  routeAhead: [number, number][];
  driverPosition: [number, number];
  mapCenter: [number, number];
  mapZoom: number;
  stops: RouteStop[];
  progressLabel: string;
  progressRight: string;
  progressPct: number;
};

// ─── Per-driver data ──────────────────────────────────────────────────────────

const DRIVER_DATA: Record<string, DriverData> = {
  szymon: {
    name: 'Szymon Pietrov',
    plate: 'KK 57112 (648 394 km)',
    meta: 'Auto 300x300x300,  Winda - spi do 13',
    messages: [
      { id: 1, role: 'me',     text: 'Prośba o wysłania zdjecia załadunku, dzięki',           time: '09:14', date: 'Yesterday' },
      { id: 2, role: 'driver', text: 'Na A2 wypadek, zjeżdżam na S17. Dam znać jak sytuacja.', time: '09:17', date: 'Yesterday' },
      { id: 3, role: 'driver', text: 'Będę z opóźnieniem ok 20 min.',                           time: '09:18', date: 'Yesterday' },
      { id: 4, role: 'me',     text: 'Jakie są opłaty drogowe na trasie Kraków - Berlin? 😀😀', time: '11:03', date: 'Yesterday' },
      { id: 5, role: 'driver', text: 'Około 80 zł w każdą stronę.',                             time: '11:45', date: 'Yesterday' },
      { id: 6, role: 'me',     text: 'Ok, dzięki. Jedź ostrożnie!',                             time: '11:46', date: 'Yesterday' },
      { id: 7, role: 'driver', text: 'Jestem już za granicą, wszystko ok.',                     time: '14:22', date: 'Today' },
      { id: 8, role: 'me',     text: 'Super, daj znać jak dojedziesz na miejsce.',              time: '14:30', date: 'Today' },
    ],
    routeDone: [
      [20.00, 50.05], // Kraków
      [19.45, 50.10], // Chrzanów
      [18.95, 50.25], // Katowice
      [18.68, 50.28], // Gliwice
      [18.52, 49.95], // Cieszyn
      [18.15, 49.75], // Frýdek-Místek
      [17.88, 49.53], // Příbor
      [17.45, 49.47], // Přerov — driver
    ],
    routeAhead: [
      [17.45, 49.47], // Přerov
      [17.10, 49.30], // north of Brno
      [16.60, 49.19], // Brno
      [15.95, 49.48], // Velké Meziříčí
      [15.55, 49.60], // Jihlava
      [15.10, 49.85], // Benešov direction
      [14.75, 50.00], // near Prague ring
      [14.42, 50.08], // Prague
    ],
    driverPosition: [17.45, 49.47],
    mapCenter: [17.2, 50.3],
    mapZoom: 6,
    stops: [
      { icon: 'locate', label: 'PL, 30-123 Czerwionka' },
      { icon: 'cart',    label: 'PL, 31-154 Kraków',          distance: '195 km' },
      { icon: 'package', label: 'CZ, 130 00 Vinohrady',       distance: '240 km' },
    ],
    progressLabel: '7h 00m done (Break in 0h 45m) · Ends 23:00',
    progressRight: '2h 00m left',
    progressPct: 78,
  },

  dominik: {
    name: 'KRDRV13 Dominik Dziuban',
    plate: 'LBL 11230 (312 845 km)',
    meta: 'Chłodnia 300x200x180, temp -18°C',
    messages: [
      { id: 1, role: 'me',     text: 'Dominik, kiedy wyruszasz z Biłgoraja?',                          time: '07:30', date: 'Today' },
      { id: 2, role: 'driver', text: 'Jestem już w drodze, załadunek był gotowy o 7:00.',              time: '07:45', date: 'Today' },
      { id: 3, role: 'me',     text: 'Załadunek jest gotowy w Lublinie, jedź od razu na magazyn.',     time: '08:00', date: 'Today' },
      { id: 4, role: 'driver', text: 'Okej, będę tam za około 1,5 godziny.',                           time: '08:05', date: 'Today' },
      { id: 5, role: 'driver', text: 'Załadunek jest gotowy, gdzie dziś jedziesz?',                    time: '08:15', date: 'Today' },
      { id: 6, role: 'me',     text: 'Jedź do Warszawy, rozładunek na Żeraniu.',                       time: '08:20', date: 'Today' },
      { id: 7, role: 'driver', text: 'Rozumiem, jadę. Temperatura w normie, -18°C.',                   time: '09:10', date: 'Today' },
      { id: 8, role: 'me',     text: 'Świetnie, powiadom mnie gdy dojedziesz do Radomia.',             time: '09:15', date: 'Today' },
    ],
    routeDone: [
      [22.72, 50.54], // Biłgoraj — start
      [22.41, 50.71], // Frampol
      [22.22, 50.93], // Kraśnik
      [22.57, 51.25], // Lublin
      [21.97, 51.42], // Puławy — driver here
    ],
    routeAhead: [
      [21.97, 51.42], // Puławy
      [21.15, 51.40], // Radom
      [20.87, 51.86], // Grójec
      [21.01, 52.23], // Warszawa
    ],
    driverPosition: [21.97, 51.42],
    mapCenter: [21.7, 51.5],
    mapZoom: 7.5,
    stops: [
      { icon: 'locate',  label: 'PL, 23-400 Biłgoraj' },
      { icon: 'cart',    label: 'PL, 20-001 Lublin',      distance: '120 km' },
      { icon: 'package', label: 'PL, 03-301 Warszawa',    distance: '175 km' },
    ],
    progressLabel: '3h 30m done (Break in 1h 15m) · Ends 17:00',
    progressRight: '3h 30m left',
    progressPct: 48,
  },
};

const FALLBACK_DRIVER_ID = 'szymon';

// ─── Header ───────────────────────────────────────────────────────────────────

function ChatHeader({ data }: { data: DriverData }) {
  return (
    <div className="flex items-center gap-4 px-3 h-14 bg-white border-b border-border shrink-0">
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">{data.name}</span>
        </div>
        <div className="flex items-center gap-2 text-xs min-w-0">
          <span className="text-muted-foreground whitespace-nowrap">{data.plate}</span>
          <span className="h-3.5 w-px bg-border shrink-0" />
          <span className="text-muted-foreground truncate">{data.meta}</span>
        </div>
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        <Button variant="ghost" size="icon" className="size-7">
          <Phone className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-7">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-7">
          <MoreVertical className="size-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Chat messages area ───────────────────────────────────────────────────────

export function ChatMessages({ data }: { data?: DriverData }) {
  const resolved = data ?? DRIVER_DATA[FALLBACK_DRIVER_ID];
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(resolved.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Reset messages when driver changes
  useEffect(() => {
    setMessages(resolved.messages);
  }, [resolved]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'me', text: value.trim(), time: new Date().toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' }), date: 'Today' },
    ]);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col px-3 pt-4 pb-2 gap-2 relative">
        {/* Floating mini map */}
        <div className="absolute top-3 right-3 z-20 w-48 h-36 rounded-xl overflow-hidden shadow-lg border border-border/60 ring-1 ring-black/5">
          <Map
            initialViewState={{ longitude: 17.2, latitude: 50.3, zoom: 5.5 }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
            attributionControl={false}
          >
            <Source id="float-done" type="geojson" data={{ type: 'Feature', geometry: { type: 'LineString', coordinates: [[20.0,50.05],[19.45,50.10],[18.95,50.25],[18.68,50.28],[18.52,49.95],[18.15,49.75],[17.88,49.53],[17.45,49.47]] }, properties: {} }}>
              <Layer {...({ id: 'float-done-line', type: 'line', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#9ca3af', 'line-width': 3 } } as Parameters<typeof Layer>[0])} />
            </Source>
            <Source id="float-ahead" type="geojson" data={{ type: 'Feature', geometry: { type: 'LineString', coordinates: [[17.45,49.47],[17.10,49.30],[16.60,49.19],[15.95,49.48],[15.55,49.60],[15.10,49.85],[14.75,50.00],[14.42,50.08]] }, properties: {} }}>
              <Layer {...({ id: 'float-ahead-border', type: 'line', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#4ade80', 'line-width': 6 } } as Parameters<typeof Layer>[0])} />
              <Layer {...({ id: 'float-ahead-line', type: 'line', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#1d4ed8', 'line-width': 2.5 } } as Parameters<typeof Layer>[0])} />
            </Source>
            <Marker longitude={17.45} latitude={49.47} anchor="center">
              <div className="size-3 rounded-full bg-green-500 border-2 border-white shadow" />
            </Marker>
          </Map>
        </div>
        <div className="flex-1" />
        {messages.map((msg, i) => {
          const prev = messages[i - 1];
          const showDay = !prev || prev.date !== msg.date;
          return (
            <div key={msg.id} className="flex flex-col">
              {showDay && (
                <div className="flex items-center justify-center py-3">
                  <span className="text-[10px] text-muted-foreground">{msg.date}</span>
                </div>
              )}

              {msg.role === 'me' ? (
                <div className="group flex justify-end items-center gap-2">
                  <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{msg.time}</span>
                  <div className="max-w-[70%] bg-blue-600 px-3 py-2 rounded-lg rounded-br-[2px]">
                    <p className="text-sm leading-5 text-white">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-0.5">
                  {(!prev || prev.role !== 'driver') && (
                    <span className="text-[10px] text-muted-foreground px-1 pb-0.5">{resolved.name}</span>
                  )}
                  <div className="group flex items-center gap-2">
                    <div className="max-w-[70%] bg-muted px-3 py-2 rounded-lg rounded-bl-[2px]">
                      <p className="text-sm leading-5 text-foreground">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{msg.time}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 bg-white">
        <div className="p-3">
          <div className="relative border border-input rounded-md bg-white shadow-xs">
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message to the driver..."
              className="resize-none border-0 shadow-none px-2.5 pt-2 pb-8 text-xs md:text-xs leading-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground min-h-[80px] max-h-[120px]"
            />
            <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="size-7 text-muted-foreground">
                  <Paperclip className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-7 text-muted-foreground">
                  <Smile className="size-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-0.5" />
                <Button variant="ghost" className="h-7 px-1.5 text-xs text-muted-foreground font-normal gap-1">
                  <Plus className="size-3.5" />
                  Add transport order
                </Button>
              </div>
              {value.trim() && (
                <Button
                  size="icon"
                  onClick={handleSubmit}
                  className="size-7 rounded-md bg-foreground hover:bg-foreground/80"
                >
                  <ArrowUp className="size-4" strokeWidth={2.5} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stop icon helper ─────────────────────────────────────────────────────────

function StopIconEl({ icon }: { icon: StopIcon }) {
  if (icon === 'locate')  return <Locate       className="size-4 text-muted-foreground" />;
  if (icon === 'cart')    return <ShoppingCart  className="size-4 text-muted-foreground" />;
  return                         <PackageCheck  className="size-4 text-muted-foreground" />;
}

// ─── Map + route area ─────────────────────────────────────────────────────────

export function ChatMap({ data }: { data?: DriverData }) {
  const resolved = data ?? DRIVER_DATA[FALLBACK_DRIVER_ID];
  const mapRef = useRef<MapRef>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    mapRef.current?.flyTo({
      center: [resolved.mapCenter[0], resolved.mapCenter[1]],
      zoom: resolved.mapZoom,
      duration: 1000,
    });
  }, [resolved]);

  const doneGeoJSON = {
    type: 'Feature' as const,
    geometry: { type: 'LineString' as const, coordinates: resolved.routeDone },
    properties: {},
  };

  const aheadGeoJSON = {
    type: 'Feature' as const,
    geometry: { type: 'LineString' as const, coordinates: resolved.routeAhead },
    properties: {},
  };

  const startCoord = resolved.routeDone[0];
  const endCoord   = resolved.routeAhead[resolved.routeAhead.length - 1];

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
      {/* Route progress bar */}
      <div className="shrink-0 bg-white border-b border-border p-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="text-[11px] text-muted-foreground truncate">
              <span className="font-medium text-foreground">{resolved.progressLabel.split(' done')[0]} done</span>
              {resolved.progressLabel.includes('(') && (
                <> ({resolved.progressLabel.split('(')[1].split(')')[0]})</>
              )}
              {resolved.progressLabel.includes('Ends') && (
                <> · Ends <span className="text-foreground">{resolved.progressLabel.split('Ends ')[1]}</span></>
              )}
            </span>
            <span className="text-[11px] font-medium text-foreground whitespace-nowrap">{resolved.progressRight}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${resolved.progressPct}%` }} />
          </div>
        </div>
        <Button variant="ghost" size="icon" className="size-7 shrink-0">
          <ChevronDown className="size-4" />
        </Button>
      </div>

      {/* Map */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <Map
          ref={mapRef}
          initialViewState={{ longitude: resolved.mapCenter[0], latitude: resolved.mapCenter[1], zoom: resolved.mapZoom }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          attributionControl={false}
        >
          {/* Done segment — gray */}
          <Source id="route-done" type="geojson" data={doneGeoJSON}>
            <Layer {...({
              id: 'route-done-line',
              type: 'line',
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#9ca3af', 'line-width': 6 },
            })} />
          </Source>

          {/* Ahead segment — green border + blue inner */}
          <Source id="route-ahead" type="geojson" data={aheadGeoJSON}>
            <Layer {...({
              id: 'route-ahead-border',
              type: 'line',
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#4ade80', 'line-width': 10 },
            })} />
            <Layer {...({
              id: 'route-ahead-line',
              type: 'line',
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#1d4ed8', 'line-width': 4 },
            })} />
          </Source>

          {/* Start marker */}
          <Marker longitude={startCoord[0]} latitude={startCoord[1]} anchor="center">
            <div className="size-7 rounded-full bg-gray-900 border-2 border-white shadow-lg flex items-center justify-center">
              <PackageCheck className="size-3.5 text-white" />
            </div>
          </Marker>

          {/* Driver marker */}
          <Marker longitude={resolved.driverPosition[0]} latitude={resolved.driverPosition[1]} anchor="center">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-14 rounded-full bg-green-500/20 animate-ping" />
              <div className="absolute size-14 rounded-full border-2 border-green-500/40" />
              <div className="relative size-9 rounded-full bg-green-600 border-2 border-white shadow-lg flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#driver-chevron-clip)">
                    <path d="M12.8676 5.86893L11.1241 10.2487L15.5039 11.9922" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.58131 7.71435L6.83784 12.0941L11.2176 13.8376" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="driver-chevron-clip">
                      <rect width="16" height="16" fill="white" transform="translate(21.0234 14.6963) rotate(156.706)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </Marker>

          {/* Destination marker */}
          <Marker longitude={endCoord[0]} latitude={endCoord[1]} anchor="center">
            <div className="size-7 rounded-full bg-gray-900 border-2 border-white shadow-lg flex items-center justify-center">
              <PackageCheck className="size-3.5 text-white" />
            </div>
          </Marker>
        </Map>
      </div>

      {/* Route config panel */}
      <div className="shrink-0 bg-white border-t border-border flex flex-col pb-3">
        <div className="flex gap-2 items-center px-3 pt-3 pb-1">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 shadow-xs">
            Avoid <ChevronDown className="size-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 shadow-xs">
            Load type <ChevronDown className="size-3" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs shadow-xs">
            Show tolls
          </Button>
        </div>

        <div className="mx-3 mt-1 rounded-md border border-border overflow-hidden bg-white">
          <Table>
            <TableBody>
              {resolved.stops.map((stop, i) => (
                <TableRow key={i} className={i === resolved.stops.length - 1 ? 'border-0' : ''}>
                  <TableCell className="py-2 pl-2 pr-1 w-8">
                    <StopIconEl icon={stop.icon} />
                  </TableCell>
                  <TableCell className="py-2 px-2 text-xs text-foreground">{stop.label}</TableCell>
                  <TableCell className="py-2 px-2 text-right w-20">
                    {stop.distance && (
                      <Badge variant="outline" className="gap-1 px-1.5 py-0 h-5 text-green-700 border-green-200 bg-green-50 font-medium text-xs">
                        {stop.distance}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="px-2 pt-1">
          <Button variant="ghost" className="h-7 px-1.5 text-xs text-muted-foreground font-normal gap-1">
            <Plus className="size-3.5" /> Add new stop
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── ChatMain ─────────────────────────────────────────────────────────────────

export function ChatMain({ driverId }: { driverId?: string }) {
  const data = DRIVER_DATA[driverId ?? FALLBACK_DRIVER_ID] ?? DRIVER_DATA[FALLBACK_DRIVER_ID];

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden rounded-xl border border-border/50 bg-white shadow-xs" style={{ borderWidth: '0.5px' }}>
      <ChatHeader data={data} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <ChatMessages data={data} />
      </div>
    </div>
  );
}
