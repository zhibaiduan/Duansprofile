"use client";

// ─── SceneGrid ───────────────────────────────────────────────────────────────
interface Scene { who: string; text: string }
export function SceneGrid({ scenes }: { scenes: Scene[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px] my-5">
      {scenes.map((scene, i) => (
        <div key={i} className="bg-white/60 border border-[#e7e5e4] rounded-xl p-4">
          <p className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#a8a29e] mb-2">{scene.who}</p>
          <p className="text-[13px] text-[#1c1917] leading-relaxed font-sans">{scene.text}</p>
        </div>
      ))}
    </div>
  );
}

// ─── LabeledRows ─────────────────────────────────────────────────────────────
interface LabeledRowItem { label: string; text: string }
export function LabeledRows({ rows, labelWidth = "100px" }: { rows: LabeledRowItem[]; labelWidth?: string }) {
  return (
    <div className="my-4">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-4 py-4 border-t border-[#e7e5e4]">
          <span style={{ minWidth: labelWidth }} className="text-xs font-mono font-medium text-[#a8a29e] flex-shrink-0 pt-0.5 leading-relaxed">
            {row.label}
          </span>
          <p className="text-sm text-[#57534e] leading-relaxed font-sans m-0">{row.text}</p>
        </div>
      ))}
    </div>
  );
}

