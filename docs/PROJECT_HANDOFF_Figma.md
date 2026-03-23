# Xiaoyan Duan Portfolio - 项目交接文档

## 📋 项目概述

这是一个为 Xiaoyan Duan 设计师打造的个人作品集网站，展示她的专业经历、项目案例和学术背景。

### 设计理念
- **视觉风格**: 温暖、现代、具有设计师气质
- **色彩系统**: 米色背景 + 锈橙色强调色，营造温暖专业的氛围
- **交互体验**: 流畅的动画、3D 效果、悬停反馈，体现设计细节

---

## 🎨 设计系统

### 颜色规范
```css
/* 主要颜色 */
--bg-primary: #faf8f4;      /* 米色背景 */
--bg-secondary: #f5f1ea;    /* 次要背景 */
--accent-rust: #c07a56;     /* 锈橙色强调 */
--accent-gold: #f59e0b;     /* 金色辅助 */

/* 文字颜色 */
--text-primary: #1c1917;    /* 主标题 */
--text-secondary: #78716c;  /* 正文 */
--text-tertiary: #57534e;   /* 次要文字 */
--border-color: #e8e0d5;    /* 边框 */
```

### 字体系统
```css
/* 三种字体组合 */
1. DM Serif Display - 大标题、数字统计（衬线体，优雅）
2. Plus Jakarta Sans - 正文、卡片内容（无衬线，易读）
3. Geist Mono - 标签、时间、小文字（等宽，技术感）
```

### 视觉效果
- **光晕装饰**: 使用 `bg-[#c07a56]/8` 配合 `blur-[120px]` 创建柔和光晕
- **磨砂纹理**: SVG noise filter 叠加，增加质感
- **玻璃态**: `backdrop-blur-md` + 半透明背景
- **阴影系统**: 多层次阴影增强立体感

---

## 🏗️ 技术栈

### 核心技术
- **React 18** - 组件化开发
- **TypeScript** - 类型安全
- **Tailwind CSS v4** - 实用优先的样式
- **Motion (Framer Motion)** - 动画库
- **Lucide React** - 图标库

### 关键特性
- ✅ 响应式设计（移动端 → 桌面端）
- ✅ 平滑滚动导航
- ✅ 智能视口检测（IntersectionObserver）
- ✅ 3D 变换动画
- ✅ 性能优化（懒加载、视口动画）

---

## 📁 项目结构

```
src/
├── app/
│   ├── App.tsx                      # 主入口
│   ├── components/
│   │   ├── Hero.tsx                 # 顶部 Hero 区域（3D 照片 + 简介）
│   │   ├── Journey.tsx              # 职业时间线（带高亮）
│   │   ├── WorkingCases.tsx         # 工作案例（主要项目）
│   │   ├── SideProjects.tsx         # 个人项目（2个，横向布局）
│   │   ├── AcademicProjects.tsx     # 学术项目（3个，横向布局）
│   │   ├── OutsideWork.tsx          # 业余爱好（网格布局）
│   │   ├── Contact.tsx              # 联系方式
│   │   ├── ProjectCard.tsx          # 项目卡片（复用组件）
│   │   ├── SectionNav.tsx           # 右侧导航栏
│   │   ├── CursorGlow.tsx           # 鼠标光晕跟随
│   │   ├── Stickers.tsx             # 装饰贴纸组件
│   │   └── figma/
│   │       └── ImageWithFallback.tsx # 图片回退组件
│   └── styles/
│       ├── theme.css                # 主题变量
│       ├── fonts.css                # 字体引入
│       └── global.css               # 全局样式
└── imports/                          # Figma 导入资源
```

---

## 🎬 动效实现详解

### 1. Hero 区域 - 3D 照片悬停
**文件**: `/src/app/components/Hero.tsx`

