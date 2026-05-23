import { useMemo } from "react";

export function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 10 + Math.random() * 14,
        rotate: Math.random() * 360,
        key: i,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <svg
          key={p.key}
          className="absolute animate-petal text-ivory"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
            filter: "drop-shadow(0 0 6px oklch(0.95 0.05 85 / 0.6))",
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2c2 4 6 6 10 6-4 2-6 6-6 10-2-4-6-6-10-6 4-2 6-6 6-10z" opacity="0.85" />
        </svg>
      ))}
    </div>
  );
}