import data from "../../data.json";

export default function Experience() {
    const items = data.experience || [];

    return (
        <section className="my-12 w-full max-w-4xl mx-auto text-left">
            <h3 className="text-2xl font-semibold mb-4 text-white">Experience</h3>
            <div className="flex flex-col gap-4">
                {items.map((it, idx) => (
                    <div key={idx} className="p-4 bg-zinc-900/50 rounded-md border border-zinc-700">
                        <div className="flex items-baseline justify-between">
                            <h4 className="text-lg font-medium text-white">{it.role} <span className="text-zinc-400">@ {it.company}</span></h4>
                            <div className="text-sm text-zinc-400">{it.start} — {it.end}</div>
                        </div>
                        <p className="mt-2 text-zinc-300 text-sm">{it.description}</p>
                        {it.summary && <p className="mt-2 text-zinc-400 text-sm">{it.summary}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
}
