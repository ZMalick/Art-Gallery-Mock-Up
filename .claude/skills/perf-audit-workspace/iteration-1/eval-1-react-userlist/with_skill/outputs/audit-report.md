## Performance Audit Results

### High Impact

- [UserList.tsx:1] **Full `moment` import (~300KB)** -> Replace with `dayjs` (~2KB) or use native `Intl.RelativeTimeFormat`. Moment.js is massive and not tree-shakeable. Estimated improvement: ~290KB bundle reduction.

- [UserList.tsx:2] **Full `lodash` import (~70KB)** -> Replace `import _ from 'lodash'` with individual ESM imports (`import filter from 'lodash-es/filter'`) or use native array methods (`Array.filter`, `Array.sort`). The full lodash bundle is loaded for just `filter` and `sortBy`. Estimated improvement: ~65KB bundle reduction.

- [UserList.tsx:5-6] **No memoization on filtering/sorting 5000 users** -> Wrap `filtered` and `sorted` computations in `useMemo` with `[users, searchTerm]` dependencies. Currently, every parent re-render recomputes the full filter+sort on 5000 items. Estimated improvement: eliminates redundant O(n log n) operations per render.

- [UserList.tsx:9-14] **No list virtualization for 5000 items** -> Use `react-window` or `@tanstack/react-virtual` to virtualize the list. Rendering 5000 DOM nodes simultaneously causes severe lag. Only ~20-30 visible items need to be in the DOM at any time. Estimated improvement: render time reduction from seconds to <16ms.

- [UserList.tsx] **No debounced search input** -> The search filtering runs on every keystroke against 5000 items. Debounce the `searchTerm` updates (e.g., 200-300ms) to avoid filtering on every character typed. Estimated improvement: eliminates jank during rapid typing.

### Medium Impact

- [UserList.tsx:10] **Inline `onClick` callback creates new function each render** -> Extract the click handler using `useCallback` or define a stable callback pattern. Each of the 5000 items gets a new function reference every render, defeating any potential memoization. Estimated improvement: enables effective memoization of list items.

- [UserList.tsx:10] **Inline `style` objects create new references each render** -> Extract style objects to constants outside the component or use CSS classes. Inline objects `{padding:'12px',...}` and `{width:'40px',...}` create new object references on every render. Estimated improvement: reduces GC pressure and enables memo comparisons.

- [UserList.tsx:9-14] **List items not memoized** -> Extract the user row into a separate `React.memo` component. Combined with stable props, this prevents re-rendering unchanged rows. Estimated improvement: significant re-render reduction when search term changes.

### Low Impact / Quick Wins

- [UserList.tsx:11] **Image missing `loading="lazy"` attribute** -> Add `loading="lazy"` to avatar images that are below the fold. For a 5000-item list, most avatars are off-screen. Estimated improvement: reduced initial network requests and memory usage.

- [UserList.tsx:11] **Image missing explicit `width`/`height` attributes** -> The inline styles set dimensions but HTML attributes `width="40" height="40"` should also be present to prevent CLS. Estimated improvement: CLS reduction.

- [UserList.tsx:11] **Avatar images not optimized** -> Consider using WebP/AVIF format for avatars and serving appropriately sized images. Estimated improvement: reduced image payload.

### Metrics to Monitor
- LCP (Largest Contentful Paint): target < 2.5s
- FID (First Input Delay): target < 100ms -- critical here due to search input lag
- CLS (Cumulative Layout Shift): target < 0.1
- TTFB (Time to First Byte): target < 800ms
