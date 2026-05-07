## Performance Audit Results

### High Impact

- [Dashboard.tsx:2] **Full `chart.js/auto` import (~200KB)** -> Import only required chart types and components (e.g., `import { LineController, LineElement, ... } from 'chart.js'` and register them). The `/auto` entry registers everything. Better yet, lazy-load the chart component with `next/dynamic`. Estimated improvement: ~150KB bundle reduction + deferred loading.

- [Dashboard.tsx:1] **`axios` used for simple GET requests (~14KB)** -> Replace with native `fetch()` API. No interceptors or cancellation are used here, so axios adds unnecessary bundle weight. Estimated improvement: ~14KB bundle reduction.

- [Dashboard.tsx:6-8] **Waterfall API requests** -> The three `axios.get` calls are independent but run sequentially in the effect. Use `Promise.all([fetch('/api/analytics'), fetch('/api/users'), fetch('/api/revenue')])` to parallelize them. Estimated improvement: total load time reduced from sum of three requests to the longest single request.

- [Dashboard.tsx:14] **500 table rows rendered without virtualization** -> Use `@tanstack/react-virtual` or `react-window` to virtualize the table. Rendering 500 rows creates excessive DOM nodes. Estimated improvement: significant render time reduction, lower memory usage.

- [Dashboard.tsx:6-8] **No data caching strategy** -> API calls re-fire on every mount with no caching. Use `useSWR`, `@tanstack/react-query`, or Next.js server components with caching to avoid redundant fetches. Estimated improvement: eliminates redundant network requests on navigation.

### Medium Impact

- [Dashboard.tsx:11] **Banner image missing `loading`, `width`, `height` attributes** -> The banner is likely above the fold so it should have `priority` (if using `next/image`) or explicit dimensions. Missing dimensions cause CLS. Estimated improvement: CLS reduction, improved LCP.

- [Dashboard.tsx:12] **Team photo missing `loading="lazy"` and dimensions** -> Add `loading="lazy"` for below-fold images and explicit `width`/`height` to prevent layout shift. Estimated improvement: reduced initial load, CLS improvement.

- [Dashboard.tsx:11-12] **Not using `next/image` component** -> In a Next.js project, use `<Image>` from `next/image` for automatic optimization (WebP/AVIF, responsive sizing, lazy loading). Estimated improvement: 30-60% image size reduction with modern formats.

- [Dashboard.tsx:2] **Chart.js not code-split** -> Dynamically import the chart component with `next/dynamic` and `{ ssr: false }` since charts require canvas/browser APIs. This removes chart.js from the initial bundle entirely. Estimated improvement: ~200KB deferred from initial load.

### Low Impact / Quick Wins

- [Dashboard.tsx:5] **Missing loading/skeleton state** -> While data is null, nothing meaningful is shown. Add skeleton placeholders to improve perceived performance. Estimated improvement: better UX and perceived load time.

- [Dashboard.tsx:14] **Table rows missing semantic markup** -> Add `<thead>`, `<tbody>` for accessibility and rendering optimization. Estimated improvement: minor rendering and accessibility improvement.

- [Dashboard.tsx:6-8] **No error handling on API calls** -> Failed requests silently fail. Add error boundaries or catch handlers. Not strictly a performance issue but prevents broken states that can cause re-render loops. Estimated improvement: reliability.

- [Dashboard.tsx] **Missing `<link rel="preconnect">` for API origin** -> If API is on a different origin, add preconnect hints. Estimated improvement: reduced DNS/TLS time for API calls.

### Metrics to Monitor
- LCP (Largest Contentful Paint): target < 2.5s -- banner image is likely LCP element
- FID (First Input Delay): target < 100ms
- CLS (Cumulative Layout Shift): target < 0.1 -- unsized images are a CLS risk
- TTFB (Time to First Byte): target < 800ms
