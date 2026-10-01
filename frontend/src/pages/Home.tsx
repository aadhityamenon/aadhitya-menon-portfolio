import {Link} from "react-router-dom";
import Antigravity from '../components/Antigravity';


export default function Home() {

  return (
    <div className="relative">
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

    <main className="pt-14 flex items-center">
      <div className="max-w-5xl mx-auto px-8 pt-32 pb-12 w-full">
        <div className="animate-fade-up-delay-1">
          {/* Title Page Display */}
          <span className="font-[family-name:var(--font-mono)] text-4xl text-stone-400 tracking-widest uppercase">
            Software Engineer
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl leading-none mt-6 animate-fade-up-delay-2">
          Aadhitya Menon
        </h1>

        <p className="mt-8 text-stone-500 text-lg max-w-xl leading-relaxed animate-fade-up-delay-3">
          CS student at UC Irvine who rewrites cloud billing systems by day
          and argues with reinforcement learning papers by night.
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
            { label: "Based in", value: "Pleasanton, CA" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-[family-name:var(--font-mono)] text-xs text-stone-400 uppercase tracking-widest">
                {label}
              </p>
              <p className="mt-1 text-stone-900 font-medium">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Currently */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs text-stone-400 uppercase tracking-widest mb-4">
              Currently
            </p>
            <div className="space-y-4">
              {[
                { name: "Aquila Clouds", role: "Software Engineer Intern" },
                { name: "Beckman Laser Institute", role: "Undergraduate AI/ML Researcher" },
                { name: "TutorConnect", role: "Building an AI tutor-matching platform" },
              ].map(({ name, role }) => (
                <div key={name}>
                  <p className="text-stone-900 font-medium text-sm">{name}</p>
                  <p className="text-stone-500 text-sm">{role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal-style snippet */}
          <div className="bg-stone-900 rounded-lg overflow-hidden self-start">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-stone-800">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
            </div>
            <div className="p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed">
              <p className="text-stone-500">$ whoami</p>
              <p className="text-stone-200">aadhitya — cs student, uc irvine</p>
              <p className="text-stone-500 mt-3">$ status --current</p>
              <p className="text-stone-200">shipping cloud infra</p>
              <p className="text-stone-200">reading RL papers</p>
              <p className="text-stone-200">rarely sleeping</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}