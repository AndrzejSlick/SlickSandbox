import Image from "next/image";
import { MapPin } from "lucide-react";
import { ExtraKmWidget } from "./ExtraKmWidget";

export function ExtraKm() {
  return (
    <section className="w-full py-14 md:py-24">
      <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* ── Text content (first in DOM = first on mobile) ── */}
        <div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2 md:shrink-0">
          <div className="flex flex-col gap-4">

            {/* Pill */}
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#dc2626]" />
              <span className="font-semibold text-[13px] text-[#dc2626]">
                Nadrobione kilometry
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1] text-foreground">
              Slick AI wykrywa<br />każdy objazd
            </h2>

            {/* Body */}
            <p className="text-[17px] text-muted-foreground leading-[24px]">
              Slick AI monitoruje trasę w czasie rzeczywistym i natychmiast
              wykrywa odchylenia od planu. Każdy nadrobiony kilometr to koszt
              paliwa i czasu — teraz masz nad nim kontrolę.
            </p>

          </div>
        </div>

        {/* ── Chat widget on map background (second in DOM = second on mobile) ── */}
        <div className="w-full md:w-1/2 md:shrink-0 aspect-square rounded-[24px] overflow-hidden relative p-8 flex flex-col">
          <Image src="/route-map.png" alt="" fill className="object-cover" />
          <div className="relative w-full h-full">
            <ExtraKmWidget />
          </div>
        </div>

      </div>
    </section>
  );
}
