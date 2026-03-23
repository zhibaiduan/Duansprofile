# 快速上手指南

## 🎯 给 Claude Code 的简明说明

### 项目本质
这是一个**单页应用（SPA）作品集网站**，使用 React + TypeScript + Tailwind CSS + Motion 构建。

---

## ⚡ 5分钟快速理解

### 1. 视觉风格
```
米色背景（#faf8f4）+ 锈橙色强调（#c07a56）
三种字体：DM Serif Display（标题）/ Plus Jakarta Sans（正文）/ Geist Mono（标签）
质感：磨砂纹理 + 光晕 + 玻璃态 + 3D 效果
```

### 2. 核心技术
```bash
React 18 + TypeScript
Tailwind CSS v4  # 注意：输出 oklab 颜色格式
Motion (Framer Motion)  # 动画库
```

### 3. 页面结构
```
┌─────────────────────────┐
│ Hero（3D 照片 + 简介）    │  ← 首屏
├─────────────────────────┤
│ My Journey（时间线）      │  ← 职业经历
├─────────────────────────┤
│ Working Cases（工作项目） │  ← 主要案例
├─────��───────────────────┤
│ Side Projects（2个）      │  ← 个人项目（横向）
├─────────────────────────┤
│ Academic Projects（3个）  │  ← 学术项目（横向）
├─────────────────────────┤
│ Outside of Work（爱好）   │  ← 业余生活
├─────────────────────────┤
│ Contact（联系方式）        │  ← 底部
└─────────────────────────┘
      右侧导航栏（固定）→ ●
```

---

## 🔑 关键文件速查

### 必看文件（按优先级）
1. **`/src/app/App.tsx`** - 主入口，理解整体结构
2. **`/src/app/components/Hero.tsx`** - 3D 照片动画的核心
3. **`/src/app/components/ProjectCard.tsx`** - 复用的项目卡片组件
4. **`/src/styles/theme.css`** - 设计系统变量

### 动画相关
- **`/src/app/components/CursorGlow.tsx`** - 鼠标光晕跟随
- **`/src/app/components/SectionNav.tsx`** - 右侧智能导航
- **`/src/app/components/Stickers.tsx`** - 装饰贴纸

### 内容模块
- **`/src/app/components/Journey.tsx`** - 时间线
- **`/src/app/components/WorkingCases.tsx`** - 工作项目
- **`/src/app/components/SideProjects.tsx`** - 个人项目（2个横向）
- **`/src/app/components/AcademicProjects.tsx`** - 学术项目（3个横向）

---

## 🎬 动效实现原理

### 1. 3D 照片悬停（Hero）
```tsx
// 原理：perspective + rotateY/X
<div style={{ perspective: "1200px" }}>
  <motion.div
    animate={isHovered ? {
      rotateY: -8,    // Y轴旋转
      rotateX: 5,     // X轴旋转
      scale: 1.08,    // 放大
      z: 50           // Z轴偏移
    } : {}}
    style={{ transformStyle: "preserve-3d" }}
  />
</div>
```

### 2. 卡片悬停（ProjectCard）
```tsx
// 原理：whileHover + spring 动画
<motion.div
  whileHover={{
    y: -6,           // 上浮
    scale: 1.02,     // 微缩放
    rotate: 0        // 重置旋转
  }}
  transition={{ 
    type: "spring",   // 弹簧动画
    stiffness: 300    // 弹性强度
  }}
/>
```

### 3. 滚动进入动画（所有 section）
```tsx
// 原理：useInView + viewport 检测
const isInView = useInView(ref, { once: true });

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
/>
```

### 4. 右侧导航（SectionNav）
```tsx
// 原理：layoutId 共享布局动画
<motion.div
  layoutId="activeSection"  // 同一 ID 会自动过渡
  transition={{ type: "spring" }}
/>
```

---

## ⚠️ 必知的坑

### 1. 颜色动画问题
```tsx
// ❌ 错误：Tailwind v4 输出 oklab，Motion 无法动画
<motion.div animate={{ color: "#c07a56" }} />

// ✅ 正确：用 style 设置颜色，只动画透明度
<motion.div 
  style={{ color: isHovered ? "#c07a56" : "#78716c" }}
  animate={{ opacity: 1 }}
/>
```

### 2. 图片导入方式
```tsx
// Figma 导入的图片（特殊语法）
import imgXiaoyanDuan from "figma:asset/xxx.png";  // 不要加路径！

// SVG 文件
import svgPaths from "../imports/svg-xxx";
```

