import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="w-full bg-white py-6">
      <div className="max-w-[1140px] mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" aria-label="SlickShift">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="SlickShift" style={{ height: "18px", width: "auto", display: "block" }} />
        </a>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden md:flex h-10 px-4 rounded-xl text-[15px] font-semibold border-[#e6e6eb] text-[#020a0f] bg-white hover:opacity-85 hover:bg-white"
          >
            Wypróbuj za darmo
          </Button>
          <Button
            className="h-10 px-4 rounded-xl text-[15px] font-semibold text-white shadow-[0px_1px_4px_0px_rgba(37,99,235,0.3)] hover:opacity-85"
            style={{
              background: "#2563EB",
            }}
          >
            Umów demo
          </Button>
        </div>
      </div>
    </header>
  );
}
