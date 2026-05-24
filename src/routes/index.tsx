import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import babyPortrait from "@/assets/baby-portrait.jpg";
import sacredElements from "@/assets/sacred-elements.jpg";
import venueImg from "@/assets/venue.jpg";
import { TempleDoors } from "@/components/site/TempleDoors";
import { Petals } from "@/components/site/Petals";
import { Countdown } from "@/components/site/Countdown";
import { OrnamentalDivider } from "@/components/site/OrnamentalDivider";
import { BrassLamp } from "@/components/site/BrassLamp";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

// Ceremony date — 8 weeks from build for live countdown demo
const CEREMONY_ISO = "2026-08-24T09:15:00+05:30";

const milestones = [
  { title: "Birth Celebration", date: "Aug 2024", note: "The first cry that filled our home with light." },
  { title: "Naamakaranam", date: "Sep 2024", note: "Whispered into his ear — the name Sai Arjun." },
  { title: "First Smile", date: "Oct 2024", note: "A dimple, a giggle, an everlasting memory." },
  { title: "Annaprasanam", date: "Feb 2025", note: "The first grain of rice from amma's hand." },
  { title: "First Steps", date: "May 2025", note: "Tiny feet, mighty courage." },
  { title: "Kathani Vizha", date: "Aug 2026", note: "The sacred ear-piercing ceremony." },
];

const rituals = [
  { time: "07:30 AM", title: "Ganapathi Pooja", note: "Invoking Lord Ganesha to remove obstacles and bless the day." },
  { time: "08:30 AM", title: "Family Welcome", note: "Guests received with sandalwood, kumkum, and rose-water." },
  { time: "09:15 AM", title: "The Kathani Ritual", note: "The auspicious ear-piercing performed by family elders." },
  { time: "10:30 AM", title: "Aaseervadham", note: "Blessings showered with akshathai and flower petals." },
  { time: "12:30 PM", title: "Vazhai Elai Virundhu", note: "A traditional Chettinad feast on banana leaves." },
  { time: "03:00 PM", title: "Family Celebration", note: "Music, photographs, and joy with loved ones." },
];

const blessings = [
  { who: "Periyappa & Periyamma", msg: "Our home shines brighter because of you." },
  { who: "Thatha & Paatti", msg: "You are the song our hearts have always sung." },
  { who: "Chithappa Family", msg: "May Murugan walk beside you, always." },
  { who: "Cousins Abroad", msg: "We are with you in spirit, little prince." },
];

