/**
 * Terminal System Types
 * Core type definitions for the command registry architecture
 */

/** Output format for command execution */
export interface CommandOutput {
  type: 'text' | 'html';
  content: string;
  /** True if this output is part of a stream (e.g., log.stream) */
  isStreaming?: boolean;
}

/** Handler function signature for commands */
export type CommandHandler = (
  args: string[],
  context: TerminalContext
) => CommandOutput | Promise<CommandOutput>;

/** Command definition with metadata */
export interface CommandDefinition {
  /** Command name, supports dotted notation (e.g., system.status) */
  name: string;
  /** Brief description for help output */
  description: string;
  /** Command group for organized help display */
  group: CommandGroup;
  /** Handler function */
  handler: CommandHandler;
}

/** Command groups for organized help display */
export type CommandGroup = 
  | 'core'      // help, clear, exit
  | 'info'      // neofetch, about, whoami, ls
  | 'portfolio' // skills, projects, experience, contact
  | 'system'    // system.status, system.architecture, etc.
  | 'attack'    // attack.simulate, defense.status
  | 'devtools'; // ui.inspect, ui.reduce-motion, log.*

/** Runtime context passed to command handlers */
export interface TerminalContext {
  /** Current terminal theme */
  theme: 'neon' | 'hacker' | 'red';
  /** Session start timestamp (ms since epoch) */
  sessionStart: number;
  /** Current route/path */
  currentRoute: string;
  /** Reduced motion preference active */
  reducedMotion: boolean;
  /** Log stream active */
  logStreamActive: boolean;
  /** Callbacks for terminal interaction */
  callbacks: TerminalCallbacks;
}

/** Callbacks for terminal to interact with app state */
export interface TerminalCallbacks {
  /** Toggle reduced motion mode */
  setReducedMotion: (enabled: boolean) => void;
  /** Set log stream active state */
  setLogStreamActive: (active: boolean) => void;
  /** Append output to terminal */
  appendOutput: (output: CommandOutput) => void;
}

/** System event for logging */
export interface SystemEvent {
  timestamp: number;
  type: 'route_change' | 'theme_change' | 'attack_start' | 'attack_end' | 'motion_toggle' | 'command';
  message: string;
}

/** Performance metrics from browser APIs */
export interface PerformanceMetrics {
  /** Time to DOM content loaded (ms) */
  domContentLoaded: number | null;
  /** Time to load event (ms) */
  loadComplete: number | null;
  /** First paint time (ms) */
  firstPaint: number | null;
  /** Current FPS estimate */
  fps: number | null;
  /** JS heap size in MB (if available) */
  memoryUsed: number | null;
  /** Total JS heap size in MB (if available) */
  memoryTotal: number | null;
}

/** Environment information */
export interface EnvironmentInfo {
  userAgent: string;
  platform: string;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  reducedMotion: boolean;
  online: boolean;
  language: string;
}

/** Defense/system health status */
export interface DefenseStatus {
  /** 0-100 stability score */
  stability: number;
  /** Active recovery processes */
  activeRecovery: string[];
  /** Animation load status */
  animationLoad: 'low' | 'medium' | 'high';
  /** Overall health score 0-100 */
  healthScore: number;
  /** Currently under attack */
  underAttack: boolean;
}
