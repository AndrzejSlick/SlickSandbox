"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Map, MoreVertical, RefreshCw, Search, Send, Sparkle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "Pokaż status floty?",
  "Gdzie tankować?",
  "Kto jest na rozładunku?",
  "Gdzie opóźnienia?",
  "Trasa Kraków-Berlin",
];

const AUTOMATIONS = [
  { name: "Poranny raport statusu floty", schedule: "Codziennie 07:00" },
  { name: "Opóźnienie +1 godzina", schedule: "Cały czas" },
  { name: "Kierowca nie odzywa się +4 godziny", schedule: "Cały czas" },
];

const FLEET_DATA = [
  { driver: "GPS4 Szymon Pietrov",       destination: "Warszawa",   eta: "19:34",       daily: "9h",       weekly: "22h" },
  { driver: "Jesionka planeta Krzak",    destination: "Kraków",     eta: "17:02",       daily: "2h",       weekly: "28h" },
  { driver: "KK77425 Tomasz Sikora",     destination: "Ryga, LV",   eta: "jutro 13:55", daily: "9h",       weekly: "22h" },
  { driver: "KR001 Piotr Nowak",         destination: "Kraków",     eta: "jutro 17:50", daily: "7h 30min", weekly: "42h" },
  { driver: "KR0122333 Piotrek Off-r.",  destination: "Praga, CZ",  eta: "jutro 05:37", daily: "2h",       weekly: "28h" },
  { driver: "KR1 Planeta Android",       destination: "Warszawa",   eta: "19:34",       daily: "9h",       weekly: "22h" },
  { driver: "KR123456 Dmitry Petrov",    destination: "Paryż, FR",  eta: "jutro 08:49", daily: "45min",    weekly: "18h", alert: true },
  { driver: "KRSP Feliks Solovev",       destination: "Kraków",     eta: "15:53",       daily: "9h",       weekly: "22h" },
  { driver: "SZO123 Roma Prihodlaya",    destination: "Berlin, DE", eta: "20.03 18:22", daily: "6h",       weekly: "14h" },
  { driver: "Valerian Umsky",            destination: "Schönefeld", eta: "23:28",       daily: "9h",       weekly: "22h" },
];

/* ── Helpers ── */

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(t); }, []);
  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {children}
    </div>
  );
}

function ThinkingDots() {
  return (
    <FadeIn>
      <div className="flex items-center gap-1 py-1 px-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#d4d4d4] animate-bounce"
            style={{ animationDelay: `${i * 180}ms`, animationDuration: "900ms" }}
          />
        ))}
      </div>
    </FadeIn>
  );
}

/* ── Fleet status table ── */

