import { useState } from "react";
import templeDoors from "@/assets/temple-doors.jpg";
import { BrassLamp } from "./BrassLamp";

export function TempleDoors() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  const handleEnter = () => {
    setOpen(true);
    setTimeout(() => setGone(true), 2100);
  };

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-maroon"
      style={{ pointerEvents: gone ? "none" : "auto" }}
      aria-hidden={open}
    >
      {/* Centered welcome content (in front of doors visually) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-ivory">
        <div className="flex gap-16 mb-8 opacity-90">
          <BrassLamp />
          <BrassLamp />
        </div>
        <p className="font-tamil text-gold/90 text-sm tracking-[0.3em] mb-4">ஓம் கணேசாய நமஹ</p>
        <h1 className="font-display text-4xl sm:text-6xl text-gold-shimmer mb-4 max-w-xl">
          Sai Arjun Chettiar
        </h1>
        <p className="font-serif italic text-ivory/80 max-w-md mb-8 text-balance">
          "May the divine light of a thousand lamps bless this child with wisdom, health, and endless joy."
        </p>
        <button
          onClick={handleEnter}
          className="group relative inline-flex items-center gap-3 rounded-full border border-gold/60 bg-maroon/60 px-8 py-3 font-serif text-base text-ivory backdrop-blur transition-all hover:bg-gold hover:text-maroon"
        >
          <span>Enter the Celebration</span>
          <span className="inline-block size-2 rounded-full bg-gold transition-transform group-hover:scale-150 group-hover:bg-maroon" />
        </button>
      </div>

      {/* Door panels (left/right) */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 border-r-2 border-gold/40 shadow-[20px_0_60px_oklch(0.1_0_0/0.6)] transition-transform ${
          open ? "animate-door-left" : ""
        }`}
        style={{
          backgroundImage: `url(${templeDoors})`,
          backgroundSize: "200% 100%",
          backgroundPosition: "left center",
        }}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 border-l-2 border-gold/40 shadow-[-20px_0_60px_oklch(0.1_0_0/0.6)] transition-transform ${
          open ? "animate-door-right" : ""
        }`}
        style={{
          backgroundImage: `url(${templeDoors})`,
          backgroundSize: "200% 100%",
          backgroundPosition: "right center",
        }}
      />
    </div>
  );
}