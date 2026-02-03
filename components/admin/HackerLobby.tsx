"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/components/providers/AdminAuthProvider";
import { authApi } from "@/lib/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

import { CyberLoader } from "@/components/ui/CyberLoader";
import { useToast } from "@/components/providers/ToastProvider";

// ... (imports remain)
const SECRET_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "b",
  "a",
];
const SEQUENCE_TIMEOUT = 2000;

export function HackerLobby() {
  const { login, isAuthenticated } = useAdminAuth();
  const { error: toastError, success: toastSuccess } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<"challenge" | "login">("challenge");
  const [inputBuffer, setInputBuffer] = useState<string[]>([]);
  const [lastInputTime, setLastInputTime] = useState(0);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Challenge state
  const [challengePass, setChallengePass] = useState("");

  // Key listener (same as before)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input field (unless it's the sequence trigger which shouldn't happen usually in inputs but let's be safe)
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        if (!isOpen) return; // Allow typing if modal is open obviously
      }

      if (isOpen) {
        if (e.key === "Escape") setIsOpen(false);
        return;
      }

      const now = Date.now();
      if (now - lastInputTime > SEQUENCE_TIMEOUT) {
        setInputBuffer([e.key]);
      } else {
        setInputBuffer((prev) => [...prev, e.key]);
      }
      setLastInputTime(now);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, lastInputTime]);

  // Check sequence (same as before)
  useEffect(() => {
    if (inputBuffer.length > SECRET_SEQUENCE.length) {
      // Trim buffer to keep only last N keys
      const start = inputBuffer.length - SECRET_SEQUENCE.length;
      const recent = inputBuffer.slice(start);
      if (JSON.stringify(recent) === JSON.stringify(SECRET_SEQUENCE)) {
        setIsOpen(true);
        setPhase("challenge");
        setInputBuffer([]);
      }
    } else if (
      JSON.stringify(inputBuffer) === JSON.stringify(SECRET_SEQUENCE)
    ) {
      setIsOpen(true);
      setPhase("challenge");
      setInputBuffer([]);
    }
  }, [inputBuffer]);

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded challenge passphrase for "Hacker" feel
    if (challengePass === "matrix") {
      toastSuccess("ACCESS GRANTED: LEVEL 1", 2000);
      setPhase("login");
    } else {
      toastError("ACCESS DENIED: INVALID PASSPHRASE");
      // Add shake effect ideally, but toast covers visibility
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, user } = await authApi.login(email, password);
      // Artificial delay to show off cool loader
      await new Promise((r) => setTimeout(r, 1500));

      login(token, user);
      toastSuccess("SYSTEM OVERRIDE SUCCESSFUL. WELCOME, ADMIN.");
      setIsOpen(false);

      // Reset state
      setEmail("");
      setPassword("");
      setChallengePass("");
    } catch (err: any) {
      toastError(err.message || "AUTHENTICATION FAILED");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center font-mono"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            {/* Matrix rain effect simplified */}
            <div className="text-neon-green text-xs w-full text-center">
              SYSTEM OVERRIDE INITIATED...
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md p-8 border border-neon-green bg-black shadow-[0_0_30px_rgba(0,255,0,0.2)]"
          >
            {/* Borders (same as before) */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-neon-green"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-neon-green"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-neon-green"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-neon-green"></div>

            <div className="flex justify-between items-center mb-8 border-b border-neon-green/30 pb-2">
              <h2 className="text-neon-green text-xl font-bold tracking-widest">
                {phase === "challenge" ? "GATE_01" : "GATE_02"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neon-green hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {isLoading ? (
              <div className="py-12">
                <CyberLoader text="DECRYPTING CREDENTIALS" />
              </div>
            ) : phase === "challenge" ? (
              <form onSubmit={handleChallengeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-neon-green/70 uppercase">
                    Passphrase Challenge
                  </label>
                  <Input
                    id="unique_challenge_id"
                    name="unique_challenge_field"
                    autoFocus
                    type="password"
                    value={challengePass}
                    onChange={(e) => setChallengePass(e.target.value)}
                    className="bg-black border-neon-green text-neon-green focus:ring-neon-green placeholder-neon-green/30"
                    placeholder="ENTER_PASSPHRASE"
                    autoComplete="one-time-code"
                    data-lpignore="true"
                  />
                  <p className="text-[10px] text-gray-500">
                    Hint: The world aimed to pull over your eyes.
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-neon-green/10 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all rounded-none"
                >
                  DECRYPT
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neon-green/70 uppercase">
                      Admin ID
                    </label>
                    <Input
                      id="admin_sys_id"
                      name="admin_sys_identifier_v9"
                      autoFocus
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black border-neon-green text-neon-green focus:ring-neon-green placeholder-neon-green/30"
                      placeholder="admin@system.root"
                      autoComplete="off"
                      data-lpignore="true"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-neon-green/70 uppercase">
                      Access Key
                    </label>
                    <Input
                      id="admin_sys_key"
                      name="admin_sys_secret_key_v9"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black border-neon-green text-neon-green focus:ring-neon-green placeholder-neon-green/30"
                      placeholder="••••••••••••"
                      autoComplete="new-password"
                      data-lpignore="true"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-neon-green/10 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all rounded-none"
                >
                  ESTABLISH_SESSION
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
