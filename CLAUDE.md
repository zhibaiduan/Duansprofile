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
