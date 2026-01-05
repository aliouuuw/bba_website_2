# Client-Side Filtering Architecture

## Overview
Refactored blog filtering from server-side API calls to client-side in-memory filtering. This follows modern patterns like TanStack Query and provides:
- **Instant filtering** (no network latency)
- **Reduced server load** (single fetch on mount)
- **Better UX** (no loading states on filter changes)
- **Simpler caching** (data fetched once and reused)

## Architecture

### Data Flow
```
1. Page Mount
   ↓
2. createResource fetches ALL posts (once)
   ↓
3. createMemo filters in-memory based on signals
   ↓
4. UI renders filtered results (instant updates)
```

### Key Components

#### `src/lib/sanityApi.ts`
- **`getAllPosts()`**: Fetches all news and articles in a single query
  - No parameters (filtering removed)
  - Returns complete dataset sorted by date
  - Cached by SolidJS resource

#### `src/routes/blog/index.tsx`
- **`filterPosts()`**: Pure function for client-side filtering
  ```typescript
  function filterPosts(allPosts: BlogPost[], category: string, search: string): BlogPost[]
  ```
  - Filters by category (news vs article type)
  - Filters by search (title/description substring match)
  - Case-insensitive search

- **`allPosts` resource**: Single fetch on component mount
  ```typescript
  const [allPosts] = createResource(() => getAllPosts());
  ```

- **`filteredPosts` memo**: Recomputes when signals change
  ```typescript
  const filteredPosts = createMemo(() => {
    const posts = allPosts();
    if (!posts) return [];
    return filterPosts(posts, activeCategory(), searchQuery());
  });
  ```

- **Signals**: Trigger memo recomputation
  ```typescript
  const [activeCategory, setActiveCategory] = createSignal("all");
  const [searchQuery, setSearchQuery] = createSignal("");
  ```

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Filter latency** | 200-500ms (API call) | <1ms (in-memory) |
| **API calls** | Per filter change | 1 on mount |
| **Network traffic** | Multiple requests | Single request |
| **Caching** | Manual | Automatic (resource) |
| **Code complexity** | Server-side GROQ logic | Simple client-side filter |

## Performance Notes

- **Initial load**: Same (single fetch)
- **Filter/search**: Much faster (no network)
- **Memory**: Minimal (all posts in memory)
- **Suitable for**: Blogs with <1000 posts
- **Scale consideration**: For 10k+ posts, consider pagination or server-side filtering

## Testing

1. Load blog page → should show loading skeleton
2. Once loaded, click category tabs → instant filtering
3. Type in search box → instant results
4. Clear filters → shows all posts
5. No network requests on filter changes (check DevTools Network tab)

## Future Enhancements

- Add pagination if post count grows
- Implement URL query params for shareable filtered views
- Add sorting options (date, popularity, etc.)
- Consider server-side filtering for 10k+ posts
