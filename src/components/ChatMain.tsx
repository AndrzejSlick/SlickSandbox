import { useState, useRef, useEffect } from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Search, MoreVertical, Paperclip, Smile, ArrowUp, Plus, X, Phone, Car, ChevronDown, Locate, ShoppingCart, PackageCheck, AlarmClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

// ─── Asset URLs (from Figma) ──────────────────────────────────────────────────
const IMG_AVATAR = 'https://www.figma.com/api/mcp/asset/e5d7ef7c-8591-4bd6-8465-e55dad69b1dc';

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: number;
  role: 'me' | 'driver';
  text: string;
  time: string;
  date: string;
};

// ─── Static messages ──────────────────────────────────────────────────────────

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: 'me',     text: 'Prośba o wysłania zdjecia załadunku, dzięki',          time: '09:14', date: 'Yesterday' },
  { id: 2, role: 'driver', text: 'Na A2 wypadek, zjeżdżam na S17. Dam znać jak sytuacja.', time: '09:17', date: 'Yesterday' },
  { id: 3, role: 'driver', text: 'Będę z opóźnieniem ok 20 min.',                          time: '09:18', date: 'Yesterday' },
  { id: 4, role: 'me',     text: 'Jakie są opłaty drogowe na trasie Kraków - Berlin? 😀😀', time: '11:03', date: 'Yesterday' },
  { id: 5, role: 'driver', text: 'Około 80 zł w każdą stronę.',                            time: '11:45', date: 'Yesterday' },
  { id: 6, role: 'me',     text: 'Ok, dzięki. Jedź ostrożnie!',                            time: '11:46', date: 'Yesterday' },
  { id: 7, role: 'driver', text: 'Jestem już za granicą, wszystko ok.',                    time: '14:22', date: 'Today' },
  { id: 8, role: 'me',     text: 'Super, daj znać jak dojedziesz na miejsce.',             time: '14:30', date: 'Today' },
];

// ─── Stops ────────────────────────────────────────────────────────────────────

const STOPS = [
  { id: 1, country: 'PL', zip: '30-123', city: 'Czerwionka', km: null, time: null, day: null, status: null },
  { id: 2, country: 'PL', zip: '31-154', city: 'Kraków', km: '195 km', time: '11:30', day: 'Thu', status: 'On time' },
  { id: 3, country: 'CZ', zip: '130 00', city: 'Vinohrady', km: '240 km', time: '15:00', day: 'Fri', status: 'On time' },
];

// ─── Header ───────────────────────────────────────────────────────────────────

