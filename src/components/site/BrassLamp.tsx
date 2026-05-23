export function BrassLamp({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* Flame */}
      <div className="animate-flame mx-auto mb-1 h-8 w-3 rounded-full bg-gradient-to-t from-copper via-gold to-ivory shadow-[0_0_30px_oklch(0.75_0.14_70/0.8)]" />
      {/* Lamp body */}
      <svg width="64" height="48" viewBox="0 0 64 48" className="mx-auto">
        <defs>
          <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.78 0.12 75)" />
            <stop offset="0.5" stopColor="oklch(0.55 0.10 50)" />
            <stop offset="1" stopColor="oklch(0.32 0.06 40)" />
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="12" rx="22" ry="6" fill="url(#brass)" />
        <path d="M14 14 Q32 30 50 14 L46 22 Q32 28 18 22 Z" fill="url(#brass)" />
        <ellipse cx="32" cy="30" rx="14" ry="3" fill="oklch(0.40 0.08 45)" />
        <rect x="28" y="32" width="8" height="6" fill="url(#brass)" />
        <ellipse cx="32" cy="40" rx="18" ry="4" fill="url(#brass)" />
      </svg>
    </div>
  );
}