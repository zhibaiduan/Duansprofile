import ImageGrid from "@/components/ui/ImageGrid";
import DemoCard from "@/components/ui/DemoCard";
import { StatRow, HookGrid, Journey, ArchDiagram, ImpactGrid, SectionLabel, SceneGrid, LabeledRows, ImpactRow, AwardBadge, ReflectionBox } from "@/lib/meetingMdxComponents";

function StackTags({ items }: { items: string }) {
  const tags = items.split("·").map((t) => t.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1.5 text-xs font-mono text-[#78716c] bg-[rgba(28,25,23,0.05)] rounded-lg"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function PdfEmbed({ src }: { src: string }) {
  return (
    <div className="mt-6 mb-2 rounded-xl border border-[#e7e5e4] overflow-hidden">
      <iframe
        src={src}
        className="w-full"
        style={{ height: "70vh", minHeight: "480px" }}
        title="Document"
      />
      <div className="px-4 py-3 bg-[#faf8f4] border-t border-[#e7e5e4] flex justify-end">
        <a
          href={src}
          download
          className="text-xs font-mono text-[#5b7a52] hover:underline"
        >
          Download PDF ↓
        </a>
      </div>
    </div>
  );
}

function VideoPlayer({ src, poster, width }: { src: string; poster?: string; width?: string }) {
  return (
    <div className="mt-2 mb-8" style={width ? { width, marginLeft: "auto", marginRight: "auto" } : undefined}>
      <div className="rounded-xl overflow-hidden border border-[#e7e5e4] shadow-[0px_4px_16px_0px_rgba(28,25,23,0.08)]">
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

function VideoWithNotes({ src, poster, notes = [] }: { src: string; poster?: string; notes?: string[] }) {
  return (
    <div className="mt-2 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
      {/* Video — 2/3 */}
      <div className="sm:col-span-2 rounded-xl overflow-hidden border border-[#e7e5e4] shadow-[0px_4px_16px_0px_rgba(28,25,23,0.08)]">
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        />
      </div>

      {/* Notes — 1/3 */}
      <div className="sm:col-span-1 flex flex-col gap-4 py-1">
        {notes.map((note, i) => (
          <p key={i} className="text-sm text-[#78716c] leading-relaxed font-sans">
            {note}
          </p>
        ))}
      </div>
    </div>
  );
}

export const projectMdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-serif text-[#1c1917] mt-20 mb-6 first:mt-0"
      {...props}
    />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-base font-semibold text-[#1c1917] font-sans mt-12 mb-3"
      {...props}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="font-sans text-[#57534e] leading-relaxed mb-4 last:mb-0"
      {...props}
    />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[#1c1917]" {...props} />
  ),

  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-[#57534e]" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="pl-0 mb-4 space-y-2" {...props} />
  ),

  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
      className="font-sans text-[#57534e] leading-relaxed relative pl-5
        before:content-[''] before:absolute before:left-0 before:top-[0.72em]
        before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#5b7a52]"
      {...props}
    />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-[#5b7a52] pl-6 my-12
        [&>p]:font-sans [&>p]:text-base [&>p]:text-[#1c1917] [&>p]:mb-3 [&>p]:leading-relaxed [&>p]:not-italic
        [&>p:last-child]:mb-0 [&>p:last-child]:text-sm [&>p:last-child]:text-[#78716c]"
      {...props}
    />
  ),

  hr: () => null,

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full h-auto rounded-lg border border-[#e7e5e4]"
        alt={props.alt ?? ""}
        loading="lazy"
        decoding="async"
        {...props}
      />
      {props.alt && (
        <figcaption className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-[#78716c]/60 text-center">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[#5b7a52] hover:underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  ImageGrid,
  StackTags,
  PdfEmbed,
  DemoCard,
  VideoPlayer,
  VideoWithNotes,
  StatRow,
  HookGrid,
  Journey,
  ArchDiagram,
  ImpactGrid,
  SectionLabel,
  SceneGrid,
  LabeledRows,
  ImpactRow,
  AwardBadge,
  ReflectionBox,
};
