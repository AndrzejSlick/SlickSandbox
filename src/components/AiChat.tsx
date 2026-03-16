import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";

const THINKING_ICON = "https://www.figma.com/api/mcp/asset/a0e005c7-a24c-480e-b2be-8cf0ae913128";

type Message = {
  id: number;
  text: string;
  role: "user" | "ai";
};

function ThinkingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2.5 px-3 py-1.5 animate-pulse">
        <img
          src={THINKING_ICON}
          alt=""
          className="shrink-0 block"
          style={{ width: "15.629px", height: "12px" }}
        />
        <p className="text-sm text-muted-foreground tracking-[0.42px] whitespace-nowrap leading-4">
          Obliczam czas trasy kierowcy...
        </p>
      </div>
    </div>
  );
}

export function AiChat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or thinking state change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSubmit = () => {
    if (!value.trim()) return;

    const userMsg: Message = { id: Date.now(), text: value.trim(), role: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setValue("");

    // Show thinking for 3 seconds, then add placeholder AI response
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Kierowca powinien być na rozładunku o 14:30.",
          role: "ai",
        },
      ]);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasText = value.trim().length > 0;

  return (
    <div className="flex flex-col w-[360px] h-full bg-muted border-l border-r border-border shrink-0">

      {/* Messages area */}
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-end px-3 pt-3 pb-0 gap-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="bg-[#fafafa] border border-border rounded-lg px-2 py-1.5 max-w-[90%]">
              <p className="text-sm leading-5 text-foreground">{msg.text}</p>
            </div>
          </div>
        ))}

        {isThinking && <ThinkingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="flex flex-col items-center px-3 pt-6 pb-4 shrink-0 w-full">
        <div className="relative w-full">
          <div
            className="relative w-full bg-white border border-input rounded-md shadow-xs"
            style={{ height: "80px" }}
          >
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="absolute inset-0 resize-none border-0 shadow-none px-3 pt-2 pb-2 text-sm leading-5 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground w-full h-full"
            />
            {hasText && (
              <Button
                size="icon"
                onClick={handleSubmit}
                className="absolute bottom-2 right-2 size-7 shrink-0 rounded-md bg-foreground hover:bg-foreground/80 transition-all duration-150"
              >
                <ArrowUp className="size-4" strokeWidth={2.5} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
