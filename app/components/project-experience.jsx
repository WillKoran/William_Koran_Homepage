"use client";

import { useState } from "react";
import data from "../../data.json";

export default function ProjectExperience() {
    const items = data.portfolioProjects || [];

    return (
        <section id="projects-experience" className="my-20 w-full max-w-4xl mx-auto text-left">
            <h2 className="text-3xl font-semibold mb-6 matrix-item" style={{ '--i': '1' }}>Project Experience</h2>
            <div className="grid gap-6">
                {items.map((p, idx) => (
                    <div key={idx} className="p-4 bg-zinc-900/40 rounded-md border border-zinc-700 matrix-item" style={{ '--i': `${2 + idx}` }}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{p.name}</h3>
                            {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 underline">Repo</a>}
                        </div>

                        {/* Media preview (video or image) */}
                        {p.video && (
                            <div className="mt-3">
                                <video
                                    src={p.video}
                                    controls
                                    muted
                                    loop
                                    playsInline
                                    className="w-full max-h-96 rounded-md object-contain bg-black p-1"
                                    aria-label={`${p.name} gameplay preview`}
                                    onMouseEnter={(e) => {
                                        try { e.currentTarget.muted = true; e.currentTarget.play(); } catch (err) {}
                                    }}
                                    onMouseLeave={(e) => {
                                        try { e.currentTarget.pause(); e.currentTarget.currentTime = 0; } catch (err) {}
                                    }}
                                />
                            </div>
                        )}

                        {/* Multiple stacked images (MRI) */}
                        {p.images && Array.isArray(p.images) && (
                            <div className="mt-3 flex flex-col gap-3">
                                {p.images.map((img, i) => (
                                    <img key={i} src={img} alt={`${p.name} screenshot ${i + 1}`} className="w-full max-h-96 rounded-md object-contain bg-black p-1" />
                                ))}
                            </div>
                        )}

                        {/* Single image fallback */}
                        {p.image && !p.video && !p.images && (
                            <div className="mt-3">
                                <img src={p.image} alt={`${p.name} screenshot`} className="w-full max-h-96 rounded-md object-contain bg-black p-1" />
                            </div>
                        )}

                        <p className="mt-3 text-zinc-300 text-sm">{p.description}</p>
                        {p.highlights && (
                            <ul className="mt-3 list-disc pl-5 text-sm text-zinc-300 space-y-1">
                                {p.highlights.map((h, i) => (
                                    <li key={i} className="leading-relaxed">{h}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
