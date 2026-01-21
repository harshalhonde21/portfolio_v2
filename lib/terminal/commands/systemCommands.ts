/**
 * System Commands
 * system.status, system.architecture, system.performance, system.env
 */

import type { CommandDefinition, CommandOutput } from '../types';
import {
  getPerformanceMetrics,
  getEnvironmentInfo,
  formatUptime,
  formatTime
} from '../providers/systemProvider';
import {
  FRAMEWORK_INFO,
  RENDERING_MODEL,
  STYLING_SYSTEM,
  ANIMATION_SYSTEM,
  FONT_SYSTEM,
  FILE_STRUCTURE,
  COMPONENT_ESTIMATE,
} from '@/lib/constants/architecture';

/** system.status - Shows current route, theme, uptime, session time */
const systemStatus: CommandDefinition = {
  name: 'system.status',
  description: 'Display current system status',
  group: 'system',
  handler: (_, context): CommandOutput => {
    const uptime = formatUptime(performance.now());
    const sessionTime = formatUptime(Date.now() - context.sessionStart);
    const sessionStartFormatted = formatTime(context.sessionStart);

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-cyan">►</span> SYSTEM STATUS</div>
  <div class="system-grid">
    <div class="system-row">
      <span class="system-label">Route:</span>
      <span class="system-value neon-cyan">${context.currentRoute}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Theme:</span>
      <span class="system-value">${context.theme.toUpperCase()}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Component Ratio:</span>
      <span class="system-value">~${Math.round(COMPONENT_ESTIMATE.serverRatio * 100)}% Server / ~${Math.round(COMPONENT_ESTIMATE.clientRatio * 100)}% Client</span>
    </div>
    <div class="system-row">
      <span class="system-label">App Uptime:</span>
      <span class="system-value neon-green">${uptime}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Session Start:</span>
      <span class="system-value">${sessionStartFormatted}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Session Duration:</span>
      <span class="system-value">${sessionTime}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Reduced Motion:</span>
      <span class="system-value">${context.reducedMotion ? 'ENABLED' : 'DISABLED'}</span>
    </div>
  </div>
</div>`.trim(),
    };
  },
};

/** system.architecture - Shows framework and architecture info */
const systemArchitecture: CommandDefinition = {
  name: 'system.architecture',
  description: 'Display architectural metadata',
  group: 'system',
  handler: (): CommandOutput => {
    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-cyan">►</span> ARCHITECTURE</div>
  
  <div class="system-section">
    <div class="section-title neon-purple">Framework</div>
    <div class="system-grid">
      <div class="system-row"><span class="system-label">Name:</span><span class="system-value">${FRAMEWORK_INFO.name} ${FRAMEWORK_INFO.version}</span></div>
      <div class="system-row"><span class="system-label">Router:</span><span class="system-value">${FRAMEWORK_INFO.router}</span></div>
      <div class="system-row"><span class="system-label">React:</span><span class="system-value">${FRAMEWORK_INFO.react}</span></div>
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-purple">Rendering</div>
    <div class="system-grid">
      <div class="system-row"><span class="system-label">Model:</span><span class="system-value">${RENDERING_MODEL.type}</span></div>
      <div class="system-row"><span class="system-label">Streaming:</span><span class="system-value">${RENDERING_MODEL.streaming ? 'Enabled' : 'Disabled'}</span></div>
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-purple">Styling</div>
    <div class="system-grid">
      <div class="system-row"><span class="system-label">Framework:</span><span class="system-value">${STYLING_SYSTEM.framework} ${STYLING_SYSTEM.version}</span></div>
      <div class="system-row"><span class="system-label">Config:</span><span class="system-value">${STYLING_SYSTEM.config}</span></div>
      <div class="system-row"><span class="system-label">Features:</span><span class="system-value">${STYLING_SYSTEM.features.join(', ')}</span></div>
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-purple">Animation</div>
    <div class="system-grid">
      <div class="system-row"><span class="system-label">Library:</span><span class="system-value">${ANIMATION_SYSTEM.library} ${ANIMATION_SYSTEM.version}</span></div>
      <div class="system-row"><span class="system-label">Features:</span><span class="system-value">${ANIMATION_SYSTEM.features.join(', ')}</span></div>
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-purple">Fonts</div>
    <div class="system-grid">
      <div class="system-row"><span class="system-label">Mono:</span><span class="system-value">${FONT_SYSTEM.mono}</span></div>
      <div class="system-row"><span class="system-label">Display:</span><span class="system-value">${FONT_SYSTEM.display}</span></div>
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-purple">File Structure</div>
    <div class="system-grid">
      <div class="system-row"><span class="system-label">${FILE_STRUCTURE.app.path}</span><span class="system-value muted">${FILE_STRUCTURE.app.purpose}</span></div>
      <div class="system-row"><span class="system-label">${FILE_STRUCTURE.components.path}</span><span class="system-value muted">${FILE_STRUCTURE.components.purpose}</span></div>
      <div class="system-row"><span class="system-label">${FILE_STRUCTURE.lib.path}</span><span class="system-value muted">${FILE_STRUCTURE.lib.purpose}</span></div>
    </div>
  </div>
</div>`.trim(),
    };
  },
};

