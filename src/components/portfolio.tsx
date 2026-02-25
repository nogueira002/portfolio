import { useEffect, useRef, useState } from 'react';
import {
  GithubIcon as Github, LinkedinIcon as Linkedin, Mail, MapPin,
  ExternalLink, Building2,
  GraduationCap, Award,
  Activity, GitBranch,
  Star, Users, Code, Globe,
  Sun, Moon, ArrowUpRight,
  Home, FolderOpen, Briefcase, Send,
} from 'lucide-react';
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

// ─── Section heading ─────────────────────────────────────────────────────────

const SectionHeading = ({ label, title }: { label: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8 sm:mb-14 reveal">
    <span className="font-code text-[11px] tracking-widest" style={{ color: 'var(--accent-text)' }}>
      {label}
    </span>
    <div className="h-px flex-1 bg-stone-200/50 dark:bg-stone-800/40" />
    <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 dark:text-stone-500">
      {title}
    </h2>
  </div>
);

// ─── Skill pill (marquee) ────────────────────────────────────────────────────

const SkillPill = ({ skill }: { skill: string }) => {
  const iconPath = devicons[skill];
  return (
    <span className="inline-flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-300 whitespace-nowrap rounded-xl border border-stone-200/60 dark:border-stone-800/50 bg-white dark:bg-stone-900/40 hover:border-(--accent-border) transition-colors duration-200 cursor-default">
      {iconPath ? (
        <img src={`${DEVICON_BASE}/${iconPath}.svg`} alt={skill} className="w-4 h-4 object-contain shrink-0" loading="lazy" />
      ) : (
        <Globe className="w-4 h-4 shrink-0 text-stone-400" />
      )}
      {skill}
    </span>
  );
};

// ─── Animated counter (counts up when visible) ──────────────────────────────

const AnimatedCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(eased * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Character-by-character render (for masked slide-up) ─────────────────────

const renderChars = (text: string, baseDelay: number) =>
  text.split('').map((char, i) => (
    <span
      key={i}
      className="char-slide"
      style={{ animationDelay: `${baseDelay + i * 0.035}s` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

// ─── Component ───────────────────────────────────────────────────────────────

const Portfolio: React.FC = () => {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  // Hero parallax + cursor glow — tracks mouse across the full viewport
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();

      // Normalise to full viewport width/height (-1 to 1)
      const px = (e.clientX / window.innerWidth  - 0.5) * 2;
      const py = (e.clientY / window.innerHeight - 0.5) * 2;

      // Cursor glow — position relative to the hero element
      hero.style.setProperty('--cx', `${e.clientX - rect.left}px`);
      hero.style.setProperty('--cy', `${e.clientY - rect.top}px`);

      // Parallax layers
      hero.style.setProperty('--p1x', `${px * 18}px`);
      hero.style.setProperty('--p1y', `${py * 12}px`);
      hero.style.setProperty('--p2x', `${px * -25}px`);
      hero.style.setProperty('--p2y', `${py * -18}px`);
      hero.style.setProperty('--p3x', `${px * 12}px`);
      hero.style.setProperty('--p3y', `${py * -8}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Magnetic buttons
  const handleMagnetic = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };
  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <div className="grain min-h-screen bg-stone-50 dark:bg-[#050505] text-stone-900 dark:text-stone-100 transition-colors duration-500">

      {/* ═══ Floating navigation ══════════════════════════════════════════ */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-stone-200/70 dark:border-stone-800/50 bg-white/80 dark:bg-stone-900/70 glass shadow-lg shadow-black/4 dark:shadow-black/30">
          {[
            { href: '#about', icon: Home, label: 'Início' },
            { href: '#projects', icon: FolderOpen, label: 'Projetos' },
            { href: '#experience', icon: Briefcase, label: 'Experiência' },
            { href: '#contact', icon: Send, label: 'Contacto' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100/80 dark:hover:bg-stone-800/80 transition-all duration-200"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
          <div className="w-px h-4 bg-stone-200 dark:bg-stone-700/60 mx-1" />
          {[
            { href: 'https://github.com/nogueira002', icon: Github, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/ricardonogueira1', icon: Linkedin, label: 'LinkedIn' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100/80 dark:hover:bg-stone-800/80 transition-all duration-200"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
          <div className="w-px h-4 bg-stone-200 dark:bg-stone-700/60 mx-1" />
          <button
            onClick={() => setIsDark(d => !d)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100/80 dark:hover:bg-stone-800/80 transition-all duration-200"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </nav>

      {/* ─── HERO (full-width) ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="about"
        className="hero-interactive relative min-h-[85vh] sm:min-h-[88vh] flex items-center pt-24 pb-16 sm:py-20 overflow-hidden"
      >
          {/* ── Background: cursor glow + parallax layers with orbs & decorations ── */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="hero-cursor-glow" />

            {/* Parallax layer 1 — slow */}
            <div className="absolute inset-0 parallax" style={{ transform: 'translate3d(var(--p1x,0),var(--p1y,0),0)' }}>
              <div className="absolute rounded-full blur-[100px] orb-a" style={{ width: 550, height: 550, background: 'var(--accent)', opacity: 0.045, top: '5%', right: '-8%' }} />
              <span className="absolute font-code text-sm orb-a select-none" style={{ color: 'var(--accent-text)', opacity: 0.18, top: '10%', right: '8%' }}>{'</>'}</span>
              <div className="absolute w-1.5 h-1.5 rounded-full float-d" style={{ background: 'var(--accent)', opacity: 0.35, top: '55%', right: '5%' }} />
              <div className="absolute w-3 h-3 rounded-md float-e" style={{ background: 'var(--accent)', opacity: 0.12, bottom: '22%', right: '20%', rotate: '35deg' }} />
            </div>

            {/* Parallax layer 2 — medium, opposite */}
            <div className="absolute inset-0 parallax" style={{ transform: 'translate3d(var(--p2x,0),var(--p2y,0),0)' }}>
              <div className="absolute rounded-full blur-[80px] orb-b" style={{ width: 350, height: 350, background: 'var(--accent)', opacity: 0.035, bottom: '15%', left: '-5%' }} />
              <span className="absolute font-code text-xs orb-b select-none" style={{ color: 'var(--accent-text)', opacity: 0.15, top: '28%', right: '16%' }}>{'{ }'}</span>
              <div className="absolute w-3 h-3 rounded-full border float-f" style={{ borderColor: 'var(--accent)', opacity: 0.2, top: '8%', right: '28%' }} />
              <div className="absolute w-1 h-1 rounded-full float-d" style={{ background: 'var(--accent)', opacity: 0.3, bottom: '18%', left: '8%' }} />
            </div>

            {/* Parallax layer 3 — subtle */}
            <div className="absolute inset-0 parallax" style={{ transform: 'translate3d(var(--p3x,0),var(--p3y,0),0)' }}>
              <div className="absolute rounded-full blur-[60px] orb-c" style={{ width: 200, height: 200, background: 'var(--accent)', opacity: 0.025, top: '45%', left: '55%' }} />
              <span className="absolute font-code text-[11px] float-e select-none" style={{ color: 'var(--accent-text)', opacity: 0.13, bottom: '32%', right: '10%' }}>{'=> '}</span>
              <span className="absolute font-code text-[10px] float-f select-none" style={{ color: 'var(--accent-text)', opacity: 0.1, top: '18%', right: '38%' }}>{'//'}</span>
              <div className="absolute w-1.5 h-1.5 rounded-full float-d" style={{ background: 'var(--accent)', opacity: 0.25, top: '68%', right: '32%' }} />
            </div>
          </div>

          {/* ── Content (constrained) ── */}
          <div className="relative z-10 w-full max-w-[920px] mx-auto px-5 sm:px-6">
            <div className="space-y-6 sm:space-y-8">

                {/* Available badge — shimmer border */}
                <div
                  className="hero-fade badge-shimmer inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-emerald-300/40 dark:border-emerald-800/40 bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                  style={{ animationDelay: '0.1s' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
                  <span className="text-[11px] sm:text-xs font-medium">Disponível para projetos</span>
                </div>

                {/* Name — character-by-character masked reveal */}
                <div>
                  <h1 className="font-heading text-[2.6rem] sm:text-7xl md:text-[5.5rem] font-extrabold tracking-[-0.035em] leading-[0.9]">
                    <span className="char-mask block text-stone-900 dark:text-stone-50">
                      {renderChars('Ricardo', 0.25)}
                    </span>
                    <span className="char-mask block" style={{ color: 'var(--accent-text)' }}>
                      {renderChars('Nogueira', 0.55)}
                    </span>
                  </h1>
                </div>

                {/* Role + Location */}
                <div
                  className="hero-fade flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-stone-500 dark:text-stone-400"
                  style={{ animationDelay: '0.9s' }}
                >
                  <span className="text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300">Full Stack Developer</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Porto, Portugal
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <Building2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Ótima Ideia
                  </span>
                </div>

                {/* Bio */}
                <p
                  className="hero-fade text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed max-w-lg"
                  style={{ animationDelay: '1.05s' }}
                >
                  Developer full-stack baseado no Porto, a construir produtos que as
                  pessoas realmente usam. Atualmente na{' '}
                  <span className="text-stone-700 dark:text-stone-200 font-medium">Ótima Ideia</span>
                  {' '}e a estudar no{' '}
                  <span className="text-stone-700 dark:text-stone-200 font-medium">ISTEC Porto</span>.
                </p>

                {/* Stats — animated counters */}
                <div
                  className="hero-fade flex gap-6 sm:gap-14"
                  style={{ animationDelay: '1.2s' }}
                >
                  {[
                    { num: 3, suffix: '+', label: 'Anos de código' },
                    { num: 3, suffix: '',  label: 'Empresas' },
                    { num: 4, suffix: '+', label: 'Projetos' },
                  ].map(({ num, suffix, label }) => (
                    <div key={label}>
                      <p className="text-2xl sm:text-4xl font-heading font-bold tracking-tight" style={{ color: 'var(--accent-text)' }}>
                        <AnimatedCounter end={num} suffix={suffix} />
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-stone-400 dark:text-stone-500 mt-1 sm:mt-1.5 font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA buttons — magnetic hover */}
                <div
                  className="hero-fade flex flex-wrap items-center gap-2.5 sm:gap-3"
                  style={{ animationDelay: '1.35s' }}
                >
                  <a
                    href="mailto:ricardo.filipe.nogueira0@gmail.com"
                    className="magnetic btn-accent inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[13px] sm:text-sm font-semibold rounded-xl"
                    onMouseMove={handleMagnetic}
                    onMouseLeave={handleMagneticLeave}
                  >
                    <Mail className="w-4 h-4" />
                    Contactar
                  </a>
                  <a
                    href="https://github.com/nogueira002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[13px] sm:text-sm font-semibold border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors duration-200"
                    onMouseMove={handleMagnetic}
                    onMouseLeave={handleMagneticLeave}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ricardonogueira1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[13px] sm:text-sm font-semibold border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors duration-200"
                    onMouseMove={handleMagnetic}
                    onMouseLeave={handleMagneticLeave}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
            </div>
          </div>
      </section>

      {/* ═══ Main content ═════════════════════════════════════════════════ */}
      <main className="max-w-[920px] mx-auto px-5 sm:px-6 pb-16 sm:pb-20">

        <hr className="section-divider" />

        {/* ─── 01 — SKILLS ───────────────────────────────────────────── */}
        <section id="skills" className="py-14 sm:py-20">
          <SectionHeading label="01" title="Competências" />
          <div className="overflow-hidden space-y-3 reveal reveal-d1">
            <div className="flex gap-3 marquee select-none">
              {[...skills, ...skills].map((skill, i) => (
                <SkillPill key={`a-${i}`} skill={skill} />
              ))}
            </div>
            <div className="flex gap-3 marquee-reverse select-none">
              {[...skills, ...skills].map((skill, i) => (
                <SkillPill key={`b-${i}`} skill={skill} />
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ─── 02 — PROJECTS ─────────────────────────────────────────── */}
        <section id="projects" className="py-14 sm:py-20">
          <SectionHeading label="02" title="Projetos" />
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleSpotlight}
                className={`reveal reveal-d${Math.min(idx + 1, 4)} card-spotlight group text-left w-full flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#0A0A0A] border border-stone-200/60 dark:border-stone-800/40`}
              >
                {project.images[0] && (
                  <div className="relative h-40 sm:h-44 overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-900">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="relative z-1 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 z-2 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 z-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-300 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                <div className="relative z-1 flex flex-col flex-1 p-5 gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-[15px] leading-snug flex-1 min-w-0">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-stone-200/60 dark:border-stone-700/60 text-stone-500 dark:text-stone-400 font-code uppercase tracking-wider">
                      {project.type}
                    </span>
                  </div>

                  <time className="text-xs text-stone-400 dark:text-stone-500 font-code">{project.date}</time>

                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(project.github || project.link) && (
                    <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors duration-200"
                        >
                          <Github className="w-3 h-3" /> Source
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200"
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

        <hr className="section-divider" />

        {/* ─── 03 — GITHUB ───────────────────────────────────────────── */}
        <section id="github-activity" className="py-14 sm:py-20">
          <SectionHeading label="03" title="GitHub" />

          <div
            className="reveal reveal-d1 card-spotlight rounded-2xl overflow-hidden border border-stone-200/60 dark:border-stone-800/40 bg-white dark:bg-[#0A0A0A]"
            onMouseMove={handleSpotlight}
          >
            {/* Top: avatar + username */}
            <div className="relative z-1 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-200/40 dark:border-stone-800/40">
              <div className="flex items-center gap-3.5">
                {statsLoading ? (
                  <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 animate-pulse" />
                ) : (
                  <img
                    src={ghUser?.avatar_url ?? 'https://github.com/nogueira002.png'}
                    className="w-10 h-10 rounded-full ring-2 ring-stone-200 dark:ring-stone-700"
                    alt="nogueira002"
                  />
                )}
                <div>
                  <a
                    href="https://github.com/nogueira002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-200"
                    style={{ color: 'var(--accent-text)' }}
                  >
                    nogueira002 <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-stone-400 dark:text-stone-500">Ricardo Nogueira</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="relative z-1 grid grid-cols-3 divide-x divide-stone-200/40 dark:divide-stone-800/40 border-b border-stone-200/40 dark:border-stone-800/40">
              {[
                { icon: Star,      value: statsLoading ? null : totalStars,                  label: 'stars' },
                { icon: GitBranch, value: statsLoading ? null : (ghUser?.public_repos ?? 0), label: 'repos' },
                { icon: Users,     value: statsLoading ? null : (ghUser?.followers ?? 0),    label: 'followers' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4">
                  <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-stone-400 dark:text-stone-500 shrink-0" />
                  <div>
                    {value === null ? (
                      <div className="w-8 h-4 bg-stone-100 dark:bg-stone-800 rounded animate-pulse mb-0.5" />
                    ) : (
                      <p className="text-xs sm:text-sm font-bold leading-none">{value}</p>
                    )}
                    <p className="text-[9px] sm:text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 font-code uppercase tracking-wider">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Top languages */}
            {(statsLoading || topLangs.length > 0) && (
              <div className="relative z-1 px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-200/40 dark:border-stone-800/40">
                <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 flex items-center gap-2 mb-3.5 uppercase tracking-[0.12em]">
                  <Code className="w-3.5 h-3.5" /> Top Languages
                </p>
                {statsLoading ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-10 rounded-lg bg-stone-100 dark:bg-stone-800 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {topLangs.map((lang) => (
                      <div
                        key={lang.name}
                        className="flex items-center gap-2 sm:gap-2.5 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/40 dark:border-stone-800/40 px-2.5 sm:px-3.5 py-2 sm:py-2.5"
                      >
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: lang.color }} />
                        <span className="text-xs font-medium flex-1 truncate">{lang.name}</span>
                        <span className="text-xs text-stone-400 dark:text-stone-500 font-code tabular-nums">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contribution graph */}
            <div className="relative z-1 px-4 sm:px-6 py-4 sm:py-5">
              <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 flex items-center gap-2 mb-3.5 uppercase tracking-[0.12em]">
                <Activity className="w-3.5 h-3.5" /> Contribuições
              </p>
              <img
                src={`https://ghchart.rshah.org/${isDark ? 'e8a87c' : '78716c'}/nogueira002`}
                alt="GitHub Contributions"
                className="w-full rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none';
                }}
              />
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ─── 04 — EXPERIENCE ───────────────────────────────────────── */}
        <section id="experience" className="py-14 sm:py-20">
          <SectionHeading label="04" title="Experiência" />
          <div className="space-y-0">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`reveal reveal-d${Math.min(idx + 1, 3)} grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-8 py-7 ${
                  idx > 0 ? 'border-t border-stone-200/40 dark:border-stone-800/30' : ''
                }`}
              >
                <div className="pt-0.5">
                  <p className="text-xs font-code text-stone-400 dark:text-stone-500 leading-relaxed">{exp.period}</p>
                </div>
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="text-[15px] font-semibold leading-snug">{exp.role}</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <span
                        className="shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border"
                        style={{
                          color: 'var(--accent-text)',
                          borderColor: 'var(--accent-border)',
                          backgroundColor: 'var(--accent-bg)',
                        }}
                      >
                        Atual
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mt-2">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* ─── 05 — EDUCATION ────────────────────────────────────────── */}
        <section id="education" className="py-14 sm:py-20">
          <SectionHeading label="05" title="Formação" />
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 reveal reveal-d1">
            <div>
              <p className="text-[11px] font-semibold flex items-center gap-2 text-stone-400 dark:text-stone-500 mb-6 uppercase tracking-[0.12em]">
                <GraduationCap className="w-3.5 h-3.5" /> Educação
              </p>
              <div className="space-y-6">
                <div className="pb-6 border-b border-stone-200/40 dark:border-stone-800/30">
                  <h4 className="text-[15px] font-semibold">ISTEC Porto</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Licenciatura em Informática</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 font-code">2024 – Presente</p>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold">Escola Prof. de Valongo</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Programação de Computadores</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 font-code">2021 – 2024</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold flex items-center gap-2 text-stone-400 dark:text-stone-500 mb-6 uppercase tracking-[0.12em]">
                <Award className="w-3.5 h-3.5" /> Certificações
              </p>
              <ul className="space-y-3.5">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-stone-500 dark:text-stone-400">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0 inline-block"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ─── 06 — CONTACT CTA ──────────────────────────────────────── */}
        <section id="contact" className="py-16 sm:py-24 text-center reveal">
          <p className="font-code text-[11px] tracking-widest mb-4" style={{ color: 'var(--accent-text)' }}>06</p>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-stone-900 dark:text-stone-50">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed">
            Disponível para novos projetos, freelance e colaborações.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:ricardo.filipe.nogueira0@gmail.com"
              className="btn-accent inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold"
            >
              <Mail className="w-4 h-4" />
              Enviar mensagem
            </a>
            <a
              href="https://www.linkedin.com/in/ricardonogueira1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-stone-300 dark:text-stone-700 pb-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <span>&copy; {new Date().getFullYear()} Ricardo Nogueira</span>
            <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="font-code text-[10px]">Porto, PT</span>
          </div>
        </footer>

      </main>

      {/* ═══ Project Modal ═══════════════════════════════════════════════ */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
};

export default Portfolio;
