import { File, ShoppingCart, PackageCheck, SquareCheckBig, FileWarning, Share2, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CMR_PREVIEW_SIGNED   = "https://www.figma.com/api/mcp/asset/ba8d8c29-e1cd-40e2-b3e9-8855771849d3";
const CMR_PREVIEW_UNSIGNED = "https://www.figma.com/api/mcp/asset/8958d9d5-6c7c-4325-bed9-c2016759e5e3";

const TABLE_ROWS: { label: string; value: string | [string, string] }[] = [
  { label: "Driver plates",    value: "KK 32421" },
  { label: "Client",           value: "HOMTRANS GmbH & Co. KG Am Rieck Logisti" },
  { label: "Pick up date",     value: "08:00 13.03.2025" },
  { label: "Pick up address",  value: ["PL, 31-154 Kraków", "Mogilska 24/1"] },
  { label: "Delivery date",    value: "16:00 14.03.2025" },
  { label: "Delivery address", value: ["CZ, 130 00 Vinohrady", "Portowa 21/2"] },
  { label: "CMR number",       value: "##101557307" },
];

interface DocumentCardProps {
  onOpen?: () => void;
  variant?: "signed" | "unsigned";
}

export function DocumentCard({ onOpen, variant = "signed" }: DocumentCardProps) {
  const isSigned = variant === "signed";

  return (
    <div className="flex gap-2.5 w-full max-w-3xl">
      {/* Avatar — sits at the bottom of the card */}
      <div className="flex flex-col justify-end shrink-0 pb-1">
        <div className="flex items-center justify-center size-8 rounded-full bg-secondary">
          <File className="size-4 text-foreground" />
        </div>
      </div>

      {/* Bubble */}
      <div
        className="flex-1 min-w-0 bg-secondary rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] p-2 flex flex-col gap-1 cursor-pointer hover:brightness-[0.98] transition-[filter] duration-150"
        onClick={onOpen}
      >

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold text-foreground leading-5">
            {isSigned ? (
              <>
                CMR document of{" "}
                <span className="underline">Feliks Solovev's</span>{" "}
                transport order
              </>
            ) : (
              "CMR document"
            )}
          </p>
          <p className="text-xs text-muted-foreground shrink-0 leading-5">18:52 18/04</p>
        </div>

        {/* Body */}
        <div className="flex gap-2 pt-1 items-stretch">

          {/* Left column */}
          <div className="flex flex-col gap-2 shrink-0">

            {isSigned ? (
              <>
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
              </>
            ) : (
              /* Unsigned warning card */
              <div className="bg-red-200 rounded-md">
                <div className="flex items-center py-0.5">
                  <div className="flex items-center justify-center size-8 shrink-0">
                    <FileWarning className="size-4 text-foreground" />
                  </div>
                  <p className="text-xs font-medium text-foreground px-2 py-1 whitespace-nowrap">
                    Unsigned document
                  </p>
                </div>
              </div>
            )}

            {/* Data table */}
            <div className="bg-white rounded-md w-[248px] overflow-hidden">
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

            {/* More info */}
            <Button variant="outline" size="sm" className="h-8 text-xs font-medium shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
              Więcej informacji
            </Button>
          </div>

          {/* Right column — CMR document preview */}
          <div className="flex-1 relative rounded-sm overflow-hidden">
            <img
              src={isSigned ? CMR_PREVIEW_SIGNED : CMR_PREVIEW_UNSIGNED}
              alt="CMR document preview"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-sm"
            />
            <div className="absolute bottom-2 right-2 flex gap-2">
              <Button variant="outline" size="icon" className="size-9 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                <Share2 className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="size-9 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                <Download className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer — AI attribution */}
        <div className="flex items-center gap-1 pt-1">
          <Sparkles className="size-2.5 text-violet-500" />
          <p className="text-xs text-violet-500">
            <span className="font-semibold">Slick AI </span>
            <span className="font-normal">find CMR document</span>
          </p>
        </div>
      </div>
    </div>
  );
}
