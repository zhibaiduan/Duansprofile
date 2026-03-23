# 质感提升计划 · Todo

## 一、动效层面

- [x] 卡片进场 stagger — 同一 grid 内卡片按 index 加 delay，不同时弹出
- [x] Hero 入场动画 — 照片 → 名字 → Bio 整块，三段顺序浮现
- [x] 移动端菜单动画 — AnimatePresence slide-down，替换原来的瞬间出现
- [x] Working Cases 标题严格滚动触发 — amount 1.0 + margin -200px，首屏绝不出现

---

## 二、结构 / 信息层面

- [ ] **Work Card 占位符** — `🚧 Under Construction` 在最重要板块里显示，质感差。改为抽象几何图案、渐变色块或 company 首字母的 typographic placeholder
- [ ] **Timeline 僵尸状态** — `<Timeline />` 已注释，但 `ScrollUI` 仍追踪 `id="timeline"`，对应 dot 永远不激活。要么恢复 Timeline，要么从 ScrollUI 的 sections 数组里删掉这条
- [ ] **Section 标题缺少视觉层次** — 四个 section 标题字号相同、无装饰，主次不分。可加小 label badge（如 `01 · WORK`）或细线分隔符，给页面更强的节奏感

---

## 三、细节 / 交互层面

- [ ] **Nav 缺少当前 section 高亮** — ScrollUI 右侧 dots 能追踪 section，但顶部 nav 没有 active link 状态。当前 section 对应的 nav item 加 accent 色或下划线
- [ ] **ContactSection 没有直接 CTA 按钮** — 目前只有三个图标圆圈，缺一个显眼的「Send Email」主按钮，对 recruiter 阻力略高
- [ ] **PhilosophySection 太扁平** — 三句话水平排列，小屏换行会打乱布局，且整体分量太轻。考虑竖向布局，或为每条 principle 加简短 expand text

---

## 四、氛围 / 整体质感

- [ ] **页面底部渐变过渡硬切** — ProjectsSection（白底）与下方 `from-[#faf8f4] to-[#f5f1ea]` 渐变区衔接处有轻微颜色突变。在 ProjectsSection 底部加淡出 overlay，过渡更丝滑
- [ ] **ScrollUI right-dots layoutId bug** — active 点变化时 `layoutId="activeSection"` 的 shared layout animation 在快速滚动时可能闪烁。改为一直 render ring，用 opacity/scale 做动画，更稳定

---

## 五、代码洁净度

- [ ] **heroStats 空数组冗余** — `stats={heroStats}` 传的是 `[]`，`stats.length > 0` 永远不触发。如不使用，直接移除这个 prop 传递
