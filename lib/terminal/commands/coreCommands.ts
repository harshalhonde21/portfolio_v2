/**
 * Core Terminal Commands
 * Migrated from original terminalCommands.ts with registry pattern
 */

import type { CommandDefinition, CommandOutput, CommandGroup } from '../types';
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, SOCIAL_LINKS } from '@/lib/constants/portfolio';
import { systemCommands } from './systemCommands';
import { attackCommands } from './attackCommands';
import { devtoolsCommands } from './devtoolsCommands';
import { registry } from '../commandRegistry';

const ASCII_ART = `
   <span class="neon-cyan">╔═══════════════════════════════════════════╗</span>
   <span class="neon-cyan">║</span>    <span class="neon-magenta">╦ ╦╔═╗╦═╗╔═╗╦ ╦╔═╗╦</span>    <span class="neon-purple">╦ ╦╔═╗╔╗╔╔╦╗╔═╗</span> <span class="neon-cyan">║</span>
   <span class="neon-cyan">║</span>    <span class="neon-magenta">╠═╣╠═╣╠╦╝╚═╗╠═╣╠═╣║</span>    <span class="neon-purple">╠═╣║ ║║║║ ║║║╣</span>  <span class="neon-cyan">║</span>
   <span class="neon-cyan">║</span>    <span class="neon-magenta">╩ ╩╩ ╩╩╚═╚═╝╩ ╩╩ ╩╩═╝</span>  <span class="neon-purple">╩ ╩╚═╝╝╚╝═╩╝╚═╝</span> <span class="neon-cyan">║</span>
   <span class="neon-cyan">╚═══════════════════════════════════════════╝</span>
`;

const formatSkillsTable = (): string => {
  const frontend = SKILLS.filter(s => s.category === 'frontend').map(s => s.name);
  const backend = SKILLS.filter(s => s.category === 'backend').map(s => s.name);
  const tools = SKILLS.filter(s => s.category === 'tools').map(s => s.name);

  return `
<div class="terminal-skills">
  <div class="skill-category">
    <div class="skill-header"><span class="neon-green">►</span> Frontend</div>
    <div class="skill-list">${frontend.map(s => `<span class="skill-tag">${s}</span>`).join(' ')}</div>
  </div>
  <div class="skill-category">
    <div class="skill-header"><span class="neon-pink">►</span> Backend</div>
    <div class="skill-list">${backend.map(s => `<span class="skill-tag">${s}</span>`).join(' ')}</div>
  </div>
  <div class="skill-category">
    <div class="skill-header"><span class="neon-yellow">►</span> Tools & Cloud</div>
    <div class="skill-list">${tools.map(s => `<span class="skill-tag">${s}</span>`).join(' ')}</div>
  </div>
</div>`.trim();
};

const formatProjects = (): string => {
  return `
<div class="terminal-projects">
${PROJECTS.map((project, idx) => `
  <div class="project-item">
    <div class="project-title"><span class="neon-green">[${idx + 1}]</span> ${project.title}</div>
    <div class="project-desc">${project.description}</div>
    <div class="project-tech">
      <span class="tech-label">Stack:</span> ${project.technologies.join(', ')}
    </div>
    ${project.githubUrl ? `<div class="project-link"><span class="neon-pink">→</span> <a href="${project.githubUrl}" target="_blank">${project.githubUrl}</a></div>` : ''}
  </div>`).join('')}
</div>`.trim();
};

const formatExperience = (): string => {
  return `
<div class="terminal-experience">
${EXPERIENCE.map((exp, idx) => `
  <div class="exp-item">
    <div class="exp-header">
      <span class="neon-green">[${idx + 1}]</span> <span class="exp-role">${exp.role}</span> @ <span class="exp-company">${exp.company}</span>
    </div>
    <div class="exp-period"><span class="neon-yellow">►</span> ${exp.period}</div>
    <div class="exp-desc">
      ${exp.description.map(d => `<div class="exp-point">• ${d}</div>`).join('')}
    </div>
    <div class="exp-tech">
      <span class="tech-label">Technologies:</span> ${exp.technologies.join(', ')}
    </div>
  </div>`).join('')}
</div>`.trim();
};

/** Group labels for help display */
const GROUP_LABELS: Record<CommandGroup, string> = {
  core: 'Core',
  info: 'Information',
  portfolio: 'Portfolio',
  system: 'System',
  attack: 'Attack/Defense',
  devtools: 'DevTools',
};

/** Group order for help display */
const GROUP_ORDER: CommandGroup[] = ['core', 'info', 'portfolio', 'system', 'attack', 'devtools'];

/** Core commands - help, clear, exit, etc. */
const coreCommands: CommandDefinition[] = [
  {
    name: 'help',
    description: 'Display available commands',
    group: 'core',
    handler: (): CommandOutput => {
      const grouped = registry.getCommandsByGroup();

      let html = '<div class="help-content"><div class="help-header">Available Commands:</div>';

      for (const group of GROUP_ORDER) {
        const commands = grouped.get(group);
        if (!commands || commands.length === 0) continue;

        html += `<div class="help-group">
          <div class="help-group-title neon-purple">${GROUP_LABELS[group]}</div>`;

        for (const cmd of commands) {
          html += `<div class="help-cmd">
            <span class="cmd-name">${cmd.name}</span>
            <span class="cmd-desc">- ${cmd.description}</span>
          </div>`;
        }

        html += '</div>';
      }

      html += '</div>';
      return { type: 'html', content: html };
    },
  },
  {
    name: 'clear',
    description: 'Clear terminal output',
    group: 'core',
    handler: (): CommandOutput => ({ type: 'text', content: '__CLEAR__' }),
  },
  {
    name: 'exit',
    description: 'Close terminal session',
    group: 'core',
    handler: (): CommandOutput => ({ type: 'text', content: '__CLOSE__' }),
  },
];

