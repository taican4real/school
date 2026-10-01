# International Standard Secondary School — Website

Official website foundation for **\[School Name\]** — a co-educational British
curriculum secondary school offering day and boarding places.

## Stack

- **Framework** — Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling** — Tailwind CSS v4 with a restrained institutional design system
  defined via CSS design tokens
- **Typography** — Source Serif 4 (editorial headings) + Inter (UI/body),
  self-hosted via `next/font`
- **Validation** — Zod (client and server) for all forms (added with pages)
- **Content** — Typed, CMS-ready content modules under `src/lib/content/` and
  `src/content/`. No content management system is wired up yet.

## Getting started

```bash
npm install
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run typecheck
```

## Design system

The global design system lives in `src/app/*.css`:

| File             | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| `theme.css`      | Design tokens (colour, type, radius, shadow)        |
| `base.css`       | Element defaults, focus states, reduced motion      |
| `components.css` | Reusable component classes (buttons, cards, forms)  |

Reusable React components live in `src/components/`:

- `ui/` — Button, Card, Badge, SectionHeader, Accordion, Alert, Modal,
  Pagination, Media, Breadcrumbs, Container, Icon, Crest
- `forms/` — accessible TextInput, Textarea, Select, Checkbox, RadioGroup
- `layout/` — Header (top bar, desktop nav, dropdowns, mobile drawer),
  Footer, SkipLink, CookieNotice
- `seo/` — StructuredData (JSON-LD), SocialLinks

Page sections live beside the route they belong to under
`src/components/<page>/` (`home/`, `about/`, `academics/`, `admissions/`,
`boarding/`, `school-life/`, `facilities/`, `news/`).

## News data layer (CMS-ready)

News content is placeholder data in `src/lib/content/news.ts`, typed as
`NewsArticle` records (category slug, nullable `publishedAt`/`author`,
ordered body blocks: paragraph, heading, list, quote).

Pages and components never read that file directly. They call the async
selectors in `src/lib/news/queries.ts` — `getNewsIndex`, `getFeaturedArticle`,
`getArticleBySlug`, `getRelatedArticles`, `getCategories`, `getLatestArticles`
— which return display-ready `NewsCardData`. Wiring up a CMS (or a database)
means changing that one file, plus `generateStaticParams`/`revalidate` if the
publishing cadence changes.

## Events data layer (CMS-ready)

Events follow the same pattern as news: placeholder records in
`src/lib/content/events.ts`, typed as `SchoolEvent` records. Pages and
components call the async selectors in `src/lib/events/queries.ts` —
`getAllEvents`, `getEventPage`, `getUpcomingEvents`, `getEventBySlug`,
`getRelatedEvents`, `getEventCategories`, `getEventScopeCounts`,
`getAllEventSlugs` — which return display-ready `EventCardData`.
Structured data (schema.org `Event`) lives in
`src/lib/events/structured-data.ts` and is suppressed when an event has no
confirmed `startDate`. Both `/events` and `/events/[slug]` revalidate
hourly; swap the query bodies (and `generateStaticParams`) when a CMS is
wired up.

## Site configuration

All global content (name, address, phone, email, social links, navigation)
is placeholder data in `src/lib/site.ts` and `src/lib/nav.ts`. Replace the
`[Square Bracket]` placeholders with real school information before launch.

## Status

- ✅ **Phase 1 — Foundation** (design system + application shell)
- ✅ **Phase 2 — Home page**
- ✅ **Phase 3 — About page**
- ✅ **Phase 4 — Academics** (overview + British Curriculum)
- ✅ **Phase 5 — Admissions** (overview + Apply Now wizard)
- ✅ **Phase 6 — Boarding**
- ✅ **Phase 7 — School Life**
- ✅ **Phase 8 — Facilities** (campus, learning spaces, sports, living, arts,
  STEM, security, gallery)
- ✅ **Phase 9 — News** (hub with search, categories, pagination, featured
  story, article pages, related stories)
- ✅ **Phase 10 — Events** (hub with upcoming/past scope tabs, category
  filters, pagination, featured event, event detail pages with related
  events, home-page teaser, JSON-LD, sitemap)
- ⏳ Phases 11+ (Community, Contact, …) — one page at a time