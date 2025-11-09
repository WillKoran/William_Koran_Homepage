import Link from "next/link";
import Image from "next/image";
import { getUserOrganizations } from "../data";
import data from "../../data.json";
import MatrixText from "./matrix-text";

export const ProfileOrganizations = async ({ username }) => {

	const organizations = (await getUserOrganizations(username)).data.user?.organizations.nodes;

	return (
		<div>
			{/* Intro blurb (from data.json) */}
			{data.intro && (
				<p className="text-zinc-300 mb-3">
					<MatrixText text={data.intro} totalDuration={2200} />
				</p>
			)}

			{/* Organizations line (if any) */}
			{organizations?.length > 0 && (
				<p>
					Affiliated with <span className="mt-3 overflow-hidden">
						{organizations.map((org, i, a) => (
							<span key={org.name}>
								{i > 0 && i < a.length - 1 && ', '}
								{i > 0 && i === a.length - 1 && ' and '}
								<Link
									target="_blank"
									href={org.websiteUrl || org.url}
									className="underline duration-500 hover:text-zinc-300"
								>
									<span className="text">{org.name}</span>
									<Image className="ms-1 inline-block rounded-md" src={org.avatarUrl} alt={org.name} title={[org.name, org.description].filter(o => !!o).join(': ')} width={24} height={24} />
								</Link>
							</span>
						))}
					</span>
				</p>
			)}
		</div>
	);
};
