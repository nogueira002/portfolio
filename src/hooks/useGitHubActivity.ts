import { useState, useEffect } from 'react';

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: { message: string }[];
    pull_request?: { title: string };
    issue?: { title: string };
  };
}

interface CachedData {
  events: GitHubEvent[];
  timestamp: number;
}

const CACHE_KEY = 'github_activity_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getEventDescription(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent': {
      const count = event.payload.commits?.length ?? 0;
      const msg = event.payload.commits?.[0]?.message ?? '';
      return `Pushed ${count} commit${count !== 1 ? 's' : ''} to ${event.repo.name}${msg ? ` — "${msg}"` : ''}`;
    }
    case 'CreateEvent':
      return `Created ${event.payload.ref_type ?? 'repository'} ${event.payload.ref ? `"${event.payload.ref}" in ` : ''}${event.repo.name}`;
    case 'DeleteEvent':
      return `Deleted ${event.payload.ref_type ?? 'branch'} "${event.payload.ref}" in ${event.repo.name}`;
    case 'IssuesEvent':
      return `${event.payload.action ?? 'Updated'} issue "${event.payload.issue?.title}" in ${event.repo.name}`;
    case 'PullRequestEvent':
      return `${event.payload.action ?? 'Updated'} PR "${event.payload.pull_request?.title}" in ${event.repo.name}`;
    case 'WatchEvent':
      return `Starred ${event.repo.name}`;
    case 'ForkEvent':
      return `Forked ${event.repo.name}`;
    case 'IssueCommentEvent':
      return `Commented on issue in ${event.repo.name}`;
    default:
      return `Activity in ${event.repo.name}`;
  }
}

function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'agora';
  if (minutes < 60) return `há ${minutes}m`;
  if (hours < 24) return `há ${hours}h`;
  if (days < 30) return `há ${days}d`;
  return `há ${Math.floor(days / 30)} meses`;
}

export function useGitHubActivity(username: string, limit = 6) {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const data: CachedData = JSON.parse(cached);
          if (Date.now() - data.timestamp < CACHE_DURATION) {
            if (!cancelled) {
              setEvents(data.events.slice(0, limit));
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Cache read failed, proceed to fetch
      }

      try {
        const res = await fetch(`https://api.github.com/users/${username}/events?per_page=30`);
        if (!res.ok) {
          throw new Error(res.status === 403 ? 'Rate limit exceeded' : `GitHub API error: ${res.status}`);
        }
        const data: GitHubEvent[] = await res.json();

        // Cache the result
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ events: data, timestamp: Date.now() }));
        } catch {
          // localStorage full, ignore
        }

        if (!cancelled) {
          setEvents(data.slice(0, limit));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar atividade');
          setLoading(false);
        }
      }
    }

    fetchEvents();
    return () => { cancelled = true; };
  }, [username, limit]);

  return { events, loading, error, getEventDescription, getRelativeTime };
}