function FleetStatusTable() {
  const [activeTab, setActiveTab] = useState<"ontime" | "late" | "low">("ontime");
  return (
    <div className="border border-[#e5e5e5] rounded-xl overflow-hidden bg-white" style={{ fontSize: 12 }}>
      <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-1">
          {(["ontime", "late", "low"] as const).map((tab) => {
            const label = tab === "ontime" ? "Na czas (10)" : tab === "late" ? "Spóźnieni (3)" : "Niski czas pracy";
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${activeTab === tab ? "bg-[#f5f5f5] text-[#0a0a0a]" : "text-[#737373] hover:text-[#0a0a0a]"}`}
                style={{ fontSize: 12 }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 text-[#737373]" style={{ fontSize: 11 }}>
          <span>18.03.2026, 15:33</span>
          <RefreshCw className="w-3 h-3" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_90px_80px_60px_60px] px-3 py-1.5 bg-[#fafafa] border-b border-[#e5e5e5] font-semibold text-[#0a0a0a]">
        <span>Kierowca</span>
        <span>Dokąd</span>
        <span>ETA</span>
        <span>Czas dz.</span>
        <span>Czas tyg.</span>
      </div>

      <div className="divide-y divide-[#f0f0f0]">
        {FLEET_DATA.map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr_90px_80px_60px_60px] px-3 py-1.5 hover:bg-[#fafafa]">
            <span className="truncate text-[#0a0a0a] pr-2">{row.driver}</span>
            <span className="truncate text-[#0a0a0a]">{row.destination}</span>
            <span className="text-[#0a0a0a]">{row.eta}</span>
            <span className={row.alert ? "font-bold text-[#0a0a0a]" : "text-[#0a0a0a]"}>
              {row.daily}{row.alert && " ⚠"}
            </span>
            <span className="text-[#0a0a0a]">{row.weekly}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Fuel stations widget ── */

const FUEL_DATA = [
  { name: "PKN Orlen",  price: "5,41 PLN/l", location: "Tarnobrzeg",  open247: false },
  { name: "PKN Orlen",  price: "5,49 PLN/l", location: "Rzeszów",     open247: true  },
  { name: "Circle K",   price: "5,49 PLN/l", location: "Dębica",      open247: true  },
  { name: "Shell",      price: "5,49 PLN/l", location: "Tarnów",      open247: true  },
];

function FuelStationsWidget() {
  return (
    <div className="border border-[#e5e5e5] rounded-xl overflow-hidden bg-white" style={{ fontSize: 12 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2 border-b border-[#e5e5e5]">
        <span className="font-semibold text-[#0a0a0a]" style={{ fontSize: 12 }}>
          Najtańsze stacje wzdłuż trasy: Tarnobrzeg → Kraków
        </span>
        <div className="flex items-center gap-1.5 text-[#737373] shrink-0 ml-2" style={{ fontSize: 11 }}>
          <span>18:52 18/04</span>
          <RefreshCw className="w-3 h-3" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#e5e5e5] flex-wrap">
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-[#e5e5e5] bg-[#fafafa] hover:bg-[#f5f5f5] text-[#0a0a0a]" style={{ fontSize: 11 }}>
          <Truck className="w-3 h-3 text-[#737373]" />
          <span>3,5 t – 7,5 t</span>
          <ChevronDown className="w-3 h-3 text-[#737373]" />
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[#e5e5e5] bg-[#fafafa] hover:bg-[#f5f5f5] text-[#0a0a0a]" style={{ fontSize: 11 }}>
          <span>Unikaj</span>
          <ChevronDown className="w-3 h-3 text-[#737373]" />
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[#e5e5e5] bg-[#fafafa] hover:bg-[#f5f5f5] text-[#0a0a0a]" style={{ fontSize: 11 }}>
          <span>Feliks Solovev</span>
          <ChevronDown className="w-3 h-3 text-[#737373]" />
        </button>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_90px_90px_44px_56px] px-3 py-1.5 bg-[#fafafa] border-b border-[#e5e5e5] font-semibold text-[#0a0a0a]">
        <span>Stacje</span>
        <span>Cena</span>
        <span>Lokalizacja</span>
        <span>24/7</span>
        <span>Akcje</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#f0f0f0]">
        {FUEL_DATA.map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr_90px_90px_44px_56px] px-3 py-1.5 hover:bg-[#fafafa] items-center">
            <span className="truncate text-[#0a0a0a] pr-2">{row.name}</span>
            <span className="text-[#0a0a0a] font-medium">{row.price}</span>
            <span className="truncate text-[#737373]">{row.location}</span>
            <span>
              {row.open247 ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-green-100 text-green-700">Tak</span>
              ) : (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-red-100 text-red-700">Nie</span>
              )}
            </span>
            <span className="flex items-center gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-[#f0f0f0]">
                <Map className="w-3.5 h-3.5 text-[#737373]" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-[#f0f0f0]">
                <Send className="w-3.5 h-3.5 text-[#737373]" />
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Per-suggestion config ── */

type WidgetType = "fleet" | "fuel" | null;

const SUGGESTION_CONFIG: Record<string, { aiMessage: string; widget: WidgetType }> = {
  "Pokaż status floty?": {
    aiMessage: "Jasne! Sprawdziłem flotę — oto aktualny status wszystkich kierowców. Jeden wymaga uwagi.",
    widget: "fleet",
  },
  "Gdzie tankować?": {
    aiMessage: "Znalazłem najtańsze stacje wzdłuż trasy. Jeden postój wystarczy — sprawdź opcje poniżej.",
    widget: "fuel",
  },
  "Kto jest na rozładunku?": {
    aiMessage: "Sprawdziłem — trzech kierowców jest aktualnie na rozładunku. Jeden czeka już ponad 45 minut.",
    widget: null,
  },
  "Gdzie opóźnienia?": {
    aiMessage: "Wykryłem dwa opóźnienia na aktywnych trasach. Największe — 1h 20min na trasie do Paryża.",
    widget: null,
  },
  "Trasa Kraków-Berlin": {
    aiMessage: "Optymalna trasa Kraków–Berlin to ok. 560 km, szacowany czas przejazdu: 5h 40min. Planuję szczegóły.",
    widget: null,
  },
};

/* ── Per-turn type ── */

interface ChatTurn {
  id: number;
  userMessage: string;
  aiMessage: string;
  widget: WidgetType;
  phase: 0 | 1 | 2 | 3;
}

/* ── Main widget ── */

export function ProductDemoWidget() {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const [glowShadow, setGlowShadow] = useState(
    "0 4px 16px rgba(2,10,15,0.06), 0 10px 40px rgba(124,58,237,0.22), 0 2px 12px rgba(124,58,237,0.12)"
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pillsRef.current) return;
      const rect = pillsRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 7;
      const norm = Math.max(dist, 1);
      const ox = (dx / norm) * maxOffset * Math.min(1, 350 / norm);
      const oy = (dy / norm) * maxOffset * Math.min(1, 350 / norm);
      const alpha = 0.18 + Math.min(0.12, 120 / Math.max(dist, 120));
      setGlowShadow(
        `0 4px 16px rgba(2,10,15,0.06), ${ox}px ${oy + 8}px 44px rgba(124,58,237,${alpha.toFixed(2)}), 0 2px 10px rgba(124,58,237,${(alpha * 0.55).toFixed(2)})`
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll to bottom whenever turns array changes (new turn added or phase advances)
  useEffect(() => {
    if (turns.length > 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [turns]);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleSuggestionClick = (suggestion: string) => {
    const config = SUGGESTION_CONFIG[suggestion] ?? { aiMessage: "Sprawdzam...", widget: null };

    // Cancel any in-flight animations
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const id = Date.now();

    // Complete any unfinished previous turns, then append new one
    setTurns((prev) => {
      const completed = prev.map((t) => ({
        ...t,
        phase: (t.widget ? 3 : 2) as ChatTurn["phase"],
      }));
      return [
        ...completed,
        { id, userMessage: suggestion, aiMessage: config.aiMessage, widget: config.widget, phase: 1 },
      ];
    });

    const advanceTurn = (phase: ChatTurn["phase"]) => {
      setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, phase } : t)));
    };

    timeoutsRef.current.push(setTimeout(() => advanceTurn(2), 1400));
    if (config.widget) {
      timeoutsRef.current.push(setTimeout(() => advanceTurn(3), 2900));
    }
  };

  const hasMessages = turns.length > 0;

  return (
    <div
      className="w-full flex rounded-xl border border-[#e6e6eb] overflow-hidden bg-white"
      style={{ height: 640, boxShadow: "0 8px 40px rgba(2,10,15,0.08)" }}
    >
      {/* ── Sidebar ── */}
      <aside className="w-12 shrink-0 bg-[#fafafa] border-r border-[#e5e5e5] flex flex-col items-start justify-between">
        <div className="flex flex-col items-start pt-4 pb-2 px-2 gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-chat.svg" alt="" className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#e5e5e5]">
            <Sparkle className="w-5 h-5 text-[#0a0a0a]" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-crm.svg" alt="" className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-earth.svg" alt="" className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.666 3.96983C11.4074 3.96983 11.1524 3.90966 10.921 3.79406L7.41102 2.03906C7.17968 1.92346 6.92463 1.86328 6.66602 1.86328M11.666 3.96983C11.9246 3.96983 12.1797 3.90966 12.411 3.79406L15.4602 2.26906C15.5873 2.20552 15.7286 2.17557 15.8706 2.18203C16.0126 2.1885 16.1506 2.23117 16.2714 2.306C16.3922 2.38083 16.4919 2.48532 16.561 2.60954C16.6301 2.73377 16.6662 2.87359 16.666 3.01572V8.33406V10.9932M11.666 3.96983L11.666 16.4698M11.666 16.4707C11.4074 16.4707 11.1524 16.4105 10.921 16.2949L7.41102 14.5399C7.17968 14.4243 6.92463 14.3641 6.66602 14.3641C6.40741 14.3641 6.15235 14.4243 5.92102 14.5399L2.87185 16.0649C2.74464 16.1285 2.60329 16.1584 2.46123 16.1519C2.31918 16.1454 2.18115 16.1027 2.06028 16.0277C1.93942 15.9528 1.83974 15.8482 1.77072 15.7239C1.70171 15.5995 1.66567 15.4596 1.66602 15.3174V4.68156C1.6661 4.52684 1.70925 4.3752 1.79065 4.24362C1.87204 4.11204 1.98845 4.00572 2.12685 3.93656L5.92102 2.03906C6.15235 1.92346 6.40741 1.86328 6.66602 1.86328M6.66602 1.86328L6.66602 14.3633" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.166 16.668H19.166M16.666 14.168V19.168" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-reports.svg" alt="" className="w-5 h-5" />
          </div>
        </div>
        <div className="w-full aspect-square p-2" />
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[64px] shrink-0 bg-[#fafafa] border-b border-[#e5e5e5] flex items-center px-6 justify-between">
          <span className="text-2xl font-bold text-[#0a0a0a]">Slick AI</span>
          <div className="flex items-center gap-0.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f5f5f5]">
              <Search className="w-4 h-4 text-[#737373]" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f5f5f5]">
              <MoreVertical className="w-4 h-4 text-[#737373]" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 min-h-0 relative flex flex-col">

          {/* Automations panel — always top-right */}
          <div
            className="absolute top-5 right-5 z-10 w-[270px] bg-[#fafafa] border border-[#e5e5e5] rounded-xl pb-3 pt-2 px-3 flex flex-col gap-3"
            style={{ boxShadow: "0 4px 16px rgba(2,10,15,0.06)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0a0a0a]">Automations</span>
              <button className="w-6 h-6 flex items-center justify-center rounded-md">
                <ChevronDown className="w-4 h-4 text-[#737373]" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {AUTOMATIONS.map((auto, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Sparkle className="w-3 h-3 text-[#7c3aed] shrink-0" />
                  <span className="flex-1 text-xs font-medium text-[#0a0a0a] truncate">{auto.name}</span>
                  <span className="text-xs text-[#737373] shrink-0">{auto.schedule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer pushes chips to bottom when no messages */}
          {!hasMessages && <div className="flex-1" />}

          {/* ── Chat messages ── */}
          <div
            ref={scrollRef}
            className={`flex flex-col items-center overflow-y-auto pt-5 pb-2 ${hasMessages ? "flex-1" : "hidden"}`}
          >
            <div className="w-[520px] flex flex-col gap-5">
              {turns.map((turn) => (
                <div key={turn.id} className="flex flex-col gap-3">
                  {/* User bubble */}
                  <FadeIn className="flex justify-end">
                    <div className="text-right max-w-[75%]">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-[#737373]" style={{ fontSize: 11 }}>Ty</span>
                        <span className="text-[#737373]" style={{ fontSize: 11 }}>15:33 18/03</span>
                      </div>
                      <div className="bg-[#f5f5f5] rounded-xl px-3 py-2 text-[#0a0a0a] text-left" style={{ fontSize: 12 }}>
                        {turn.userMessage}
                      </div>
                    </div>
                  </FadeIn>

                  {/* AI thinking → response → widget */}
                  {turn.phase === 1 && <ThinkingDots />}
                  {turn.phase >= 2 && (
                    <FadeIn>
                      <p className="text-[#0a0a0a]" style={{ fontSize: 12 }}>{turn.aiMessage}</p>
                    </FadeIn>
                  )}
                  {turn.phase === 2 && turn.widget && <ThinkingDots />}
                  {turn.phase >= 3 && turn.widget === "fleet" && (
                    <FadeIn><FleetStatusTable /></FadeIn>
                  )}
                  {turn.phase >= 3 && turn.widget === "fuel" && (
                    <FadeIn><FuelStationsWidget /></FadeIn>
                  )}
                </div>
              ))}
              {/* Scroll anchor */}
              <div style={{ height: 1 }} />
            </div>
          </div>

          {/* ── Chips — always pinned at bottom ── */}
          <div className="pt-2 pb-5 shrink-0 flex justify-center">
            <div
              ref={pillsRef}
              className="w-[520px] bg-white rounded-xl p-3 flex flex-wrap gap-2"
              style={{ boxShadow: glowShadow, transition: "box-shadow 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {SUGGESTIONS.map((s) => (
                <Button key={s} variant="outline" size="sm" className="border-dashed" onClick={() => handleSuggestionClick(s)}>
                  {s}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="border-dashed">
                Wpisz swoje…
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
