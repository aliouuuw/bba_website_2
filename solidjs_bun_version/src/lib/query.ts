import { createResource, onCleanup } from "solid-js";

export interface QueryOptions {
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  inFlight?: Promise<T>;
  gcTimeoutId?: ReturnType<typeof setTimeout>;
}

const queryCache = new Map<string, CacheEntry<any>>();

function isStale(entry: CacheEntry<any>, staleTime: number): boolean {
  return Date.now() - entry.timestamp > staleTime;
}

export function createQuery<T>(
  key: string | (() => string),
  fetcher: (key: string) => Promise<T>,
  options: QueryOptions = {}
) {
  const {
    staleTime = 5 * 60 * 1000,
    cacheTime = 10 * 60 * 1000,
    refetchOnWindowFocus = true,
  } = options;

  const getKey = typeof key === "string" ? () => key : key;

  const scheduleGc = (cacheKey: string, entry: CacheEntry<T>) => {
    if (entry.gcTimeoutId) clearTimeout(entry.gcTimeoutId);
    entry.gcTimeoutId = setTimeout(() => {
      const current = queryCache.get(cacheKey);
      if (current === entry) queryCache.delete(cacheKey);
    }, cacheTime);
  };

  const fetchWithCache = async (cacheKey: string): Promise<T> => {
    const cached = queryCache.get(cacheKey);

    if (cached && !isStale(cached, staleTime)) {
      return cached.data;
    }

    if (cached?.inFlight) {
      return cached.inFlight;
    }

    const promise = fetcher(cacheKey);
    if (cached) {
      cached.inFlight = promise;
    }

    try {
      const data = await promise;
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
      };
      scheduleGc(cacheKey, entry);
      queryCache.set(cacheKey, entry);
      return data;
    } catch (error) {
      if (cached) {
        delete cached.inFlight;
      }
      throw error;
    }
  };

  const [data, { refetch }] = createResource(getKey, fetchWithCache);

  if (refetchOnWindowFocus && typeof window !== "undefined") {
    const handleFocus = () => {
      const cacheKey = getKey();
      const cached = queryCache.get(cacheKey);
      if (cached && isStale(cached, staleTime)) {
        refetch();
      }
    };

    window.addEventListener("focus", handleFocus);
    onCleanup(() => window.removeEventListener("focus", handleFocus));
  }

  return [data, { refetch }] as const;
}

export function invalidateQuery(key: string): void {
  queryCache.delete(key);
}

export function invalidateQueries(predicate: (key: string) => boolean): void {
  for (const key of queryCache.keys()) {
    if (predicate(key)) {
      queryCache.delete(key);
    }
  }
}

export function clearQueryCache(): void {
  queryCache.clear();
}