function Index() {
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [toast, setToast] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    window.clearTimeout((flash as any)._t);
    (flash as any)._t = window.setTimeout(() => setToast(null), 2400);
  };

  const toggleMusic = () => {
    if (!audioRef.current) {
      const a = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8e0a3c7b07.mp3?filename=indian-temple-bells-ambient-110083.mp3",
      );
      a.loop = true;
      a.volume = 0.45;
      audioRef.current = a;
    }
    if (muted) {
      audioRef.current.play().catch(() => flash("Tap again to enable music"));
      setMuted(false);
    } else {
      audioRef.current.pause();
      setMuted(true);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = "You are invited to the Kathani Vizha of Sai Arjun — 24 Aug 2026, Madurai";

  const downloadICS = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Kathani Vizha//EN",
      "BEGIN:VEVENT",
      "UID:kathani-sai-arjun@chettiar",
      "DTSTAMP:20260101T000000Z",
      "DTSTART:20260824T034500Z",
      "DTEND:20260824T103000Z",
      "SUMMARY:Kathani Vizha — Sai Arjun Chettiar",
      "LOCATION:Sri Meenakshi Kalyana Mandapam, Madurai",
      "DESCRIPTION:Sacred ear-piercing ceremony. With love\\, The Chettiar Family.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kathani-vizha-sai-arjun.ics";
    a.click();
    URL.revokeObjectURL(url);
    flash("Calendar invite downloaded");
  };

  const handleShare = async (kind: string) => {
    switch (kind) {
      case "WhatsApp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
          "_blank",
        );
        break;
      case "Copy Link":
        try {
          await navigator.clipboard.writeText(shareUrl);
          flash("Link copied to clipboard");
        } catch {
          flash("Could not copy — long-press the URL bar");
        }
        break;
      case "Save as Image":
      case "Download PDF":
        flash("Use your browser's Print → Save as PDF");
        window.print();
        break;
      case "Google Calendar":
        window.open(
          "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            "&text=Kathani+Vizha+%E2%80%94+Sai+Arjun" +
            "&dates=20260824T034500Z/20260824T103000Z" +
            "&details=Sacred+ear-piercing+ceremony" +
            "&location=Sri+Meenakshi+Kalyana+Mandapam%2C+Madurai",
          "_blank",
        );
        break;
      case "Apple Calendar":
        downloadICS();
        break;
    }
  };

  return (
    <div className="relative min-h-screen bg-ivory text-ink selection:bg-gold/30 selection:text-maroon">
      <TempleDoors />
      <Petals count={16} />

      {/* Top utility bar */}
      <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-ivory/70 border-b border-maroon/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
          <a href="#hero" className="font-display text-sm tracking-[0.3em] text-maroon">
            KATHANI VIZHA
          </a>
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] uppercase tracking-widest">
            <button
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="rounded-full border border-maroon/30 px-3 py-1 text-maroon hover:bg-maroon hover:text-ivory transition-colors"
              aria-label="Toggle language"
            >
              {lang === "en" ? "தமிழ்" : "ENG"}
            </button>
            <button
              onClick={() => setMuted((m) => !m)}
              className="rounded-full border border-maroon/30 px-3 py-1 text-maroon hover:bg-maroon hover:text-ivory transition-colors"
              aria-label="Toggle music"
            >
              {muted ? "♪ Music Off" : "♪ Music On"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden paper-grain">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 flex gap-24 opacity-90 pointer-events-none">
          <BrassLamp />
          <BrassLamp />
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-12">
          <div className="lg:col-span-7 order-2 lg:order-1 animate-rise">
            <span className="block font-display text-xs tracking-[0.4em] text-maroon mb-5 uppercase">
              A Sacred Tamil Celebration
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-maroon leading-[0.95] mb-6 text-balance">
              The Kathani Vizha of <span className="italic text-gold-shimmer">Sai Arjun</span>
            </h1>
            <p className="font-tamil text-xl text-gold mb-6">காது குத்தும் சுப விழா</p>
            <p className="font-serif text-lg md:text-xl text-ink/75 max-w-[52ch] leading-relaxed mb-10">
              With folded hands and joyful hearts, the Chettiar family invites you to bless our beloved son
              on the sacred milestone of his first ear-piercing ceremony.
            </p>

            <Countdown targetISO={CEREMONY_ISO} />

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center text-sm">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-gold shadow-[0_0_10px_oklch(0.72_0.105_82)]" />
                <span className="font-serif">Monday, 24 August 2026 · 09:15 AM</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-maroon/20" />
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-gold shadow-[0_0_10px_oklch(0.72_0.105_82)]" />
                <span className="font-serif italic">Sri Meenakshi Kalyana Mandapam, Madurai</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#rsvp"
                className="rounded-full bg-maroon text-ivory px-7 py-3 font-display tracking-[0.2em] uppercase text-xs shadow-[var(--shadow-mandap)] hover:bg-ink transition-colors"
              >
                Bless the Child
              </a>
              <a
                href="#rituals"
                className="rounded-full border border-maroon/40 px-7 py-3 font-display tracking-[0.2em] uppercase text-xs text-maroon hover:bg-maroon hover:text-ivory transition-colors"
              >
                Sacred Rituals
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="absolute -inset-6 rounded-[2rem] border border-gold/30 rotate-2 pointer-events-none" />
            <div className="absolute -inset-2 rounded-[1.5rem] border border-gold/20 -rotate-1 pointer-events-none" />
            <div className="relative overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-mandap)] ring-1 ring-gold/30">
              <img
                src={babyPortrait}
                alt="Portrait of Sai Arjun in traditional silk attire"
                width={1080}
                height={1350}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory">
                <span className="font-tamil text-sm">சை அர்ஜுன்</span>
                <span className="font-display text-[10px] tracking-[0.3em] uppercase opacity-80">Age 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORYTELLING MILESTONES ===== */}
      <section className="py-24 bg-sandal/30 border-y border-gold/15 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-display text-xs tracking-[0.4em] text-maroon uppercase mb-4">A Little Life, A Vast Love</p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon mb-6">Two Years of Wonder</h2>
            <OrnamentalDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {milestones.map((m, i) => (
              <article
                key={m.title}
                className="group relative bg-ivory border border-maroon/10 p-7 rounded-sm transition-all hover:shadow-[var(--shadow-gold)] hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
                <span className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">{m.date}</span>
                <h3 className="font-display text-2xl text-maroon mt-3 mb-3">{m.title}</h3>
                <p className="font-serif italic text-ink/70 leading-relaxed">{m.note}</p>
                <div className="mt-5 text-3xl text-maroon/20 group-hover:text-gold transition-colors">❋</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RITUALS TIMELINE ===== */}
      <section id="rituals" className="py-28 bg-maroon text-ivory relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px kolam-border" />
        <div className="absolute inset-x-0 bottom-0 h-px kolam-border" />
        <div className="absolute top-12 left-12 animate-bell opacity-40 hidden md:block">
          <svg width="40" height="60" viewBox="0 0 40 60" fill="currentColor" className="text-gold">
            <path d="M20 0 L20 8 M14 8 Q14 4 20 4 Q26 4 26 8 L28 30 Q28 40 20 40 Q12 40 12 30 Z" />
            <circle cx="20" cy="42" r="3" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <p className="font-display text-xs tracking-[0.4em] text-gold uppercase mb-4">The Order of the Day</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Sacred Rituals</h2>
            <OrnamentalDivider className="text-gold" />
          </div>

          <ol className="relative space-y-14 border-l border-gold/30 pl-8 md:pl-12">
            {rituals.map((r, i) => (
              <li key={r.title} className="relative">
                <span className="absolute -left-[42px] md:-left-[54px] top-2 size-4 rounded-full bg-gold ring-4 ring-maroon shadow-[0_0_20px_oklch(0.72_0.105_82_/_0.7)]" />
                <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8">
                  <span className="font-display text-2xl text-gold tabular-nums whitespace-nowrap md:w-32 shrink-0">{r.time}</span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide mb-2">{r.title}</h3>
                    <p className="font-serif text-lg text-ivory/75 max-w-[60ch] leading-relaxed">{r.note}</p>
                    {i === 2 && (
                      <div className="mt-6 overflow-hidden rounded-sm ring-1 ring-gold/30">
                        <img
                          src={sacredElements}
                          alt="Sacred gold earrings on banana leaf with jasmine"
                          width={1600}
                          height={800}
                          loading="lazy"
                          className="w-full aspect-[2/1] object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-full border border-gold/50 px-7 py-3 font-display tracking-[0.2em] uppercase text-xs text-gold hover:bg-gold hover:text-maroon transition-colors"
            >
              + Add to Calendar
            </a>
          </div>
        </div>
      </section>

      {/* ===== SACRED HIGHLIGHT ===== */}
      <section className="py-28 bg-ivory relative overflow-hidden">
        <div className="absolute inset-0 paper-grain opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <p className="font-tamil text-xl text-gold mb-4">ஸ்ரீ கணேசாய நமஹ</p>
          <h2 className="font-display text-4xl md:text-5xl text-maroon mb-6 text-balance">
            The Auspicious <span className="italic text-gold-shimmer">Muhurtham</span>
          </h2>
          <OrnamentalDivider className="mb-10" />

          <div className="relative mx-auto max-w-2xl border border-gold/40 rounded-sm p-10 md:p-14 bg-gradient-to-b from-ivory to-sandal/40 shadow-[var(--shadow-gold)]">
            <div className="absolute -top-px left-8 right-8 h-px bg-gold" />
            <div className="absolute -bottom-px left-8 right-8 h-px bg-gold" />
            <div className="flex justify-center mb-6">
              <BrassLamp />
            </div>
            <p className="font-display text-xs tracking-[0.4em] uppercase text-maroon/60 mb-3">Sacred Time</p>
            <p className="font-display text-5xl md:text-6xl text-maroon mb-2">09:15 AM</p>
            <p className="font-serif italic text-ink/70 mb-6">Sukla Paksha · Rohini Nakshatra</p>
            <OrnamentalDivider />
            <p className="font-serif italic text-lg text-ink/80 mt-6 leading-relaxed text-balance">
              "வாழ்க வளமுடன்" — May you flourish in abundance, dear child.
              May the heavens themselves bend to bless this moment.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAMILY & BLESSINGS ===== */}
      <section className="py-24 bg-sandal/40 border-y border-gold/15">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-display text-xs tracking-[0.4em] text-maroon uppercase mb-4">The Family</p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon mb-6">With Hearts Full of Joy</h2>
            <OrnamentalDivider />
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
            <div className="text-center md:text-right md:pr-8 md:border-r md:border-gold/30">
              <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Proud Parents</p>
              <p className="font-display text-2xl text-maroon">Karthik & Meenakshi Chettiar</p>
            </div>
            <div className="text-center md:text-left md:pl-8">
              <p className="font-display text-xs tracking-[0.4em] uppercase text-gold mb-3">Loving Grandparents</p>
              <p className="font-display text-2xl text-maroon">Ramanathan & Lakshmi · Subramanian & Kamala</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {blessings.map((b) => (
              <div
                key={b.who}
                className="relative bg-ivory border border-gold/30 p-6 rounded-sm before:absolute before:inset-2 before:border before:border-gold/15 before:pointer-events-none"
              >
                <p className="font-serif italic text-lg text-ink/80 mb-3 leading-relaxed">"{b.msg}"</p>
                <p className="font-display text-[10px] tracking-[0.3em] text-maroon uppercase">— {b.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VENUE ===== */}
      <section className="py-28 bg-ivory">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/30 rotate-1 pointer-events-none" />
            <div className="relative overflow-hidden rounded-sm ring-1 ring-maroon/10 shadow-[var(--shadow-mandap)]">
              <img
                src={venueImg}
                alt="Sri Meenakshi Kalyana Mandapam interior"
                width={1600}
                height={1000}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-display text-xs tracking-[0.4em] text-maroon uppercase mb-4">The Venue</p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon mb-6 leading-tight">
              Sri Meenakshi <span className="italic text-gold-shimmer">Kalyana Mandapam</span>
            </h2>
            <p className="font-serif text-lg text-ink/75 leading-relaxed mb-6 max-w-[48ch]">
              No. 42, Chithirai Veedhi, Madurai — Tamil Nadu, 625001. A heritage mandapam with carved
              teakwood pillars, just steps from the Meenakshi temple.
            </p>

            <dl className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 text-sm">
              <div>
                <dt className="font-display text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Landmark</dt>
                <dd className="font-serif text-ink/80">Opposite East Tower</dd>
              </div>
              <div>
                <dt className="font-display text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Parking</dt>
                <dd className="font-serif text-ink/80">Valet available</dd>
              </div>
              <div>
                <dt className="font-display text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Stay</dt>
                <dd className="font-serif text-ink/80">Heritage Madurai · 5 min</dd>
              </div>
              <div>
                <dt className="font-display text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Contact</dt>
                <dd className="font-serif text-ink/80">+91 98400 12345</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Meenakshi+Temple+Madurai"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-maroon text-ivory px-6 py-3 font-display tracking-[0.2em] uppercase text-xs hover:bg-ink transition-colors"
              >
                Get Directions
              </a>
              <button className="rounded-full border border-maroon/40 px-6 py-3 font-display tracking-[0.2em] uppercase text-xs text-maroon hover:bg-maroon hover:text-ivory transition-colors">
                QR Navigation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERNATIONAL / LIVESTREAM ===== */}
      <section className="py-24 bg-ink text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none paper-grain" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <p className="font-display text-xs tracking-[0.4em] text-gold uppercase mb-4">For Family Across the Seas</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">Watch the Ceremony Live</h2>
          <p className="font-serif italic text-ivory/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Distance is no barrier to blessing. Join us virtually as the sacred moment unfolds, with timezone-aware streaming for our loved ones worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="rounded-full bg-gold text-maroon px-7 py-3 font-display tracking-[0.2em] uppercase text-xs hover:bg-ivory transition-colors"
            >
              ● Watch Live
            </a>
            <button className="rounded-full border border-gold/40 px-7 py-3 font-display tracking-[0.2em] uppercase text-xs text-gold hover:bg-gold hover:text-maroon transition-colors">
              Send Digital Blessing
            </button>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-24 bg-sandal/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-display text-xs tracking-[0.4em] text-maroon uppercase mb-4">Memories</p>
            <h2 className="font-display text-4xl md:text-5xl text-maroon mb-6">A Family Album</h2>
            <OrnamentalDivider />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[babyPortrait, sacredElements, venueImg, babyPortrait, venueImg, sacredElements, babyPortrait, venueImg].map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-sm ring-1 ring-maroon/10 group ${
                  i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt={`Family memory ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RSVP ===== */}
      <section id="rsvp" className="py-28 bg-ivory">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-sandal/40 backdrop-blur-sm border border-gold/30 p-10 md:p-14 rounded-sm relative shadow-[var(--shadow-gold)]">
            <div className="absolute top-0 left-8 right-8 h-px bg-gold" />
            <div className="text-center mb-10">
              <p className="font-display text-xs tracking-[0.4em] text-maroon uppercase mb-3">Your Presence</p>
              <h2 className="font-display text-4xl text-maroon mb-3">Will You Bless Us?</h2>
              <p className="font-serif italic text-ink/60">Kindly respond by 10 August 2026</p>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Your blessings have been received. Nandri!");
              }}
            >
              <div>
                <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-maroon mb-2">
                  Family Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-maroon/30 py-3 focus:outline-none focus:border-maroon font-serif text-lg transition-colors"
                  placeholder="The Iyer family"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-maroon mb-2">
                    Guests
                  </label>
                  <select className="w-full bg-transparent border-b border-maroon/30 py-3 focus:outline-none focus:border-maroon font-serif">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-maroon mb-2">
                    Meal
                  </label>
                  <select className="w-full bg-transparent border-b border-maroon/30 py-3 focus:outline-none focus:border-maroon font-serif">
                    <option>South Indian Traditional</option>
                    <option>Jain Friendly</option>
                    <option>Child Meal</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-maroon mb-2">
                  Your Blessing
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-maroon/30 py-3 focus:outline-none focus:border-maroon font-serif italic resize-none"
                  placeholder="May this child be blessed with..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-maroon text-ivory py-4 font-display tracking-[0.3em] uppercase text-sm hover:bg-ink transition-colors mt-6"
              >
                Send Your Blessings
              </button>
              <p className="text-center font-serif italic text-xs text-ink/50">
                Or RSVP via WhatsApp: <span className="text-maroon">+91 98400 12345</span>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== SHARE ===== */}
      <section className="py-16 bg-sandal/30 border-t border-gold/15">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-display text-xs tracking-[0.4em] text-maroon uppercase mb-6">Share the Joy</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["WhatsApp", "Copy Link", "Save as Image", "Download PDF", "Google Calendar", "Apple Calendar"].map((s) => (
              <button
                key={s}
                className="rounded-full border border-maroon/30 px-5 py-2 font-display tracking-[0.2em] uppercase text-[10px] text-maroon hover:bg-maroon hover:text-ivory transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-24 bg-maroon text-ivory text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px kolam-border" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-32 opacity-80 pointer-events-none">
          <BrassLamp />
          <BrassLamp />
        </div>
        <div className="relative max-w-2xl mx-auto px-6 pt-32">
          <p className="font-tamil text-2xl text-gold mb-6">அன்புடன் அழைக்கும்</p>
          <p className="font-display text-3xl italic text-ivory mb-3">With Love, The Chettiar Family</p>
          <OrnamentalDivider className="text-gold mt-8 mb-8" />
          <p className="font-serif italic text-ivory/70 text-lg leading-relaxed max-w-md mx-auto">
            "May the lamps you light today illuminate his path for a thousand lifetimes."
          </p>
          <p className="mt-12 font-display text-[10px] tracking-[0.4em] text-gold/70 uppercase">
            Madurai · 24 August 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
