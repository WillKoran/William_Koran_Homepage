import data from "../../data.json";
import { Card } from "./card";

export default function Research() {
    const items = data.research || [];
    // show the BASKET120 entry first if present
    const primary = items[0];

    if (!primary) return null;

    return (
        <section id="research" className="my-20 w-full max-w-4xl mx-auto text-left">
            <h2 className="text-3xl font-semibold mb-6 matrix-item" style={{ '--i': '1' }}>Research Experience</h2>

            <Card>
                <div className="p-6">
                    <header className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold matrix-text leading-tight">
                                <a href="https://openreview.net/forum?id=vslpTo9GDb&referrer=%5Bthe%20profile%20of%20William%20Koran%5D(%2Fprofile%3Fid%3D~William_Koran1)" target="_blank" rel="noopener noreferrer" className="hover:underline">{primary.title}</a>
                            </h3>
                            <div className="mt-2 text-zinc-400 text-sm">{primary.institution} — <span className="italic">{primary.role}</span></div>
                        </div>

                        <div className="flex-shrink-0 ml-4 text-sm text-zinc-400 text-right">{primary.start} — {primary.end}</div>
                    </header>

                    <div className="mt-4 text-sm text-zinc-300">
                        <p>{primary.description}</p>

                        {primary.contributions && (
                            <ul className="mt-4 list-disc pl-5 text-sm text-zinc-300 space-y-2">
                                {primary.contributions.map((c, i) => (
                                    <li key={i} className="leading-relaxed">{c}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </Card>

            <div className="my-8 h-px bg-zinc-800" />
        </section>
    );
}