// ─── ImpactRow ───────────────────────────────────────────────────────────────
interface ImpactCell { value: string; label: string }
export function ImpactRow({ cells }: { cells: ImpactCell[] }) {
  return (
    <div className="grid grid-cols-2 gap-[10px] my-4">
      {cells.map((cell, i) => (
        <div key={i} className="bg-[#faf8f4] border border-[#e7e5e4] rounded-xl p-4">
          <p className="text-xl font-semibold text-[#1c1917] font-sans mb-1">{cell.value}</p>
          <p className="text-xs text-[#a8a29e] font-mono leading-snug">{cell.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── AwardBadge ──────────────────────────────────────────────────────────────
export function AwardBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 border border-[#e7e5e4] rounded-lg px-3.5 py-2.5 text-[13px] text-[#78716c] font-sans mt-3">
      🏆 {String(children)}
    </div>
  );
}

// ─── ReflectionBox ───────────────────────────────────────────────────────────
export function ReflectionBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#faf8f4] border border-[#e7e5e4] rounded-xl px-5 py-5 my-4">
      <p className="text-sm text-[#78716c] leading-relaxed font-sans">{children}</p>
    </div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
export function SectionLabel({ children, first }: { children: React.ReactNode; first?: boolean }) {
  return (
    // -mb-14 cancels most of h2's mt-20 so the gap label→h2 stays ~1.5rem
    <div className={`${first ? "mt-0" : "mt-20"} -mb-14`}>
      <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#a8a29e] pb-3 border-b border-[#e7e5e4]">
        {children}
      </p>
    </div>
  );
}

// ─── HookGrid ────────────────────────────────────────────────────────────────
interface HookItem { icon: string; title: string; description: string }
const responsiveCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};
function colsClass(n: number) {
  return responsiveCols[n] ?? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

export function HookGrid({ items }: { items: HookItem[] }) {
  return (
    <div className={`grid gap-[1px] bg-[#e7e5e4] border border-[#e7e5e4] rounded-xl overflow-hidden my-8 ${colsClass(items.length)}`}>
      {items.map((item, i) => {
        const active = i === items.length - 1;
        return (
          <div key={i} className={`flex flex-col gap-2 p-6 ${active ? "bg-[#1c1917] text-white" : "bg-[#faf8f4]"}`}>
            <span className="text-2xl">{item.icon}</span>
            <p className={`text-[13px] font-semibold font-sans ${active ? "text-white" : "text-[#1c1917]"}`}>{item.title}</p>
            <p className={`text-xs leading-relaxed font-sans ${active ? "text-white/60" : "text-[#a8a29e]"}`}>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Journey ─────────────────────────────────────────────────────────────────
interface JourneyStep { number: string; title: string; description: string }
export function Journey({ steps }: { steps: JourneyStep[] }) {
  return (
    <div className="relative my-6">
      {/* Connecting line */}
      <div className="absolute left-[19px] top-6 bottom-6 w-px bg-[#e7e5e4]" />
      {steps.map((step, i) => (
        <div key={i} className="flex gap-5 py-5">
          <div className="relative z-10 w-10 h-10 rounded-full bg-[#faf8f4] border border-[#e7e5e4] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-mono text-[#78716c]">{step.number}</span>
          </div>
          <div className="pt-2 space-y-1">
            <p className="text-sm font-semibold text-[#1c1917] font-sans">{step.title}</p>
            <p className="text-sm text-[#78716c] leading-relaxed font-sans">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ArchDiagram ─────────────────────────────────────────────────────────────
export function ArchDiagram() {
  return (
    <div className="border border-[#e7e5e4] rounded-xl overflow-hidden my-6 bg-[#faf8f4] p-6">
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>
        {/* Layer 3 — RBAC */}
        <rect x="20" y="320" width="500" height="60" rx="8" fill="none" stroke="rgba(28,25,23,0.1)" strokeWidth="1"/>
        <rect x="20" y="320" width="500" height="60" rx="8" fill="rgba(28,25,23,0.02)"/>
        <text x="40" y="345" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="500" fill="#78716c">Security &amp; Permission (RBAC)</text>
        <text x="40" y="363" fontFamily="system-ui,sans-serif" fontSize="11" fill="#a8a29e">Role-based access · Folder-level visibility · Functional permissions</text>
        {/* Meeting Annotation */}
        <rect x="20" y="200" width="238" height="100" rx="8" fill="none" stroke="rgba(37,99,235,0.2)" strokeWidth="1"/>
        <rect x="20" y="200" width="238" height="100" rx="8" fill="rgba(37,99,235,0.04)"/>
        <text x="40" y="222" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="500" fill="#2563eb">Meeting Annotation</text>
        <text x="40" y="241" fontFamily="system-ui,sans-serif" fontSize="11" fill="#78716c">Inline annotation · Threading</text>
        <text x="40" y="257" fontFamily="system-ui,sans-serif" fontSize="11" fill="#78716c">Smart tag suggestions · Quick tagging UI</text>
        {/* Knowledge Hub */}
        <rect x="272" y="200" width="248" height="100" rx="8" fill="none" stroke="rgba(13,148,136,0.2)" strokeWidth="1"/>
        <rect x="272" y="200" width="248" height="100" rx="8" fill="rgba(13,148,136,0.04)"/>
        <text x="292" y="222" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="500" fill="#0d9488">Knowledge Hub</text>
        <text x="292" y="241" fontFamily="system-ui,sans-serif" fontSize="11" fill="#78716c">Atomic knowledge cards</text>
        <text x="292" y="257" fontFamily="system-ui,sans-serif" fontSize="11" fill="#78716c">Subscription &amp; discovery · Automated project sync</text>
        {/* Layer 1 — Resource Management */}
        <rect x="20" y="100" width="500" height="80" rx="8" fill="none" stroke="rgba(28,25,23,0.1)" strokeWidth="1"/>
        <rect x="20" y="100" width="500" height="80" rx="8" fill="rgba(28,25,23,0.02)"/>
        <text x="40" y="124" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="500" fill="#57534e">Meeting Resource Management</text>
        <text x="40" y="142" fontFamily="system-ui,sans-serif" fontSize="11" fill="#a8a29e">Synchronized media player · Multi-dimensional categorization</text>
        <text x="40" y="158" fontFamily="system-ui,sans-serif" fontSize="11" fill="#a8a29e">Resource ingestion pipeline · Folder subscribe · Auto-notify</text>
        {/* Cooperation */}
        <rect x="560" y="200" width="100" height="100" rx="8" fill="none" stroke="rgba(28,25,23,0.1)" strokeWidth="1"/>
        <rect x="560" y="200" width="100" height="100" rx="8" fill="rgba(28,25,23,0.02)"/>
        <text x="610" y="235" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="500" fill="#57534e">Cooperation</text>
        <text x="610" y="253" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#a8a29e">@ Notify</text>
        <text x="610" y="268" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#a8a29e">Task pipeline</text>
        {/* External integrations */}
        <rect x="560" y="20" width="100" height="30" rx="6" fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.2)" strokeWidth="1"/>
        <text x="610" y="40" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="500" fill="#2563eb">IM</text>
        <rect x="560" y="64" width="100" height="30" rx="6" fill="rgba(13,148,136,0.08)" stroke="rgba(13,148,136,0.2)" strokeWidth="1"/>
        <text x="610" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="500" fill="#0d9488">Project Portal</text>
        <rect x="560" y="108" width="100" height="30" rx="6" fill="rgba(192,122,86,0.08)" stroke="rgba(192,122,86,0.2)" strokeWidth="1"/>
        <text x="610" y="128" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="500" fill="#5b7a52">Task Platform</text>
        {/* Arrows */}
        <line x1="520" y1="218" x2="558" y2="35" stroke="rgba(37,99,235,0.35)" strokeWidth="1" markerEnd="url(#arr)"/>
        <line x1="522" y1="240" x2="558" y2="79" stroke="rgba(13,148,136,0.35)" strokeWidth="1" markerEnd="url(#arr)"/>
        <line x1="524" y1="262" x2="558" y2="123" stroke="rgba(192,122,86,0.35)" strokeWidth="1" markerEnd="url(#arr)"/>
        {/* Labels */}
        <text x="155" y="416" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#a8a29e">Meeting Participants</text>
        <text x="390" y="416" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#a8a29e">All Employees</text>
      </svg>
    </div>
  );
}

// ─── StatRow ─────────────────────────────────────────────────────────────────
interface StatItem { value: string; label: string }
export function StatRow({ items }: { items: StatItem[] }) {
  return (
    <div className={`grid gap-[1px] bg-[#e7e5e4] border border-[#e7e5e4] rounded-xl overflow-hidden my-8 ${colsClass(items.length)}`}>
      {items.map((item, i) => (
        <div key={i} className="bg-[#faf8f4] px-6 py-5 text-center">
          <p className="text-3xl font-serif text-[#1c1917] leading-none mb-1">{item.value}</p>
          <p className="text-xs font-mono text-[#a8a29e] leading-relaxed">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── ImpactGrid ──────────────────────────────────────────────────────────────
interface ImpactCardData {
  letter: string;
  badge: string;
  badgeColor: "blue" | "teal" | "amber";
  heading: string;
  body: string;
  result: string;
}
const badgeStyles = {
  blue:  "bg-blue-50 text-blue-600",
  teal:  "bg-teal-50 text-teal-600",
  amber: "bg-amber-50 text-amber-600",
};
export function ImpactGrid({ cards }: { cards: ImpactCardData[] }) {
  return (
    <div className={`grid gap-[1px] bg-[#e7e5e4] border border-[#e7e5e4] rounded-xl overflow-hidden my-8 ${colsClass(cards.length)}`}>
      {cards.map((card, i) => (
        <div key={i} className="bg-[#faf8f4] p-6 flex flex-col gap-3">
          <div className="w-7 h-7 rounded-md bg-[#1c1917] text-white text-xs font-mono flex items-center justify-center flex-shrink-0">
            {card.letter}
          </div>
          <span className={`self-start text-[11px] font-medium px-2 py-1 rounded font-mono ${badgeStyles[card.badgeColor]}`}>
            {card.badge}
          </span>
          <p className="text-[13px] font-semibold text-[#1c1917] leading-snug font-sans">{card.heading}</p>
          <p className="text-[13px] text-[#78716c] leading-relaxed font-sans flex-1">{card.body}</p>
          <div className="border-t border-[#e7e5e4] pt-3 mt-auto">
            <p className="text-xs text-[#78716c] leading-relaxed font-sans">
              <strong className="text-[#1c1917] font-medium">Result: </strong>{card.result}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
