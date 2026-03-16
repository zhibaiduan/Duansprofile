# Handoff — Phase 1 → Phase 2

> Date: 2026-03-16

---

## 状态

Phase 1 (Design System) **已完成**，build 通过，TypeScript 零报错。

---

## 已交付文件

| 文件 | 说明 |
|---|---|
| `app/globals.css` | `@theme` token 全集 + `@source` 扫描路径 + MeshGradient keyframes |
| `app/layout.tsx` | 字体挂载 + GrainOverlay / MeshGradient / Nav / Footer |
| `components/ui/GrainOverlay.tsx` | SVG feTurbulence grain，opacity 0.04，mix-blend-mode: multiply |
| `components/ui/MeshGradient.tsx` | 3 个 radial-gradient blob，20–25s CSS 动画，尊重 prefers-reduced-motion |
| `components/layout/Nav.tsx` | 固定顶栏，滚动 >80px 触发 backdrop-blur + bg-bg/80 |
| `components/layout/Footer.tsx` | 占位链接（GitHub / Email 待替换为真实地址） |
| `components/ui/ScrollReveal.tsx` | Framer Motion whileInView wrapper，尊重 useReducedMotion |
| `components/ui/SectionLabel.tsx` | `— Label` mono 标签 |
| `components/ui/Tag.tsx` | pill，variant: accent \| muted |
| `app/page.tsx` | Phase 1 占位页，Phase 3 时替换 |

---

## 关键决策记录

**字体变量链路**
```
next/font (运行时注入 CSS var) → @theme var() 引用 → Tailwind utility 类
--font-dm-serif  →  --font-serif  →  font-serif 类
--font-jakarta   →  --font-sans   →  font-sans 类
--font-geist-mono→  --font-mono   →  font-mono 类
```
`GeistMono` 来自 `geist/font/mono` 包，DM Serif Display / Plus Jakarta Sans 来自 `next/font/google`。

**Z-index 链路**
`@theme` 中定义 `--z-bg: 0` 等 → Tailwind 生成 `z-bg` / `z-content` / `z-nav` / `z-grain` 工具类 → 组件直接使用类名，不写裸数值。

**MeshGradient keyframes**
定义在 `globals.css` 的 `@media (prefers-reduced-motion: no-preference)` 块内，组件通过 inline `style={{ animation: "..." }}` 引用。若 prefers-reduced-motion 生效，keyframes 不存在，动画自动静止。

---

## Phase 2 任务清单

> 参考 `docs/PLAN-layout.md` Section 9 — Phase 2

1. **`types/index.ts`** — 定义四个独立 interface：
   - `WorkProject` (title, year, tags, summary, order, company, role, coverImage, status)
   - `SideProject` (title, year, tags, summary, order, icon, url?, github?)
   - `AcademicProject` (title, year, tags, summary, order, institution, context, pdfUrl?)
   - `HobbyItem` (title, year, tags, summary, order, category, image?)
   - `WritingPiece` (title, date, tags, excerpt, status, readingTime, slug, coverImage?)

2. **`lib/content.ts`** — 用 `fs` + `gray-matter` 读取 `content/`：
   - `getWorkProjects()` / `getSideProjects()` / `getAcademicProjects()` / `getHobbyItems()`
   - `getAllWriting()` — 用 `reading-time` 包计算阅读时间，生产环境过滤 draft
   - `getWritingBySlug(slug)` — async，用 `next-mdx-remote/rsc` 编译 MDX body
   - slug 从文件名派生，frontmatter 中不声明 slug 字段

3. **`lib/utils.ts`**：
   - `cn(...classes)` — clsx + tailwind-merge
   - `getRotationFromSlug(slug)` — work 返回 ±2，其余返回 ±1，结果确定性（同 slug 同值）

4. **stub `.mdx` 文件** — 在每个 `content/` 子目录各放至少一个占位文件，验证 getter 能正确返回。

5. **Checkpoint** — 所有 getter 返回正确类型数据，TypeScript 零报错。

---

## 待替换的占位内容

- `components/layout/Footer.tsx`：GitHub URL + Email 地址
- `app/layout.tsx` metadata：title / description
- `app/page.tsx`：Phase 3 时完全替换为真实首页

---

## 运行方式

```bash
npm run dev    # 开发服务器
npm run build  # 验证构建（Phase 2 结束后跑一次）
npx tsc --noEmit  # 仅类型检查
```
