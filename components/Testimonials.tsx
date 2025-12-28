
import Image from 'next/image';

const clients = [
  { name: "JioSkill", description: "The AI chatbot has transformed our customer support. We now handle 70% more inquiries without expanding our team.", website: "https://jioskill.com" },
  { name: "Codexon", description: "Integration was seamless and took less than 5 minutes. Our client engagement metrics improved by 55% within the first month.", website: "https://codexon.in" },
  { name: "Bitmentor", description: "Exceptional platform! The chatbot understands our students' needs perfectly. Support tickets have dropped by 60%.", website: "https://bitmentor.in" },
  { name: "Bihari World", description: "Our community members get instant answers 24/7. The chatbot's ability to learn from our specific content is a game-changer.", website: "https://bihari.world" },
  { name: "AmzSoft", description: "We reduced our support response time from hours to seconds. The ROI was immediate and our clients are extremely satisfied.", website: "https://amzsoftinnovexa.com" },
  { name: "CreoAura", description: "Our portfolio inquiries are handled perfectly by the chatbot. Clients feel heard, leading to a 48% increase in conversion rates.", website: "https://creoaura.com" },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-black border-t dark:border-zinc-800">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12 text-black dark:text-white">
          Our Recent Clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, i) => (
            <div key={i} className="flex flex-col p-6 rounded-xl border bg-gray-50 dark:bg-zinc-900/50 dark:border-zinc-800 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold mb-2 text-blue-600 dark:text-blue-400">{client.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 flex-1 italic">"{client.description}"</p>
              <a href={client.website} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                Visit Website &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
