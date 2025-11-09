import data from "../../data.json";

export default function ContactCard() {
  const contacts = data.contacts || {};
  const hasLinkedin = contacts.linkedin && contacts.linkedin.length > 0;
  const hasEmail = contacts.email && contacts.email.length > 0;

  return (
    <div className="p-4 mt-4 bg-zinc-900/40 rounded-md border border-zinc-700 matrix-item" style={{ '--i': '6' }}>
      <h4 className="text-lg font-medium mb-2 text-zinc-200">Contact</h4>
      <p className="text-sm text-zinc-300 mb-3">Connect with me:</p>
      <div className="flex items-center gap-3">
        {contacts.github && (
          <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
            GitHub
          </a>
        )}
        {hasLinkedin && (
          <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
            LinkedIn
          </a>
        )}
        {hasEmail && (
          <a href={`mailto:${contacts.email}`} className="px-3 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
            Email
          </a>
        )}
      </div>
    </div>
  );
}