**效果描述**:
- 鼠标悬停时照片进行 3D 旋转（rotateY: -8deg, rotateX: 5deg）
- 多层光晕渐显
- 周围贴纸联动旋转
- 照片底部文字变色 + 透明度变化

**关键代码**:
```tsx
// 3D 容器
<div style={{ perspective: "1200px" }}>
  <motion.div
    animate={isHovered ? {
      rotateY: -8,
      rotateX: 5,
      scale: 1.08,
      z: 50
    } : {}}
    style={{ transformStyle: "preserve-3d" }}
  />
</div>
```

**注意事项**:
- ⚠️ 颜色动画使用 `style` 属性，避免 oklab 格式问题
- ✅ 使用 `onHoverStart/End` 控制状态

### 2. 项目卡片悬停动画
**文件**: `/src/app/components/ProjectCard.tsx`

**效果描述**:
- 卡片上浮 (`y: -6`) + 缩放 (`scale: 1.02`)
- 预览区域渐变叠加
- 标签弹跳动画（stagger）
- 箭头图标旋转 45°

**关键代码**:
```tsx
<motion.div
  whileHover={{
    rotate: 0,      // 重置旋转（卡片本身可能有初始旋转）
    y: -6,
    scale: 1.02,
  }}
  transition={{ type: "spring", stiffness: 300 }}
/>
```

**注意事项**:
- ⚠️ 已移除颜色动画，使用 CSS 过渡
- ✅ 标签使用 `delay: index * 0.02` 实现依次弹出

### 3. 时间线滚动动画
**文件**: `/src/app/components/Journey.tsx`

**效果描述**:
- 滚动进入视口时依次展示
- 高亮项目带脉冲动画
- 左右交替布局

**关键代码**:
```tsx
// 脉冲效果
<motion.div
  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="absolute inset-0 w-3 h-3 rounded-full bg-[#c07a56]"
/>
```

### 4. 右侧导航栏
**文件**: `/src/app/components/SectionNav.tsx`

**效果描述**:
- 固定在右侧中央
- 自动检测当前区域
- 圆点缩放 + 外圈光晕

**关键代码**:
```tsx
<motion.div
  layoutId="activeSection"  // 共享布局动画
  className="absolute inset-0 w-2 h-2 rounded-full bg-[#c07a56]/20"
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>
```

### 5. 鼠标光晕跟随
**文件**: `/src/app/components/CursorGlow.tsx`

**效果描述**:
- 跟随鼠标移动的柔和光晕
- 使用 `useMotionValue` 实现平滑跟踪

**关键代码**:
```tsx
const x = useMotionValue(0);
const y = useMotionValue(0);

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };
  window.addEventListener("mousemove", handleMouseMove);
}, []);
```

---

## 📦 组件清单

### 核心组件
| 组件名 | 路径 | 功能 | 关键属性 |
|--------|------|------|----------|
| **Hero** | `/src/app/components/Hero.tsx` | 首屏展示 | 3D 照片、个人简介、统计数据 |
| **Journey** | `/src/app/components/Journey.tsx` | 职业时间线 | 左右交替、高亮动画 |
| **WorkingCases** | `/src/app/components/WorkingCases.tsx` | 工作项目 | 响应式网格 |
| **SideProjects** | `/src/app/components/SideProjects.tsx` | 个人项目 | 2列布局 |
| **AcademicProjects** | `/src/app/components/AcademicProjects.tsx` | 学术项目 | 3列布局 |
| **ProjectCard** | `/src/app/components/ProjectCard.tsx` | 项目卡片 | 复用组件，支持自定义 |
| **SectionNav** | `/src/app/components/SectionNav.tsx` | 右侧导航 | 自动检测当前区域 |
| **CursorGlow** | `/src/app/components/CursorGlow.tsx` | 鼠标光晕 | 全局效果 |

