export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a]">
      <div className="max-w-[1140px] mx-auto px-4 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <img
          src="/logo.svg"
          alt="SlickShift"
          style={{ height: "13px", width: "auto", filter: "brightness(0) invert(1)" }}
        />
        <span className="text-[14px] text-[#a3a3a3]">
          Kontakt:{" "}
          <a href="mailto:alex@slickshift.ai" className="text-white hover:underline">
            alex@slickshift.ai
          </a>
        </span>
      </div>
      <div className="max-w-[1140px] mx-auto px-4 border-t border-[#262626] py-6">
        <p className="text-[13px] text-[#525252]">Wszelkie prawa zastrzeżone © 2026</p>
      </div>
    </footer>
  );
}
