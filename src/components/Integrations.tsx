"use client";

const INTEGRATIONS: { name: string; domain: string }[] = [
  { name: "ActiveGPS",       domain: "activegps.pl" },
  { name: "Add Secure",      domain: "addsecure.com" },
  { name: "Alior Leasing",   domain: "aliorleasing.pl" },
  { name: "ATKGPS",          domain: "atkgps.pl" },
  { name: "Atlas",           domain: "atlas.pl" },
  { name: "Atrax",           domain: "atrax.com.pl" },
  { name: "Carnet",          domain: "carnet.pl" },
  { name: "Cartrack",        domain: "cartrack.com" },
  { name: "DataSystem",      domain: "datasystem.pl" },
  { name: "DBK",             domain: "dbk.pl" },
  { name: "DigiTrack",       domain: "digitrack.pl" },
  { name: "DKV",             domain: "dkv.com" },
  { name: "Eco Truck",       domain: "ecotruck.pl" },
  { name: "EMTrack",         domain: "emtrack.pl" },
  { name: "EuroWag",         domain: "eurowag.com" },
  { name: "FleetHand",       domain: "fleethand.com" },
  { name: "Flotis",          domain: "flotis.pl" },
  { name: "Flotman",         domain: "flotman.pl" },
  { name: "GBox",            domain: "gbox.pl" },
  { name: "GeoNavi",         domain: "geonavi.pl" },
  { name: "GlobalGPS",       domain: "globalgps.pl" },
  { name: "GPSOUR",          domain: "gpsour.pl" },
  { name: "GPSTE",           domain: "gpste.pl" },
  { name: "Holte",           domain: "holte.no" },
  { name: "Wialon Hosting",  domain: "gurtam.com" },
  { name: "Infis",           domain: "infis.pl" },
  { name: "K2GPS",           domain: "k2gps.pl" },
  { name: "Keratronik",      domain: "keratronik.pl" },
  { name: "LogiSat",         domain: "logisat.pl" },
  { name: "MKing",           domain: "mking.pl" },
  { name: "MotoGPS",         domain: "motogps.pl" },
  { name: "NaviFleet",       domain: "navifleet.pl" },
  { name: "NaviMan",         domain: "naviman.pl" },
  { name: "NaviRec",         domain: "navirec.eu" },
  { name: "PanGPS",          domain: "pangps.pl" },
  { name: "Ruptela",         domain: "ruptela.com" },
  { name: "Scania",          domain: "scania.com" },
  { name: "SkanTransport",   domain: "skantransport.pl" },
  { name: "Tekom",           domain: "tekom.pl" },
  { name: "Trimble",         domain: "trimble.com" },
  { name: "Tronik",          domain: "tronik.pl" },
  { name: "TxTango",         domain: "txtango.com" },
  { name: "Verizon Connect", domain: "verizonconnect.com" },
  { name: "Viasat",          domain: "viasat.com" },
  { name: "WebEye",          domain: "webeye.eu" },
  { name: "WebFleet",        domain: "webfleet.com" },
  { name: "Wialon",          domain: "wialon.com" },
  { name: "WidziszWszystko", domain: "widziszwszystko.pl" },
];

const half = Math.ceil(INTEGRATIONS.length / 2);
const ROW_1 = INTEGRATIONS.slice(0, half);
const ROW_2 = INTEGRATIONS.slice(half);

function ProviderBadge({ name, domain }: { name: string; domain: string }) {
  return (
    <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-full border border-[#e6e6eb] bg-white text-[13px] md:text-[14px] text-[#47474f] whitespace-nowrap shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] hover:border-[#d0d0d8] hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] transition-shadow no-underline">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
        alt=""
        width={16}
        height={16}
        className="w-4 h-4 object-contain rounded-sm flex-shrink-0"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      {name}
    </a>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: { name: string; domain: string }[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={
          direction === "left" ? "marquee-left flex gap-3" : "marquee-right flex gap-3"
        }
      >
        {doubled.map((item, i) => (
          <ProviderBadge key={i} name={item.name} domain={item.domain} />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section className="w-full bg-white py-14 md:py-24 overflow-hidden">
      {/* Heading */}
      <div className="max-w-[1140px] mx-auto px-4 mb-10 md:mb-14">
        <h2 className="text-[28px] md:text-[42px] font-semibold leading-tight text-[#020a0f] mb-3">
          Integracje z&nbsp;systemami GPS
        </h2>
        <p className="text-[15px] md:text-[17px] text-[#50565d] leading-[24px] max-w-[480px]">
          Połącz platformę z systemem GPS, którego już używasz. Obsługujemy
          ponad&nbsp;50&nbsp;dostawców telematyki.
        </p>
      </div>

      {/* Marquee rows */}
      <div className="relative flex flex-col gap-3">
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        <MarqueeRow items={ROW_1} direction="left" />
        <MarqueeRow items={ROW_2} direction="right" />
      </div>

      <style>{`
        .marquee-left {
          animation: marquee-scroll-left 52s linear infinite;
        }
        .marquee-right {
          animation: marquee-scroll-right 52s linear infinite;
        }
        @keyframes marquee-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
