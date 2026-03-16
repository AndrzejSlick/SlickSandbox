import { useState, useRef, useCallback } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { AiChat } from './components/AiChat';
import { TopBar } from './components/TopBar';
import { DocumentCard } from './components/DocumentCard';
import { DocumentSidebar } from './components/DocumentSidebar';

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

function App() {
  const [activeId, setActiveId] = useState('crm');
  const [docSidebarOpen, setDocSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(480);
  const [isResizing, setIsResizing] = useState(false);

  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth(w => Math.max(280, Math.min(900, w + delta)));
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Navbar activeId={activeId} onActiveChange={setActiveId} />

      {activeId === 'timeline' && <AiChat />}

      {activeId === 'crm' && (
        <>
          {/* Left column: top bar + main content */}
          <div className="flex flex-col flex-1 min-w-0">
            <TopBar />
            <main className="flex-1 min-h-0 overflow-y-auto bg-background">
              <div className="flex flex-col justify-end items-center min-h-full pb-8 px-4 gap-3">
                <DocumentCard variant="unsigned" onOpen={() => setDocSidebarOpen(true)} />
                <DocumentCard variant="signed"   onOpen={() => setDocSidebarOpen(true)} />
              </div>
            </main>
          </div>

          {/* Drag handle — only visible when sidebar is open */}
          {docSidebarOpen && (
            <ResizableDivider
              onDelta={handleSidebarResize}
              onDragChange={setIsResizing}
            />
          )}

          {/* Right sidebar — full height, slides in from right */}
          <div
            className={isResizing ? 'shrink-0 overflow-hidden' : 'shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out'}
            style={{ width: docSidebarOpen ? sidebarWidth : 0 }}
          >
            <div className="h-full" style={{ width: sidebarWidth }}>
              <DocumentSidebar onClose={() => setDocSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}

      {activeId !== 'timeline' && activeId !== 'crm' && (
        <div className="flex-1 min-w-0 bg-background" />
      )}
    </div>
  );
}

export default App;
