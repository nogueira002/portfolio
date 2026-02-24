import { useEffect, useState } from 'react';
import {
  Github, Linkedin, Mail, MapPin,
  ExternalLink, Building2, Calendar,
  GraduationCap, Award,
  Activity, Loader2, AlertCircle,
  Star, GitBranch, Users, Code, Globe,
  Sun, Moon,
  Home, FolderOpen, Briefcase,
} from 'lucide-react';
import { useGitHubActivity } from '../hooks/useGitHubActivity';
import { useGitHubStats } from '../hooks/useGitHubStats';
import ProjectModal from './ProjectModal';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
  fullDescription: string;
  tags: string[];
  images: string[];
  link?: string;
  github?: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  current?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    title: "Sistema de Barbearia",
    type: "Web App",
    date: "2024",
    description: "Plataforma completa de gestão com agendamento online, gestão de clientes e dashboard administrativo.",
    fullDescription:
      "Sistema full-stack desenvolvido em PHP e MySQL para gestão completa de uma barbearia.\n\n" +
      "Funcionalidades principais:\n" +
      "• Agendamento online — os clientes marcam serviços de forma autónoma, com escolha de barbeiro e horário\n" +
      "• Painel administrativo — gestão de clientes, serviços, preços e disponibilidade\n" +
      "• Histórico de visitas e preferências por cliente\n" +
      "• Interface responsiva, optimizada para mobile\n\n" +
      "O sistema reduziu significativamente o tempo gasto em marcações telefónicas e facilitou a gestão diária da barbearia.",
    tags: ["PHP", "MySQL", "HTML", "JavaScript"],
    images: [
      "https://picsum.photos/seed/barb1/800/450",
      "https://picsum.photos/seed/barb2/800/450",
      "https://picsum.photos/seed/barb3/800/450",
    ],
    link: "https://ricardonogueira.pt/barbearia/",
    github: "https://github.com/nogueira002",
  },
  {
    id: 2,
    title: "CodPostal - API",
    type: "API / Web App",
    date: "2024",
    description: "API pública para consulta de códigos postais portugueses. Frontend React com backend Node.js.",
    fullDescription:
      "API REST pública para consulta de códigos postais portugueses, com mais de 300 mil registos.\n\n" +
      "O projeto inclui:\n" +
      "• API REST com endpoints de pesquisa por código postal, localidade e distrito\n" +
      "• Frontend em React com pesquisa em tempo real\n" +
      "• Backend Node.js com base de dados SQL optimizada para queries rápidas\n" +
      "• Documentação completa da API para integração em projetos externos\n" +
      "• Rate limiting e cache para performance\n\n" +
      "A API está disponível publicamente e é usada por outros developers em projetos pessoais e comerciais.",
    tags: ["React", "Node.js", "SQL", "REST API"],
    images: [
      "https://picsum.photos/seed/cod1/800/450",
      "https://picsum.photos/seed/cod2/800/450",
      "https://picsum.photos/seed/cod3/800/450",
    ],
    link: "http://codpostal.pt/",
    github: "https://github.com/nogueira002",
  },
  {
    id: 3,
    title: "TaskManager",
    type: "Web App",
    date: "2024",
    description: "Sistema de gestão de projetos e tarefas desenvolvido como Prova de Aptidão Profissional.",
    fullDescription:
      "Sistema de gestão de projetos e tarefas desenvolvido como Prova de Aptidão Profissional (PAP) no curso de Programação.\n\n" +
      "Funcionalidades:\n" +
      "• Criação e gestão de projetos com equipas\n" +
      "• Sistema de tarefas com prioridades, prazos e responsáveis\n" +
      "• Dashboard com visão geral de todos os projetos ativos\n" +
      "• Sistema de autenticação e controlo de acessos por papel\n" +
      "• Comentários e histórico de atividade por tarefa\n\n" +
      "Projeto desenvolvido de raiz em PHP com arquitectura MVC, sem frameworks externas.",
    tags: ["PHP", "MySQL", "HTML", "JavaScript"],
    images: [
      "https://picsum.photos/seed/task1/800/450",
      "https://picsum.photos/seed/task2/800/450",
      "https://picsum.photos/seed/task3/800/450",
    ],
  },
  {
    id: 4,
    title: "Portfolio Pessoal",
    type: "Website",
    date: "2025",
    description: "Website portfolio moderno com React, TypeScript e Tailwind CSS.",
    fullDescription:
      "Portfolio pessoal desenvolvido de raiz para mostrar os meus projetos e experiência profissional.\n\n" +
      "Destaques técnicos:\n" +
      "• React 19 + TypeScript para uma base sólida e tipada\n" +
      "• Tailwind CSS v4 para estilização rápida e consistente\n" +
      "• Integração com a API do GitHub para mostrar atividade e linguagens em tempo real\n" +
      "• Dark / Light mode com persistência em localStorage\n" +
      "• Animações de reveal com IntersectionObserver\n\n" +
      "Design focado em simplicidade e legibilidade.",
    tags: ["React", "TypeScript", "Tailwind CSS", "GitHub API"],
    images: [
      "https://picsum.photos/seed/port1/800/450",
      "https://picsum.photos/seed/port2/800/450",
    ],
    github: "https://github.com/nogueira002/portfolio",
  },
];

