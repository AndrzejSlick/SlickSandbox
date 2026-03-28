import { File, ShoppingCart, PackageCheck, SquareCheckBig, FileWarning, CircleAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CMR_PREVIEW_SIGNED     = "https://www.figma.com/api/mcp/asset/ac00d6ff-466e-4c36-8091-e919e84c3ac6";
const CMR_PREVIEW_UNSIGNED   = "https://www.figma.com/api/mcp/asset/8958d9d5-6c7c-4325-bed9-c2016759e5e3";
const CMR_PREVIEW_CMR_SIGNED = "https://www.figma.com/api/mcp/asset/d7b3fe37-e7bb-490d-b480-4342315ffdbf";
const CMR_PREVIEW_CMR_ERROR  = "https://www.figma.com/api/mcp/asset/5362b8ed-3c60-4981-9818-180c7d556f27";

interface DocumentCardProps {
  onOpen?: () => void;
  onOpenRoute?: () => void;
  variant?: "signed" | "unsigned" | "cmr-signed" | "cmr-error";
}

// ── Shared shell ─────────────────────────────────────────────────────────────
function CardShell({
  title,
  previewSrc,
  children,
  onOpen,
}: {
  title: React.ReactNode;
  previewSrc: string;
  children: React.ReactNode;
  onOpen?: () => void;
}) {
  return (
    <div className="flex items-end gap-2.5 w-full max-w-[480px]">
      {/* Avatar */}
      <div className="shrink-0 pb-1">
        <div className="flex items-center justify-center size-8 rounded-full bg-secondary">
          <File className="size-4 text-foreground" />
        </div>
      </div>

      {/* Bubble */}
      <div
        className="bg-secondary rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] p-2 flex flex-col gap-1 cursor-pointer hover:brightness-[0.98] transition-[filter] duration-150"
        onClick={onOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-foreground leading-5">{title}</p>
          <p className="text-xs text-muted-foreground shrink-0 leading-5 font-normal">18:52 18/04</p>
        </div>

        {/* Body */}
        <div className="flex gap-2 pt-1">
          {/* Left column */}
          <div className="flex flex-col gap-2 w-[253px]">
            {children}
          </div>

          {/* Right column — CMR preview */}
          <div className="w-[141px] self-stretch relative rounded-sm overflow-hidden">
            <img
              src={previewSrc}
              alt="CMR document preview"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-sm"
            />
          </div>
        </div>

        {/* Footer */}
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

// ── Shared sub-components ────────────────────────────────────────────────────
function DriverRow() {
  return (
    <div className="bg-background rounded-md">
      <div className="flex items-center py-0.5">
        <div className="flex items-center justify-center size-8 shrink-0">
          <div className="flex items-center justify-center size-6 rounded-full bg-muted text-xs font-normal text-foreground">
            FS
          </div>
        </div>
        <div className="flex items-center px-2 py-1 w-[152px]">
          <p className="text-xs font-medium text-accent-foreground truncate">Felisk Solovev</p>
        </div>
      </div>
    </div>
  );
}

function RouteCard() {
  return (
    <div className="bg-background rounded-md relative">
      <div className="flex items-center py-0.5 pr-2">
        <div className="flex items-center justify-center size-8 shrink-0">
          <ShoppingCart className="size-4 text-foreground" />
        </div>
        <p className="flex-1 text-xs font-medium text-accent-foreground truncate px-2 py-1">
          PL, 31-154 Kraków
        </p>
      </div>
      <div className="absolute left-[17px] top-[30px] w-0 h-3 flex items-center justify-center">
        <div className="w-px h-3 bg-border" />
      </div>
      <div className="flex items-center py-0.5 pr-2">
        <div className="flex items-center justify-center size-8 shrink-0">
          <PackageCheck className="size-4 text-foreground" />
        </div>
        <p className="flex-1 text-xs font-medium text-accent-foreground truncate px-2 py-1">
          CZ, 130 00 Vinohrady
        </p>
      </div>
    </div>
  );
}

function SzczegółyButton() {
  return (
    <Button variant="outline" size="sm" className="h-8 text-xs font-medium shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] self-start">
      Szczegóły dokumentu
    </Button>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function DocumentCard({ onOpen, onOpenRoute, variant = "signed" }: DocumentCardProps) {
  const trasaButton = (
    <Button
      variant="outline"
      size="sm"
      className="h-8 text-xs font-medium shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
      onClick={e => { e.stopPropagation(); onOpenRoute?.(); }}
    >
      Trasa
    </Button>
  );

  if (variant === "signed") {
    return (
      <CardShell
        title={<>Transport order <span className="underline [text-decoration-skip-ink:none]">#323143</span></>}
        previewSrc={CMR_PREVIEW_SIGNED}
        onOpen={onOpen}
      >
        <DriverRow />
        <RouteCard />
        <div className="bg-green-100 rounded-md">
          <div className="flex items-center py-0.5">
            <div className="flex items-center justify-center size-8 shrink-0">
              <SquareCheckBig className="size-4 text-green-700" />
            </div>
            <div className="flex items-center px-2 py-1 w-[152px]">
              <p className="text-xs font-medium text-green-700 truncate">CMR document signed</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {trasaButton}
          <Button variant="outline" size="sm" className="h-8 text-xs font-medium shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            Dokumenty
          </Button>
        </div>
      </CardShell>
    );
  }

  if (variant === "unsigned") {
    return (
      <CardShell
        title={<>Transport order <span className="underline [text-decoration-skip-ink:none]">#323143</span></>}
        previewSrc={CMR_PREVIEW_UNSIGNED}
        onOpen={onOpen}
      >
        <DriverRow />
        <RouteCard />
        <div className="bg-red-100 rounded-md">
          <div className="flex items-center py-0.5">
            <div className="flex items-center justify-center size-8 shrink-0">
              <FileWarning className="size-4 text-red-700" />
            </div>
            <div className="flex items-center px-2 py-1">
              <p className="text-xs font-medium text-red-700 whitespace-nowrap">Unsigned document</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {trasaButton}
          <Button variant="outline" size="sm" className="h-8 text-xs font-medium shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            Dokumenty
          </Button>
        </div>
      </CardShell>
    );
  }

  if (variant === "cmr-signed") {
    return (
      <CardShell
        title="CMR Document"
        previewSrc={CMR_PREVIEW_CMR_SIGNED}
        onOpen={onOpen}
      >
        <div className="bg-green-100 rounded-md">
          <div className="flex items-center py-0.5">
            <div className="flex items-center justify-center size-8 shrink-0">
              <SquareCheckBig className="size-4 text-green-700" />
            </div>
            <div className="flex items-center px-2 py-1 w-[152px]">
              <p className="text-xs font-medium text-green-700 truncate">CMR document signed</p>
            </div>
          </div>
        </div>
        <SzczegółyButton />
      </CardShell>
    );
  }

  // cmr-error
  return (
    <CardShell
      title="CMR Document"
      previewSrc={CMR_PREVIEW_CMR_ERROR}
      onOpen={onOpen}
    >
      <div className="bg-red-100 rounded-md w-[248px]">
        <div className="flex items-start py-0.5">
          <div className="flex items-center justify-center size-8 shrink-0">
            <CircleAlert className="size-4 text-red-700" />
          </div>
          <div className="flex items-center px-2 py-1">
            <p className="text-xs font-medium text-red-700 leading-4">
              The CMR document contains only one of the two pages. Ask the driver to send the entire document.
            </p>
          </div>
        </div>
      </div>
      <SzczegółyButton />
    </CardShell>
  );
}
