/**
 * Event Logger
 * Circular buffer event logger with subscription support for log.stream
 */

import type { SystemEvent } from '../types';

type EventSubscriber = (event: SystemEvent) => void;

class EventLogger {
  private buffer: SystemEvent[] = [];
  private readonly MAX_SIZE = 100;
  private subscribers: Set<EventSubscriber> = new Set();

  /**
   * Log a system event
   */
  log(event: SystemEvent): void {
    // Add to circular buffer
    if (this.buffer.length >= this.MAX_SIZE) {
      this.buffer.shift();
    }
    this.buffer.push(event);

    // Notify subscribers
    this.subscribers.forEach(callback => {
      try {
        callback(event);
      } catch (e) {
        console.error('Event subscriber error:', e);
      }
    });
  }

  /**
   * Get all events (newest last)
   */
  getEvents(): SystemEvent[] {
    return [...this.buffer];
  }

  /**
   * Get recent events
   */
  getRecentEvents(count: number = 10): SystemEvent[] {
    return this.buffer.slice(-count);
  }

  /**
   * Subscribe to live events
   */
  subscribe(callback: EventSubscriber): () => void {
    this.subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Check if any subscribers are active
   */
  hasSubscribers(): boolean {
    return this.subscribers.size > 0;
  }

  /**
   * Clear all events
   */
  clear(): void {
    this.buffer = [];
  }

  /**
   * Format event for terminal output
   */
  formatEvent(event: SystemEvent): string {
    const time = new Date(event.timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const typeColors: Record<SystemEvent['type'], string> = {
      route_change: 'neon-cyan',
      theme_change: 'neon-purple',
      attack_start: 'neon-pink',
      attack_end: 'neon-green',
      motion_toggle: 'neon-yellow',
      command: 'neon-cyan',
    };

    const color = typeColors[event.type] || 'neon-cyan';
    return `<span class="event-time">[${time}]</span> <span class="${color}">[${event.type.toUpperCase()}]</span> ${event.message}`;
  }
}

// Singleton instance
export const eventLogger = new EventLogger();
