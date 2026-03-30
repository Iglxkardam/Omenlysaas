import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Full page background image */}
      <div className="absolute inset-0 z-0">
        <img src="/images/error.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[var(--c-bg)]/60" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[420px]">
        <div className="text-[120px] md:text-[160px] font-extrabold text-white/[0.08] leading-none mb-2 font-[family-name:var(--font-mono)]">404</div>
        <h1 className="text-[26px] font-bold text-white mb-3 tracking-[-0.02em]">Page not found</h1>
        <p className="text-[14px] text-zinc-300 leading-[1.7] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button to="/">
          Back to Home
          <ArrowRight size={14} />
        </Button>
      </div>
    </section>
  );
}
