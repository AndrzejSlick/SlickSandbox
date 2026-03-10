"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const ITEMS = [
  "Widoczność floty",
  "Czasy pracy kierowców",
  "Dokumenty CMR",
  "Lieferschein",
  "Procedury",
  "Mandaty",
  "Monitorowanie cen paliwa",
  "Administracja",
  "Parsowanie zleceń",
  "Nadrobione kilometry",
];

const DWELL_MS = 1400;
const TRANS_MS = 300;

export function UseCases() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    // Render 3× copies for seamless loop
    [...ITEMS, ...ITEMS, ...ITEMS].forEach((text) => {
      const el = document.createElement("div");
      el.className = "usecase-item";
      el.textContent = text;
      track.appendChild(el);
    });

    document.fonts.ready.then(() => {
      const children = Array.from(track.children) as HTMLElement[];

      // Measure tallest item (e.g. "Komunikacja z kierowcami" may wrap)
      const itemH = Math.max(...children.map((el) => el.offsetHeight));
      const stageH = stage.offsetHeight;

      // Enforce uniform slot height (75% of natural → ~50% smaller visual gap)
      const slotH = Math.round(itemH * 0.75) + 32;
      children.forEach((el) => { el.style.height = `${slotH}px`; el.style.overflow = "hidden"; });

      const translateFor = (idx: number) =>
        -(idx * slotH) + (stageH / 2 - slotH / 2);

      const applyOpacity = (idx: number) => {
        children.forEach((el, i) => {
          const d = Math.abs(i - idx);
          el.style.opacity = d === 0 ? "1" : d === 1 ? "0.6" : d === 2 ? "0.3" : "0.1";
          el.style.color   = d === 0 ? "#020a0f" : "#d4d4d4";
        });
      };

      let currentIdx = ITEMS.length; // start at middle-set item 0

      // Initial state — no transition
      track.style.transition = "none";
      track.style.transform  = `translateY(${translateFor(currentIdx)}px)`;
      applyOpacity(currentIdx);

      const advance = () => {
        currentIdx++;

        // Smooth slide
        track.style.transition = `transform ${TRANS_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        track.style.transform  = `translateY(${translateFor(currentIdx)}px)`;
        applyOpacity(currentIdx);

        // When we enter the third set, schedule a seamless reset to the middle set
        if (currentIdx === ITEMS.length * 2) {
          setTimeout(() => {
            // Disable transitions on track + all items
            track.style.transition = "none";
            children.forEach((el) => { el.style.transition = "none"; });

            currentIdx = ITEMS.length;
            track.style.transform = `translateY(${translateFor(currentIdx)}px)`;
            applyOpacity(currentIdx);

            void track.offsetHeight; // flush styles

            // Restore item transitions (fall back to CSS class)
            children.forEach((el) => { el.style.transition = ""; });
          }, TRANS_MS + 20);
        }
      };

      // First dwell is DWELL_MS, then steady interval
      const t0 = setTimeout(() => {
        advance();
        const id = setInterval(advance, DWELL_MS + TRANS_MS);
        // Stash for cleanup
        (track as HTMLDivElement & { _interval?: ReturnType<typeof setInterval> })._interval = id;
      }, DWELL_MS);

      return () => {
        clearTimeout(t0);
        clearInterval(
          (track as HTMLDivElement & { _interval?: ReturnType<typeof setInterval> })._interval
        );
      };
    });

    return () => {};
  }, []);

  return (
    <>
      <style>{`
        .usecase-item {
          font-family: var(--font-geist), sans-serif;
          font-size: 48px;
          font-weight: 600;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          user-select: none;
          transition: opacity ${TRANS_MS}ms ease, color ${TRANS_MS}ms ease;
        }
        @media (max-width: 767px) {
          .usecase-item { font-size: 30px; }
        }
      `}</style>

      <section className="w-full overflow-hidden pt-5 pb-[60px]">
        <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:grid md:grid-cols-[200px_1fr_200px] items-center md:h-[460px] gap-4 md:gap-0">
          <h4 className="text-[18px] font-semibold text-[#020a0f] leading-[1.4] text-center md:text-left">
            Firmy używają<br />Slick AI do
          </h4>

          <div
            ref={stageRef}
            className="relative w-full h-[280px] md:h-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)",
            }}
          >
            <div ref={trackRef} className="absolute w-full top-0" />
          </div>

          <div className="flex justify-center md:justify-end items-center">
            <Button
              variant="outline"
              className="h-10 px-4 rounded-xl text-[15px] font-semibold border-[#e6e6eb] text-[#020a0f] bg-white hover:opacity-85 hover:bg-white"
              onClick={() => document.getElementById("fleet-status")?.scrollIntoView({ behavior: "smooth" })}
            >
              Poznaj platformę
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
