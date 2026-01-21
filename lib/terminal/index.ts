/**
 * Terminal System
 * Main entry point and exports
 */

export * from './types';
export { registry } from './commandRegistry';
export { initializeCommands } from './commands/coreCommands';
export { eventLogger, effectsController, getPerformanceMetrics, getEnvironmentInfo } from './providers';
