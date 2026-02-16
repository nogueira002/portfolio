import { useEffect, useState } from 'react';
import {
  Github, Linkedin, Mail, MapPin,
  ExternalLink, Building2, Calendar,
  GraduationCap, Award, Home, Briefcase, FolderOpen,
  Activity, Loader2, AlertCircle,
} from 'lucide-react';
import { useGitHubActivity } from '../hooks/useGitHubActivity';

// ─── Data ───────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  current?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Sistema de Barbearia",
    description: "Plataforma completa de gestão com agendamento online, gestão de clientes e dashboard administrativo.",
    tags: ["PHP", "MySQL", "HTML", "JavaScript"],
    link: "https://ricardonogueira.pt/barbearia/",
  },
  {
    id: 2,
    title: "CodPostal - API",
    description: "API pública para consulta de códigos postais portugueses. Frontend React com backend Node.js.",
    tags: ["React", "Node.js", "SQL", "REST API"],
    link: "http://codpostal.pt/",
  },
  {
    id: 3,
    title: "TaskManager",
    description: "Sistema de gestão de projetos e tarefas desenvolvido como Prova de Aptidão Profissional (PAP).",
    tags: ["PHP", "MySQL", "HTML", "JavaScript"],
  },
  {
    id: 4,
    title: "Portfolio Pessoal",
    description: "Website portfolio moderno com React, TypeScript e Tailwind CSS.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
];

const experiences: Experience[] = [
  {
    company: "Ótima Ideia",
    role: "Software Developer",
    period: "Jan 2025 - Presente",
    description: "Desenvolvimento full-stack em agência digital. Integrações de ERP, e-commerce e sistemas de gestão.",
    current: true,
  },
  {
    company: "Different IT Solutions",
    role: "Full Stack Developer",
    period: "Abr - Jun 2024",
    description: "Sistemas empresariais com C#, PHP e SQL Server. Foco em segurança, performance e AWS.",
  },
  {
    company: "Petlandia",
    role: "Web Developer",
    period: "Dez 2023 - Mar 2024",
    description: "Desenvolvimento web e design gráfico. Gestão de website corporativo e marketing digital.",
  },
];

const skills = [
  "PHP", "TypeScript", "React", "Node.js", "SQL",
  "REST APIs", "WordPress", "C#", "Tailwind CSS",
  "Git", "HTML/CSS", "JavaScript",
];

const certifications = [
  "NLW Journey - ReactJS",
  "O básico de Git e GitHub",
  "Fundamentos da Lógica de Programação",
  "Desenvolvimento Front-End",
  "Metodologias Ágeis",
];

// ─── Component ──────────────────────────────────────────────────────────────

