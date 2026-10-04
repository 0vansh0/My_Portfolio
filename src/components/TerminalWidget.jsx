import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Terminal, X } from "lucide-react";

const welcome = [
  "VANSH / PORTFOLIO SHELL v1.0",
  "Type `help` to see available commands.",
];

function getResponse(command) {
  switch (command.trim().toLowerCase()) {
    case "help":
      return "Commands: about · skills · projects · contact · copy contact · hire · clear";
    case "about":
      return "Vansh Raj — BS-MS student in AI & Cybersecurity at IIT Patna; aspiring full-stack developer.";
    case "skills":
      return "Frontend: HTML, CSS, JavaScript, React. Backend: Node.js, Express, REST APIs. Tools: Git, GitHub, VS Code.";
    case "projects":
      return "Cristal — React + TMDB API, live demo available. Second Sale — campus marketplace concept, in development.";
    case "contact":
      return "Phone: 9122928643 · Visit the Contact section for social links.";
    case "hire":
    case "sudo hire-vansh":
      return "ACCESS GRANTED ✦ Vansh is open to internship opportunities. Use `contact` to get in touch.";
    default:
      return `Command not found: ${command.trim() || "(empty)"}. Try ` + "`help`.";
  }
}

function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState(welcome);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const editing = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (!editing && (event.key === "~" || (event.code === "Backquote" && event.shiftKey))) {
        event.preventDefault();
        setIsOpen((open) => !open);
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const toggleButton = toggleRef.current;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      toggleButton?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history]);

  const runCommand = async (event) => {
    event.preventDefault();
    const entered = command.trim();
    if (!entered) return;
    if (entered.toLowerCase() === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }
    if (entered.toLowerCase() === "copy contact") {
      try {
        await navigator.clipboard.writeText("9122928643");
        setHistory((lines) => [...lines, `$ ${entered}`, "Copied 9122928643 to clipboard."]);
      } catch {
        setHistory((lines) => [...lines, `$ ${entered}`, "Clipboard unavailable. Use the Contact section to call."]);
      }
    } else {
      setHistory((lines) => [...lines, `$ ${entered}`, getResponse(entered)]);
    }
    setCommand("");
  };

  const keepFocusInside = (event) => {
    if (event.key !== "Tab") return;
    const focusable = event.currentTarget.querySelectorAll("button:not([disabled]), input:not([disabled])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
      <div className="terminal-widget">
        <button ref={toggleRef} className="terminal-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
          <Terminal size={17} /><span>{isOpen ? "Close terminal" : "Open terminal"}</span><kbd>~</kbd>
        </button>
        <AnimatePresence>
        {isOpen && (
          <motion.div
            className="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}
          >
            <motion.section
              className="terminal-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="terminal-title"
              onKeyDown={keepFocusInside}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <header className="terminal-header">
                <div><Terminal size={16} /><h2 id="terminal-title">VANSH.SHELL</h2><span>LOCAL</span></div>
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Close terminal"><X size={17} /></button>
              </header>
              <div className="terminal-output" ref={outputRef} aria-live="polite">
                {history.map((line, index) => <p className={line.startsWith("$") ? "terminal-command-line" : ""} key={`${index}-${line}`}>{line}</p>)}
              </div>
              <form className="terminal-input-row" onSubmit={runCommand}>
                <span aria-hidden="true">›</span>
                <input ref={inputRef} aria-label="Type a portfolio terminal command" value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck="false" placeholder="try: skills" />
                <button type="submit" aria-label="Run command"><CornerDownLeft size={16} /></button>
              </form>
              <p className="terminal-shortcut">Press <kbd>Esc</kbd> to close · <kbd>~</kbd> to toggle</p>
            </motion.section>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
  );
}

export default TerminalWidget;
