import ImageGrid from "@/components/ui/ImageGrid";
import DemoCard from "@/components/ui/DemoCard";
import { StatRow, HookGrid, Journey, ArchDiagram, ImpactGrid, SectionLabel, SceneGrid, LabeledRows, ImpactRow, AwardBadge, ReflectionBox } from "@/lib/meetingMdxComponents";

function MdxImageGrid(props: React.ComponentProps<typeof ImageGrid>) {
  return <ImageGrid {...props} />;
}

function StackTags({ items }: { items: string }) {
  const tags = items.split("·").map((t) => t.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-lg border border-border bg-bg px-3 py-1.5 text-xs font-mono text-text-secondary"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function WorkTrackPair({
  leftLabel,
  leftTitle,
  leftItems,
  leftResult,
  leftResultCopy,
  rightLabel,
  rightTitle,
  rightItems,
  rightResult,
  rightResultCopy,
}: {
  leftLabel: string;
  leftTitle: string;
  leftItems: string;
  leftResult: string;
  leftResultCopy: string;
  rightLabel: string;
  rightTitle: string;
  rightItems: string;
  rightResult: string;
  rightResultCopy: string;
}) {
  const renderItems = (items: string) =>
    items
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => (
        <li key={item} className="relative pl-4 text-sm leading-relaxed text-text-secondary before:absolute before:left-0 before:top-[0.65rem] before:h-1 before:w-1 before:rounded-full before:bg-text-tertiary before:content-['']">
          {item}
        </li>
      ));

  const TrackCard = ({
    label,
    title,
    items,
    result,
    resultCopy,
  }: {
    label: string;
    title: string;
    items: string;
    result: string;
    resultCopy: string;
  }) => (
    <div className="rounded-xl border border-border bg-bg px-5 py-5 shadow-[0_1px_0_rgba(28,25,23,0.02)]">
      <p className="mb-2 text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-text-tertiary">
        {label}
      </p>
      <h3 className="mb-4 mt-0 text-[1.05rem] font-semibold leading-snug text-text-primary">
        {title}
      </h3>
      <ul className="mb-5 space-y-2 pl-0">
        {renderItems(items)}
      </ul>
      <div className="border-t border-border pt-4">
        <p className="mb-1 text-[1.05rem] font-semibold leading-none text-text-primary">
          {result}
        </p>
        <p className="mb-0 text-sm leading-relaxed text-text-secondary">
          {resultCopy}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-[10px] md:grid-cols-2">
      <TrackCard
        label={leftLabel}
        title={leftTitle}
        items={leftItems}
        result={leftResult}
        resultCopy={leftResultCopy}
      />
      <TrackCard
        label={rightLabel}
        title={rightTitle}
        items={rightItems}
        result={rightResult}
        resultCopy={rightResultCopy}
      />
    </div>
  );
}

function PdfEmbed({ src }: { src: string }) {
  return (
    <div className="mt-6 mb-2 overflow-hidden rounded-xl border border-border">
      <iframe
        src={src}
        className="w-full"
        style={{ height: "70vh", minHeight: "480px" }}
        title="Document"
      />
      <div className="flex justify-end border-t border-border bg-bg px-4 py-3">
        <a
          href={src}
          download
          className="text-xs font-mono text-accent hover:underline"
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
      <div className="overflow-hidden rounded-xl border border-border shadow-card">
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

function VideoWithNotes({ src, poster, notes = [], notesJson }: { src: string; poster?: string; notes?: string[]; notesJson?: string }) {
  const resolvedNotes = (() => {
    if (notes.length > 0) return notes;
    if (!notesJson) return [];
    try {
      const parsed = JSON.parse(notesJson);
      return Array.isArray(parsed) ? parsed.filter((note): note is string => typeof note === "string") : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="mt-2 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
      {/* Video — 2/3 */}
      <div className="overflow-hidden rounded-xl border border-border shadow-card sm:col-span-2">
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
        {resolvedNotes.map((note, i) => (
          <p key={i} className="text-sm leading-relaxed font-sans text-text-secondary">
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
      className="mt-20 mb-6 text-2xl font-serif text-text-primary first:mt-0"
      {...props}
    />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-12 mb-3 text-base font-semibold font-sans text-text-primary"
      {...props}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-4 font-sans leading-relaxed text-text-secondary last:mb-0"
      {...props}
    />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),

  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-text-secondary" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="pl-0 mb-4 space-y-2" {...props} />
  ),

  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
      className="relative pl-5 font-sans leading-relaxed text-text-secondary
        before:content-[''] before:absolute before:left-0 before:top-[0.72em]
        before:h-[5px] before:w-[5px] before:rounded-full before:bg-accent"
      {...props}
    />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-12 border-l-2 border-accent pl-6
        [&>p]:mb-3 [&>p]:font-sans [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-text-primary [&>p]:not-italic
        [&>p:last-child]:mb-0 [&>p:last-child]:text-sm [&>p:last-child]:text-text-secondary"
      {...props}
    />
  ),

  hr: () => null,

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-auto w-full rounded-lg border border-border"
        alt={props.alt ?? ""}
        loading="lazy"
        decoding="async"
        {...props}
      />
      {props.alt && (
        <figcaption className="mt-3 text-center font-mono text-[0.6875rem] leading-relaxed text-text-secondary opacity-60">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent hover:underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  ImageGrid: MdxImageGrid,
  StackTags,
  WorkTrackPair,
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
