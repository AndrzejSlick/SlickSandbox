"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "Jak Slickshift AI nadzoruje flotę?",
    answer:
      "Zakładając, że każde auto w Twojej flocie przejeżdża miesięcznie 10 000 km, Slickshift pozwala szybko zidentyfikować zbędne kilometry – nawet jeśli to tylko 0,5% trasy, czyli 50 km miesięcznie na pojazd. Przy większej flocie oznacza to tysiące, a nawet dziesiątki tysięcy złotych oszczędności rocznie. Dodatkowo system na bieżąco informuje, gdy kierowca stoi zbyt długo w miejscu mimo zaplanowanej jazdy, albo kiedy zbliża się koniec lub początek czasu pracy. Dzięki temu można szybciej reagować, lepiej planować ruch i unikać niepotrzebnych przestojów – co przekłada się na realne oszczędności paliwa, czasu i nerwów.",
  },
  {
    question: "Czy muszę zmieniać system GPS, żeby korzystać ze Slickshift?",
    answer:
      "Nie. Slickshift integruje się z Twoim obecnym systemem GPS i nie wymaga wymiany sprzętu ani oprogramowania. Wystarczy krótka konfiguracja, żeby zacząć korzystać z pełnych możliwości platformy.",
  },
  {
    question: "Czy mapy w Slickshift AI uwzględniają wielkość aut, zakazy ruchu i sytuację na drodze?",
    answer:
      "Tak – Slickshift korzysta z zaawansowanych map HERE, które są stworzone specjalnie z myślą o transporcie ciężarowym. System uwzględnia gabaryty pojazdu, ograniczenia tonażowe, zakazy wjazdu, remonty oraz aktualny ruch drogowy. Dzięki temu trasy są realne i bezpieczne, a przewidywania czasu dojazdu dużo bardziej precyzyjne niż w standardowych mapach.",
  },
  {
    question: "Czy Slickshift jest dostępny poza biurem?",
    answer:
      "Tak. Slickshift działa w przeglądarce na każdym urządzeniu – komputerze, tablecie czy smartfonie. Możesz monitorować flotę i zarządzać zleceniami z dowolnego miejsca, bez instalowania dodatkowych aplikacji.",
  },
  {
    question: "Jak wygląda wdrożenie Slickshift?",
    answer:
      "Wdrożenie trwa zazwyczaj kilka dni roboczych. Nasz zespół przeprowadza integrację z Twoimi systemami, konfiguruje platformę pod potrzeby floty i szkoli zespół. Przez pierwsze tygodnie jesteśmy w stałym kontakcie, żeby mieć pewność, że wszystko działa sprawnie.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full py-14 md:py-24 bg-white">
      <div className="max-w-[667px] mx-auto px-4 flex flex-col items-center gap-10 md:gap-16">
        {/* Title */}
        <div className="flex flex-col items-center gap-4 text-center w-full">
          <span className="text-[13px] font-semibold text-[#2d6e16]">FAQ</span>
          <h2 className="text-[32px] md:text-[48px] font-semibold leading-tight text-[#020a0f]">
            Masz pytania? Mamy odpowiedzi.
          </h2>
          <p className="text-[17px] text-[#50565d] leading-[24px]">
            Jeśli czegoś tu nie ma, napisz do nas na alex@slickshift.ai
          </p>
        </div>

        {/* Accordion */}
        <div className="w-full border-t border-[#e6e6eb]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[#e6e6eb]">
                <button
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[15px] font-medium text-[#020a0f]">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="w-[15px] h-[15px] shrink-0 text-[#020a0f]" />
                  ) : (
                    <Plus className="w-[15px] h-[15px] shrink-0 text-[#020a0f]" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-[15px] text-[#50565d] leading-[24px] pb-6">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
