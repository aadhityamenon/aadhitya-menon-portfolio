import {Link} from "react-router-dom";
import Antigravity from '../components/Antigravity';


export default function Home() {

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Antigravity effect */}
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#5227FF"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>
      <div className="fixed inset-0 -z-5 bg-white/60 backdrop-blur-[1px]" />

    <main className="min-h-screen pt-14 flex items-center">
      <div className="max-w-5xl mx-auto px-8 py-32 w-full">
        <div className="animate-fade-up-delay-1">
          {/* Title Page Display */}
          <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 tracking-widest uppercase">
            Software Engineer
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl leading-none mt-6 animate-fade-up-delay-2">
          Aadhitya Menon
        </h1>

        <p className="mt-8 text-stone-500 text-lg max-w-xl leading-relaxed animate-fade-up-delay-3">
          CS student at UC Irvine. I build things that are helpful, fast, reliable, and
          occasionally interesting.
        </p>

        <div className="mt-12 flex items-center gap-6 animate-fade-up-delay-4">
          {/* Link to projects page */}
          <Link
            to="/projects"
            className="px-6 py-3 bg-stone-900 text-stone-50 text-sm tracking-wide hover:bg-stone-700 transition-colors"
          >
            View Projects
          </Link>
          {/* Link to about page */}
          <Link
            to="/about"
            className="text-sm text-stone-400 hover:text-stone-900 transition-colors underline underline-offset-4"
          >
            About me
          </Link>
        </div>

        <div className="mt-32 pt-8 border-t border-stone-200 flex gap-8 animate-fade-up-delay-4">
          {/* Information section */}
          {[
            { label: "Focus", value: "AI, Bioinformatics, Statistics" },
            { label: "Based in", value: "Irvine, CA" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-[family-name:var(--font-mono)] text-xs text-stone-400 uppercase tracking-widest">
                {label}
              </p>
              <p className="mt-1 text-stone-900 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    </div>
  );
}