# CLAUDE.md — Duansblog

## 技术栈

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4（无 `tailwind.config.js`，所有配置在 `app/globals.css` `@theme` block）
- **Animations**: Framer Motion v11（Tier 1 核心动效）；GSAP v3（Phase 6 可选增强）
- **Content**: MDX + 本地 `content/` 目录，通过 `fs` + `gray-matter` 服务端读取
- **MDX 编译**: `next-mdx-remote/rsc`，仅在文章详情页（`app/written/[slug]/page.tsx`）使用；首页和列表页只读 frontmatter，不编译正文，避免不必要的服务端开销
- **字体**: `next/font/google`（DM Serif Display、Plus Jakarta Sans）+ `geist` 包（Geist Mono）

## 设计 Token 位置

所有设计 token（颜色、字体、间距、阴影、z-index）统一定义在：

```
app/globals.css  →  @theme { ... }
```

**禁止在组件中 hardcode 颜色或字体值。** 必须通过 CSS 变量（`var(--color-*)` 等）或 Tailwind token 引用。

### Tailwind v4 @source 扫描路径

`app/globals.css` 顶部需声明扫描路径，否则动态拼接的类名不会生成：

```css
@import "tailwindcss";
@source "../app/**/*.{ts,tsx}";
@source "../components/**/*.{ts,tsx}";
```

缺少 `@source` 会导致组件中使用的 Tailwind 类名在生产构建中丢失。

## 内容扩展规则

- 添加新项目 = 在 `content/projects/{work|side|academic|hobby}/` 新增一个 `.mdx` 文件
- 添加新文章 = 在 `content/writing/` 新增一个 `.mdx` 文件
- **无需修改任何其他文件**
- `slug` 完全从文件名派生（`lib/content.ts` 读取时自动去掉 `.mdx` 后缀）；**frontmatter 中禁止声明 `slug` 字段**，避免文件名与 frontmatter 值不一致导致路由错误

## 路径别名

| 别名 | 实际路径 |
|---|---|
| `@/*` | `./*` |
| `@/components/*` | `./components/*` |
| `@/lib/*` | `./lib/*` |
| `@/types/*` | `./types/*` |

## 关键约定

- `lib/content.ts` 是唯一读取 `content/` 的入口，不在组件中直接使用 `fs`
- 所有颜色为暖色系，不使用纯 `#000000`
- z-index 层级统一在 `app/globals.css` 的 `@theme` block 中以 token 维护（如 `--z-nav: 40`），组件只引用 token，不自行写数值；新增层级需同步更新 `docs/PLAN-layout.md` Section 4
- `ProjectCard` 通过 `variant` prop 做类型收窄，不使用宽接口 + 全部可选字段
- `readingTime` 使用 `reading-time` npm 包，在 `lib/content.ts` 中调用

---

## 设计与工程原则

### 1. 全局优先，局部兜底

新增颜色、字体、间距、动效参数时，**先看 `app/globals.css` @theme 里是否已有对应 token**，有则直接引用，不够用再新增全局 token，最后才在组件内局部定义。禁止绕过全局系统直接 hardcode。这样保证设计一致性，也让全局主题切换成为可能。

### 2. 可用性与可访问性是底线，不是加分项

- 交互元素（按钮、链接、表单）必须有足够的点击区域（移动端 ≥ 44px）
- 动效必须尊重 `prefers-reduced-motion`，已用 `useReducedMotion()` hook 处理
- 图片必须有 `alt` 文本；装饰性图形加 `aria-hidden`
- 颜色对比度符合 WCAG AA（正文文字对背景对比度 ≥ 4.5:1）
- 不依赖颜色作为唯一信息传达手段

### 3. 移动端与多设备响应是 production 标准，不是事后优化

每个新组件或布局**从 mobile-first 出发**：

- 默认写移动端样式，用 `sm:` / `md:` / `lg:` 逐步增强
- 禁止使用固定像素宽度布局（如 `width: 600px`）而不加响应式断点
- Grid/Flex 布局中**禁止用内联 `style` 强制列数**（如 `repeat(N, 1fr)`），必须配合 Tailwind 响应式类
- 固定定位的 nav/overlay 必须测试小屏是否会遮挡内容，加足够的 `px-` 和 `pt-` 保护区
- `cols=4` 这类网格在手机上应降为 `grid-cols-2`，视觉内容（图片/卡片）在移动端保持可读尺寸

### 4. 动效服务于内容，不增加认知负担

- 动画 delay 总时长不超过用户合理等待时间（入场动画链条 ≤ 3s）
- 使用 `whileInView` + `viewport={{ once: true }}` 避免重复触发
- 共享 layout 动画（`layoutId`）在快速交互时容易闪烁，优先用 `opacity`/`scale` 替代
- 模块级变量（如 `let heroPlayed`）可用于跨 re-render 的一次性动画标记

### 5. 组件设计：最小接口，明确收窄

- Props 接口只暴露实际使用的字段，不做"以防万一"的宽接口
- 有多种变体的组件用 `variant` 字符串联合类型 + 类型收窄，而非全部可选字段
- MDX 自定义组件的数据通过 props 传入，不在组件内部 fetch
- 删除未使用的 props 传递（如空数组 `stats={[]}`），保持调用侧干净
