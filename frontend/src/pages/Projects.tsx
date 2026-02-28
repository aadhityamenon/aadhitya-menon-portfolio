export default function Projects() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Projects</h1>

      {/* Project 1 */}
      <section className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold">Project One</h2>
        <p className="mt-2 text-sm text-gray-700">
          Brief description of what this project does, the problem it solves,
          and why you built it.
        </p>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Tech:</span> React, TypeScript, Tailwind
        </p>
      </section>

      {/* Project 2 */}
      <section className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold">Project Two</h2>
        <p className="mt-2 text-sm text-gray-700">
          Brief description of the second project and your role in building it.
        </p>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Tech:</span> React, Express, API usage
        </p>
      </section>
    </main>
  );
}