/** Info commands - neofetch, about, whoami, ls */
const infoCommands: CommandDefinition[] = [
  {
    name: 'neofetch',
    description: 'Display system information',
    group: 'info',
    handler: (): CommandOutput => ({
      type: 'html',
      content: `
<div class="neofetch">
  <pre class="ascii-art">${ASCII_ART}</pre>
  <div class="system-info">
    <div class="info-line"><span class="info-label">User:</span> ${PERSONAL_INFO.name}</div>
    <div class="info-line"><span class="info-label">Role:</span> ${PERSONAL_INFO.title}</div>
    <div class="info-line"><span class="info-label">Location:</span> ${PERSONAL_INFO.location}</div>
    <div class="info-line"><span class="info-label">Email:</span> ${PERSONAL_INFO.email}</div>
    <div class="info-line"><span class="info-label">System:</span> Portfolio v2.0.0</div>
    <div class="info-line"><span class="info-label">Uptime:</span> ${Math.floor(performance.now() / 1000)}s</div>
  </div>
</div>`.trim(),
    }),
  },
  {
    name: 'about',
    description: 'Display portfolio information',
    group: 'info',
    handler: (): CommandOutput => ({
      type: 'html',
      content: `
<div class="about-content">
  <div class="about-header"><span class="neon-green">►</span> About ${PERSONAL_INFO.name}</div>
  <div class="about-bio">${PERSONAL_INFO.bio}</div>
  <div class="about-contact">
    <div class="contact-header"><span class="neon-pink">►</span> Contact Information</div>
    <div class="contact-item">Email: <a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a></div>
    <div class="contact-item">Location: ${PERSONAL_INFO.location}</div>
  </div>
</div>`.trim(),
    }),
  },
  {
    name: 'whoami',
    description: 'Display current user',
    group: 'info',
    handler: (): CommandOutput => ({
      type: 'text',
      content: `${PERSONAL_INFO.name} (${PERSONAL_INFO.title})`,
    }),
  },
  {
    name: 'ls',
    description: 'List directory contents',
    group: 'info',
    handler: (): CommandOutput => ({
      type: 'html',
      content: `
<div class="ls-output">
  <div class="ls-item"><span class="neon-cyan">📁</span> about/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> skills/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> projects/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> experience/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> contact/</div>
  <div class="ls-item"><span class="neon-magenta">📄</span> README.md</div>
</div>`.trim(),
    }),
  },
  {
    name: 'date',
    description: 'Display current date and time',
    group: 'info',
    handler: (): CommandOutput => ({
      type: 'text',
      content: new Date().toLocaleString(),
    }),
  },
  {
    name: 'time',
    description: 'Display current time',
    group: 'info',
    handler: (): CommandOutput => ({
      type: 'text',
      content: new Date().toLocaleTimeString(),
    }),
  },
  {
    name: 'echo',
    description: 'Echo the input text',
    group: 'info',
    handler: (args): CommandOutput => ({
      type: 'text',
      content: args.join(' '),
    }),
  },
  {
    name: 'matrix',
    description: 'Enter the matrix',
    group: 'info',
    handler: (): CommandOutput => ({
      type: 'text',
      content: '__MATRIX__',
    }),
  },
];

/** Portfolio commands - skills, projects, experience, contact */
const portfolioCommands: CommandDefinition[] = [
  {
    name: 'skills',
    description: 'Display technical skills',
    group: 'portfolio',
    handler: (): CommandOutput => ({
      type: 'html',
      content: formatSkillsTable(),
    }),
  },
  {
    name: 'projects',
    description: 'List portfolio projects',
    group: 'portfolio',
    handler: (): CommandOutput => ({
      type: 'html',
      content: formatProjects(),
    }),
  },
  {
    name: 'experience',
    description: 'Display work experience',
    group: 'portfolio',
    handler: (): CommandOutput => ({
      type: 'html',
      content: formatExperience(),
    }),
  },
  {
    name: 'contact',
    description: 'Display contact information',
    group: 'portfolio',
    handler: (): CommandOutput => ({
      type: 'html',
      content: `
<div class="contact-content">
  <div class="contact-header">Contact Information</div>
  <div class="contact-list">
    <div class="contact-item"><span class="neon-green">►</span> Email: <a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a></div>
    ${SOCIAL_LINKS.map(link => `
      <div class="contact-item"><span class="neon-green">►</span> ${link.platform}: <a href="${link.url}" target="_blank">${link.url}</a></div>`).join('')}
  </div>
</div>`.trim(),
    }),
  },
];

// Register all commands
export function initializeCommands(): void {
  registry.registerAll(coreCommands);
  registry.registerAll(infoCommands);
  registry.registerAll(portfolioCommands);
  registry.registerAll(systemCommands);
  registry.registerAll(attackCommands);
  registry.registerAll(devtoolsCommands);
}

// Initialize on import
initializeCommands();

export { coreCommands, infoCommands, portfolioCommands };
