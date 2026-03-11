import Image from "next/image";
import { FileText } from "lucide-react";
import { DocumentsWidget } from "./DocumentsWidget";

export function OrderSummary() {
  return (
    <section className="w-full py-14 md:py-24">
      <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* ── Left: text content (first in DOM = first on mobile) ── */}
        <div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2 md:shrink-0">
          <div className="flex flex-col gap-4">

            {/* Pill */}
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-[#059669]" />
              <span className="font-semibold text-[13px] text-[#059669]">
                Dokumenty CMR
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1] text-foreground">
              Weryfikacja Dokumentów
            </h2>

            {/* Body */}
            <p className="text-[17px] text-muted-foreground leading-[24px]">
              Sprawdzanie CMR i Lieferschein po każdym transporcie pochłania czas zespołu. AI weryfikuje dokumenty automatycznie, wykrywa braki i samo przypomina kierowcy o uzupełnieniu — biuro widzi tylko kompletne dokumenty.
            </p>

          </div>
        </div>

        {/* ── Right: chat widget on map background (second in DOM = second on mobile) ── */}
        <div className="w-full md:w-1/2 md:shrink-0 aspect-square rounded-[24px] overflow-hidden relative p-8 flex flex-col">
          <Image src="/route-map.png" alt="" fill className="object-cover" />
          <div className="relative w-full h-full">
            <DocumentsWidget />
          </div>
        </div>

      </div>
    </section>
  );
}
