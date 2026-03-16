import { X, ShoppingCart, PackageCheck, SquareCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";

const CMR_DOC_IMAGE = "https://www.figma.com/api/mcp/asset/387f772d-e883-4700-b978-c8231c5fafaf";

const TABLE_ROWS: { label: string; value: string | [string, string] }[] = [
  { label: "Driver plates",    value: "KK 32421" },
  { label: "Client",           value: "HOMTRANS GmbH & Co. KG Am Rieck Logisti" },
  { label: "Pick up date",     value: "08:00 13.03.2025" },
  { label: "Pick up address",  value: ["PL, 31-154 Kraków", "Mogilska 24/1"] },
  { label: "Delivery date",    value: "16:00 14.03.2025" },
  { label: "Delivery address", value: ["CZ, 130 00 Vinohrady", "Portowa 21/2"] },
  { label: "CMR number",       value: "##101557307" },
];

export function DocumentSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full w-full bg-[#fafafa]">

      {/* Header — same height as TopBar */}
      <div className="flex items-center justify-between gap-3 h-12 px-4 border-b border-border shrink-0">
        <h2 className="text-xl font-bold leading-none text-foreground">Document preview</h2>
        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
          onClick={onClose}
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">

          {/* Document image */}
          <img
            src={CMR_DOC_IMAGE}
            alt="CMR document"
            className="w-full rounded-sm"
            style={{ aspectRatio: "1129 / 1600", objectFit: "cover" }}
          />

          {/* Route card */}
          <div className="bg-green-200 rounded-md">
            <div className="flex items-center py-0.5 pr-2">
              <div className="flex items-center justify-center size-8 shrink-0">
                <ShoppingCart className="size-4 text-foreground" />
              </div>
              <p className="flex-1 text-xs font-medium text-foreground truncate px-2 py-1">
                PL, 31-154 Kraków
              </p>
            </div>
            <div className="flex items-center py-0.5 pr-1">
              <div className="flex items-center justify-center size-8 shrink-0">
                <PackageCheck className="size-4 text-foreground" />
              </div>
              <p className="flex-1 text-xs font-medium text-foreground truncate px-2 py-1">
                CZ, 130 00 Vinohrady
              </p>
              <span className="shrink-0 text-xs font-medium text-green-700 bg-green-200 rounded-md px-1.5 py-0.5">
                On time
              </span>
            </div>
          </div>

          {/* Signed card */}
          <div className="bg-green-200 rounded-md">
            <div className="flex items-center py-0.5">
              <div className="flex items-center justify-center size-8 shrink-0">
                <SquareCheckBig className="size-4 text-foreground" />
              </div>
              <p className="text-xs font-medium text-foreground px-2 py-1 whitespace-nowrap">
                CMR document signed
              </p>
            </div>
          </div>

          {/* Data table */}
          <div className="bg-white rounded-md overflow-hidden">
            {TABLE_ROWS.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-center ${i < TABLE_ROWS.length - 1 ? "border-b border-border" : ""}`}
                style={{ minHeight: "38px" }}
              >
                <div className="w-[106px] shrink-0 p-2">
                  <p className="text-xs text-foreground truncate">{label}</p>
                </div>
                <div className="flex-1 min-w-0 p-2">
                  {Array.isArray(value) ? (
                    <>
                      <p className="text-xs font-medium text-foreground truncate leading-4">{value[0]}</p>
                      <p className="text-xs font-medium text-foreground truncate leading-4">{value[1]}</p>
                    </>
                  ) : (
                    <p className="text-xs font-medium text-foreground truncate leading-4">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
