export function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent via-gold/60 to-gold/60" />
      <svg width="44" height="20" viewBox="0 0 44 20" fill="none" aria-hidden="true">
        <path d="M22 1 L26 10 L22 19 L18 10 Z" stroke="currentColor" strokeWidth="1" className="text-gold" />
        <circle cx="22" cy="10" r="2.5" fill="currentColor" className="text-gold" />
        <circle cx="6" cy="10" r="1.5" fill="currentColor" className="text-gold/70" />
        <circle cx="38" cy="10" r="1.5" fill="currentColor" className="text-gold/70" />
      </svg>
      <span className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent via-gold/60 to-gold/60" />
    </div>
  );
}