### 工具组件
| 组件名 | 路径 | 功能 |
|--------|------|------|
| **Stickers** | `/src/app/components/Stickers.tsx` | 装饰贴纸（星星、爱心、箭头、下划线）|
| **ImageWithFallback** | `/src/app/components/figma/ImageWithFallback.tsx` | 图片加载失败回退 |

---

## 🎨 布局规范

### 响应式断点
```css
/* 移动端 */
< 768px:  单列布局

/* 平板 */
768px - 1024px:  
- Side Projects: 2列
- Academic Projects: 2列

/* 桌面端 */
> 1024px:  
- Side Projects: 2列横向
- Academic Projects: 3列横向
- Working Cases: 响应式网格（最多2-3列）
```

### 间距系统
```css
section padding: py-24 px-6
卡片间距: gap-8
内容最大宽度: max-w-7xl
```

---

## ⚠️ 已知注意事项

### 1. 颜色动画问题
**问题**: Tailwind v4 默认输出 oklab 格式，Motion 无法动画化

**解决方案**:
```tsx
// ❌ 错误：直接动画颜色
<motion.div animate={{ color: "#c07a56" }} />

// ✅ 正确：使用 style 属性
<motion.div 
  style={{ color: isHovered ? "#c07a56" : "#78716c" }}
  animate={{ opacity: 1 }}
/>
```

### 2. 图片导入
**Figma 资源导入**:
```tsx
// Raster 图片（PNG/JPG）
import imgXiaoyanDuan from "figma:asset/e0f9ed3a...png";

// SVG 文件
import svgPaths from "../imports/svg-wg56ef214f";
```

### 3. 字体加载
所有字体引入都在 `/src/styles/fonts.css`：
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

### 4. 保护文件
**不要修改以下系统文件**:
- `/src/app/components/figma/ImageWithFallback.tsx`
- `/pnpm-lock.yaml`

---

## 🚀 开发指南

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

---

## 📝 内容更新指南

### 添加新项目
1. 找到对应组件（`WorkingCases.tsx` / `SideProjects.tsx` / `AcademicProjects.tsx`）
2. 在 `projects` 数组中添加新对象：
```tsx
{
  company: "公司名称",
  year: "2024",
  title: "项目标题",
  description: "项目描述...",
  tags: [
    { label: "标签1", color: "blue" },
    { label: "标签2", color: "green" }
  ],
  metric: "项目成果",
  link: "https://..."  // 可选
}
```

### 修改时间线
编辑 `/src/app/components/Journey.tsx` 中的 `timelineData` 数组：
```tsx
{
  period: "2020-2023",
  title: "职位名称",
  company: "公司名称",
  description: "工作描述",
  highlight: true  // 是否高亮
}
```

### 更新个人信息
编辑 `/src/app/components/Hero.tsx`：
- 修改姓名（第199-209行）
- 修改简介段落（第218-230行）
- 修改统计数据（第236-250行）

---

## 🎯 设计亮点总结

1. **3D 照片交互** - 悬停时真实感的 3D 旋转 + 多层光晕
2. **渐进式动画** - 滚动进入视口时依次展示内容
3. **智能导航** - 右侧导航自动跟踪当前区域
4. **微动效** - 标签弹跳、图标旋转、卡片上浮
5. **质感细节** - 磨砂纹理、玻璃态、多层阴影
6. **响应式布局** - 完美适配移动端到桌面端

---

## 📞 交接检查清单

- [ ] 代码运行正常（`pnpm dev`）
- [ ] 所有动画效果正常
- [ ] 响应式布局在各尺寸下正常
- [ ] 图片资源加载正常
- [ ] 字体显示正确
- [ ] 右侧导航定位准确
- [ ] 项目卡片悬停效果正常
- [ ] 3D 照片动画流畅
- [ ] 颜色无动画错误
- [ ] 生产构建成功（`pnpm build`）

---

**交接日期**: 2026年3月18日  
**项目状态**: ✅ 已完成，可直接部署  
**维护建议**: 定期更新项目内容，保持设计一致性