const experiences: Experience[] = [
  {
    company: "Ótima Ideia",
    role: "Software Developer",
    period: "Jan 2025 — Presente",
    description: "Desenvolvimento full-stack em agência digital. Integrações de ERP, e-commerce e sistemas de gestão.",
    current: true,
  },
  {
    company: "Different IT Solutions",
    role: "Full Stack Developer",
    period: "Abr — Jun 2024",
    description: "Sistemas empresariais com C#, PHP e SQL Server. Foco em segurança, performance e AWS.",
  },
  {
    company: "Petlandia",
    role: "Web Developer",
    period: "Dez 2023 — Mar 2024",
    description: "Desenvolvimento web e design gráfico. Gestão de website corporativo e marketing digital.",
  },
];

const skills = [
  "PHP", "TypeScript", "React", "JavaScript", "Node.js",
  "HTML", "CSS", "SQL", "WordPress", "C#",
  "Tailwind CSS", "Git", "REST APIs",
];

const devicons: Record<string, string | null> = {
  "PHP":          "php/php-original",
  "TypeScript":   "typescript/typescript-original",
  "React":        "react/react-original",
  "JavaScript":   "javascript/javascript-original",
  "Node.js":      "nodejs/nodejs-original",
  "HTML":         "html5/html5-original",
  "CSS":          "css3/css3-original",
  "SQL":          "mysql/mysql-original",
  "WordPress":    "wordpress/wordpress-original",
  "C#":           "csharp/csharp-original",
  "Tailwind CSS": "tailwindcss/tailwindcss-original",
  "Git":          "git/git-original",
  "REST APIs":    null,
};

const certifications = [
  "NLW Journey - ReactJS",
  "O básico de Git e GitHub",
  "Fundamentos da Lógica de Programação",
  "Desenvolvimento Front-End",
  "Metodologias Ágeis",
];

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// ─── Section label ────────────────────────────────────────────────────────────

