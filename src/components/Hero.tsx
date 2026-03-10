"use client";

import { DemoBookingDialog } from "@/components/DemoBookingDialog";

export function Hero() {
  return (
    <section className="w-full pt-10 pb-14 md:pt-16 md:pb-20 text-center">
      <div className="max-w-[1140px] mx-auto px-4 flex flex-col items-center">
        {/* "NEW · Slick AI" pill */}
        <div className="inline-flex items-center gap-1.5 h-8 pl-1.5 pr-[9px] bg-white border border-[#e6e6eb] rounded-[64px] mb-8 md:mb-10">
          <span className="inline-flex items-center justify-center h-5 px-2 bg-[#edf6ea] border border-[#c4dcbc] rounded-[64px] text-[10px] font-bold text-[#2d6e16] tracking-wide">
            NEW
          </span>
          <span className="text-sm font-medium text-[#47474f]">Slick AI</span>
        </div>

        {/* Heading */}
        <h1 className="max-w-[800px] text-[38px] md:text-[64px] font-semibold leading-[1.1] text-[#020a0f] mb-6 md:mb-8 [font-family:var(--font-geist)]">
          Twój nowy dyspozytor AI<br />Dostępny 24/7
        </h1>

        {/* Subtitle */}
        <p className="max-w-[600px] text-base md:text-lg font-normal leading-relaxed text-[#50565d] mb-10 md:mb-12 px-2">
          Slick AI pracuje, kiedy Ty śpisz. Monitoruje flotę, obsługuje zlecenia i pilnuje tras — bez przerwy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-6 sm:px-0">
          <a
            href="https://app.slickshift.ai/?tab=plan-order"
            className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-5 rounded-xl text-[15px] font-semibold border border-[#e6e6eb] text-[#020a0f] bg-white hover:opacity-85 transition-opacity"
          >
            Wypróbuj Slick AI
          </a>
          <DemoBookingDialog>
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-5 rounded-xl text-[15px] font-semibold text-white shadow-[0px_1px_4px_0px_rgba(37,99,235,0.3)] hover:opacity-85 transition-opacity cursor-pointer"
              style={{ background: "#2563EB" }}
            >
              Umów demo
            </button>
          </DemoBookingDialog>
        </div>
      </div>
    </section>
  );
}