function ChatHeader() {
  return (
    <div className="flex items-center gap-4 px-3 h-14 bg-white border-b border-border shrink-0">
      {/* Driver info */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        {/* Name row */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">Szymon Pietrov</span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs min-w-0">
          <span className="text-muted-foreground whitespace-nowrap">KK 57112 (648 394 km)</span>
          <span className="h-3.5 w-px bg-border shrink-0" />
          <span className="text-muted-foreground truncate">Auto 300x300x300,  Winda - spi do 13</span>
        </div>
      </div>

      {/* Action buttons */}
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

function ChatMessages() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const bottomRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col flex-1 min-w-0 h-full border-r border-border overflow-hidden">
      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col px-3 pt-4 pb-2 gap-2">
        <div className="flex-1" />
        {messages.map((msg, i) => {
          const prev = messages[i - 1];
          const showDay = !prev || prev.date !== msg.date;
          return (
            <div key={msg.id} className="flex flex-col">
              {/* Day separator */}
              {showDay && (
                <div className="flex items-center justify-center py-3">
                  <span className="text-[10px] text-muted-foreground">{msg.date}</span>
                </div>
              )}

              {msg.role === 'me' ? (
                /* ── Sent (me) ── */
                <div className="group flex justify-end items-center gap-2">
                  <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{msg.time}</span>
                  <div className="max-w-[70%] bg-blue-600 px-3 py-2 rounded-lg rounded-br-[2px]">
                    <p className="text-xs leading-4 text-white">{msg.text}</p>
                  </div>
                </div>
              ) : (
                /* ── Received (driver) ── */
                <div className="flex flex-col items-start gap-0.5">
                  {(!prev || prev.role !== 'driver') && (
                    <span className="text-[10px] text-muted-foreground px-1 pb-0.5">Szymon Pietrov</span>
                  )}
                  <div className="group flex items-center gap-2">
                    <div className="max-w-[70%] bg-muted px-3 py-2 rounded-lg rounded-bl-[2px]">
                      <p className="text-xs leading-4 text-foreground">{msg.text}</p>
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
            {/* Bottom bar inside textarea box */}
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

// ─── Map + route area ─────────────────────────────────────────────────────────

function ChatMap() {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
      {/* Route progress bar */}
      <div className="shrink-0 bg-white border-b border-border p-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="text-[11px] text-muted-foreground truncate">
              <span className="font-medium text-foreground">7h 00m</span> done (Break in 0h 45m) · Ends <span className="text-foreground">23:00</span>
            </span>
            <span className="text-[11px] font-medium text-foreground whitespace-nowrap">2h 00m left</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }} />
          </div>
        </div>
        <Button variant="ghost" size="icon" className="size-7 shrink-0">
          <ChevronDown className="size-4" />
        </Button>
      </div>

      {/* Map */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <Map
          initialViewState={{ longitude: 19.5, latitude: 52.0, zoom: 6 }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          attributionControl={false}
        />

        {/* Map controls overlay */}

        {/* Map actions hidden for now */}
      </div>

      {/* Route config panel */}
      <div className="shrink-0 bg-white border-t border-border flex flex-col pb-3">
        {/* Filter buttons */}
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

        {/* Stops */}
        <div className="relative flex flex-col">
          {/* Dotted connector line */}
          <div className="absolute left-[28px] top-[28px] bottom-[28px] w-px border-l-2 border-dashed border-border" />

          {/* Stop 1 - Origin */}
          <div className="flex items-center gap-1 py-1 pr-3">
            <div className="size-8 shrink-0 flex items-center justify-center">
              <Locate className="size-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground truncate flex-1">PL, 30-123 Czerwionka</span>
          </div>

          {/* Stop 2 - Pickup */}
          <div className="flex items-center gap-1 py-1 pr-3">
            <div className="size-8 shrink-0 flex items-center justify-center">
              <ShoppingCart className="size-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground truncate w-[120px] shrink-0">PL, 31-154 Kraków</span>
            <div className="flex items-center gap-1.5 ml-1">
              <Badge className="bg-green-100 text-green-700 border-0 h-5 px-1.5 text-[10px] font-medium">195 km</Badge>
              <AlarmClock className="size-3.5 text-muted-foreground" />
              <span className="text-[10px] font-medium text-green-700 whitespace-nowrap">11:30 Thu</span>
              <span className="text-[10px] font-medium text-green-700 w-14 text-right">On time</span>
            </div>
          </div>

          {/* Stop 3 - Delivery */}
          <div className="flex items-center gap-1 py-1 pr-3">
            <div className="size-8 shrink-0 flex items-center justify-center">
              <PackageCheck className="size-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground truncate w-[120px] shrink-0">CZ, 130 00 Vinohrady</span>
            <div className="flex items-center gap-1.5 ml-1">
              <Badge className="bg-green-100 text-green-700 border-0 h-5 px-1.5 text-[10px] font-medium">240 km</Badge>
              <AlarmClock className="size-3.5 text-muted-foreground" />
              <span className="text-[10px] font-medium text-green-700 whitespace-nowrap">15:00 Fri</span>
              <span className="text-[10px] font-medium text-green-700 w-14 text-right">On time</span>
            </div>
          </div>
        </div>

        {/* Add new stop */}
        <div className="px-3 pt-1">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 shadow-xs">
            <Plus className="size-3.5" /> Add new stop
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── ChatMain ─────────────────────────────────────────────────────────────────

export function ChatMain() {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden rounded-xl border border-border/50 bg-white shadow-xs" style={{ borderWidth: '0.5px' }}>
      <ChatHeader />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <ChatMessages />
        <ChatMap />
      </div>
    </div>
  );
}
