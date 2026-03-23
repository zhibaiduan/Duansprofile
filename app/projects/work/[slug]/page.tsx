import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWorkProjects, getWorkProjectBySlug } from "@/lib/content";
import { projectMdxComponents } from "@/lib/projectMdxComponents";
import ProjectDetailLayout from "@/components/projects/ProjectDetailLayout";

export async function generateStaticParams() {
  return getWorkProjects().map((p) => ({ slug: p.slug }));
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getWorkProjectBySlug(slug);
  if (!result) notFound();

  const { frontmatter: p, source } = result;
  const otherCases = getWorkProjects().filter((proj) => proj.slug !== slug);

  const infoItems = [
    { label: "Company", value: p.company },
    { label: "Role", value: p.role },
    { label: "Year", value: String(p.year) },
    { label: "Duration", value: p.duration },
    { label: "Team", value: p.team },
    { label: "Status", value: p.status },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <ProjectDetailLayout
      backHref="/#work-cases"
      navItems={[p.company, String(p.year)]}
    >
      {/* Header */}
      <div className="pt-10 mb-12">
        <h1 className="text-[1.9rem] md:text-5xl font-serif text-[#1c1917] mb-2 leading-[1.1]">
          {p.title}
        </h1>
        {p.subtitle && (
          <p className="text-lg md:text-2xl font-serif text-[#78716c] mb-4 leading-[1.2] italic">
            {p.subtitle}
          </p>
        )}
        <p className="text-base md:text-lg text-text-secondary mb-6 leading-relaxed max-w-2xl font-sans">
          {p.summary}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-5">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-[#78716c] font-mono text-xs">{item.label}</span>
              <span className="text-[#1c1917] font-sans">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[rgba(28,25,23,0.05)] text-[#78716c]"
            >
              {tag}
            </span>
          ))}
          {p.result && (
            <span className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#edf5e4] text-[#3a6d15]">
              {p.result}
            </span>
          )}
        </div>
      </div>

      {/* MDX body */}
      <article>
        <MDXRemote source={source} components={projectMdxComponents} />
      </article>

      {/* Other cases */}
      {otherCases.length > 0 && (
        <div className="mt-24 pt-12 border-t border-[#e7e5e4]">
          <h3 className="text-sm font-mono text-[#78716c] uppercase tracking-wider mb-6">
            More Working Cases
          </h3>
          <div className="space-y-6">
            {otherCases.map((proj) => (
              <Link key={proj.slug} href={`/projects/work/${proj.slug}`} className="block group">
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#e7e5e4] last:border-0 hover:border-[#5b7a52] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h4 className="text-lg font-serif text-[#1c1917] group-hover:text-[#5b7a52] transition-colors">
                        {proj.title}
                      </h4>
                      <span className="text-xs font-mono text-[#78716c]">{proj.year}</span>
                    </div>
                    <p className="text-sm text-[#78716c] leading-relaxed mb-3 font-sans">{proj.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[rgba(28,25,23,0.05)] text-[#78716c]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 rotate-180 text-[#78716c] group-hover:text-[#5b7a52] transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="mt-16">
        <Link href="/#work-cases" className="inline-flex items-center gap-2 text-sm text-[#78716c] hover:text-[#1c1917] transition-colors font-sans">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all projects</span>
        </Link>
      </div>
    </ProjectDetailLayout>
  );
}
