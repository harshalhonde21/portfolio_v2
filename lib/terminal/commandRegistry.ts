/**
 * Command Registry
 * Map-based command storage with dotted command support
 */

import type {
  CommandDefinition,
  CommandOutput,
  TerminalContext,
  CommandGroup
} from './types';

class CommandRegistry {
  private commands: Map<string, CommandDefinition> = new Map();

  /**
   * Register a command
   */
  register(command: CommandDefinition): void {
    this.commands.set(command.name.toLowerCase(), command);
  }

  /**
   * Register multiple commands at once
   */
  registerAll(commands: CommandDefinition[]): void {
    commands.forEach(cmd => this.register(cmd));
  }

  /**
   * Execute a command by input string
   */
  async execute(input: string, context: TerminalContext): Promise<CommandOutput> {
    const trimmed = input.trim();
    if (!trimmed) {
      return { type: 'text', content: '' };
    }

    const parts = trimmed.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const command = this.commands.get(commandName);

    if (!command) {
      return {
        type: 'text',
        content: `Command not found: ${commandName}. Type 'help' for available commands.`
      };
    }

    try {
      return await command.handler(args, context);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        type: 'text',
        content: `Error executing ${commandName}: ${message}`
      };
    }
  }

  /**
   * Get all registered commands
   */
  getCommands(): CommandDefinition[] {
    return Array.from(this.commands.values());
  }

  /**
   * Get commands grouped by their group
   */
  getCommandsByGroup(): Map<CommandGroup, CommandDefinition[]> {
    const grouped = new Map<CommandGroup, CommandDefinition[]>();

    for (const command of this.commands.values()) {
      const group = command.group;
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group)!.push(command);
    }

    return grouped;
  }

  /**
   * Check if a command exists
   */
  has(name: string): boolean {
    return this.commands.has(name.toLowerCase());
  }
}

// Singleton instance
export const registry = new CommandRegistry();
