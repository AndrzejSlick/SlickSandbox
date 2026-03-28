import { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// ─── Types ────────────────────────────────────────────────────────────────────

type AiMessage = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};

// ─── AI Insights card ─────────────────────────────────────────────────────────

const AI_INSIGHTS = [
  'Monitoruję stan paliwa, pozostało 80%',
  'Kierowca jedzie wytyczoną trasą',
  'Kierowca miał 30 min postój 12:15-12:45',
];

function InsightsCard() {
  return (
    <div className="mx-3 mt-3 mb-0 shrink-0">
      <div className="bg-white border border-border rounded-lg px-3 py-2.5 flex flex-col gap-1.5">
        {AI_INSIGHTS.map((insight, i) => (
          <div key={i} className="flex items-start gap-2">
            <Sparkles className="size-3.5 text-purple-600 shrink-0 mt-0.5" />
            <p className="text-xs text-purple-600 leading-4">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Alert message ────────────────────────────────────────────────────────────

function AlertMessage({ time, text, button }: { time: string; text: string; button?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-foreground leading-snug">{text}</p>
      </div>
      {button && (
        <button className="self-start px-3 h-8 bg-white border border-border rounded-md text-xs font-medium shadow-xs hover:bg-muted/50 transition-colors">
          {button}
        </button>
      )}
    </div>
  );
}

// ─── Driver assignment table ──────────────────────────────────────────────────

const DRIVER_TABLE = [
  { name: 'Piotr Nowak', location: 'Poczdam, Niemcy', eta: '23.03.2026 14:30', daily: '25.03.2026 14:30' },
  { name: 'Krzysztow Lewandowski', location: 'Frankfurt, Niemcy', eta: '24.03.2026 15:13', daily: '25.03.2026 14:30' },
];

function DriversTable() {
  return (
    <div className="rounded-md border border-border overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs py-2">Kierowca</TableHead>
            <TableHead className="text-xs py-2">Lokalizacja</TableHead>
            <TableHead className="text-xs py-2">ETA Załadunek</TableHead>
            <TableHead className="text-xs py-2">Czas dzi.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DRIVER_TABLE.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="text-xs py-2 truncate max-w-[60px]">{row.name}</TableCell>
              <TableCell className="text-xs py-2 truncate max-w-[60px]">{row.location}</TableCell>
              <TableCell className="text-xs py-2">{row.eta}</TableCell>
              <TableCell className="text-xs py-2">{row.daily}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── ChatAiPanel ─────────────────────────────────────────────────────────────

export function ChatAiPanel() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    const text = value.trim();
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text }]);
    setValue('');
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: 'Kierowca powinien być na rozładunku o 14:30.' },
      ]);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col w-[328px] h-full bg-muted shrink-0">
      {/* Scrollable content area */}
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-end px-3 pt-3 pb-2 gap-4">
        {/* Static alert messages */}
        <AlertMessage
          time="09:48"
          text="Kierowca jest spóźniony o 3 minuty (pozostało 394km)"
          button="Show on map"
        />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-foreground leading-snug">
              Następna praca kierowcy jest zagrożona - z FR 70123 do FR 1370. Tu propozycja kierowców do przejęcia
            </p>
          </div>
          <DriversTable />
        </div>

        {/* Dynamic messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.role === 'user' ? (
              <div className="bg-gray-200 rounded-lg rounded-br-[2px] px-3 py-2 max-w-[85%]">
                <p className="text-xs leading-relaxed text-foreground">{msg.text}</p>
              </div>
            ) : (
              <p className="text-xs text-foreground leading-relaxed">{msg.text}</p>
            )}
          </div>
        ))}

        {/* Static "user message" from design */}
        {messages.length === 0 && (
          <div className="flex justify-end">
            <div className="bg-gray-200 rounded-lg rounded-br-[2px] px-3 py-2 max-w-[85%]">
              <p className="text-xs leading-relaxed text-foreground">Przenieś zlecenia na Piotra</p>
            </div>
          </div>
        )}


        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="relative border border-input rounded-md bg-white shadow-xs">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="resize-none border-0 shadow-none px-3 pt-2.5 pb-10 text-xs md:text-xs leading-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground min-h-[80px] max-h-[120px]"
          />
          <div className="absolute bottom-2 left-3 right-2 flex items-center justify-end">
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
  );
}
