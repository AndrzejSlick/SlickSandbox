const LOGOS = [
  { src: "/chomar_logo.png",     alt: "Chomar",        w: 88,  h: 28 },
  { src: "/logo-prosto-dark.png",alt: "Prosto do celu",w: 152, h: 27 },
  { src: "/beedee_logo.png",     alt: "BeeDee Express",w: 137, h: 28 },
  { src: "/coltrans_logo.png",   alt: "Coltrans",      w: 145, h: 28 },
  { src: "/jit_logo.png",        alt: "JIT Logistik",  w: 99,  h: 35 },
  { src: "/codognotto_logo.png", alt: "Codognotto",    w: 107, h: 40 },
];

export function Clients() {
  return (
    <section className="w-full py-[80px] md:py-[180px]">
      <div className="max-w-[1140px] mx-auto px-4 flex flex-col items-center gap-8">
        <p className="text-[16px] font-medium text-[#50565d] text-center">
          Firmy, które korzystają ze SlickShift
        </p>
        <div className="flex items-center gap-8 md:gap-10 flex-wrap justify-center">
          {LOGOS.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              style={{ width: logo.w, height: logo.h }}
            />
          ))}
          <span className="text-[15px] font-semibold text-[#50565d]">+80 więcej</span>
        </div>
      </div>
    </section>
  );
}