### 3. 字体引入位置
```css
/* 所有字体必须在这里引入 */
/src/styles/fonts.css
```

---

## 📝 常见修改任务

### 任务1：修改个人信息
**文件**: `/src/app/components/Hero.tsx`

```tsx
// 第 199-209 行：修改姓名
<h1>
  <span>Xiaoyan</span>
  <span>Duan.</span>
</h1>

// 第 218-230 行：修改简介段落
<p>I spent 6 years...</p>

// 第 236-250 行：修改统计数据
<div>
  <div>6+</div>
  <div>Years</div>
</div>
```

### 任务2：添加新项目
**文件**: `/src/app/components/SideProjects.tsx` 或 `AcademicProjects.tsx`

```tsx
// 在 projects 数组中添加
const projects = [
  {
    company: "公司名称",
    year: "2024",
    title: "项目标题",
    description: "项目描述，简短清晰...",
    tags: [
      { label: "UI/UX", color: "blue" },
      { label: "Prototyping", color: "purple" }
    ],
    metric: "项目成果或数据",  // 可选
    link: "https://..."        // 可选
  },
  // ... 其他项目
];
```

**标签颜色选项**:
- `blue` - 蓝色（适合技术类）
- `purple` - 紫色（适合设计类）
- `orange` - 橙色（适合产品类）
- `green` - 绿色（适合成果类）
- `default` - 灰色（默认）

### 任务3：修改时间线
**文件**: `/src/app/components/Journey.tsx`

```tsx
const timelineData = [
  {
    period: "2020-2023",
    title: "职位名称",
    company: "公司名称",
    description: "工作描述，突出核心职责和成果...",
    highlight: true  // 是否高亮（带脉冲动画）
  },
  // ... 其他条目
];
```

### 任务4：调整布局列数
**Side Projects**（当前：2列）  
**文件**: `/src/app/components/SideProjects.tsx`

```tsx
// 第 66 行：修改 grid-cols
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                      ↑ 改这里
```

**Academic Projects**（当前：3列）  
**文件**: `/src/app/components/AcademicProjects.tsx`

```tsx
// 第 88 行：修改 grid-cols
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                                     ↑ 改这里
```

---

## 🎨 设计 Token 速查

### 间距
```css
section 间距: py-24 px-6
卡片间距: gap-8
内容宽度: max-w-7xl
```

### 圆角
```css
卡片: rounded-2xl
标签: rounded-full
按钮: rounded-lg
```

### 阴影
```css
卡片默认: shadow-[0px_2px_8px_0px_rgba(28,25,23,0.08)]
卡片悬停: shadow-[0px_12px_40px_0px_rgba(28,25,23,0.12)]
```

### 光晕
```css
大光晕: w-[500px] h-[500px] bg-[#c07a56]/8 blur-[120px]
小光晕: w-[400px] h-[400px] bg-[#f59e0b]/6 blur-[100px]
```

---

## 🚀 命令速查

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 检查类型
pnpm type-check
```

---

## 💡 给 Claude Code 的提示

### 如果要修改动画
1. 先找到对应组件（参考上面的"关键文件速查"）
2. 搜索 `motion.` 找到 Motion 组件
3. 调整 `whileHover`、`animate`、`transition` 属性
4. ⚠️ 不要动画颜色，使用 `style` 属性

### 如果要修改样式
1. 优先使用 Tailwind 类名
2. 涉及变量的话，编辑 `/src/styles/theme.css`
3. 不要创建 `tailwind.config.js`（使用 Tailwind v4）

### 如果要添加新页面
1. 在 `/src/app/components/` 创建新组件
2. 在 `/src/app/App.tsx` 导入并添加到结构中
3. 在 `/src/app/components/SectionNav.tsx` 添加导航点

### 如果动画不流畅
1. 检查是否使用了 `type: "spring"`
2. 调整 `stiffness`（弹性）和 `damping`（阻尼）
3. 使用 `once: true` 避免重复触发

---

## 📞 问题排查

### 问题：颜色动画报错
**原因**: Tailwind v4 输出 oklab 格式  
**解决**: 使用 `style` 属性代替 `animate` 颜色

### 问题：图片加载失败
**检查**: 
1. 是否使用 `figma:asset/` 语法
2. 是否在路径前加了 `./` 或 `../`（应该去掉）

### 问题：字体不显示
**检查**: `/src/styles/fonts.css` 是否正确引入

### 问题：导航不跟踪
**检查**: section 的 `id` 是否与 `SectionNav.tsx` 中的配置一致

---

**最后更新**: 2026年3月18日  
**项目状态**: ✅ 可直接开发/部署
