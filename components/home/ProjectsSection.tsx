import type {
  WorkProject,
  SideProject,
  AcademicProject,
  HobbyItem,
} from "@/types";
import { getRotationFromSlug } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/home/ProjectCard";

interface ProjectsSectionProps {
  work: WorkProject[];
  side: SideProject[];
  academic: AcademicProject[];
  hobby: HobbyItem[];
}

export default function ProjectsSection({
  work,
  side,
  academic,
  hobby,
}: ProjectsSectionProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="flex flex-col gap-20">
        {work.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <SectionLabel>Work</SectionLabel>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                {work.map((project, i) => (
                  <ScrollReveal key={project.slug} delay={0.05 * i}>
                    <ProjectCard
                      project={project}
                      variant="work"
                      rotationDeg={getRotationFromSlug(project.slug, "work")}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {side.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <SectionLabel>Side Projects</SectionLabel>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {side.map((project, i) => (
                  <ScrollReveal key={project.slug} delay={0.05 * i}>
                    <ProjectCard
                      project={project}
                      variant="side"
                      rotationDeg={getRotationFromSlug(project.slug, "side")}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {academic.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <SectionLabel>Academic</SectionLabel>
              <div className="flex flex-col gap-4">
                {academic.map((project, i) => (
                  <ScrollReveal key={project.slug} delay={0.05 * i}>
                    <ProjectCard
                      project={project}
                      variant="academic"
                      rotationDeg={getRotationFromSlug(
                        project.slug,
                        "academic"
                      )}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {hobby.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <SectionLabel>Hobby</SectionLabel>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {hobby.map((project, i) => (
                  <ScrollReveal key={project.slug} delay={0.05 * i}>
                    <ProjectCard
                      project={project}
                      variant="hobby"
                      rotationDeg={getRotationFromSlug(project.slug, "hobby")}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
