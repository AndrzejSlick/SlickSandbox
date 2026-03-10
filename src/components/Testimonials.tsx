const TESTIMONIALS = [
  {
    quote: "Asystent Slick odciąża nasz zespół – automatyzuje śledzenie tras i porządkuje komunikację. Ogromne ułatwienie na co dzień!",
    name: "Janek Piątkowski",
    role: "Właściciel firmy Black-Orange",
    avatar: "",
  },
  {
    quote: "Skupienie rozmów, map i nadzoru nad wykonaniem trasy dzięki asystentowi Slick jest największą wartością.",
    name: "Michał Konopka",
    role: "Właściciel firmy KM Transport",
    avatar: "",
  },
  {
    quote: "Uzupełniam sam statusy, co kierowca robi w danym momencie — to wszystko ręcznie się dzieje",
    name: "Piotrek",
    role: "NFL",
    avatar: "",
  },
  {
    quote: "Planujesz sobie, tu dojeść, zrób to i to — a potem otwierasz jego tacho, 3 godziny mu zostało",
    name: "Anton",
    role: "Codognotto",
    avatar: "",
  },
  {
    quote: "30% czasu to sprawdzanie dokumentów — 20 stron Lieferschein na każdy transport",
    name: "Szymon",
    role: "Logistic-Evex",
    avatar: "",
  },
  {
    quote: "Planowanie tras jest o wiele szybciej, szybciej to łapie. To jest na pewno poprawa o wiele procent w porównaniu do tego, co było wcześniej.",
    name: "Anton, Kierownik Floty",
    role: "Codognotto Polska (212 aut)",
    avatar: "",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-[#f6f6f8] py-14 md:py-24">
      {/* Title */}
      <div className="flex flex-col items-center gap-4 mb-10 md:mb-16 text-center px-4">
        <span className="text-[13px] font-semibold text-[#2d6e16]">Referencje</span>
        <h2 className="text-[32px] md:text-[48px] font-semibold leading-tight text-[#020a0f] max-w-[600px]">
          Zaufali nam liderzy<br />branży transportowej
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#50565d] max-w-[600px]">
          Przekonaj się, dlaczego Slick AI to wybór numer jeden dla rozwijających się firm transportowych.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-[1080px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-[0px_2px_4px_0px_rgba(103,103,103,0.08),0px_0px_0px_1px_rgba(103,103,103,0.08)] flex flex-col gap-4"
            >
              <p className="text-[14px] text-[#47474f] leading-[21px]">{t.quote}</p>
              <div className="flex flex-col mt-auto">
                <p className="text-[13px] font-medium text-[#020a0f] leading-[21px]">{t.name}</p>
                <p className="text-[13px] text-[#50565d] leading-[21px]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
