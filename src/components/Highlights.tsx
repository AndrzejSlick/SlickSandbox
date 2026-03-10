const STATS = [
  { label: "Zleceń sprocesowanych przez Slick AI", value: "12 400+" },
  { label: "Tras wycenionych i zaplanowanych automatycznie", value: "8 200+" },
  { label: "Wiadomości wysłanych do kierowców i klientów", value: "31 000+" },
  { label: "Godzin zaoszczędzonych przez zespoły miesięcznie", value: "620h" },
  { label: "Zintegrowanych systemów GPS", value: "50+" },
];

export function Highlights() {
  return (
    <section className="w-full bg-white py-14 md:py-24">
      <div className="max-w-[1080px] mx-auto px-4">

        {/* Heading */}
        <div className="mb-10 md:mb-16 max-w-[520px]">
          <h2 className="text-[28px] md:text-[42px] font-semibold leading-tight text-[#020a0f]">
            Realne efekty dla&nbsp;zespołów transportowych
          </h2>
        </div>

        {/* Stats rows */}
        <div className="border-t border-[#e6e6eb]">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-8 py-7 md:py-10 border-b border-[#e6e6eb]"
            >
              <p className="text-[15px] md:text-[16px] text-[#50565d] leading-[24px] md:max-w-[400px]">
                {stat.label}
              </p>
              <span className="text-[52px] md:text-[80px] font-semibold leading-none text-[#020a0f] md:shrink-0 tabular-nums">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
