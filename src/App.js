import React, { useEffect, useState } from "react";
import paper from "./paper.jpg";
import blackStrip from "./blackstrip.jpg";
import brick from "./brick.jpg";
import fabric from "./fabric.jpg";
import stage from "./stage.jpg";

// logo assets removed; using CSS-only placeholders instead
export default function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-sans text-white bg-black" id="top">
      {/* Global CSS fixes inserted here */}
      <style>{`
        :root{
          --header-h: 84px;
          --accent-1: #f6936f;
          --accent-2: #f05820;
        }

        /* header */
        header {
          height: var(--header-h);
          min-height: var(--header-h);
        }

        /* reserve space so header doesn't overlap content */
        main { padding-top: calc(var(--header-h) + 8px); }

        /* hero layout */
        #hero {
          position: relative;
          overflow: visible;
        }

        /* stacked wordmark left */
        .orca-wordmark {
          z-index: 30;
          position: relative;
          color: #000;
          font-weight: 900;
          line-height: 0.92;
          /* responsive sizing */
          font-size: clamp(28px, 5.4vw, 64px);
          letter-spacing: -0.02em;
        }

        .orca-wordmark .line {
          margin: 0;
        }

        /* big "RCA" wordmark style (the large centered title) */
        .big-rca {
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #000;
          text-shadow: 0 18px 30px rgba(0,0,0,0.45);
          /* scale with viewport but clamp */
          font-size: clamp(80px, 20vw, 300px);
          line-height: 0.9;
          margin: 0;
          z-index: 20;
        }

        /* hero logo card (round mark) — constrained size so it doesn't blow up) */
        .hero-logo-card {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: min(220px, 30vw);
          height: auto;
          max-width: 320px;
          z-index: 40;
        }

        /* fake-mark — visual circular mark used across sections */
        .fake-mark {
          width: 88px;
          height: 88px;
          border-radius: 999px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          background: radial-gradient(circle at 35% 35%, #fff 0%, #f3f3f3 50%);
        }
        /* when used as large circular mark in hero, override with hero-mark */
        .hero-mark {
          width: min(220px, 30vw);
          height: min(220px, 30vw);
        }

        /* small layout / stacking fixes for sections */
        section { position: relative; }

        /* reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 600ms ease, transform 600ms ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Black strip styling */
        #strip { background-repeat: no-repeat; background-size: cover; }

        /* Poster card */
        #brick .mx-auto {
          max-width: 960px;
        }

        /* White strip text sizing */
        @media (min-width: 1024px) {
          .orca-wordmark { font-size: 56px; }
        }

        /* Ensure hero contents don't overlap each other badly */
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr minmax(200px, 420px);
          align-items: center;
          gap: 28px;
          width: 100%;
        }

        /* ensure images/backgrounds remain cover and centered */
        #hero, #strip, #brick, #fabric, #stage {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }

        /* footer spacing */
        footer { position: relative; z-index: 10; }

        /* small-screen tweaks */
        @media (max-width: 768px) {
          :root { --header-h: 68px; }
          .hero-inner { grid-template-columns: 1fr; gap: 16px; }
          .big-rca { display: none; } /* hide huge RCA on small screens */
          .orca-wordmark { font-size: clamp(22px, 7vw, 40px); }
          .hero-logo-card { width: 140px; }
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-[7vw] py-3 bg-black/88 backdrop-blur border-b border-[#f05820]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f6936f] to-[#f05820] flex items-center justify-center shadow-sm">
            <span className="sr-only">Orca</span>
          </div>
          <div className="uppercase tracking-[0.12em] text-xs font-bold text-white">The Orca Studios</div>
        </div>

        <nav className="hidden md:flex gap-6 text-xs uppercase tracking-[0.12em] text-white/90">
          <button onClick={() => scrollTo("#hero")} className="hover:text-[#f6936f]">Intro</button>
          <button onClick={() => scrollTo("#strip")} className="hover:text-[#f6936f]">Brand</button>
          <button onClick={() => scrollTo("#brick")} className="hover:text-[#f6936f]">Poster</button>
          <button onClick={() => scrollTo("#fabric")} className="hover:text-[#f6936f]">Fabric</button>
          <button onClick={() => scrollTo("#stage")} className="hover:text-[#f6936f]">Stage</button>
        </nav>

        <button onClick={() => setShowModal(true)} className="rounded-full px-4 py-1.5 text-xs font-semibold bg-gradient-to-tr from-[#f6936f] to-[#f05820] text-black">
          Book a call
        </button>
      </header>

      <main>
        {/* HERO */}
        <section
          id="hero"
          aria-label="Hero"
          className="relative min-h-[72vh] flex items-center px-6 md:px-[7vw] py-12"
          style={{
            backgroundImage: `url(${paper})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        >
          <div className="max-w-6xl w-full mx-auto hero-inner">
            <div className="reveal">
              <div className="orca-wordmark">
                <p className="line">THE</p>
                <p className="line">ORCA</p>
                <p className="line">STUDIOS</p>
              </div>

              <p className="text-sm text-[#222] max-w-lg mt-6">
                The Orca studios. We are a media content agency that builds cinematic visuals,
                motion design and short-form assets that convert and delight audiences.
              </p>
            </div>

            <div className="reveal flex justify-center items-center">
              <div className="hero-logo-card">
                {/* constrained visual mark */}
                <div className="fake-mark hero-mark" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* BLACK STRIP */}
        <section
          id="strip"
          className="py-10"
          style={{
            backgroundImage: `url(${blackStrip})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center gap-10 px-6 md:px-0 justify-start">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
              <div className="fake-mark" aria-hidden="true" />
            </div>
            <div className="uppercase font-black text-6xl tracking-[0.12em] text-white drop-shadow-lg">RCA</div>
          </div>
        </section>

        {/* BRICK POSTER */}
        <section id="brick" className="py-16">
          <div
            className="max-w-4xl mx-auto reveal relative px-6"
            style={{
              backgroundImage: `url(${brick})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 12,
              padding: "6rem 2rem",
            }}
          >
            <div className="mx-auto w-[460px] bg-[rgba(244,239,233,0.98)] rounded-[18px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-8 text-center">
              <div className="orca-wordmark inline-block text-left">
                <p className="line">THE</p>
                <p className="line">ORCA</p>
                <p className="line">STUDIOS</p>
              </div>
              <p className="mt-6 text-sm text-[#444]">
                Visual storytelling, launch visuals, motion graphics and content systems for brands that want to feel cinematic yet bold.
              </p>
            </div>
          </div>
        </section>

        {/* WHITE strip */}
        <section className="bg-white text-black py-10">
          <div className="max-w-6xl mx-auto px-6 flex items-center gap-8 justify-start reveal">
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center">
              <div className="fake-mark" aria-hidden="true" />
            </div>
            <div className="uppercase font-black text-5xl tracking-[0.12em]">RCA</div>
          </div>
        </section>

        {/* FABRIC */}
        <section
          id="fabric"
          className="py-20"
          style={{
            backgroundImage: `url(${fabric})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 items-center">
            <div className="relative reveal h-64 md:h-72">
              <div className="absolute left-8 top-8 w-44 h-44 rounded-full bg-white flex items-center justify-center shadow-xl">
                <div className="fake-mark" aria-hidden="true" />
              </div>
              <div className="absolute right-8 bottom-8 w-44 h-44 rounded-full bg-black flex items-center justify-center shadow-xl">
                <div className="fake-mark" aria-hidden="true" />
              </div>
            </div>

            <div className="reveal text-white max-w-md">
              <p className="uppercase tracking-[0.16em] text-xs mb-2">Brand playground</p>
              <p className="text-sm">
                Fabric-inspired lighting gives Orca a cinematic stage. The white and black logo variations glide over the orange cloth, mirroring your brand mockups.
              </p>
            </div>
          </div>
        </section>

        {/* STAGE / COMING SOON */}
        <section
          id="stage"
          className="min-h-[64vh] flex items-center justify-center py-16"
          style={{
            backgroundImage: `url(${stage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-5xl w-full reveal px-6">
            <div className="bg-white/95 text-black rounded-[14px] px-6 py-8 shadow-[0_32px_80px_rgba(0,0,0,0.9)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                  <div className="fake-mark" aria-hidden="true" />
                </div>
                <div className="uppercase tracking-[0.16em] text-xs">The Orca Studios</div>
              </div>

              <div className="text-right">
                <p className="uppercase tracking-[0.26em] text-xs">COMING SOON</p>
                <p className="text-sm text-[#444]">Website launch experience for your media content agency.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#f05820]/40 bg-black px-6 md:px-[7vw] py-4 flex items-center justify-between text-xs text-[#e5e5e5]">
        <p>© {new Date().getFullYear()} The Orca Studios. All rights reserved.</p>
        <button onClick={() => scrollTo("#top")} className="uppercase tracking-[0.12em] text-[0.7rem] text-[#f6936f]">Back to top ↑</button>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          <div
            role="button"
            tabIndex={0}
            aria-label="Close"
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowModal(false)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowModal(false); }}
          />
          <div className="absolute left-1/2 top-1/2 max-w-2xl w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[#050505] border border-[#f05820]/60 rounded-2xl px-6 py-6">
            <button onClick={() => setShowModal(false)} className="absolute right-4 top-2 text-xl">×</button>
            <h3 className="uppercase tracking-[0.16em] text-[0.85rem] text-[#f6936f] mb-2">Concept reel</h3>
            <p className="text-sm text-[#f0f0f0]">Replace with Vimeo/YouTube embed when available.</p>
          </div>
        </div>
      )}
    </div>
  );
}