/**
 * Attack/Defense Commands
 * attack.simulate, defense.status
 */

import type { CommandDefinition, CommandOutput } from '../types';
import { effectsController } from '../providers/effectsController';

/** attack.simulate - Triggers attack simulation with visual effects */
const attackSimulate: CommandDefinition = {
  name: 'attack.simulate',
  description: 'Simulate system attack (visual stress test)',
  group: 'attack',
  handler: (): CommandOutput => {
    const result = effectsController.simulateAttack();

    if (!result.started) {
      return {
        type: 'html',
        content: `<div class="system-output">
  <div class="system-header"><span class="neon-yellow">⚠</span> ATTACK SIMULATION</div>
  <div class="system-warning">${result.message}</div>
</div>`,
      };
    }

    return {
      type: 'html',
      content: `
<div class="system-output attack-warning">
  <div class="system-header"><span class="neon-pink">█</span> ATTACK DETECTED</div>
  <div class="attack-log">
    <div class="log-entry"><span class="neon-pink">[ALERT]</span> Intrusion detected on primary systems</div>
    <div class="log-entry"><span class="neon-yellow">[WARN]</span> Visual subsystems compromised</div>
    <div class="log-entry"><span class="neon-cyan">[INFO]</span> Initiating countermeasures...</div>
    <div class="log-entry"><span class="neon-green">[SYS]</span> Auto-recovery engaged (5s)</div>
  </div>
  <div class="attack-bar">
    <div class="attack-progress"></div>
  </div>
  <div class="system-note neon-yellow">System under stress. Effects will auto-resolve.</div>
</div>`.trim(),
    };
  },
};

/** defense.status - Shows current UI stability and health */
const defenseStatus: CommandDefinition = {
  name: 'defense.status',
  description: 'Display defense and system health status',
  group: 'attack',
  handler: (): CommandOutput => {
    const status = effectsController.getDefenseStatus();

    const stabilityColor = status.stability > 70 ? 'neon-green' :
      status.stability > 40 ? 'neon-yellow' : 'neon-pink';
    const healthColor = status.healthScore > 70 ? 'neon-green' :
      status.healthScore > 40 ? 'neon-yellow' : 'neon-pink';
    const loadColor = status.animationLoad === 'low' ? 'neon-green' :
      status.animationLoad === 'medium' ? 'neon-yellow' : 'neon-pink';

    return {
      type: 'html',
      content: `
<div class="system-output">
  <div class="system-header"><span class="neon-cyan">►</span> DEFENSE STATUS</div>
  
  <div class="system-section">
    <div class="section-title neon-purple">System Health</div>
    <div class="system-grid">
      <div class="system-row">
        <span class="system-label">Status:</span>
        <span class="system-value ${status.underAttack ? 'neon-pink' : 'neon-green'}">${status.underAttack ? 'UNDER ATTACK' : 'SECURE'}</span>
      </div>
      <div class="system-row">
        <span class="system-label">Stability:</span>
        <span class="system-value">
          <span class="${stabilityColor}">${status.stability}%</span>
          <span class="stability-bar"><span class="stability-fill" style="width: ${status.stability}%"></span></span>
        </span>
      </div>
      <div class="system-row">
        <span class="system-label">Health Score:</span>
        <span class="system-value ${healthColor}">${status.healthScore}/100</span>
      </div>
      <div class="system-row">
        <span class="system-label">Animation Load:</span>
        <span class="system-value ${loadColor}">${status.animationLoad.toUpperCase()}</span>
      </div>
    </div>
  </div>

  ${status.activeRecovery.length > 0 ? `
  <div class="system-section">
    <div class="section-title neon-yellow">Active Recovery</div>
    <div class="recovery-list">
      ${status.activeRecovery.map(r => `<div class="recovery-item"><span class="neon-green">▸</span> ${r}</div>`).join('')}
    </div>
  </div>` : ''}
</div>`.trim(),
    };
  },
};

export const attackCommands: CommandDefinition[] = [
  attackSimulate,
  defenseStatus,
];
