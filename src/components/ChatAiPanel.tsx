import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// ─── Types ────────────────────────────────────────────────────────────────────

type AiMessage = {
  id: number;
  role: 'user' | 'ai';
  text: string;
};

// ─── Custom sparkle icon ──────────────────────────────────────────────────────

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

// ─── Automations card ─────────────────────────────────────────────────────────

const AUTOMATIONS = [
  'Monitoruję stan paliwa, pozostało 80%',
  'Kierowca jedzie wytyczoną trasą',
  'Kierowca miał 30 min postój 12:15-12:45',
];

function AutomationsCard() {
  return (
    <div className="shrink-0 mx-3 mt-3 rounded-md border border-border bg-white p-3 flex flex-col gap-1.5">
      {AUTOMATIONS.map((text, i) => (
        <div key={i} className="flex items-center gap-2">
          <SparkleIcon className="text-purple-700 shrink-0" />
          <span className="text-xs text-muted-foreground leading-snug">{text}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Alert message ────────────────────────────────────────────────────────────

function AlertMessage({ text, button }: { text: string; button?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-foreground leading-snug">{text}</p>
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

export function ChatAiPanel({ showAutomations = true }: { showAutomations?: boolean }) {
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
      {/* Automations card */}
      {showAutomations && <AutomationsCard />}

      {/* Scrollable content area */}
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-end px-3 pt-3 pb-2 gap-4">
        {/* Static alert messages */}
        <AlertMessage
          text="Kierowca jest spóźniony o 3 minuty (pozostało 394km)"
          button="Show on map"
        />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-foreground leading-snug">
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
