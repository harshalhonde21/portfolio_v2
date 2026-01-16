"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import {
  motion,
  PanInfo,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { executeCommand, CommandOutput } from "@/lib/utils/terminalCommands";
import {
  X,
  Minimize2,
  Maximize2,
  Terminal as TerminalIcon,
} from "lucide-react";
import { MatrixEffect } from "./MatrixEffect";

interface TerminalLine {
  type: "input" | "output";
  content: string;
  outputType?: "text" | "html";
}

interface CyberpunkTerminalProps {
  onClose: () => void;
}

export function CyberpunkTerminal({ onClose }: CyberpunkTerminalProps) {
  const dragControls = useDragControls();
  const [theme, setTheme] = useState<"neon" | "hacker" | "red">("neon");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      content:
        '█ █ ▄▀█ █▀█ █▀ █ █ ▄▀█ █   █ █ █▀█ █▄ █ █▀▄ █▀▀\n█▀█ █▀█ █▀▄ ▄█ █▀█ █▀█ █▄▄ █▀█ █▄█ █ ▀█ █▄▀ █▄▄\n\nWelcome to TERMINAL v1.0.0\nType "help" for available commands.\n',
      outputType: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 850, height: 550 });
  const [isResizing, setIsResizing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when terminal opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    // Add command to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add input line
    setLines((prev) => [...prev, { type: "input", content: cmd }]);

    // Execute command
    const output: CommandOutput = executeCommand(cmd);

    // Handle clear command
    if (output.content === "__CLEAR__") {
      setLines([]);
      setInput("");
      return;
    }

    // Handle close command
    if (output.content === "__CLOSE__") {
      onClose();
      return;
    }

    // Handle matrix command
    if (output.content === "__MATRIX__") {
      setTheme("hacker");
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          content: "Initializing Matrix protocol...\nAccess granted.",
          outputType: "text",
        },
      ]);
      return;
    }

    // Add output line
    if (output.content) {
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          content: output.content,
          outputType: output.type,
        },
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Sync motion values with position state
  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setPosition((prev) => ({
      x: prev.x + info.offset.x,
      y: prev.y + info.offset.y,
    }));
  };

  const startResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPosX = position.x;
    const startPosY = position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newPosX = startPosX;
      let newPosY = startPosY;

      if (direction.includes("e")) {
        newWidth = Math.max(400, startWidth + deltaX);
      }
      if (direction.includes("s")) {
        newHeight = Math.max(300, startHeight + deltaY);
      }
      if (direction.includes("w")) {
        const widthChange = startWidth - deltaX;
        if (widthChange >= 400) {
          newWidth = widthChange;
          newPosX = startPosX + deltaX;
        }
      }
      if (direction.includes("n")) {
        const heightChange = startHeight - deltaY;
        if (heightChange >= 300) {
          newHeight = heightChange;
          newPosY = startPosY + deltaY;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newPosX, y: newPosY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Lock body scroll when terminal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0, scale: 0.9 }}
      transformTemplate={({ x, y }) =>
        `translate(-50%, -50%) translate(${x}, ${y})`
      }
      animate={{
        opacity: 1,
        scale: 1,
        width: isMaximized ? "100vw" : size.width,
        height: isMaximized ? "100vh" : size.height,
        // When maximized, we force x/y to 0 (relative to center)
        // effectively ignoring the drag offset visually,
        // but we keep the state intact.
        // Actually, better to animate x/y to 0 when maximized.
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      drag={!isMaximized && !isResizing}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: -window.innerWidth / 2 + 100,
        right: window.innerWidth / 2 - 100,
        top: -window.innerHeight / 2 + 50,
        bottom: window.innerHeight / 2 - 50,
      }}
      onDragEnd={handleDragEnd}
      className={`fixed top-1/2 left-1/2 z-50 flex flex-col bg-black/95 backdrop-blur-md border-2 border-primary neon-border-subtle terminal-theme-${theme}`}
      style={{
        x,
        y,
        minWidth: 400,
        minHeight: 300,
        maxWidth: "95vw",
        maxHeight: "95vh",
      }}
    >
      {/* Terminal Header */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/30 cursor-move select-none"
        onPointerDown={(e) => dragControls.start(e)}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono uppercase tracking-wider text-primary">
            SYS_ROOT://NET_RUNNER_V1.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <div className="flex items-center gap-1 bg-black/50 rounded p-0.5 border border-primary/20">
            <button
              onClick={() => setTheme("neon")}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase transition-colors rounded-sm ${
                theme === "neon"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              title="Neon Theme"
            >
              NEON
            </button>
            <button
              onClick={() => setTheme("hacker")}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase transition-colors rounded-sm ${
                theme === "hacker"
                  ? "bg-green-500/20 text-green-500"
                  : "text-muted-foreground hover:text-green-500"
              }`}
              title="Hacker Theme"
            >
              HACK
            </button>
            <button
              onClick={() => setTheme("red")}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase transition-colors rounded-sm ${
                theme === "red"
                  ? "bg-red-500/20 text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              }`}
              title="Red Theme"
            >
              RED
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMaximize}
              className="p-1 hover:bg-primary/20 transition-colors rounded-sm text-primary/70 hover:text-primary"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-primary/20 transition-colors rounded-sm text-primary/70 hover:text-primary"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Matrix Effect Overlay */}
      {theme === "hacker" && <MatrixEffect />}

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm scrollbar-cyber scanlines leading-tight"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div key={index} className="mb-0.5">
            {line.type === "input" ? (
              <div className="flex items-start gap-2 leading-snug">
                <span className="text-neon-cyan select-none font-bold">❯</span>
                <span className="text-primary font-medium">{line.content}</span>
              </div>
            ) : (
              <div className="text-foreground whitespace-pre-wrap leading-snug terminal-output">
                {line.outputType === "html" ? (
                  <div dangerouslySetInnerHTML={{ __html: line.content }} />
                ) : (
                  line.content
                )}
              </div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-start gap-2 mt-2">
          <span className="text-neon-cyan select-none font-bold animate-pulse">
            ❯
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-primary font-mono font-medium caret-primary"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Corner handles */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => startResize(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => startResize(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => startResize(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize bg-primary/30 border-t border-l border-primary/50"
            onMouseDown={(e) => startResize(e, "se")}
          />

          {/* Edge handles */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={(e) => startResize(e, "n")}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={(e) => startResize(e, "s")}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={(e) => startResize(e, "w")}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={(e) => startResize(e, "e")}
          />
        </>
      )}
    </motion.div>
  );
}
