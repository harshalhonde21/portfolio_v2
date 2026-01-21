/**
 * Effects Controller
 * Controls UI effects for attack simulation
 */

import type { DefenseStatus } from '../types';
import { eventLogger } from './eventLogger';

/** CSS custom properties for attack effects */
const ATTACK_PROPERTIES = {
  glitchIntensity: '--attack-glitch-intensity',
  scanlineOpacity: '--attack-scanline-opacity',
  flickerIntensity: '--attack-flicker-intensity',
} as const;

/** Attack state */
interface AttackState {
  active: boolean;
  startTime: number | null;
  recoveryTimeoutId: ReturnType<typeof setTimeout> | null;
  intensity: number;
}

class EffectsController {
  private state: AttackState = {
    active: false,
    startTime: null,
    recoveryTimeoutId: null,
    intensity: 0,
  };

  /** Duration of attack simulation in ms */
  private readonly ATTACK_DURATION = 5000;

  /** Recovery phases */
  private readonly RECOVERY_PHASES = [
    { delay: 0, intensity: 1.0 },
    { delay: 1500, intensity: 0.7 },
    { delay: 3000, intensity: 0.4 },
    { delay: 4000, intensity: 0.2 },
    { delay: 5000, intensity: 0 },
  ];

  /**
   * Simulate an attack - increases glitch/scanline/flicker effects
   */
  simulateAttack(): { started: boolean; message: string } {
    if (this.state.active) {
      return { started: false, message: 'Attack simulation already in progress' };
    }

    if (typeof document === 'undefined') {
      return { started: false, message: 'Cannot simulate attack on server' };
    }

    this.state.active = true;
    this.state.startTime = Date.now();
    this.state.intensity = 1.0;

    // Log event
    eventLogger.log({
      timestamp: Date.now(),
      type: 'attack_start',
      message: 'Attack simulation initiated',
    });

    // Apply initial attack effects
    this.applyEffects(1.0);

    // Add attack mode class
    document.documentElement.classList.add('attack-mode');

    // Schedule recovery phases
    this.RECOVERY_PHASES.forEach(({ delay, intensity }) => {
      setTimeout(() => {
        if (this.state.active) {
          this.state.intensity = intensity;
          this.applyEffects(intensity);

          if (intensity === 0) {
            this.endAttack();
          }
        }
      }, delay);
    });

    return { started: true, message: 'Attack simulation initiated. System under stress...' };
  }

  /**
   * Apply effect intensities via CSS custom properties
   */
  private applyEffects(intensity: number): void {
    const root = document.documentElement;

    // Glitch: 0-8px translation
    root.style.setProperty(ATTACK_PROPERTIES.glitchIntensity, `${intensity * 8}px`);

    // Scanlines: 0-0.3 opacity
    root.style.setProperty(ATTACK_PROPERTIES.scanlineOpacity, `${intensity * 0.3}`);

    // Flicker: 0-1 for animation use
    root.style.setProperty(ATTACK_PROPERTIES.flickerIntensity, `${intensity}`);
  }

  /**
   * End attack and clean up
   */
  private endAttack(): void {
    this.state.active = false;
    this.state.startTime = null;
    this.state.intensity = 0;

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('attack-mode');

      // Reset CSS properties
      const root = document.documentElement;
      root.style.removeProperty(ATTACK_PROPERTIES.glitchIntensity);
      root.style.removeProperty(ATTACK_PROPERTIES.scanlineOpacity);
      root.style.removeProperty(ATTACK_PROPERTIES.flickerIntensity);
    }

    eventLogger.log({
      timestamp: Date.now(),
      type: 'attack_end',
      message: 'Attack simulation ended. Systems recovered.',
    });
  }

  /**
   * Get current defense/health status
   */
  getDefenseStatus(): DefenseStatus {
    const baseStability = 100;
    const attackPenalty = this.state.active ? Math.round(this.state.intensity * 60) : 0;
    const stability = Math.max(0, baseStability - attackPenalty);

    const activeRecovery: string[] = [];
    if (this.state.active) {
      if (this.state.intensity > 0.5) {
        activeRecovery.push('Primary defense systems engaging');
        activeRecovery.push('Isolating affected subsystems');
      } else if (this.state.intensity > 0) {
        activeRecovery.push('Recovery protocols active');
        activeRecovery.push('Restoring normal operations');
      }
    }

    // Animation load based on current effects
    let animationLoad: 'low' | 'medium' | 'high' = 'low';
    if (this.state.intensity > 0.7) {
      animationLoad = 'high';
    } else if (this.state.intensity > 0.3) {
      animationLoad = 'medium';
    }

    // Health score derived from stability and recovery progress
    const recoveryBonus = this.state.active ? 0 : 10;
    const healthScore = Math.min(100, stability + recoveryBonus);

    return {
      stability,
      activeRecovery,
      animationLoad,
      healthScore,
      underAttack: this.state.active,
    };
  }

  /**
   * Check if currently under attack
   */
  isUnderAttack(): boolean {
    return this.state.active;
  }

  /**
   * Get attack elapsed time
   */
  getAttackElapsedTime(): number | null {
    if (!this.state.active || !this.state.startTime) {
      return null;
    }
    return Date.now() - this.state.startTime;
  }
}

// Singleton instance
export const effectsController = new EffectsController();
