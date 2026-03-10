import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import { ProceduresWidget } from "./ProceduresWidget";

export function Procedures() {
  return (
    <section className="w-full py-14 md:py-24">
      <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">

        {/* ── Text content (first in DOM = first on mobile) ── */}
        <div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2 md:shrink-0">
          <div className="flex flex-col gap-4">

            {/* Pill */}
            <div className="flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-[#d97706]" />
              <span className="font-semibold text-[13px] text-[#d97706]">
                Procedury i mandaty
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1] text-foreground">
              Slick AI<br />pilnuje procedur
            </h2>

            {/* Body */}
            <p className="text-[17px] text-muted-foreground leading-[24px]">
              Slick AI pilnuje plomb celnych przy eksporcie do UK, zakazów ruchu
              weekendowego AT/DE i specjalnych procedur ADR. Automatyczne
              przypomnienia i geofencing zanim kierowca wyjedzie.
            </p>

          </div>
        </div>

        {/* ── Chat widget on map background (second in DOM = second on mobile) ── */}
        <div className="w-full md:w-1/2 md:shrink-0 aspect-square rounded-[24px] overflow-hidden relative p-8 flex flex-col">

          {/* Map background */}
          <Image
            src="/route-map.png"
            alt=""
            fill
            className="object-cover"
          />

          {/* Chat widget */}
          <div className="relative w-full h-full">
            <ProceduresWidget />
          </div>

        </div>

      </div>
    </section>
  );
}
