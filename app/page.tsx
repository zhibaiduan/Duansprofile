import {
  getWorkProjects,
  getSideProjects,
  getAcademicProjects,
  getHobbyItems,
} from "@/lib/content";
import Hero from "@/components/home/Hero";
import StoryFlow from "@/components/home/StoryFlow";
import ProjectsSection from "@/components/home/ProjectsSection";

const storyBeats = [
  {
    label: "起点",
    headline: "从设计到代码的第一步",
    body: "最初学习设计，发现仅靠视觉无法完整表达想法——于是拿起键盘，开始把原型变成真实运行的产品。",
    annotation: "2019",
  },
  {
    label: "转折",
    headline: "在真实项目里理解复杂度",
    body: "加入团队后，开始面对真正的工程挑战：性能、协作、可维护性。从独立开发者成长为懂得权衡取舍的人。",
    annotation: "2021",
  },
  {
    label: "现在",
    headline: "构建有温度的数字产品",
    body: "我关注体验细节，也关注系统全局。喜欢让复杂的事情看起来简单，让简单的交互充满质感。",
  },
];

export default async function Home() {
  const [work, side, academic, hobby] = await Promise.all([
    getWorkProjects(),
    getSideProjects(),
    getAcademicProjects(),
    getHobbyItems(),
  ]);

  return (
    <main className="relative z-10 min-h-screen pt-16">
      <Hero
        name="Duan"
        tagline="Designer-turned-engineer. I build things that are precise, warm, and quietly delightful."
      />
      <StoryFlow beats={storyBeats} />
      <ProjectsSection
        work={work}
        side={side}
        academic={academic}
        hobby={hobby}
      />
    </main>
  );
}
