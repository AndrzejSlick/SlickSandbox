import Image from "next/image";
import { Eye } from "lucide-react";
import { FleetStatusWidget } from "./FleetStatusWidget";

export function FuelMonitor() {
  return (
    <section id="fleet-status" className="w-full py-14 md:py-24">
      <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* ── Left: text content ── */}
        <div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2 md:shrink-0">
          <div className="flex flex-col gap-4">

            {/* Pill */}
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-[#2563eb]" />
              <span className="font-semibold text-[13px] text-[#2563eb]">
                Status floty
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1] text-foreground">
              Slick AI śledzi<br />pozycje aut
            </h2>

            {/* Body */}
            <p className="text-[17px] text-muted-foreground leading-[24px]">
              Slick AI śledzi pozycje aut i zgłasza tylko anomalie — opóźnienia,
              postoje, brak kontaktu z kierowcą. Koniec z ręcznym sprawdzaniem
              statusów przez telefon.
            </p>
          </div>
        </div>

        {/* ── Right: Fleet status chat widget on map background ── */}
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
            <FleetStatusWidget />
          </div>

        </div>

      </div>
    </section>
  );
}
