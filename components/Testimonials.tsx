
import Image from 'next/image';

const clients = [
  { name: "TechCorp", description: "Gchat AI revolutionized our customer service. Response times dropped by 80%.", website: "https://techcorp-dummy.com" },
  { name: "GrowthLabs", description: "The setup was incredibly fast. We saw immediate ROI within the first week of deployment.", website: "https://growthlabs-dummy.com" },
  { name: "FinEdge", description: "Security and accuracy were our top concerns. Gchat delivered on both fronts flawlessly.", website: "https://finedge-dummy.com" },
  { name: "EduStream", description: "Our students love the instant support. It feels natural and incredibly helpful.", website: "https://edustream-dummy.com" },
  { name: "RetailFlow", description: "Sales conversions increased by 40% after integrating the chatbot on our checkout pages.", website: "https://retailflow-dummy.com" },
  { name: "HealthPlus", description: "Handling patient inquiries has never been easier. A must-have tool for any modern clinic.", website: "https://healthplus-dummy.com" },
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
            <div key={i} className="flex flex-col p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-primary">{client.name}</h3>
              <p className="text-muted-foreground flex-1 italic">"{client.description}"</p>
              <a href={client.website} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                Visit Website <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
