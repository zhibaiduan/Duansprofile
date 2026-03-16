import type {
  WorkProject,
  SideProject,
  AcademicProject,
  HobbyItem,
} from "@/types";
import Tag from "@/components/ui/Tag";

interface ProjectCardProps {
  project: WorkProject | SideProject | AcademicProject | HobbyItem;
  variant: "work" | "side" | "academic" | "hobby";
  rotationDeg: number;
}

export default function ProjectCard({
  project,
  variant,
  rotationDeg,
}: ProjectCardProps) {
  const baseStyle: React.CSSProperties = {
    transform: `rotate(${rotationDeg}deg)`,
    transition:
      "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
  };

  if (variant === "work") {
    const p = project as WorkProject;
    return (
      <article
        className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card hover:-translate-y-1 hover:shadow-card-hover"
        style={baseStyle}
      >
        {/* Cover image placeholder / image */}
        {p.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.coverImage}
            alt={p.title}
            className="h-44 w-full rounded-lg object-cover"
          />
        ) : (
          <div className="h-44 w-full rounded-t-xl bg-border/40" />
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              {p.company}
            </span>
            <span className="font-mono text-xs text-text-secondary/60">
              {p.year}
            </span>
          </div>
          <h3 className="font-serif text-[1.25rem] leading-[1.3] text-text-primary">
            {p.title}
          </h3>
          <p className="font-sans text-sm leading-[1.6] text-text-secondary">
            {p.summary}
          </p>
          {p.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {p.tags.map((tag) => (
                <Tag key={tag} variant="muted">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </article>
    );
  }

  if (variant === "side") {
    const p = project as SideProject;
    return (
      <article
        className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover"
        style={baseStyle}
      >
        <div className="flex items-start justify-between">
          <span className="text-2xl leading-none" aria-hidden="true">
            {p.icon}
          </span>
          <span className="font-mono text-xs text-text-secondary/60">
            {p.year}
          </span>
        </div>
        <h3 className="font-serif text-[1.125rem] leading-[1.3] text-text-primary">
          {p.title}
        </h3>
        <p className="font-sans text-sm leading-[1.6] text-text-secondary">
          {p.summary}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-1">
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent underline-offset-2 hover:underline"
            >
              Visit →
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-secondary underline-offset-2 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </article>
    );
  }

  if (variant === "academic") {
    const p = project as AcademicProject;
    return (
      <article
        className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover sm:flex-row sm:items-start sm:gap-6"
        style={baseStyle}
      >
        <div className="flex-1">
          <h3 className="font-serif text-[1.125rem] leading-[1.3] text-text-primary">
            {p.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-text-secondary">
            {p.institution}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
          <span className="font-mono text-xs text-text-secondary/60">
            {p.year}
          </span>
          {p.tags.map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>
      </article>
    );
  }

  // hobby
  const p = project as HobbyItem;
  return (
    <article
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover"
      style={baseStyle}
    >
      {p.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.image}
          alt={p.title}
          className="h-32 w-full rounded-lg object-cover"
        />
      )}
      <div className="flex items-start justify-between">
        <h3 className="font-serif text-[1.125rem] leading-[1.3] text-text-primary">
          {p.title}
        </h3>
        <Tag variant="accent">{p.category}</Tag>
      </div>
      <p className="font-sans text-sm leading-[1.6] text-text-secondary">
        {p.summary}
      </p>
    </article>
  );
}
