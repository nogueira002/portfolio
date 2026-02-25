import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ExternalLink, GithubIcon as Github, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  type: string;
  date: string;
  fullDescription: string;
  tags: string[];
  images: string[];
  link?: string;
  github?: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() =>
    setCurrent((i) => (i - 1 + (project?.images.length ?? 1)) % (project?.images.length ?? 1)),
    [project?.images.length]
  );
  const next = useCallback(() =>
    setCurrent((i) => (i + 1) % (project?.images.length ?? 1)),
    [project?.images.length]
  );

  useEffect(() => { setCurrent(0); }, [project]);

  useEffect(() => {
    if (!project) return;
    const w = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${w}px`);
    document.body.classList.add('scroll-lock');
    return () => {
      document.body.classList.remove('scroll-lock');
      document.documentElement.style.removeProperty('--scrollbar-width');
    };
  }, [project]);

  useEffect(() => {
    if (project) modalRef.current?.focus();
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose, prev, next]);

  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    if (e.changedTouches[0].clientY - touchStartY.current > 80) onClose();
  };

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 modal-backdrop"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={project.title}
    >
      <div className="absolute inset-0 backdrop-blur-sm" aria-hidden="true" />

      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full outline-none bg-white dark:bg-[#0C0C0C] border border-stone-200/60 dark:border-stone-800/40 shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col rounded-t-2xl sm:rounded-2xl sm:max-w-lg modal-enter"
      >
        {/* Handle mobile */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-stone-200 dark:bg-stone-700 sm:hidden pointer-events-none z-10" />

        {/* Carousel */}
        {project.images.length > 0 && (
          <div className="px-4 pt-6 pb-1 shrink-0 select-none">
            <div className="relative rounded-xl overflow-hidden" style={{ height: '200px' }}>
              <img
                key={current}
                src={project.images[current]}
                alt={`${project.title} — ${current + 1}`}
                className="w-full h-full object-cover animate-fade-in"
                draggable={false}
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200"
                    aria-label="Próxima"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Imagem ${idx + 1}`}
                        className={`rounded-full transition-all duration-200 ${
                          idx === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-stone-200/40 dark:border-stone-800/40 shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
                <Tag className="w-3 h-3" />
                {project.type}
              </span>
              <span className="text-stone-300 dark:text-stone-700 text-xs">·</span>
              <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500 font-code">
                <Calendar className="w-3 h-3" />
                {project.date}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-snug">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200 mt-0.5"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto overscroll-contain flex-1 px-6 py-5 space-y-5">

          {/* Description */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400 dark:text-stone-500 mb-2">
              Descrição
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Tags */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400 dark:text-stone-500 mb-2.5">
              Tecnologias
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800/60 rounded-lg text-xs text-stone-600 dark:text-stone-300 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {(project.github || project.link) && (
            <div className="flex gap-3 pt-1 pb-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-accent text-sm font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver projeto
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
