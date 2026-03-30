import { useRef } from "react";
import { useGsapReveal } from "@/hooks/useAnimeOnView";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TEAM = [
  {
    name: "Kardam",
    role: "Founder & Lead Engineer",
    bio: "Full-stack architect building autonomous systems for decentralized markets.",
    avatar: "K",
    links: { github: "#", twitter: "#" },
  },
  {
    name: "Coming Soon",
    role: "Protocol Engineer",
    bio: "Seeking a protocol engineer to design settlement consensus mechanisms.",
    avatar: "?",
    links: {},
  },
  {
    name: "Coming Soon",
    role: "Research & Data",
    bio: "Seeking a data engineer to build and optimize multi-source verification pipelines.",
    avatar: "?",
    links: {},
  },
];

export function Team() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref, { stagger: 0.1 });

  return (
    <section ref={ref} id="team" className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <SectionHeading
          tag="Team"
          title="The people behind Omenly"
          description="A lean team focused on building infrastructure that prediction markets can depend on."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name + member.role}
              className="gsap-reveal group relative rounded-2xl border border-[var(--c-border)] bg-[var(--c-bg-card)] p-7 transition-all duration-300 hover:border-[var(--c-border-hover)] hover:bg-[var(--c-bg-card-hover)]"
            >
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-[var(--c-accent-muted)] border border-[var(--c-accent)]/20 flex items-center justify-center mb-5">
                <span className="text-[18px] font-bold text-[var(--c-accent)]">
                  {member.avatar}
                </span>
              </div>

              <h3 className="text-[16px] font-semibold text-[var(--c-text)] mb-0.5">
                {member.name}
              </h3>
              <p className="text-[11px] font-medium tracking-[0.05em] uppercase text-[var(--c-accent)] mb-3">
                {member.role}
              </p>
              <p className="text-[13px] text-[var(--c-text-muted)] leading-[1.7] mb-5">
                {member.bio}
              </p>

              {/* Social links */}
              {Object.keys(member.links).length > 0 && (
                <div className="flex items-center gap-3">
                  {member.links.github && (
                    <a href={member.links.github} className="text-[var(--c-text-dim)] hover:text-[var(--c-text)] transition-colors" aria-label="GitHub">
                      <GithubIcon />
                    </a>
                  )}
                  {member.links.twitter && (
                    <a href={member.links.twitter} className="text-[var(--c-text-dim)] hover:text-[var(--c-text)] transition-colors" aria-label="X / Twitter">
                      <XIcon />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
