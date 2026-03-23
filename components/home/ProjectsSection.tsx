import type {
  WorkProject,
  SideProject,
  AcademicProject,
  HobbyItem,
} from "@/types";
import { getRotationFromSlug } from "@/lib/utils";
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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-16">
        {work.length > 0 && (
          <section id="work-cases">
            <h2 className="font-serif text-[2rem] leading-[1.2] tracking-[-0.02em] text-text-primary mb-7">
              Working Cases
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {work.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="work"
                  rotationDeg={getRotationFromSlug(project.slug, "work")}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {side.length > 0 && (
          <section id="side">
            <h2 className="font-serif text-[2rem] leading-[1.2] tracking-[-0.02em] text-text-primary mb-7">
              Side Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {side.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="side"
                  rotationDeg={getRotationFromSlug(project.slug, "side")}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {academic.length > 0 && (
          <section id="academic">
            <h2 className="font-serif text-[2rem] leading-[1.2] tracking-[-0.02em] text-text-primary mb-7">
              Academic Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {academic.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="academic"
                  rotationDeg={getRotationFromSlug(project.slug, "academic")}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {hobby.length > 0 && (
          <section id="think">
            <h2 className="font-serif text-[2rem] leading-[1.2] tracking-[-0.02em] text-text-primary mb-7">
              Outside of Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hobby.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="hobby"
                  rotationDeg={getRotationFromSlug(project.slug, "hobby")}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
