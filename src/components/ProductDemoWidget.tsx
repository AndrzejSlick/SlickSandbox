"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Map,
  MoreVertical,
  Search,
  Send,
  Truck,
} from "lucide-react";

/* ── Helpers ─────────────────────────────────────────────── */

function splitFlag(s: string) {
  const i = s.indexOf(" ");
  return i === -1 ? { flag: s, text: "" } : { flag: s.slice(0, i), text: s.slice(i + 1) };
}

/* ── Data ───────────────────────────────────────────────── */

const drivers = [
  {
    id: "LB 43534",
    name: "Szymon Pietrov",
    status: ["Pozostało 80% stanu paliwa", "Kierowca jedzie wytyczoną trasą"],
    pills: [
      { left: 20.1, width: 30.5, bg: "#bbf7d0", from: "🇩🇪 DE, 30-213", to: "🇵🇱 PL, 23-400" },
      { left: 72.8, width: 27.0, bg: "#e5e7eb", from: "🇵🇱 PL, 45-101", to: "🇭🇺 HU, 01-222" },
    ],
  },
  {
    id: "LBL 42435",
    name: "Valery Umsky",
    status: ["Kierowca od 20 min na rozładunku"],
    pills: [
      { left: 4.0,  width: 30.1, bg: "#bbf7d0", from: "🇵🇱 PL, 12-213", to: "🇵🇱 PL, 31-200" },
      { left: 28.3, width: 32.6, bg: "#e5e7eb", from: "🇵🇱 PL, 12-433", to: "🇵🇱 PL, 23-400" },
    ],
  },
  {
    id: "LBL 43523",
    name: "Feliks Solovev",
    status: ["Możliwe opóźnienie do 30 min", "Kierowca zjechał z trasy"],
    pills: [
      { left: 4.0, width: 44.1, bg: "#fecaca", from: "🇵🇱 PL, 54-111", to: "🇨🇿 CZ, 40-200" },
    ],
  },
  {
    id: "LB 23432",
    name: "Roman Marczewski",
    status: ["Kierowca na postoju", "Pozostało 20% stanu paliwa, kierowca dosał namiary na stację paliw"],
    pills: [
      { left: 28.3, width: 29.0, bg: "#fecaca", from: "🇵🇱 PL, 30-200", to: "🇫🇷 FR, 02-020" },
    ],
  },
  {
    id: "LBL 53422",
    name: "Karol Starościc",
    status: ["Kierowca zbliża się do załadunku"],
    pills: [
      { left: 72.8, width: 27.0, bg: "#e5e7eb", from: "🇵🇱 PL, 45-101", to: "🇭🇺 HU, 01-222" },
    ],
  },
];

const DATES = ["3.01.2026", "4.01.2026", "5.01.2026", "6.01.2026", "7.01.2026", "8.01.2026"];

const monitoring = [
  "Monitoruję stan paliwa, pozostało 80%",
  "Kierowca jedzie wytyczoną trasą",
  "Kierowca miał 30 min postój 12:15–12:45",
];

type Phase = "user" | "thinking" | "response";

/* ── Component ──────────────────────────────────────────── */

