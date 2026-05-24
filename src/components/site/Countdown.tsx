import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return { days, hours, mins, secs };
}

export function Countdown({ targetISO }: { targetISO: string }) {
  const target = new Date(targetISO);
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);

  const cells: [string, number][] = [
    ["Days", t.days],
    ["Hrs", t.hours],
    ["Mins", t.mins],
    ["Secs", t.secs],
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 pb-8 border-b border-maroon/15">
      {cells.map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="font-display text-3xl sm:text-4xl text-maroon tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ink/55">{label}</div>
        </div>
      ))}
    </div>
  );
}