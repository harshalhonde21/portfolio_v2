/**
 * DevTools Commands
 * ui.inspect, ui.reduce-motion, log.stream, log.stop
 */

import type { CommandDefinition, CommandOutput } from '../types';
import { eventLogger } from '../providers/eventLogger';
import { effectsController } from '../providers/effectsController';

/** ui.inspect - Shows mounted sections and active effects */
const uiInspect: CommandDefinition = {
  name: 'ui.inspect',
  description: 'Inspect active UI components and effects',
  group: 'devtools',
  handler: (): CommandOutput => {
    // Query DOM for mounted sections
    const sections = typeof document !== 'undefined'
      ? Array.from(document.querySelectorAll('section[id]')).map(s => s.id)
      : [];

    // Count animated elements (framer-motion adds data attributes)
    const animatedCount = typeof document !== 'undefined'
      ? document.querySelectorAll('[style*="transform"], [style*="opacity"]').length
      : 0;

    // Check active effects
    const defenseStatus = effectsController.getDefenseStatus();
    const activeEffects: string[] = [];

    if (defenseStatus.underAttack) {
      activeEffects.push('Glitch (attack simulation)');
      activeEffects.push('Scanlines (elevated)');
      activeEffects.push('Neon flicker (active)');
    } else {
      // Check for normal effects
      if (typeof document !== 'undefined') {
        if (document.querySelector('.scanlines')) activeEffects.push('Scanlines');
        if (document.querySelector('.cyber-grid')) activeEffects.push('Cyber Grid');
        if (document.querySelector('.glitch')) activeEffects.push('Glitch (hover)');
      }
    }

    if (activeEffects.length === 0) {
      activeEffects.push('None detected');
    }

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-cyan">►</span> UI INSPECTION</div>
  
  <div class="system-section">
    <div class="section-title neon-purple">Mounted Sections</div>
    <div class="section-list">
      ${sections.length > 0
          ? sections.map(s => `<div class="section-item"><span class="neon-green">▸</span> #${s}</div>`).join('')
          : '<div class="section-item muted">No sections detected</div>'
        }
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-purple">Animation Status</div>
    <div class="system-grid">
      <div class="system-row">
        <span class="system-label">Animated Elements:</span>
        <span class="system-value">${animatedCount}</span>
      </div>
      <div class="system-row">
        <span class="system-label">Animation Load:</span>
        <span class="system-value">${defenseStatus.animationLoad.toUpperCase()}</span>
      </div>
    </div>
  </div>

  <div class="system-section">
    <div class="section-title neon-purple">Active Effects</div>
    <div class="section-list">
      ${activeEffects.map(e => `<div class="section-item"><span class="neon-cyan">▸</span> ${e}</div>`).join('')}
    </div>
  </div>
</div>`.trim(),
    };
  },
};

/** ui.reduce-motion - Toggles reduced motion mode */
const uiReduceMotion: CommandDefinition = {
  name: 'ui.reduce-motion',
  description: 'Toggle reduced motion mode',
  group: 'devtools',
  handler: (_, context): CommandOutput => {
    const newState = !context.reducedMotion;

    // Apply the change
    context.callbacks.setReducedMotion(newState);

    // Update document attribute
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-reduced-motion', String(newState));
    }

    // Log event
    eventLogger.log({
      timestamp: Date.now(),
      type: 'motion_toggle',
      message: `Reduced motion ${newState ? 'enabled' : 'disabled'}`,
    });

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="${newState ? 'neon-yellow' : 'neon-green'}">►</span> MOTION SETTINGS</div>
  <div class="system-grid">
    <div class="system-row">
      <span class="system-label">Reduced Motion:</span>
      <span class="system-value ${newState ? 'neon-yellow' : 'neon-green'}">${newState ? 'ENABLED' : 'DISABLED'}</span>
    </div>
  </div>
  <div class="system-note">
    ${newState
          ? 'Animations will be minimized. Framer Motion will respect this setting.'
          : 'Full animations restored.'
        }
  </div>
</div>`.trim(),
    };
  },
};

/** log.stream - Starts live event streaming */
const logStream: CommandDefinition = {
  name: 'log.stream',
  description: 'Start live event log stream',
  group: 'devtools',
  handler: (_, context): CommandOutput => {
    if (context.logStreamActive) {
      return {
        type: 'text',
        content: 'Log stream already active. Use "log.stop" to stop.',
      };
    }

    // Activate stream
    context.callbacks.setLogStreamActive(true);

    // Subscribe to events
    const unsubscribe = eventLogger.subscribe((event) => {
      context.callbacks.appendOutput({
        type: 'html',
        content: `<div class="log-stream-entry">${eventLogger.formatEvent(event)}</div>`,
        isStreaming: true,
      });
    });

    // Store unsubscribe in context (simplified - actual implementation would need proper state)
    (globalThis as Record<string, unknown>).__logStreamUnsubscribe = unsubscribe;

    // Show recent events
    const recent = eventLogger.getRecentEvents(5);
    const recentHtml = recent.length > 0
      ? recent.map(e => eventLogger.formatEvent(e)).join('\n')
      : 'No recent events';

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-cyan">►</span> LOG STREAM ACTIVE</div>
  <div class="log-stream-info">
    <div class="neon-green">Streaming system events...</div>
    <div class="muted">Type "log.stop" to end stream</div>
  </div>
  <div class="log-stream-recent">
    <div class="section-title">Recent Events:</div>
    <div class="log-entries">${recentHtml}</div>
  </div>
</div>`.trim(),
    };
  },
};

/** log.stop - Stops the event stream */
const logStop: CommandDefinition = {
  name: 'log.stop',
  description: 'Stop live event log stream',
  group: 'devtools',
  handler: (_, context): CommandOutput => {
    if (!context.logStreamActive) {
      return {
        type: 'text',
        content: 'No active log stream.',
      };
    }

    // Deactivate stream
    context.callbacks.setLogStreamActive(false);

    // Call unsubscribe if exists
    const unsubscribe = (globalThis as Record<string, unknown>).__logStreamUnsubscribe as (() => void) | undefined;
    if (unsubscribe) {
      unsubscribe();
      delete (globalThis as Record<string, unknown>).__logStreamUnsubscribe;
    }

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-yellow">►</span> LOG STREAM STOPPED</div>
  <div class="system-note">Event streaming has been terminated.</div>
</div>`.trim(),
    };
  },
};

export const devtoolsCommands: CommandDefinition[] = [
  uiInspect,
  uiReduceMotion,
  logStream,
  logStop,
];
