# Handoff — Phase 2 → Phase 3

> Date: 2026-03-16

---

## 状态

Phase 1 + Phase 2 已完成，build 通过，TypeScript 零报错。

---

## Phase 2 交付内容

| 文件 | 说明 |
|---|---|
| `types/index.ts` | 5 个 interface：WorkProject / SideProject / AcademicProject / HobbyItem / WritingPiece |
| `lib/content.ts` | 全部 getter：`getWorkProjects` `getSideProjects` `getAcademicProjects` `getHobbyItems` `getAllWriting` `getWritingBySlug` |
| `lib/utils.ts` | `cn()` + `getRotationFromSlug(slug, variant)` |
| `content/projects/work/example-work.mdx` | stub，待替换为真实内容 |
| `content/projects/side/example-side.mdx` | stub |
| `content/projects/academic/example-academic.mdx` | stub |
| `content/projects/hobby/example-hobby.mdx` | stub |
| `content/writing/example-post.mdx` | stub，status: published |

---

## 关键约定（执行 Phase 3 时必须遵守）

**slug 来自文件名，frontmatter 中不写 slug 字段。**
`lib/content.ts` 自动从 `.mdx` 文件名派生 slug。写错会导致路由失效。

**ProjectCard 用 variant 收窄类型，不用宽接口。**
```tsx
// ✅ 正确
if (variant === "work") { const p = project as WorkProject; ... }

// ❌ 禁止
interface AnyProject { title: string; company?: string; icon?: string; ... }
```

**颜色 / 字体不 hardcode。** 一律用 `var(--color-*)` 或 Tailwind token 类。

**getRotationFromSlug 签名**
```ts
getRotationFromSlug(slug: string, variant: "work" | "side" | "academic" | "hobby")
// work → ±2deg，其余 → ±1deg
```

---

## Phase 3 任务清单

> 参考 `docs/PLAN-layout.md` Section 9 — Phase 3

### 3.1 Hero (`components/home/Hero.tsx`)
- Props: `name: string`, `tagline: string`
- Display 字体 (font-serif)，tagline 用 font-sans body-large
- 一个绝对定位的模糊暖色 shape，Framer Motion 无限 breathe 动画（10s cycle）
- 底部 scroll cue chevron（无障碍：aria-hidden）

### 3.2 StoryFlow (`components/home/StoryFlow.tsx`) — Tier 1
- Props: `beats: Array<{ label: string; headline: string; body: string; annotation?: string }>`
- Framer Motion `whileInView` per beat，竖向堆叠
- 数据以静态常量定义在 `app/page.tsx` 顶部，不走内容系统
- Phase 6 可选升级为 GSAP ScrollTrigger

### 3.3 ProjectCard (`components/home/ProjectCard.tsx`)
- Props:
  ```ts
  project: WorkProject | SideProject | AcademicProject | HobbyItem
  variant: "work" | "side" | "academic" | "hobby"
  rotationDeg: number
  ```
- `work`：封面图 + title + summary + tags + year + company
- `side`：icon/emoji + title + one-liner + 可选链接
- `academic`：行式，title + institution + year + tags
- `hobby`：轻卡，title + category tag + 可选图
- 所有 variant 共用 Card Base Style（见 PLAN Section 4）
- hover：`translateY(-4px)` + shadow-card-hover，CSS transition

### 3.4 ProjectsSection (`components/home/ProjectsSection.tsx`)
- Props: `work`, `side`, `academic`, `hobby`（各自数组）
- 顺序：Work → Side → Academic → Hobby
- 每类：SectionLabel + card grid + ScrollReveal wrapper
- 空数组时隐藏整个 section
- 在此处调用 `getRotationFromSlug(project.slug, variant)` 传给 ProjectCard

### 3.5 app/page.tsx（完整首页）
- 调用全部 content getter（server component，直接 import）
- 定义 `storyBeats` 静态常量（见下方示例）
- 组装 Hero + StoryFlow + ProjectsSection
- 每个 section 用 ScrollReveal 包裹

```ts
// app/page.tsx 顶部
const storyBeats = [
  { label: "起点", headline: "...", body: "...", annotation: "2019" },
  { label: "转折", headline: "...", body: "...", annotation: "2021" },
  { label: "现在", headline: "...", body: "..." },
]
```

### 3.6 响应式
- 移动端：单列 card grid，section padding 缩小
- Nav 在移动端保持可用（目前只有两个链接，不需要汉堡菜单）

### 3.7 Checkpoint
- 完整首页渲染真实数据（stub 内容）
- 移动端 layout 正常
- `npm run build` 通过

---

## 可以复用的已有组件

| 组件 | 用法 |
|---|---|
| `ScrollReveal` | 包裹每个 section，`delay` prop 做轻微错开 |
| `SectionLabel` | 每个项目分类的 `— Work` 标签 |
| `Tag` | ProjectCard 内的 tag pill，variant="muted" 为主，accent 可高亮 |

---

## 注意事项

- `app/page.tsx` 是 **Server Component**，可直接 import 并调用 `lib/content.ts` 的 getter，无需 `useEffect` 或 API route。
- `ProjectCard` 和 `ProjectsSection` 如果不需要浏览器 API，保持 Server Component；如需 hover 状态动画用 Framer Motion 则需 `"use client"`。
- stub content 文件用完记得换成真实内容（Phase 7）。
