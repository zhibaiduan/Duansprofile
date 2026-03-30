import { ExternalLink } from "lucide-react";

interface DemoCardProps {
  title: string;
  description: string;
  url?: string;
  link?: string;
  logo?: string;
}

export default function DemoCard({ title, description, url, link, logo }: DemoCardProps) {
  url = url ?? link;
  const content = (
    <div
      className={`group flex items-start gap-5 p-6 rounded-2xl border border-[#e7e5e4] bg-white/80 backdrop-blur-sm shadow-[0px_2px_8px_0px_rgba(28,25,23,0.06)] mt-6 mb-2 ${
        url ? "hover:shadow-[0px_8px_24px_0px_rgba(28,25,23,0.10)] hover:border-[#5b7a52]/30 transition-all duration-300 cursor-pointer" : ""
      }`}
    >
      {/* Logo */}
      <div className="w-14 h-14 flex-shrink-0 rounded-xl border border-[#e7e5e4] bg-[#faf8f4] flex items-center justify-center overflow-hidden">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c4] flex items-center justify-center">
            <span className="text-[#5b7a52] text-xl font-serif font-bold">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#78716c]/60 mb-1">
              {url ? "Live Demo" : "Coming Soon"}
            </p>
            <h4 className="text-base font-semibold text-[#1c1917] font-sans leading-snug group-hover:text-[#5b7a52] transition-colors duration-300">
              {title}
            </h4>
          </div>
          {url && (
            <ExternalLink className="w-4 h-4 text-[#78716c] group-hover:text-[#5b7a52] transition-colors flex-shrink-0 mt-1" />
          )}
        </div>
        <p className="text-sm text-[#78716c] leading-relaxed font-sans mt-2">
          {description}
        </p>
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
}
