# Personal Website — Implementation Plan (v2)
> Last updated: 2026-03-16

---

## Table of Contents

1. [定位与目标](#1-定位与目标)
2. [风格定义](#2-风格定义)
3. [技术选型](#3-技术选型)
4. [Global Design Tokens](#4-global-design-tokens)
5. [File Structure](#5-file-structure)
6. [Component Inventory](#6-component-inventory)
7. [Content System](#7-content-system)
8. [Animation Plan](#8-animation-plan)
9. [Implementation Phases](#9-implementation-phases)
10. [Dependencies](#10-dependencies)

---

## 1. 定位与目标

### 1.1 网站定位

这是一个面向求职场景的个人作品集网站。
目标是让招聘方在 **30–60 秒内**理解我的核心能力、代表性案例与专业风格。

### 1.2 页面结构

| 路由 | 内容 |
|---|---|
| `/` | 首页：故事线 + 四类项目卡片 |
| `/written` | 写作索引 |
| `/written/[slug]` | 单篇文章 |

### 1.3 内容扩展规则

添加新项目或文章 = 在对应 `content/` 子目录新增一个 `.mdx` 文件。
不需要修改任何其他文件。

### 1.4 目标受众

招聘方、合作者、同行 —— 他们需要快速判断：这个人做过什么、思考方式是什么、风格合不合适。

---

## 2. 风格定义

> 本章独立存在，允许迭代变化，不与产品目标混写。

### 2.1 整体定位

追求**展示型官网质感**：

- 细腻动效、背景动画、轻叙事节奏
- 视觉精致但不浮夸
- 动效服务于内容展示，而非装饰

### 2.2 参考风格提炼

| 参考 | 借鉴要素 |
|---|---|
| Claude | 暖白底色、大留白、克制的层级关系 |
| Figma | 精密网格、紧凑微交互、功能即美学 |
| 日式杂志 | 负空间即设计、混用字重、纸张质感 |

### 2.3 整体基调

"温暖工作室桌面" —— 有生活感但有秩序，不冷峻，不堆砌。

### 2.4 色彩方向

暖白底色，单一赤陶色作为强调，不引入竞争色。
所有黑色为暖黑（不用纯 `#000000`）。

### 2.5 字体方向

衬线体（Serif）承载编辑感和重量感，用于标题和故事节点。
人文无衬线（Humanist sans-serif）保证阅读舒适度，用于正文和 UI。
等宽体（Monospace）营造档案标注感，用于标签、日期、元信息。

### 2.6 质感方向

全局 grain overlay 模拟纸张纹理，被动附着于所有表面。
背景有极慢速的暖色渐变漂移，感知为"有温度的底色"而非"动效"。

---

## 3. 技术选型

> 本章说明"为什么选这个"，与"怎么用"分开。

| 技术 | 选型理由 |
|---|---|
| **Next.js 15 (App Router)** | 静态/半静态渲染、SEO 友好、`next/font` 管理字体、`next/image` 优化图片，适合展示型站点 |
| **Tailwind CSS v4** | 设计 token 集中管理（`@theme` block）；快速迭代且风格统一；v4 无需 `tailwind.config.js` |
| **Framer Motion** | 进入动效、细腻微交互、reading progress；React 集成好，声明式 API |
| **GSAP（可选）** | 复杂滚动叙事（StoryFlow pinning）时再引入；不作为初期依赖 |
| **MDX + 本地 content/** | 内容可扩展、可用 Git 管理版本、无需 CMS、支持在文章中嵌入 React 组件 |
| **next-mdx-remote** | 服务端编译 MDX，只在文章详情页使用；不污染 `next.config.ts` |
| **gray-matter** | 轻量 frontmatter 解析，用于所有内容索引页 |
| **`next/font/google`** | 统一字体加载方案；DM Serif Display、Plus Jakarta Sans 通过 Google Fonts 按需加载并自动优化；Geist Mono 通过 `geist` 包集成；不引入 `@fontsource` 包 |

---

## 4. Global Design Tokens

All tokens defined once in `app/globals.css` as a Tailwind v4 `@theme` block.
Every component references tokens — never hardcodes values.

### Colors

```css
--color-bg:             #FAF8F4   /* page background */
--color-card:           #FFFFFF   /* card surface */
--color-text-primary:   #1C1917   /* headings, body */
--color-text-secondary: #78716C   /* labels, metadata, captions */
--color-accent:         #C07A56   /* links, tags, progress bar, highlights */
--color-border:         #E8E0D5   /* card edges, dividers */
--color-shadow:         rgba(28,25,23,0.08)   /* default shadow */
--color-shadow-hover:   rgba(28,25,23,0.16)   /* hovered shadow */
```

### Typography

| Role | Font | Size | Weight | Line-height |
|---|---|---|---|---|
| Display (hero) | DM Serif Display | 5–6rem | 400 | 1.05 |
| H1 | DM Serif Display | 3rem | 400 | 1.1 |
| H2 | DM Serif Display | 2rem | 400 | 1.2 |
| H3 | DM Serif Display | 1.375rem | 400 | 1.3 |
| Body | Plus Jakarta Sans | 1rem | 400 | 1.65 |
| Body large | Plus Jakarta Sans | 1.125rem | 400 | 1.7 |
| Small / Caption | Plus Jakarta Sans | 0.875rem | 400 | 1.6 |
| Label / Mono | Geist Mono | 0.75rem | 400 | 1.5 |

Letter-spacing: display `-0.02em`; labels `+0.06em`; body `0`.

### Spacing

| Token | Value | Usage |
|---|---|---|
| Section vertical padding | 96px (`py-24`) | Between homepage sections |
| Container max-width | 1024px (`max-w-5xl`) | All centered content |
| Card grid gap | 24px desktop / 16px mobile | Between cards |
| Card internal padding | 24px (`p-6`) | Card content area |
| Prose max-width | `65ch` | Article body column |

### Shadows

```css
--shadow-card:       0 2px 8px var(--color-shadow), 0 0 1px var(--color-border);
--shadow-card-hover: 0 8px 24px var(--color-shadow-hover), 0 0 1px var(--color-border);
```

### Z-index Layers

所有层级在此统一定义，组件不自行声明 z-index 数值。

| Layer | Value | Component |
|---|---|---|
| Background gradient | `z-0` | `MeshGradient` |
| Page content | `z-10` | 所有正文组件 |
| Nav | `z-40` | `Nav` |
| Grain overlay | `z-50` | `GrainOverlay` |
| Modal / Overlay (future) | `z-60` | — |

### Card Base Style (applies to ALL card variants)

```
background: var(--color-card)
border: 1px solid var(--color-border)
border-radius: 12px (rounded-xl)
box-shadow: var(--shadow-card)
transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease
```

On hover:
```
transform: rotate(0deg) translateY(-4px)
box-shadow: var(--shadow-card-hover)
```

Tag pills: `rounded-full`, accent or muted variant.
Image corners within cards: `rounded-lg` (8px).

---

## 5. File Structure

Flattened to match actual site complexity. Two route groups, one content directory.

```
/
├── app/
│   ├── layout.tsx                # Fonts, GrainOverlay, MeshGradient, Nav, Footer
│   ├── page.tsx                  # Homepage — assembles all sections
│   ├── globals.css               # @theme tokens + global resets + keyframes
│   ├── written/
│   │   ├── page.tsx              # Writing index
│   │   └── [slug]/
│   │       └── page.tsx          # Single article
│   └── not-found.tsx
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx               # Sticky nav, blur on scroll
│   │   └── Footer.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx              # Name, tagline, animated bg shape
│   │   ├── StoryFlow.tsx         # Scroll narrative (Framer Motion; GSAP optional enhancement)
│   │   ├── ProjectsSection.tsx   # Renders all four project categories in sequence
│   │   └── ProjectCard.tsx       # Single reusable card (handles work/side/academic/hobby variants)
│   │
│   ├── writing/
│   │   ├── WritingList.tsx       # Writing index list
│   │   ├── WritingCard.tsx       # Single writing entry card
│   │   ├── ArticleLayout.tsx     # Article page wrapper: header + prose + progress
│   │   └── MDXComponents.tsx     # Custom MDX element map
│   │
│   └── ui/
│       ├── GrainOverlay.tsx      # Fixed SVG noise texture layer
│       ├── MeshGradient.tsx      # Fixed animated warm gradient layer
│       ├── ScrollReveal.tsx      # Framer Motion viewport-entry wrapper
│       ├── SectionLabel.tsx      # Mono label, e.g. "— Work"
│       ├── Tag.tsx               # Pill tag, accent or muted
│       └── ReadingProgress.tsx   # Scroll-linked progress bar (articles only)
│
├── content/                      # All user content lives here
│   ├── projects/
│   │   ├── work/                 # *.mdx — main work projects
│   │   ├── side/                 # *.mdx — side projects
│   │   ├── academic/             # *.mdx — academic projects
│   │   └── hobby/                # *.mdx — hobby / other
│   └── writing/                  # *.mdx — articles
│
├── lib/
│   ├── content.ts                # Reads all content/ via fs; exports typed getters
│   └── utils.ts                  # cn(), getRotationFromSlug()
│
├── types/
│   └── index.ts                  # Project, WritingPiece, all interfaces
│
├── public/
│   └── images/
│       └── projects/
│
├── next.config.ts                # No MDX plugin needed — content read via fs
├── tsconfig.json                 # Path aliases: @/components, @/lib, @/types
├── package.json
├── postcss.config.mjs
└── CLAUDE.md
```

**Key simplifications from v1:**
- `lib/projects.ts` + `lib/writing.ts` + `lib/mdx.ts` → single `lib/content.ts`
- `WorkProjects`, `SideProjects`, `AcademicProjects`, `HobbySection` → single `ProjectsSection.tsx`
- `ProjectCard`, `SideProjectCard`, `AcademicCard` → single `ProjectCard.tsx` with variant prop
- `StoryBeat.tsx` → inlined into `StoryFlow.tsx`
- `components/providers/` folder removed
- **No MDX routing plugin** in `next.config.ts` — content files are read with `fs` + `gray-matter` server-side; MDX body compiled with `next-mdx-remote/rsc` only on the article route

---

## 6. Component Inventory

### `app/layout.tsx`
Root layout. Loads fonts via `next/font`. Renders `GrainOverlay` and `MeshGradient` as fixed background layers (`z-0`, `pointer-events-none`). Renders `Nav` and `Footer` around `{children}`.

---

### `components/layout/Nav.tsx`
Sticky top nav. Links: name/logo (→ `/`), Written (→ `/written`).
After 80px scroll: adds `backdrop-blur-md` + `bg-[#FAF8F4]/80`.
Uses `"use client"` for scroll listener.

### `components/layout/Footer.tsx`
Single line: name · year · icon links (GitHub, email).
No client JS needed.

---

### `components/home/Hero.tsx`
- Owner name in Display size, DM Serif Display
- Tagline in Body large, Plus Jakarta Sans
- One absolute-positioned blurred warm shape behind text (Framer Motion, infinite breathe cycle)
- Scroll cue chevron at bottom
- **Props**: `name: string`, `tagline: string`

### `components/home/StoryFlow.tsx`
- Renders 3–5 story beats in a scroll-driven sequence
- **Core implementation** (Phase 1): Framer Motion `whileInView` per beat — each beat reveals as it enters viewport, stacked vertically
- **Enhanced implementation** (Phase 2, optional): Replace with GSAP ScrollTrigger pinned section
- **Props**: `beats: Array<{ label: string; headline: string; body: string; annotation?: string }>`
- **数据来源**: 故事节点为作者自身叙事，不走 MDX 内容系统。以静态常量定义在 `app/page.tsx` 顶部，需要修改时直接编辑该文件。示例：
  ```ts
  const storyBeats = [
    { label: "起点", headline: "...", body: "...", annotation: "2019" },
    ...
  ]
  ```

### `components/home/ProjectsSection.tsx`
- Renders all four project categories in vertical sequence: Work → Side → Academic → Hobby
- Each category has a `SectionLabel`, a card grid, and a `ScrollReveal` wrapper
- Handles empty categories gracefully (hides section if no items)
- **Props**: `work: Project[]`, `side: Project[]`, `academic: Project[]`, `hobby: Project[]`

### `components/home/ProjectCard.tsx`
Single card component for all project types. Visual weight controlled by `variant` prop.

- **Props**:
  ```ts
  project: WorkProject | SideProject | AcademicProject | HobbyItem  // 联合类型
  variant: "work" | "side" | "academic" | "hobby"
  rotationDeg: number   // pre-computed from getRotationFromSlug() in ProjectsSection
  ```
- **类型策略**: `types/index.ts` 定义四个独立 interface，各自包含专属字段；`ProjectCard` 通过 `variant` prop 做类型收窄（type narrowing），每个分支只访问对应 interface 的字段，不使用宽接口 + 全部可选字段的方式。
- `work`: full card with cover image, title, summary, tags, year, company
- `side`: compact card with icon/emoji, title, one-liner, optional link
- `academic`: row-style, title + institution + year + tags
- `hobby`: light card, title + category tag + optional image
- All variants share the **Card Base Style** from Section 4

---

### `components/writing/WritingList.tsx`
Sorted list of `WritingCard` components. Groups by year with year headers.
**Props**: `pieces: WritingPiece[]`

### `components/writing/WritingCard.tsx`
Title, date, excerpt, reading time, tags.
Hover: title underlines, subtle background tint.
**Props**: `piece: WritingPiece`

### `components/writing/ArticleLayout.tsx`
- Article page wrapper
- Header: title (H1, DM Serif), date, reading time, tags
- Body: constrained to `65ch`, custom MDX components
- Includes `ReadingProgress`
- **Props**: `frontmatter: WritingFrontmatter`, `children: React.ReactNode`

### `components/writing/MDXComponents.tsx`
Custom element map passed to `next-mdx-remote`:
- `h2`, `h3`: DM Serif Display
- `blockquote`: terracotta left border, italic
- `a`: animated underline on hover
- `code` (inline): Geist Mono, warm bg pill
- `pre`: syntax-highlighted block via `rehype-pretty-code`

---

### `components/ui/GrainOverlay.tsx`
Fixed full-viewport SVG. `<feTurbulence>` filter on a `<rect>`.
`opacity: 0.04`, `mix-blend-mode: multiply`, `pointer-events-none`, `z-50`.
**Props**: none (opacity hardcoded to design spec)

### `components/ui/MeshGradient.tsx`
Fixed full-viewport `div`. Multi-stop radial gradient in warm tones (sand, cream, light terracotta).
CSS `@keyframes meshShift`: shifts gradient position over 20s, `alternate`, `ease-in-out`.
Degrades to static gradient if `prefers-reduced-motion`.

### `components/ui/ScrollReveal.tsx`
Framer Motion wrapper. `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`.
`viewport={{ once: true, margin: "-80px" }}`.
**Props**: `children`, `delay?: number`, `className?: string`
Respects `useReducedMotion()` — skips animation if set.

### `components/ui/SectionLabel.tsx`
`— Label` in Geist Mono, uppercase, small, `color-text-secondary`.
**Props**: `children: React.ReactNode`

### `components/ui/Tag.tsx`
Rounded pill. `variant="accent"` uses `color-accent` tinted bg; `variant="muted"` uses `color-border`.
**Props**: `children`, `variant?: "accent" | "muted"`

### `components/ui/ReadingProgress.tsx`
Fixed 2px line at top of viewport. `position: fixed; top: 0; left: 0; right: 0`.
Framer Motion `useScroll` on article container → `scaleX` on the bar. `transformOrigin: "left"`.
`color-accent` fill. Only rendered inside `ArticleLayout`.

---

## 7. Content System

### Single rule
Content is read **server-side** via Node.js `fs` in `lib/content.ts`.
No Next.js MDX plugin in `next.config.ts`.
MDX body is compiled only when rendering a full article page (`next-mdx-remote/rsc`).

### `lib/content.ts` exports

```ts
// Projects — frontmatter only (no body compilation)
getWorkProjects(): WorkProject[]
getSideProjects(): SideProject[]
getAcademicProjects(): AcademicProject[]
getHobbyItems(): HobbyItem[]

// Writing — frontmatter + computed fields
getAllWriting(): WritingPiece[]          // sorted by date desc, drafts excluded in prod
getWritingBySlug(slug: string): { frontmatter, source }   // compiles MDX body
```

All functions are synchronous except `getWritingBySlug` (async, awaits MDX compile).

### `lib/utils.ts` exports

```ts
cn(...classes): string                     // clsx + tailwind-merge
getRotationFromSlug(slug: string): number  // deterministic ±2 (work) or ±1 (side/other)
```

> `readingTime` 不在 utils 中实现——直接使用 `reading-time` npm 包，在 `lib/content.ts` 的 `getAllWriting()` 里调用。

### Frontmatter Schemas

**slug 策略**: `slug` 完全从文件名派生（`lib/content.ts` 在读取时自动去掉 `.mdx` 后缀），frontmatter 中不声明 `slug` 字段，避免文件名与 frontmatter 值不一致。

**All project types** share a base set of fields:

```yaml
title: string        # Display name
year: number
tags: string[]
summary: string      # 1–2 sentences, shown on card
order: number        # Sort order within category (lower = first)
```

**Work** adds: `company`, `role`, `coverImage`, `status: "shipped"|"ongoing"|"discontinued"`
**Side** adds: `icon` (emoji or path), `url?`, `github?`
**Academic** adds: `institution`, `context`, `pdfUrl?`
**Hobby** adds: `category`, `image?`

**Writing:**
```yaml
title: string
date: string         # ISO 8601
tags: string[]
excerpt: string      # Shown on card + OG description
status: "published" | "draft"
coverImage?: string  # OG image
```

---

## 8. Animation Plan

Animations are split into two tiers.

### Tier 1 — Core (implement in Phase 1)

| Animation | Component | How |
|---|---|---|
| Paper grain texture | `GrainOverlay` | SVG filter, static, CSS only |
| Warm gradient drift | `MeshGradient` | CSS `@keyframes`, 20s loop |
| Hero bg shape breathe | `Hero` | Framer Motion `animate` keyframes, infinite, 10s |
| Scroll reveals | `ScrollReveal` | Framer Motion `whileInView`, once |
| Card rotation + hover | `ProjectCard` | Deterministic seed → inline `transform`. Hover via CSS transition |
| Reading progress | `ReadingProgress` | Framer Motion `useScroll` → `scaleX` |
| Nav blur on scroll | `Nav` | CSS class toggle on scroll event |

### Tier 2 — Enhanced (implement in Phase 2, optional)

| Animation | Component | How |
|---|---|---|
| StoryFlow pinned scroll | `StoryFlow` | Replace Framer Motion beats with GSAP ScrollTrigger pinned section |
| Page transitions | Root layout | Framer Motion `AnimatePresence` on route changes |
| Card stagger | `ProjectsSection` | Stagger delay per card on section entry |

### `prefers-reduced-motion` policy
- All Framer Motion components: check `useReducedMotion()`, skip initial→animate if true
- CSS keyframes: wrap in `@media (prefers-reduced-motion: no-preference)`
- GSAP (if used): degrade to non-pinned stacked layout

---

## 9. Implementation Phases

### Phase 0 — Initialize
1. `npx create-next-app@latest . --typescript --app --tailwind --src-dir=false --import-alias="@/*"`
2. 删除生成的 `tailwind.config.js`（Tailwind v4 不使用此文件，配置改为 `globals.css` `@theme` block）
3. Install dependencies (see Section 10)
4. `tsconfig.json`: add path aliases `@/components`, `@/lib`, `@/types`
5. `next.config.ts`: minimal config, **no MDX plugin**
6. `postcss.config.mjs`: Tailwind v4 PostCSS setup
7. 创建 `CLAUDE.md`，记录：技术栈、设计 token 位置、内容扩展规则、禁止 hardcode 颜色/字体
8. Verify `npm run dev` starts

### Phase 1 — Design System
1. Write all tokens in `app/globals.css` `@theme` block
2. Configure fonts in `app/layout.tsx`：`next/font/google` 加载 DM Serif Display + Plus Jakarta Sans；`geist` 包加载 Geist Mono
3. Build `GrainOverlay`
4. Build `MeshGradient`
5. Build `Nav` and `Footer`
6. Build `ScrollReveal`, `SectionLabel`, `Tag`
7. **Checkpoint**: empty page should show grain, warm gradient, correct fonts

### Phase 2 — Content System
1. Write `types/index.ts`: all interfaces
2. Write `lib/content.ts`: all getters using `fs` + `gray-matter`
3. Write `lib/utils.ts`: `cn`, `getRotationFromSlug`, `readingTime`
4. Add stub `.mdx` files to all `content/` subdirectories
5. **Checkpoint**: all getters return correctly typed data

### Phase 3 — Homepage
1. Build `Hero` (name + tagline + breathing bg shape)
2. Build `StoryFlow` — Tier 1 version (Framer Motion `whileInView` per beat)
3. Build `ProjectCard` with all four variants
4. Build `ProjectsSection` (all categories, rotation seeding, empty-state handling)
5. Wire `app/page.tsx`: call all content getters, pass to components
6. Wrap sections in `ScrollReveal`
7. **Checkpoint**: full homepage renders with real data
8. Responsive pass: mobile layout

### Phase 4 — Writing System
1. Build `WritingCard` and `WritingList`
2. Build `app/written/page.tsx`
3. Build `ReadingProgress`
4. Build `MDXComponents`
5. Build `ArticleLayout`
6. Build `app/written/[slug]/page.tsx` with `generateStaticParams`
7. **Checkpoint**: all writing routes work with stub content

### Phase 5 — Polish & Accessibility
1. `app/not-found.tsx`
2. OpenGraph metadata on all pages; `generateMetadata` for articles
3. Visible focus styles on all interactive elements
4. Color contrast audit (WCAG AA)
5. Keyboard navigation test
6. Lighthouse audit — address LCP, CLS

### Phase 6 — Enhanced Animations (optional)
1. Upgrade `StoryFlow` to GSAP ScrollTrigger pinned version
2. Add Framer Motion `AnimatePresence` page transitions
3. Add card stagger delay in `ProjectsSection`

### Phase 7 — Content & Deploy
1. Replace stub MDX files with real content
2. Add real project images
3. Deploy to Vercel
4. Smoke test all routes in production

---

## 10. Dependencies

### Required

| Package | Why |
|---|---|
| `next@^15` | Framework |
| `react@^19`, `react-dom@^19` | UI runtime |
| `typescript@^5` | Type safety |
| `tailwindcss@^4`, `@tailwindcss/postcss`, `postcss` | Styling |
| `framer-motion@^11` | All Tier 1 animations |
| `next-mdx-remote@^5` | Server-side MDX compilation for article pages |
| `gray-matter@^4` | Frontmatter parsing for all content files |
| `geist@^1` | Geist Mono，内置 `next/font` 集成；DM Serif Display + Plus Jakarta Sans 通过 `next/font/google` 加载，无需额外包 |
| `clsx@^2`, `tailwind-merge@^2` | `cn()` utility |
| `rehype-pretty-code@^0.13`, `shiki@^1` | Code block syntax highlighting in articles |

### Optional (Phase 6)

| Package | Why |
|---|---|
| `gsap@^3.12` | StoryFlow pinned scroll enhancement |

### Dev Only

| Package | Why |
|---|---|
| `@types/react@^19`, `@types/react-dom@^19`, `@types/node@^20` | TypeScript types |
| `eslint`, `eslint-config-next` | Linting |

---

*End of PLAN-layout.md v2*
