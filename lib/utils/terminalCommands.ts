import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, SOCIAL_LINKS } from '@/lib/constants/portfolio';

export interface CommandOutput {
  type: 'text' | 'html';
  content: string;
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => CommandOutput;
}

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

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Display available commands',
    execute: () => ({
      type: 'html',
      content: `
<div class="help-content">
  <div class="help-header">Available Commands:</div>
  ${commands.map(cmd => `
    <div class="help-cmd">
      <span class="cmd-name">${cmd.name}</span>
      <span class="cmd-desc">- ${cmd.description}</span>
    </div>`).join('')}
</div>`.trim()
    })
  },
  {
    name: 'neofetch',
    description: 'Display system information',
    execute: () => ({
      type: 'html',
      content: `
<div class="neofetch">
  <pre class="ascii-art">${ASCII_ART}</pre>
  <div class="system-info">
    <div class="info-line"><span class="info-label">User:</span> ${PERSONAL_INFO.name}</div>
    <div class="info-line"><span class="info-label">Role:</span> ${PERSONAL_INFO.title}</div>
    <div class="info-line"><span class="info-label">Location:</span> ${PERSONAL_INFO.location}</div>
    <div class="info-line"><span class="info-label">Email:</span> ${PERSONAL_INFO.email}</div>
    <div class="info-line"><span class="info-label">System:</span> Portfolio v1.0.0</div>
    <div class="info-line"><span class="info-label">Uptime:</span> ${Math.floor(performance.now() / 1000)}s</div>
  </div>
</div>`.trim()
    })
  },
  {
    name: 'about',
    description: 'Display portfolio information',
    execute: () => ({
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
</div>`.trim()
    })
  },
  {
    name: 'skills',
    description: 'Display technical skills',
    execute: () => ({
      type: 'html',
      content: formatSkillsTable()
    })
  },
  {
    name: 'projects',
    description: 'List portfolio projects',
    execute: () => ({
      type: 'html',
      content: formatProjects()
    })
  },
  {
    name: 'experience',
    description: 'Display work experience',
    execute: () => ({
      type: 'html',
      content: formatExperience()
    })
  },
  {
    name: 'contact',
    description: 'Display contact information',
    execute: () => ({
      type: 'html',
      content: `
<div class="contact-content">
  <div class="contact-header">Contact Information</div>
  <div class="contact-list">
    <div class="contact-item"><span class="neon-green">►</span> Email: <a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a></div>
    ${SOCIAL_LINKS.map(link => `
      <div class="contact-item"><span class="neon-green">►</span> ${link.platform}: <a href="${link.url}" target="_blank">${link.url}</a></div>`).join('')}
  </div>
</div>`.trim()
    })
  },
  {
    name: 'clear',
    description: 'Clear terminal output',
    execute: () => ({
      type: 'text',
      content: '__CLEAR__'
    })
  },
  {
    name: 'exit',
    description: 'Close terminal session',
    execute: () => ({
      type: 'text',
      content: '__CLOSE__'
    })
  },
  {
    name: 'date',
    description: 'Display current date and time',
    execute: () => ({
      type: 'text',
      content: new Date().toLocaleString()
    })
  },
  {
    name: 'time',
    description: 'Display current time',
    execute: () => ({
      type: 'text',
      content: new Date().toLocaleTimeString()
    })
  },
  {
    name: 'whoami',
    description: 'Display current user',
    execute: () => ({
      type: 'text',
      content: `${PERSONAL_INFO.name} (${PERSONAL_INFO.title})`
    })
  },
  {
    name: 'ls',
    description: 'List directory contents',
    execute: () => ({
      type: 'html',
      content: `
<div class="ls-output">
  <div class="ls-item"><span class="neon-cyan">📁</span> about/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> skills/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> projects/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> experience/</div>
  <div class="ls-item"><span class="neon-cyan">📁</span> contact/</div>
  <div class="ls-item"><span class="neon-magenta">📄</span> README.md</div>
</div>`.trim()
    })
  },
  {
    name: 'echo',
    description: 'Echo the input text',
    execute: (args: string[]) => ({
      type: 'text',
      content: args.join(' ')
    })
  },
  {
    name: 'matrix',
    description: 'Enter the matrix',
    execute: () => ({
      type: 'text',
      content: '__MATRIX__'
    })
  }
];

export const executeCommand = (input: string): CommandOutput => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { type: 'text', content: '' };
  }

  const parts = trimmed.split(' ');
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  const command = commands.find(cmd => cmd.name === commandName);

  if (!command) {
    return {
      type: 'text',
      content: `Command not found: ${commandName}. Type 'help' for available commands.`
    };
  }

  return command.execute(args);
};
