import { BarChart2, Calendar, ChevronDown, Download } from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */

const kpis = [
  { label: "Zlecenia",        value: "58",         sub: "660 km / zlecenie",   valueClass: "text-[#2563eb]" },
  { label: "Przychód",        value: "46 538 €",   sub: "1,65 € / km",         valueClass: "text-[#0a0a0a]" },
  { label: "Dystans",         value: "38 290 km",  sub: "802 € / zlecenie",    valueClass: "text-[#0a0a0a]" },
  { label: "Opłaty drogowe",  value: "1 320 €",    sub: "~3,45 € / 100 km",   valueClass: "text-[#0a0a0a]" },
  { label: "Paliwo",          value: "11 490 l",   sub: "29 l / 100 km",       valueClass: "text-[#0a0a0a]" },
  { label: "Czas jazdy",      value: "1 295 h",    sub: "21h / zlecenie",      valueClass: "text-[#0a0a0a]" },
];

const comparisons = [
  {
    title: "Dystans",
    cols: [
      { label: "Zaplanowano",  value: "36 200 km" },
      { label: "Realizacja",   value: "38 290 km" },
      { label: "Różnica",      value: "+2 090 km", badge: "+5,77%", badgeClass: "text-[#dc2626]" },
    ],
  },
  {
    title: "Opłaty drogowe",
    cols: [
      { label: "Zaplanowano",  value: "1 320 €" },
      { label: "Realizacja",   value: "1 200 €" },
      { label: "Różnica",      value: "-120 €",    badge: "-9,1%",  badgeClass: "text-[#16a34a]" },
    ],
  },
  {
    title: "Paliwo",
    cols: [
      { label: "Zaplanowano",  value: "11 490 l" },
      { label: "Realizacja",   value: "11 300 l" },
      { label: "Różnica",      value: "-190 l",    badge: "-1,65%", badgeClass: "text-[#16a34a]" },
    ],
  },
  {
    title: "Kilometry ładowne / nieładowne",
    cols: [
      { label: "Dystans",              value: "38 290 km" },
      { label: "Kilometry ładowne",    value: "35 090 km", badge: "91,6%", badgeClass: "text-[#737373]" },
      { label: "Kilometry nieładowne", value: "3 200 km",  badge: "8,4%",  badgeClass: "text-[#737373]" },
    ],
  },
];

const TABS = ["Podsumowanie", "Biuro", "Flota", "Zlecenia"];

/* ── Widget ────────────────────────────────────────────── */

function ReportWidget() {
  return (
    <div className="w-full bg-white border border-[#e5e5e5] rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 gap-3 flex-wrap">
        <p className="text-[30px] font-bold text-[#0a0a0a] tracking-tight leading-9 shrink-0">Raport</p>
        <div className="flex items-center gap-2 shrink-0">
          {/* Date picker */}
          <div className="flex items-center gap-2 h-9 px-3 bg-white border border-[#e5e5e5] rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-sm text-[#0a0a0a]">
            <Calendar className="w-4 h-4 text-[#737373] shrink-0" />
            <span className="whitespace-nowrap">Styczeń 2026</span>
          </div>
          {/* Driver select */}
          <div className="flex items-center gap-2 h-9 px-3 bg-white border border-[#e5e5e5] rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-sm text-[#0a0a0a]">
            <span className="whitespace-nowrap">Wszyscy kierowcy</span>
            <ChevronDown className="w-4 h-4 text-[#737373] shrink-0" />
          </div>
          {/* Export */}
          <div className="flex items-center gap-2 h-9 px-3 bg-white border border-[#e5e5e5] rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-sm font-medium text-[#0a0a0a]">
            <span className="whitespace-nowrap">Importuj jako</span>
            <Download className="w-4 h-4 text-[#737373] shrink-0" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pb-4">
        <div className="inline-flex bg-[#f5f5f5] rounded-[10px] p-[3px] gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                tab === "Podsumowanie"
                  ? "bg-white text-[#0a0a0a] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)]"
                  : "text-[#0a0a0a]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* KPI summary row */}
      <div className="mx-6 mb-4 border border-[#e5e5e5] rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex divide-x divide-[#e5e5e5]">
          {kpis.map((k) => (
            <div key={k.label} className="flex-1 flex flex-col gap-0.5 px-3 py-3 min-w-0">
              <p className="text-[13px] font-semibold text-[#0a0a0a] leading-5 truncate">{k.label}</p>
              <p className={`text-[22px] font-bold leading-7 truncate ${k.valueClass}`}>{k.value}</p>
              <p className="text-xs text-[#737373] leading-4 truncate">{k.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison rows */}
      <div className="px-6 pb-6 flex flex-col gap-3">
        {comparisons.map((row) => (
          <div key={row.title} className="border border-[#e5e5e5] rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] px-4 py-3">
            <p className="text-sm font-semibold text-[#0a0a0a] mb-3">{row.title}</p>
            <div className="flex gap-8">
              {row.cols.map((col) => (
                <div key={col.label} className="flex flex-col gap-0.5">
                  <p className="text-xs text-[#737373] leading-4">{col.label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-[17px] font-bold text-[#0a0a0a] leading-6">{col.value}</p>
                    {col.badge && (
                      <span className={`text-sm font-medium leading-5 ${col.badgeClass}`}>{col.badge}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ── Section ────────────────────────────────────────────── */

export function Report() {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1140px] mx-auto px-4 flex items-start gap-16">

        {/* ── Left: widget ── */}
        <div className="flex-1 min-w-0">
          <ReportWidget />
        </div>

        {/* ── Right: text content ── */}
        <div className="flex flex-col gap-10 w-[420px] shrink-0">
          <div className="flex flex-col gap-4">

            {/* Pill */}
            <div className="flex items-center gap-1">
              <BarChart2 className="w-4 h-4 text-[#6366f1]" />
              <span className="font-semibold text-[13px] text-[#6366f1]">
                Raport
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[48px] font-semibold leading-[1] text-foreground">
              Dane, które mówią wszystko
            </h2>

            {/* Body */}
            <p className="text-[17px] text-muted-foreground leading-[24px]">
              Slick AI generuje automatyczne raporty miesięczne – dystans, przychody, koszty paliwa i opłaty drogowe. Porównaj plan z realizacją w jednym miejscu.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
