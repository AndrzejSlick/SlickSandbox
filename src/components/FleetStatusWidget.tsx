"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatMsg =
  | { id: number; kind: "ai"; lines: string[] }
  | { id: number; kind: "cta"; text: string }
  | { id: number; kind: "user"; text: string }
  | { id: number; kind: "progress"; text: string }
  | { id: number; kind: "typing" };

type Evt =
  | { delay: number; op: "add"; msg: ChatMsg }
  | { delay: number; op: "replace"; msg: ChatMsg }
  | { delay: number; op: "reset" };

const EVENTS: Evt[] = [
  { delay: 800,  op: "add",     msg: { id: 1, kind: "typing" } },
  { delay: 1600, op: "replace", msg: { id: 1, kind: "ai",       lines: ["Kierowca zjechał z wytyczonej trasy 8 min temu. Szacowane opóźnienie: ok. 45 min."] } },
  { delay: 400,  op: "add",     msg: { id: 2, kind: "cta",      text: "Pokaż na mapie" } },
  { delay: 1000, op: "add",     msg: { id: 3, kind: "ai",       lines: ["Czy napisać wiadomość do kierowcy?"] } },
  { delay: 1400, op: "add",     msg: { id: 4, kind: "user",     text: "Tak napisz do kierowcy, aby wrócił na wyznaczoną trasę" } },
  { delay: 700,  op: "add",     msg: { id: 5, kind: "progress", text: "Wysyłam wiadomość do Szymon Pietrov..." } },
  { delay: 3000, op: "reset" },
];

export function FleetStatusWidget() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [key, setKey]   = useState(0);
  const chatRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    for (const evt of EVENTS) {
      elapsed += evt.delay;
      const t = setTimeout(() => {
        if (evt.op === "add") {
          setMsgs(prev => [...prev, evt.msg]);
        } else if (evt.op === "replace") {
          setMsgs(prev => prev.map(m => m.id === evt.msg.id ? evt.msg : m));
        } else {
          setMsgs([]);
          setKey(k => k + 1);
        }
      }, elapsed);
      timers.push(t);
    }

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  return (
    <>
      <style>{`
        @keyframes chat-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-msg { animation: chat-in 220ms ease forwards; }
      `}</style>

      <div className="w-full h-full flex flex-col bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg overflow-hidden">

        {/* ── Chat messages — spacer pushes them to the bottom ── */}
        <div ref={chatRef} className="flex flex-col gap-3 px-3 py-3 flex-1 min-h-0 overflow-y-auto">
          <div className="flex-1" />

          {msgs.map((msg) => {
            if (msg.kind === "ai") {
              return (
                <div key={msg.id} className="chat-msg px-1 flex flex-col gap-1">
                  {msg.lines.map((line, i) => (
                    <p key={i} className="text-[13px] text-[#0a0a0a] leading-[20px]">{line}</p>
                  ))}
                </div>
              );
            }

            if (msg.kind === "cta") {
              return (
                <div key={msg.id} className="chat-msg px-1">
                  <Button variant="outline" size="sm">{msg.text}</Button>
                </div>
              );
            }

            if (msg.kind === "user") {
              return (
                <div key={msg.id} className="chat-msg bg-[#fafafa] border border-[#e5e5e5] rounded-lg px-2.5 py-1.5">
                  <p className="text-[13px] text-[#0a0a0a] leading-[20px]">{msg.text}</p>
                </div>
              );
            }

            if (msg.kind === "progress") {
              return (
                <div key={msg.id} className="chat-msg flex items-center gap-2 px-1">
                  <Loader2 className="w-3.5 h-3.5 text-[#9333ea] animate-spin shrink-0" />
                  <p className="text-[13px] text-[#9333ea] leading-[20px]">{msg.text}</p>
                </div>
              );
            }

            if (msg.kind === "typing") {
              return (
                <div key={msg.id} className="chat-msg flex items-center gap-2 px-1">
                  <Loader2 className="w-4 h-4 text-[#9333ea] animate-spin shrink-0" />
                  <p className="text-[13px] text-[#9333ea] tracking-[0.4px]">Analizuję sytuację...</p>
                </div>
              );
            }
          })}
        </div>

        {/* ── Input ── */}
        <div className="px-3 py-3 border-t border-[#e5e5e5] shrink-0">
          <div className="flex items-center gap-2 border border-[#e5e5e5] rounded-lg px-3 py-2 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <p className="flex-1 text-[13px] text-[#737373] leading-5">Zapytaj...</p>
            <button className="w-7 h-7 bg-[#0a0a0a] rounded-lg flex items-center justify-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
