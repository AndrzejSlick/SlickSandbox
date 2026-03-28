import { useState, useRef, useCallback } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { AiChat } from './components/AiChat';
import { TopBar } from './components/TopBar';
import { DocumentCard } from './components/DocumentCard';
import { DocumentSidebar } from './components/DocumentSidebar';
import { RouteSidebar } from './components/RouteSidebar';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatMain } from './components/ChatMain';
import { ChatAiPanel } from './components/ChatAiPanel';

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
          backgroundColor: active ? '#2563EB' : 'var(--border)',
        }}
      />
    </div>
  );
}

type SidebarContent = 'doc' | 'route' | null;

function App() {
  const [activeId, setActiveId] = useState('chat');
  const [selectedDriverId, setSelectedDriverId] = useState('szymon');
  const [sidebarContent, setSidebarContent] = useState<SidebarContent>(null);
  const [sidebarWidth, setSidebarWidth] = useState(480);
  const [isResizing, setIsResizing] = useState(false);

  const sidebarOpen = sidebarContent !== null;

  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth(w => Math.max(280, Math.min(900, w + delta)));
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-muted">
      <Navbar activeId={activeId} onActiveChange={setActiveId} />

      {activeId === 'timeline' && (
        <>
          <div className="flex flex-col w-[280px] h-full bg-muted shrink-0">
            <div className="flex items-center justify-between px-3 pt-4 pb-2 shrink-0">
              <span className="text-xl font-semibold text-foreground">Timeline</span>
            </div>
          </div>
          <div className="flex-1 min-w-0" />
          <ChatAiPanel />
        </>
      )}

      {activeId === 'chat' && (
        <>
          <ChatSidebar selectedId={selectedDriverId} onSelect={setSelectedDriverId} />
          <div className="flex-1 min-w-0 flex py-2">
            <ChatMain />
          </div>
          <ChatAiPanel />
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
  );
}

export default App;