const SectionLabel = ({ num, title }: { num: string; title: string }) => (
  <div className="flex items-center gap-3 mb-10 reveal">
    <span className="font-mono text-xs text-orange-500 select-none">{num}</span>
    <span className="text-xs text-zinc-400 dark:text-zinc-500 select-none">/</span>
    <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
      {title}
    </h2>
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

const Portfolio: React.FC = () => {
  const { events, loading, error, getEventDescription, getRelativeTime } = useGitHubActivity('nogueira002');
  const { user: ghUser, totalStars, languages: topLangs, loading: statsLoading } = useGitHubStats('nogueira002');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved !== null ? saved === 'dark' : true;
    } catch { return true; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch { /* noop */ }
  }, [isDark]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">

      {/* ── Minimal top bar ────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 pointer-events-none">
        <span className="pointer-events-auto font-mono text-xs text-zinc-400 dark:text-zinc-600 select-none">
          rn.dev
        </span>
        <button
          onClick={() => setIsDark(d => !d)}
          className="pointer-events-auto w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
          aria-label="Alternar tema"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Main content — single column centered ───────────────────────── */}
      <main className="max-w-[680px] mx-auto px-6 pt-20 pb-36">

        {/* ── 01 — Hero ── */}
        <section id="about" className="py-20 md:py-28">
          <div className="space-y-6 reveal">

            {/* Avatar + available */}
            <div className="flex items-center gap-4">
              <img
                src="https://github.com/nogueira002.png"
                alt="Ricardo Nogueira"
                className="w-14 h-14 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800 object-cover"
              />
              <div className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                Disponível para projetos
              </div>
            </div>

            {/* Name + role */}
            <div>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.02] text-zinc-900 dark:text-zinc-50">
                Ricardo<br />Nogueira
              </h1>
              <p className="mt-3 text-lg font-semibold text-orange-500">
                Full Stack Developer
              </p>
            </div>

            {/* Bio */}
            <p className="text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Developer full-stack baseado no Porto, a construir produtos que as
              pessoas realmente usam. Atualmente na{' '}
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">Ótima Ideia</span>
              {' '}e a estudar no{' '}
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">ISTEC Porto</span>.
            </p>

            {/* Stats */}
            <div className="flex gap-8 py-1">
              {[
                { value: '3+', label: 'anos de código' },
                { value: '3',  label: 'empresas' },
                { value: '4+', label: 'projetos' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">{value}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA + social */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="mailto:ricardo.filipe.nogueira0@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
                Contactar
              </a>
              <a
                href="https://github.com/nogueira002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-200"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <div className="flex items-center gap-1 ml-1">
                {[
                  { href: 'https://www.linkedin.com/in/ricardonogueira1', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://github.com/nogueira002', icon: Github, label: 'GitHub' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Location + company */}
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400 dark:text-zinc-500 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Porto, Portugal
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Ótima Ideia
              </span>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-zinc-100 dark:border-zinc-800/60" />

        {/* ── 02 — Competências ── */}
        <section id="skills" className="py-16">
          <SectionLabel num="02" title="Competências" />
          <div className="overflow-hidden space-y-3 reveal">
            {/* Row 1 */}
            <div className="flex gap-2 animate-marquee select-none">
              {[...skills, ...skills].map((skill, i) => {
                const iconPath = devicons[skill];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 hover:border-zinc-200 dark:hover:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200 cursor-default"
                  >
                    {iconPath ? (
                      <img src={`${DEVICON_BASE}/${iconPath}.svg`} alt={skill} className="w-4 h-4 object-contain shrink-0" loading="lazy" />
                    ) : (
                      <Globe className="w-4 h-4 shrink-0 text-zinc-400" />
                    )}
                    {skill}
                  </span>
                );
              })}
            </div>
            {/* Row 2 */}
            <div className="flex gap-2 animate-marquee-reverse select-none">
              {[...skills, ...skills].map((skill, i) => {
                const iconPath = devicons[skill];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 hover:border-zinc-200 dark:hover:border-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-200 cursor-default"
                  >
                    {iconPath ? (
                      <img src={`${DEVICON_BASE}/${iconPath}.svg`} alt={skill} className="w-4 h-4 object-contain shrink-0" loading="lazy" />
                    ) : (
                      <Globe className="w-4 h-4 shrink-0 text-zinc-400" />
                    )}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800/60" />

        {/* ── 03 — GitHub ── */}
        <section id="github-activity" className="py-16">
          <SectionLabel num="03" title="GitHub" />

          <div className="reveal reveal-delay-1 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50">

            {/* Top: avatar + username */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-3">
                {statsLoading ? (
                  <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                ) : (
                  <img
                    src={ghUser?.avatar_url ?? 'https://github.com/nogueira002.png'}
                    className="w-9 h-9 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700"
                    alt="nogueira002"
                  />
                )}
                <div>
                  <a
                    href="https://github.com/nogueira002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold flex items-center gap-1 hover:text-orange-500 transition-colors duration-200"
                  >
                    nogueira002 <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Ricardo Nogueira</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800/80 border-b border-zinc-100 dark:border-zinc-800/80">
              {[
                { icon: Star,      value: statsLoading ? null : totalStars,                  label: 'stars' },
                { icon: GitBranch, value: statsLoading ? null : (ghUser?.public_repos ?? 0), label: 'repos' },
                { icon: Users,     value: statsLoading ? null : (ghUser?.followers ?? 0),    label: 'followers' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5 px-4 py-3">
                  <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                  <div>
                    {value === null ? (
                      <div className="w-8 h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse mb-0.5" />
                    ) : (
                      <p className="text-sm font-bold leading-none">{value}</p>
                    )}
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Top languages */}
            {(statsLoading || topLangs.length > 0) && (
              <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80">
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-2 mb-3">
                  <Code className="w-3.5 h-3.5" /> Top Languages
                </p>
                {statsLoading ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {topLangs.map((lang) => (
                      <div
                        key={lang.name}
                        className="flex items-center gap-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 px-3 py-2"
                      >
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: lang.color }} />
                        <span className="text-xs font-medium flex-1 truncate">{lang.name}</span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contribution graph */}
            <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/80">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-2 mb-3">
                <Activity className="w-3.5 h-3.5" /> Contribuições
              </p>
              <img
                src={`https://ghchart.rshah.org/${isDark ? 'f97316' : '374151'}/nogueira002`}
                alt="GitHub Contributions"
                className="w-full rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none';
                }}
              />
            </div>

            {/* Recent activity */}
            <div className="px-5 py-4">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-2 mb-3">
                <GitBranch className="w-3.5 h-3.5" /> Atividade Recente
              </p>
              {loading && (
                <div className="flex items-center gap-2 py-4 text-zinc-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-xs">A carregar...</span>
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 py-4 text-zinc-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="text-xs">{error}</span>
                </div>
              )}
              {!loading && !error && events.length === 0 && (
                <p className="text-xs text-zinc-400 py-4">Sem atividade recente.</p>
              )}
              {!loading && !error && events.length > 0 && (
                <ul className="space-y-3">
                  {events.map((event) => (
                    <li key={event.id} className="flex flex-col gap-0.5">
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {getEventDescription(event)}
                      </p>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                        {getRelativeTime(event.created_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800/60" />

        {/* ── 04 — Projetos ── */}
        <section id="projects" className="py-16">
          <SectionLabel num="04" title="Projetos" />
          <div className="grid sm:grid-cols-2 gap-3">
            {projects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`reveal reveal-delay-${Math.min(idx + 1, 4)} card-lift group text-left w-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/80`}
              >
                {/* Image */}
                {project.images[0] && (
                  <div className="relative h-40 overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Body */}
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm leading-snug flex-1 min-w-0">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {project.type}
                    </span>
                  </div>

                  <time className="text-xs text-zinc-400 dark:text-zinc-500">{project.date}</time>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.github || project.link) && (
                    <div className="flex gap-1.5 pt-1.5" onClick={(e) => e.stopPropagation()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors duration-200"
                        >
                          <Github className="w-3 h-3" /> Source
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                        >
                          <ExternalLink className="w-3 h-3" /> Website
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800/60" />

        {/* ── 05 — Experiência ── */}
        <section id="experience" className="py-16">
          <SectionLabel num="05" title="Experiência" />
          <div className="space-y-0">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`reveal reveal-delay-${Math.min(idx + 1, 3)} grid grid-cols-[140px_1fr] gap-6 py-6 ${idx > 0 ? 'border-t border-zinc-100 dark:border-zinc-800/60' : ''}`}
              >
                {/* Period column */}
                <div className="pt-0.5">
                  <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 leading-relaxed">{exp.period}</p>
                </div>

                {/* Content column */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <div>
                      <h3 className="text-sm font-semibold">{exp.role}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/60">
                        Atual
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1.5">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800/60" />

        {/* ── 06 — Formação ── */}
        <section id="education" className="py-16">
          <SectionLabel num="06" title="Formação" />
          <div className="grid sm:grid-cols-2 gap-10 reveal reveal-delay-1">

            {/* Education */}
            <div>
              <p className="text-xs font-semibold flex items-center gap-2 text-zinc-400 dark:text-zinc-500 mb-5">
                <GraduationCap className="w-3.5 h-3.5" /> Educação
              </p>
              <div className="space-y-5">
                <div className="pb-5 border-b border-zinc-100 dark:border-zinc-800/60">
                  <h4 className="text-sm font-semibold">ISTEC Porto</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Licenciatura em Informática</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-mono">2024 – Presente</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Escola Prof. de Valongo</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Programação de Computadores</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-mono">2021 – 2024</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-xs font-semibold flex items-center gap-2 text-zinc-400 dark:text-zinc-500 mb-5">
                <Award className="w-3.5 h-3.5" /> Certificações
              </p>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="w-1 h-1 rounded-full bg-orange-400 mt-[6px] shrink-0 inline-block" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800/60" />

        {/* ── 07 — Contact ── */}
        <section id="contact" className="py-20 text-center reveal">
          <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-3 select-none">07</p>
          <h2 className="text-3xl font-black tracking-tight mb-3 text-zinc-900 dark:text-zinc-100">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-xs mx-auto">
            Disponível para novos projetos, freelance e colaborações.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="mailto:ricardo.filipe.nogueira0@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-orange-500 text-white hover:bg-orange-400 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Enviar mensagem
            </a>
            <a
              href="https://www.linkedin.com/in/ricardonogueira1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-zinc-300 dark:text-zinc-700 pb-4">
          &copy; {new Date().getFullYear()} Ricardo Nogueira
        </footer>

      </main>

      {/* ── Bottom dock ─────────────────────────────────────────────────── */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-3 py-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-900/80 dock-blur shadow-xl shadow-black/10 dark:shadow-black/40">

          {/* Nav links */}
          {[
            { href: '#about',           icon: Home,       label: 'Início' },
            { href: '#projects',        icon: FolderOpen, label: 'Projetos' },
            { href: '#experience',      icon: Briefcase,  label: 'Experiência' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}

          {/* Separator */}
          <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

          {/* Social */}
          {[
            { href: 'https://github.com/nogueira002', icon: Github, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/ricardonogueira1', icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:ricardo.filipe.nogueira0@gmail.com', icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              title={label}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}

          {/* Separator */}
          <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

          {/* Theme */}
          <button
            onClick={() => setIsDark(d => !d)}
            aria-label="Alternar tema"
            title="Alternar tema"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </nav>

      {/* ── Project Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
};

export default Portfolio;
