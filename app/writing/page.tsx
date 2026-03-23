import ProjectDetailLayout from "@/components/projects/ProjectDetailLayout";

export default function WritingPage() {
  return (
    <ProjectDetailLayout backHref="/#outside" navItems={["Writing"]}>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#1c1917] mb-4 leading-[1.1]">
          Writing
        </h1>
        <p className="text-lg text-[#57534e] leading-relaxed font-sans">
          How I think. Around 40 long-form essays over the past two years.
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl px-8 py-7 shadow-[0px_2px_8px_0px_rgba(28,25,23,0.06)] max-w-xl">
        <p className="text-sm text-[#78716c] leading-relaxed font-sans">
          My current essays are written in Chinese and published on Chinese social platforms.
        </p>
        <p className="text-sm text-[#78716c] leading-relaxed font-sans mt-3">
          English content is coming — real essays from someone who has been thinking and building in the AI era. Stay tuned.
        </p>
      </div>
    </ProjectDetailLayout>
  );
}
