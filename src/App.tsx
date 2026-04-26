import { useState, useRef, useCallback } from 'react';
import './App.css';
import { ChevronDown } from 'lucide-react';
import { TooltipProvider } from './components/ui/tooltip';
import { Navbar } from './components/Navbar';
import { TopBar } from './components/TopBar';
import { DocumentCard } from './components/DocumentCard';
import { DocumentSidebar } from './components/DocumentSidebar';
import { RouteSidebar } from './components/RouteSidebar';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatMessages, ChatMap, ChatStops, DRIVER_DATA } from './components/ChatMain';
import { ChatAiPanel, AutomationsCard } from './components/ChatAiPanel';
import { Timeline } from './components/Timeline';
import { cn } from './lib/utils';

function ResizableDivider({
  onDelta,
  onDragChange,
}: {
  onDelta: (delta: number) => void;
  onDragChange: (dragging: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const lastX = useRef(0);
  const active = hovered || dragging;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    lastX.current = e.clientX;
    setDragging(true);
    onDragChange(true);

    const onMove = (e: MouseEvent) => {
      const delta = lastX.current - e.clientX;
      lastX.current = e.clientX;
      onDelta(delta);
    };

    const onUp = () => {
      setDragging(false);
      onDragChange(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div
      className="shrink-0 flex justify-center items-stretch cursor-col-resize relative z-10"
      style={{ width: '5px', marginLeft: '-2px', marginRight: '-2px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={handleMouseDown}
    >
      <div
        className="transition-all duration-150 ease-in-out"
        style={{
          width: active ? '2px' : '1px',
          backgroundColor: active ? '#2563EB' : 'transparent',
        }}
      />
    </div>
  );
}

// ─── Collapsible widget ────────────────────────────────────────────────────────

function Widget({ title, defaultOpen = true, initialHeight, children }: {
  title: string;
  defaultOpen?: boolean;
  initialHeight?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(initialHeight);
  const [resizing, setResizing] = useState(false);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = height ?? 200;
    setResizing(true);

    const onMove = (e: MouseEvent) => {
      setHeight(Math.max(80, startH + (e.clientY - startY)));
    };
    const onUp = () => {
      setResizing(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div className="rounded-xl border border-border/50 bg-white shadow-xs overflow-hidden shrink-0" style={{ borderWidth: '0.5px' }}>
      <button
        className="w-full flex items-center justify-between px-3 h-10 hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        <ChevronDown className={cn('size-4 text-muted-foreground transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <>
          <div
            className="border-t border-border overflow-hidden"
            style={height !== undefined ? { height } : {}}
          >
            {children}
          </div>
          {/* Vertical resize handle */}
          <div
            className={cn(
              'h-2 cursor-row-resize flex items-center justify-center transition-colors group',
              resizing ? 'bg-blue-50' : 'hover:bg-blue-50',
            )}
            onMouseDown={handleResizeMouseDown}
          >
            <div className={cn('w-6 h-0.5 rounded-full transition-colors', resizing ? 'bg-blue-400' : 'bg-transparent group-hover:bg-blue-400')} />
          </div>
        </>
      )}
    </div>
  );
}

type SidebarContent = 'doc' | 'route' | null;

function App() {
  const [activeId, setActiveId] = useState('chat');
  const [selectedDriverId, setSelectedDriverId] = useState('szymon');
  const [sidebarContent, setSidebarContent] = useState<SidebarContent>(null);
  const [sidebarWidth, setSidebarWidth] = useState(480);
  const [widgetsPanelWidth, setWidgetsPanelWidth] = useState(390);
  const [isResizing, setIsResizing] = useState(false);

  const sidebarOpen = sidebarContent !== null;

  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth(w => Math.max(280, Math.min(900, w + delta)));
  }, []);

  const handleWidgetsPanelResize = useCallback((delta: number) => {
    setWidgetsPanelWidth(w => Math.max(280, Math.min(700, w + delta)));
  }, []);


  return (
    <TooltipProvider delayDuration={300}>
    <div className="flex h-screen w-screen overflow-hidden bg-muted">
      <Navbar activeId={activeId} onActiveChange={setActiveId} />

      {activeId === 'timeline' && (
        <>
          <div className="flex flex-col flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-center px-3 pt-4 pb-2 shrink-0">
              <span className="text-xl font-semibold text-foreground">Timeline</span>
            </div>
            {/* White card */}
            <div className="flex-1 min-h-0 flex pl-2 pb-2">
              <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden rounded-xl border border-border/50 bg-white shadow-xs" style={{ borderWidth: '0.5px' }}>
                <Timeline />
              </div>
            </div>
          </div>
          <ChatAiPanel showAutomations={false} />
        </>
      )}

      {activeId === 'chat' && (
        <>
          <ChatSidebar selectedId={selectedDriverId} onSelect={setSelectedDriverId} />
          <div className="w-px shrink-0 bg-border/50" />
          <div className="flex flex-1 min-w-0 h-full" style={{ backgroundColor: '#FAFAFA' }}>
          <ChatAiPanel showAutomations={false} />
          {/* Right widgets panel */}
          <ResizableDivider onDelta={handleWidgetsPanelResize} onDragChange={setIsResizing} />
          <div className="shrink-0 flex flex-col gap-2 p-2 overflow-y-auto" style={{ width: widgetsPanelWidth }}>
            <Widget title="Automations">
              <AutomationsCard />
            </Widget>
            <Widget title={`Chat · ${DRIVER_DATA[selectedDriverId]?.name ?? 'Driver'}`} initialHeight={300}>
              <div className="h-full overflow-hidden">
                <ChatMessages />
              </div>
            </Widget>
            <Widget title="Route Map" initialHeight={420}>
              <div className="h-[260px] overflow-hidden shrink-0">
                <ChatMap compact />
              </div>
              <ChatStops />
            </Widget>
          </div>
          </div>
        </>
      )}

      {activeId === 'crm' && (
        <>
          {/* Left column: top bar + main content */}
          <div className="flex flex-col flex-1 min-w-0">
            <TopBar />
            <main className="flex-1 min-h-0 overflow-y-auto bg-background">
              <div className="flex flex-col justify-end items-center min-h-full pb-8 px-4 gap-6">
                <DocumentCard
                  variant="unsigned"
                  onOpen={() => setSidebarContent('doc')}
                  onOpenRoute={() => setSidebarContent('route')}
                />
                <DocumentCard
                  variant="signed"
                  onOpen={() => setSidebarContent('doc')}
                  onOpenRoute={() => setSidebarContent('route')}
                />
                <DocumentCard
                  variant="cmr-signed"
                  onOpen={() => setSidebarContent('doc')}
                />
                <DocumentCard
                  variant="cmr-error"
                  onOpen={() => setSidebarContent('doc')}
                />
              </div>
            </main>
          </div>

          {/* Drag handle — only visible when sidebar is open */}
          {sidebarOpen && (
            <ResizableDivider
              onDelta={handleSidebarResize}
              onDragChange={setIsResizing}
            />
          )}

          {/* Right sidebar — full height, slides in from right */}
          <div
            className={isResizing ? 'shrink-0 overflow-hidden' : 'shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out'}
            style={{ width: sidebarOpen ? sidebarWidth : 0 }}
          >
            <div className="h-full" style={{ width: sidebarWidth }}>
              {sidebarContent === 'doc'   && <DocumentSidebar onClose={() => setSidebarContent(null)} />}
              {sidebarContent === 'route' && <RouteSidebar    onClose={() => setSidebarContent(null)} />}
            </div>
          </div>
        </>
      )}

      {activeId !== 'timeline' && activeId !== 'crm' && activeId !== 'chat' && (
        <div className="flex-1 min-w-0 bg-background" />
      )}
    </div>
    </TooltipProvider>
  );
}

export default App;