const Portfolio: React.FC = () => {
  const { events, loading, error, getEventDescription, getRelativeTime } = useGitHubActivity('nogueira002');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projetos', icon: FolderOpen },
    { id: 'experience', label: 'Experiência', icon: Briefcase },
    { id: 'github', label: 'GitHub', href: 'https://github.com/nogueira002', icon: Github, external: true },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ricardonogueira1', icon: Linkedin, external: true },
    { id: 'email', label: 'Email', href: 'mailto:ricardo.filipe.nogueira0@gmail.com', icon: Mail, external: true },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ─── Hero / Profile ──────────────────────────────────────────── */}
      <section id="home" className="relative">
        {/* Banner */}
        <div className="h-48 md:h-56 bg-gradient-to-r from-orange-500/80 via-pink-500/60 to-orange-400/80" />

        {/* Profile card */}
        <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10 pb-12">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 border-4 border-black flex items-center justify-center mb-4 shadow-lg">
            <span className="text-3xl font-bold text-white select-none">RN</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-1">Ricardo Nogueira</h1>
          <p className="text-lg text-gray-400 mb-3">Software Developer</p>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mb-4">
            Especializado em PHP, TypeScript e React. Desenvolvimento de soluções
            práticas e funcionais que fazem a diferença.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Porto, Portugal
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              Ótima Ideia
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Disponível para projetos
            </span>
          </div>
        </div>
      </section>

      {/* ─── Skills ──────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold mb-4 reveal">Competências</h2>
        <div className="flex flex-wrap gap-2 reveal reveal-delay-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* ─── GitHub Activity ─────────────────────────────────────────── */}
      <section id="github-activity" className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold mb-4 reveal flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-500" />
          Atividade GitHub
        </h2>

        <div className="reveal reveal-delay-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-8 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">A carregar atividade...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 py-6 text-gray-500 justify-center">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">Sem atividade recente.</p>
          )}

          {!loading && !error && events.length > 0 && (
            <ul className="divide-y divide-zinc-800">
              {events.map((event) => (
                <li key={event.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {getRelativeTime(event.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ─── Projects ────────────────────────────────────────────────── */}
      <section id="projects" className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold mb-6 reveal">Projetos</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, idx) => {
            const Wrapper = project.link ? 'a' : 'div';
            const linkProps = project.link
              ? { href: project.link, target: '_blank' as const, rel: 'noopener noreferrer' }
              : {};

            return (
              <Wrapper
                key={project.id}
                {...linkProps}
                className={`reveal reveal-delay-${Math.min(idx + 1, 4)} group block bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold group-hover:text-orange-500 transition-colors duration-200">
                    {project.title}
                  </h3>
                  {project.link && (
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors duration-200 flex-shrink-0 mt-0.5" />
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-3 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-zinc-800 rounded-full text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* ─── Experience ──────────────────────────────────────────────── */}
      <section id="experience" className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold mb-6 reveal">Experiência</h2>

        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`reveal reveal-delay-${Math.min(idx + 1, 4)} bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-300`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="text-base font-semibold">{exp.role}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {exp.company}
                  </p>
                </div>
                {exp.current && (
                  <span className="px-2.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-medium">
                    Atual
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                {exp.period}
              </p>

              <p className="text-sm text-gray-400 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Education & Certifications ──────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Education */}
          <div className="reveal bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-orange-500" />
              <h3 className="text-base font-semibold">Formação</h3>
            </div>

            <div className="space-y-3">
              <div className="pb-3 border-b border-zinc-800">
                <h4 className="text-sm font-medium">ISTEC Porto</h4>
                <p className="text-xs text-gray-400">Licenciatura em Informática</p>
                <p className="text-xs text-gray-500">2024 - Presente</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Escola Profissional de Valongo</h4>
                <p className="text-xs text-gray-400">Ensino Secundário Profissional</p>
                <p className="text-xs text-gray-400">Programação de Computadores</p>
                <p className="text-xs text-gray-500">2021 - 2024</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="reveal reveal-delay-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-orange-500" />
              <h3 className="text-base font-semibold">Certificações</h3>
            </div>

            <ul className="space-y-2">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Contact ─────────────────────────────────────────────────── */}
      <section id="contact" className="max-w-3xl mx-auto px-6 pb-32">
        <div className="reveal bg-zinc-900/60 border border-zinc-800 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Vamos trabalhar juntos?</h2>
          <p className="text-sm text-gray-400 mb-5">
            Disponível para novos projetos e colaborações.
          </p>
          <a
            href="mailto:ricardo.filipe.nogueira0@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            Enviar mensagem
          </a>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800/50 py-8 px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Ricardo Nogueira
        </div>
      </footer>

      {/* ─── Bottom Dock Navbar ──────────────────────────────────────── */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 shadow-lg shadow-black/30 rounded-2xl px-3 py-2">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExternal = 'external' in item && item.external;
            const href = 'href' in item && item.href ? item.href : `#${item.id}`;

            return (
              <div key={item.id} className="relative">
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-zinc-700/60 transition-all duration-200 hover:scale-110"
                  onMouseEnter={() => setActiveTooltip(item.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5" />
                </a>

                {/* Tooltip */}
                {activeTooltip === item.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-white whitespace-nowrap pointer-events-none animate-fade-in-up">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Portfolio;
