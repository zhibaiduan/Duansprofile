import {
  getWorkProjects,
  getSideProjects,
  getAcademicProjects,
  getHobbyItems,
} from "@/lib/content";
import Hero from "@/components/home/Hero";
import Timeline from "@/components/home/Timeline";
import ProjectsSection from "@/components/home/ProjectsSection";
import ContactSection from "@/components/home/ContactSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import ScrollUI from "@/components/ui/ScrollUI";

const timelineNodes = [
  {
    dateRange: "2013–2017",
    title: "Materials Engineering",
    note: "Foundation in science and analytical thinking",
  },
  {
    dateRange: "2017–2021",
    title: "Build Several Products from Scratch",
    note: "From 0 to 1, learning by shipping",
  },
  {
    dateRange: "2021–2022",
    title: "Gap Year",
    note: "Reflection, exploration, and reset",
  },
  {
    dateRange: "2022–2024",
    title: "PM-Kingsoft",
    note: "Product management at scale",
  },
  {
    dateRange: "2024–2025",
    title: "Learning German from scratch",
    note: "New language, new challenges",
  },
  {
    dateRange: "2025–2026",
    title: "HTW",
    note: "Current chapter — deepening technical foundation",
    current: true,
  },
];

const heroBio: React.ReactNode[] = [
  <>
    I build products that turn complex workflows into{" "}
    <strong className="font-semibold text-text-primary">systems people actually use</strong>.
  </>,
  <>
    Over <strong className="font-semibold text-text-primary">6 years in China</strong>,
    I led <strong className="font-semibold text-text-primary">two enterprise tools end-to-end</strong>,
    drove a product <strong className="font-semibold text-text-primary">from beta to public release</strong> on a platform with{" "}
    <strong className="font-semibold text-text-primary">millions of users</strong>,
    and initiated <strong className="font-semibold text-text-primary">a low-code engine</strong> from scratch.
  </>,
  <>
    I&apos;m drawn to problems that sit at the intersection of{" "}
    <strong className="font-semibold text-text-primary">business complexity and real human use</strong>.
  </>,
  <>
    Now based in <strong className="font-semibold text-text-primary">Berlin</strong>,
    completing my Master&apos;s in{" "}
    <strong className="font-semibold text-text-primary">IT Business and Digitalisation at HTW</strong>,
    and ready to bring this into a European team.
  </>,
];

const heroStats: { value: string; label: string }[] = [];

export default async function Home() {
  const [work, side, academic, hobby] = await Promise.all([
    getWorkProjects(),
    getSideProjects(),
    getAcademicProjects(),
    getHobbyItems(),
  ]);
  return (
    <main className="relative z-10 min-h-screen">
      <ScrollUI />
      <Hero
        firstName="Xiaoyan"
        lastName="Duan."
        bio={heroBio}
        photo="/images/hero/photo.jpg"
        photoCaption="Van Gogh Museum · Amsterdam"
        quote="Find things beautiful as much as you can. Most people find too little beautiful."
        stats={heroStats}
      />
      {/* <Timeline
        nodes={timelineNodes}
        subtitle="From materials lab to product strategy — a non-linear path shaped by curiosity."
      /> */}
      <ProjectsSection work={work} side={side} academic={academic} hobby={hobby} />
      <div className="bg-gradient-to-b from-[#faf8f4] to-[#f5f1ea] relative overflow-hidden">
        <PhilosophySection />
        <ContactSection />
      </div>
    </main>
  );
}
