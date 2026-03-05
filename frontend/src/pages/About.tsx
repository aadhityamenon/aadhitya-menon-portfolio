import profile from "../assets/profile.jpg";

const facts = [
  { label: "University", value: "UC Irvine" },
  { label: "Major", value: "Computer Science" },
  { label: "Hometown", value: "Pleasanton, CA" },
  { label: "Interests", value: "Tennis, Soccer, Mythology" },
];

export default function About() {
  return (
    <main className="min-h-screen pt-14">
      <div className="max-w-5xl mx-auto px-8 py-24">

        <div className="border-b border-stone-200 pb-8 mb-16">
          <span className="font-[family-name:var(--font-mono)] text-xs text-stone-400 tracking-widest uppercase">
            About
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl mt-4">
            Who I am
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>
              I'm a CS freshman at UC Irvine from Pleasanton, California. I'm
              drawn to problems at the intersection of systems reliability, data
              integrity, and machine learning — work that actually holds up under
              pressure.
            </p>
            <p>
              My experience ranges from building an AI misinformation detection
              model with 92.3% accuracy using NLP and logistic regression, to
              shipping production features in React during my internship at Hey,
              Blue! — where I worked on authentication and data-handling systems.
            </p>
            <p>
              I've led projects involving data pipelines, algorithmic
              optimization, and AI-driven personalized learning tools, and held
              leadership roles in CS and Robotics clubs.
            </p>
            <p className="text-stone-400 text-sm">
              Outside tech — tennis, soccer, the gym, traveling, mythology, and
              finding good food wherever I end up.
            </p>

            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-stone-200">
              {facts.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-mono)] text-xs text-stone-400 uppercase tracking-widest">
                    {label}
                  </p>
                  <p className="mt-1 text-stone-800 text-sm font-medium">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={profile}
              alt="Aadhitya Menon"
              className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 border border-stone-300 translate-x-0 translate-y-0 -z-10" />
          </div>
        </div>
      </div>
    </main>
  );
}