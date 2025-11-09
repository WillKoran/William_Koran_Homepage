import data from "../../data.json";

function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
}

function YearsBar({ name, years, maxYears }) {
    const pct = maxYears > 0 ? Math.round((years / maxYears) * 100) : 0;
    return (
        <div className="p-3 bg-zinc-900/50 rounded-md border border-zinc-700">
            <div className="flex justify-between mb-2 text-sm text-zinc-200">
                <span>{name}</span>
                <span className="text-zinc-400">{years} yr{years !== 1 ? 's' : ''}</span>
            </div>
            <div className="w-full bg-zinc-800 rounded h-2 overflow-hidden">
                <div
                    className="h-2 bg-gradient-to-r from-emerald-400 to-blue-400"
                    style={{ width: `${clamp(pct, 4, 100)}%` }}
                    aria-hidden
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const languages = data.languages || [];
    const frameworks = data.frameworks || [];
    const interpersonal = data.interpersonal || [];

    const techCombined = [...languages.map(l => ({...l})), ...frameworks.map(f => ({...f}))];
    const maxYears = techCombined.reduce((m, s) => Math.max(m, s.years || 0), 0) || 1;

    // Fallback: if old skills array exists and new groups are empty, keep old behavior
    if (!languages.length && !frameworks.length && data.skills && data.skills.length) {
        const skills = data.skills;
        return (
            <section className="my-12 w-full max-w-4xl mx-auto text-left">
                <h3 className="text-2xl font-semibold mb-4 text-white">Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((s) => (
                        <div key={s.name} className="p-4 bg-zinc-900/50 rounded-md border border-zinc-700">
                            <div className="flex justify-between mb-2 text-sm text-zinc-200">
                                <span>{s.name}</span>
                                <span className="text-zinc-400">{s.level}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded h-2 overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-emerald-400 to-blue-400" style={{ width: `${s.level}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="my-12 w-full max-w-4xl mx-auto text-left">
            <h3 className="text-2xl font-semibold mb-4 text-white">Skills</h3>

            {/* Top: Languages and Frameworks side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-lg font-medium mb-3 text-zinc-200">Languages</h4>
                    <div className="grid gap-3">
                        {languages.map((l) => (
                            <YearsBar key={l.name} name={l.name} years={l.years} maxYears={maxYears} />
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-medium mb-3 text-zinc-200">Frameworks</h4>
                    <div className="grid gap-3">
                        {frameworks.map((f) => (
                            <YearsBar key={f.name} name={f.name} years={f.years} maxYears={maxYears} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom: Interpersonal full-width */}
            <div className="mt-6">
                <h4 className="text-lg font-medium mb-3 text-zinc-200">Interpersonal</h4>
                <div className="flex flex-wrap gap-2">
                    {interpersonal.map((it) => (
                        <button key={it.name} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 text-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                            {it.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
