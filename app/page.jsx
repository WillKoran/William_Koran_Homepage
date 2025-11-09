import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import data from "../data.json";
import { ProfileOrganizations } from "./components/orgs";
import Research from "./components/research";
import ProjectExperience from "./components/project-experience";
import Skills from "./components/skills";
import MatrixText from "./components/matrix-text";
// keep Experience component available if needed
import Experience from "./components/experience";
import Matrix from "./components/matrix";
import { getUser } from "./data";

export default async function Home(props) {
	const searchParams = await props.searchParams;

	return <LandingComponent searchParams={searchParams} />;
}

const UserIcon = async ({ promise }) => {
	const user = await promise;
	return (
		<Image alt="👨‍💻" width={100} height={100} src={user.avatar_url || data.avatarUrl} className="float-right rounded-full mx-4" />
	);
};

// removed UserText per request (intro text is now handled elsewhere)

const LandingComponent = async ({ searchParams: { customUsername } }) => {
	const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
	const promise = getUser(username);

	return (
		<div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-y-auto bg-linear-to-tl from-black via-zinc-600/20 to-black">
			{/* top spacer (removed top nav per request) */}
			<div className="my-12" />

			<h1 className="flex items-center z-10 text-4xl hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-white p-5 matrix-item" style={{ '--i': '2' }}>
				<MatrixText text={data.displayName || username} />
				<Suspense fallback={<p>Loading...</p>}>
					<UserIcon promise={promise} />
				</Suspense>
			</h1>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			<div className="my-12 text-center w-full">
				{/* Matrix animation canvas (fades after a few seconds) */}
				<Matrix duration={6000} />

				{/* quick internal anchors with Resume download and contact links */}
				<nav className="mb-6 matrix-item" style={{ '--i': '3' }}>
					<ul className="flex items-center justify-center gap-6 text-sm">
						<li><a href="#research" className="underline">Research</a></li>
						<li><a href="#projects-experience" className="underline">Projects</a></li>
						<li><a href="#skills" className="underline">Skills</a></li>
						<li><a href="/WilliamKoran_Resume.pdf" download className="underline">Resume</a></li>
						{data.contacts && data.contacts.github && (
							<li><a href={data.contacts.github} target="_blank" rel="noopener noreferrer" className="underline">GitHub</a></li>
						)}
						{data.contacts && data.contacts.linkedin && (
							<li><a href={data.contacts.linkedin.startsWith('http') ? data.contacts.linkedin : `https://${data.contacts.linkedin}`} target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a></li>
						)}
						{data.contacts && data.contacts.email && (
							<li><a href={`mailto:${data.contacts.email}`} className="underline">Email</a></li>
						)}
					</ul>
				</nav>

				<div className="w-full max-w-4xl mx-auto matrix-content">
					<div className="matrix-item" style={{ '--i': '5' }}><ProfileOrganizations username={username} /></div>

					{/* Research section */}
					<div className="matrix-item" style={{ '--i': '6' }}>
						<Research />
					</div>

					{/* Project experience section */}
					<div className="matrix-item" style={{ '--i': '7' }}>
						<ProjectExperience />
					</div>

					{/* Skills and frameworks (bottom) */}
					<div id="skills" className="matrix-item" style={{ '--i': '8' }}>
						<Skills />
					</div>

					{/* optional work experience retained below (hidden) */}
					{/*
					<div className="matrix-item mt-8" style={{ '--i': '9' }}>
						<Experience />
					</div>
					*/}
				</div>
			</div>
		</div>
	);
};