export function ProductDemoWidget() {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [visible, setVisible] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function loop() {
      setVisible(false);
      setPhase(null);
      setLoopCount((c) => c + 1);

      timers.push(setTimeout(() => {
        setPhase("user");
        setVisible(true);

        timers.push(setTimeout(() => {
          setPhase("thinking");

          timers.push(setTimeout(() => {
            setPhase("response");

            timers.push(setTimeout(() => {
              setVisible(false);
              timers.push(setTimeout(loop, 600));
            }, 3500));
          }, 1500));
        }, 800));
      }, 400));
    }

    loop();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="w-full flex rounded-xl border border-[#e6e6eb] overflow-hidden bg-white"
      style={{ height: 640, boxShadow: "0 8px 40px rgba(2,10,15,0.08)" }}
    >
      {/* ── Sidebar ── */}
      <aside className="w-12 shrink-0 bg-[#f5f5f5] border-r border-[#e5e5e5] flex flex-col items-center justify-between py-3">
        <div className="flex flex-col items-center gap-3">

          {/* Chat — unread dot (blue) */}
          <div className="relative w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-chat.svg" alt="" className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#3b82f6] rounded-full border-2 border-[#f5f5f5]" />
          </div>

          {/* Timeline — active (two SVG layers: filled square + white lines) */}
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#e5e5e5]">
            <div className="relative w-5 h-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nav-timeline-a.svg" alt="" className="absolute"
                style={{ top: "12.5%", left: "12.5%", width: "75%", height: "75%" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/nav-timeline-b.svg" alt="" className="absolute"
                style={{ top: "33.33%", left: "33.33%", width: "33.34%", height: "33.34%" }} />
            </div>
          </div>

          {/* CRM / Files — unread dot (blue) */}
          <div className="relative w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-crm.svg" alt="" className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#3b82f6] rounded-full border-2 border-[#f5f5f5]" />
          </div>

          {/* Globe / Earth */}
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-earth.svg" alt="" className="w-5 h-5" />
          </div>

          {/* Plan route */}
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            <Map className="w-5 h-5 text-[#0a0a0a]" />
          </div>

          {/* Reports */}
          <div className="w-8 h-8 flex items-center justify-center rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-reports.svg" alt="" className="w-5 h-5" />
          </div>

        </div>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#bbf7d0] flex items-center justify-center text-[11px] font-semibold text-[#0a0a0a]">
          AW
        </div>
      </aside>

      {/* ── Main table ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-[60px] shrink-0 bg-[#fafafa] border-b border-[#e5e5e5] flex items-center px-6 justify-between">
          <span className="text-2xl font-bold text-[#0a0a0a]">Flota</span>
          <div className="flex items-center gap-0.5">
            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f5f5f5]">
              <Search className="w-4 h-4 text-[#737373]" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f5f5f5]">
              <MoreVertical className="w-4 h-4 text-[#737373]" />
            </button>
          </div>
        </header>

        {/* Table */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Column headers */}
          <div className="h-[40px] shrink-0 flex bg-[#f5f5f5] border-b border-[#e5e5e5] text-sm font-medium text-[#737373]">
            <div className="w-[150px] shrink-0 flex items-center px-2 border-r border-[#e5e5e5]">Dyspozytorzy</div>
            <div className="w-[210px] shrink-0 flex items-center px-2 border-r border-[#e5e5e5]">Slick AI</div>
            <div className="flex-1 flex">
              {DATES.map((d) => (
                <div key={d} className="flex-1 flex items-center px-2 border-r border-[#e5e5e5] last:border-r-0 text-xs">{d}</div>
              ))}
            </div>
          </div>

          {/* Driver rows */}
          <div className="flex-1 flex flex-col">
            {drivers.map((dr) => (
              <div
                key={dr.id}
                className="flex flex-1 border-b border-[#e5e5e5] last:border-b-0 min-h-0"
              >
                {/* Dyspozytorzy */}
                <div className="w-[150px] shrink-0 border-r border-[#e5e5e5] flex items-center gap-3 p-2">
                  <Truck className="w-6 h-6 text-[#737373] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0a0a0a] leading-tight">{dr.id}</p>
                    <p className="text-sm font-medium text-[#2563eb] leading-tight truncate">{dr.name}</p>
                  </div>
                </div>

                {/* Slick AI */}
                <div className="w-[210px] shrink-0 border-r border-[#e5e5e5] flex items-center p-2">
                  <div className="flex flex-col gap-1">
                    {dr.status.map((s, si) => (
                      <p key={si} className="text-xs text-[#7c3aed] leading-[1.35]">{s}</p>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex-1 relative overflow-hidden">
                  {/* Current-date vertical line at 7.01 = col index 4 = 4/6 ≈ 66.67% */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[#2563eb] opacity-60 z-10"
                    style={{ left: "66.67%" }}
                  />
                  {/* Column dividers */}
                  {[1, 2, 3, 4, 5].map((col) => (
                    <div
                      key={col}
                      className="absolute top-0 bottom-0 w-px bg-[#e5e5e5]"
                      style={{ left: `${(col / 6) * 100}%` }}
                    />
                  ))}
                  {/* Route pills — Figma layout: flag+origin left, destination+flag right */}
                  {dr.pills.map((p, pi) => {
                    const from = splitFlag(p.from);
                    const to = splitFlag(p.to);
                    return (
                      <div
                        key={pi}
                        className="absolute top-1/2 -translate-y-1/2 h-9 rounded-md flex items-center justify-between px-3 text-sm font-medium text-[#171717] overflow-hidden"
                        style={{
                          left: `${p.left}%`,
                          width: `${p.width}%`,
                          backgroundColor: p.bg,
                        }}
                      >
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="leading-none">{from.flag}</span>
                          <span className="leading-none">{from.text}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="leading-none">{to.text}</span>
                          <span className="leading-none">{to.flag}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chat panel ── */}
      <div className="w-[312px] shrink-0 border-l border-[#e5e5e5] flex flex-col bg-white">

        {/* Monitoring status card */}
        <div className="border-b border-[#e5e5e5] bg-[#fafafa] px-4 py-3 flex flex-col gap-1">
          {monitoring.map((m, i) => (
            <p key={i} className="text-[11px] text-[#9333ea] leading-[1.4]">{m}</p>
          ))}
        </div>

        {/* Animated messages */}
        <style>{`
          @keyframes chatSlideUp {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .chat-msg { animation: chatSlideUp 0.3s ease forwards; }
        `}</style>
        <div
          className="flex-1 px-3 py-3 flex flex-col justify-end gap-3"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          {/* User question */}
          {phase && (
            <div key={`user-${loopCount}`} className="chat-msg flex justify-end">
              <div className="max-w-[85%] bg-[#fafafa] border border-[#e5e5e5] rounded-xl rounded-tr-sm px-3 py-2 text-[12px] text-[#0a0a0a] leading-[1.5]">
                Jakie są opłaty drogowe na trasie Kraków - Berlin?
              </div>
            </div>
          )}

          {/* Thinking indicator */}
          {phase === "thinking" && (
            <div key={`thinking-${loopCount}`} className="chat-msg flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-[#9333ea] animate-spin shrink-0" />
              <span className="text-[12px] text-[#9333ea] tracking-[0.02em]">Obliczam opłaty drogowe...</span>
            </div>
          )}

          {/* AI response */}
          {phase === "response" && (
            <div key={`response-${loopCount}`} className="chat-msg text-[12px] text-[#0a0a0a] leading-[1.6] whitespace-pre-line">
              {"Orientacyjnie Berlin → Paryż (1 strona):\n• Paliwo: ~150–200 €\n• Autostrady: Niemcy 0 €, Francja ~30–50 €"}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[#e5e5e5] px-3 py-2 flex items-center gap-2">
          <span className="flex-1 text-[12px] text-[#737373]">Ask anything</span>
          <button className="w-7 h-7 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
            <Send className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
