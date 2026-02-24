import { useState, useEffect } from 'react';

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  PHP: '#4F5D95',
  HTML: '#E34F26',
  CSS: '#563D7C',
  'C#': '#178600',
  Python: '#3572A5',
  Dart: '#00B4AB',
  Java: '#B07219',
  Go: '#00ADD8',
  Ruby: '#CC342D',
  Rust: '#DEA584',
  Vue: '#41B883',
  Shell: '#89E051',
  Blade: '#F7523F',
  SCSS: '#C6538C',
};

const CACHE_KEY = 'github_stats_v1';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos

export function useGitHubStats(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      // Check cache
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { payload, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            if (!cancelled) {
              setUser(payload.user);
              setTotalStars(payload.totalStars);
              setLanguages(payload.languages);
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Cache inválida, ignorar
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok) {
          throw new Error(userRes.status === 403 ? 'Rate limit excedido' : `GitHub API: ${userRes.status}`);
        }

        const userData: GitHubUser = await userRes.json();

        let stars = 0;
        const langCounts: Record<string, number> = {};

        if (reposRes.ok) {
          const repos: Array<{ stargazers_count: number; language: string | null; fork: boolean }> =
            await reposRes.json();

          for (const repo of repos) {
            if (!repo.fork) {
              stars += repo.stargazers_count;
              if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
              }
            }
          }
        }

        const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const langs: LanguageStat[] = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
            color: LANGUAGE_COLORS[name] ?? '#8B8B8B',
          }));

        if (!cancelled) {
          setUser(userData);
          setTotalStars(stars);
          setLanguages(langs);
          setLoading(false);

          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                payload: { user: userData, totalStars: stars, languages: langs },
                ts: Date.now(),
              })
            );
          } catch {
            // localStorage cheio, ignorar
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar stats');
          setLoading(false);
        }
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { user, totalStars, languages, loading, error };
}