/** system.performance - Shows timing metrics, FPS, memory */
const systemPerformance: CommandDefinition = {
  name: 'system.performance',
  description: 'Display performance metrics',
  group: 'system',
  handler: (): CommandOutput => {
    const metrics = getPerformanceMetrics();

    const formatMs = (val: number | null) => val !== null ? `${val}ms` : 'N/A';
    const formatMb = (val: number | null) => val !== null ? `${val}MB` : 'N/A';

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-cyan">►</span> PERFORMANCE METRICS</div>
  
  <div class="system-section">
    <div class="section-title neon-green">Navigation Timing</div>
    <div class="system-grid">
      <div class="system-row">
        <span class="system-label">DOM Content Loaded:</span>
        <span class="system-value">${formatMs(metrics.domContentLoaded)}</span>
      </div>
      <div class="system-row">
        <span class="system-label">Load Complete:</span>
        <span class="system-value">${formatMs(metrics.loadComplete)}</span>
      </div>
      <div class="system-row">
        <span class="system-label">First Contentful Paint:</span>
        <span class="system-value">${formatMs(metrics.firstPaint)}</span>
      </div>
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-yellow">Runtime</div>
    <div class="system-grid">
      <div class="system-row">
        <span class="system-label">Current Time:</span>
        <span class="system-value">${Math.round(performance.now())}ms since load</span>
      </div>
      <div class="system-row">
        <span class="system-label">Memory Used:</span>
        <span class="system-value">${formatMb(metrics.memoryUsed)}</span>
      </div>
      <div class="system-row">
        <span class="system-label">Memory Total:</span>
        <span class="system-value">${formatMb(metrics.memoryTotal)}</span>
      </div>
    </div>
  </div>

  <div class="system-note">
    <span class="neon-cyan">TIP:</span> Memory metrics only available in Chromium browsers
  </div>
</div>`.trim(),
    };
  },
};

/** system.env - Shows environment info */
const systemEnv: CommandDefinition = {
  name: 'system.env',
  description: 'Display environment information',
  group: 'system',
  handler: (): CommandOutput => {
    const env = getEnvironmentInfo();

    // Parse user agent for cleaner display
    const browserMatch = env.userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/);
    const browser = browserMatch ? browserMatch[0] : 'Unknown';

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-cyan">►</span> ENVIRONMENT</div>
  <div class="system-grid">
    <div class="system-row">
      <span class="system-label">Browser:</span>
      <span class="system-value">${browser}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Platform:</span>
      <span class="system-value">${env.platform}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Screen:</span>
      <span class="system-value">${env.screenWidth}x${env.screenHeight} @${env.devicePixelRatio}x</span>
    </div>
    <div class="system-row">
      <span class="system-label">Language:</span>
      <span class="system-value">${env.language}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Reduced Motion:</span>
      <span class="system-value ${env.reducedMotion ? 'neon-yellow' : ''}">${env.reducedMotion ? 'PREFERRED' : 'Not set'}</span>
    </div>
    <div class="system-row">
      <span class="system-label">Network:</span>
      <span class="system-value ${env.online ? 'neon-green' : 'neon-pink'}">${env.online ? 'ONLINE' : 'OFFLINE'}</span>
    </div>
  </div>
  <div class="system-note">
    <span class="system-label">User Agent:</span>
    <span class="system-value muted" style="font-size: 0.7rem; word-break: break-all;">${env.userAgent}</span>
  </div>
</div>`.trim(),
    };
  },
};

export const systemCommands: CommandDefinition[] = [
  systemStatus,
  systemArchitecture,
  systemPerformance,
  systemEnv,
];
