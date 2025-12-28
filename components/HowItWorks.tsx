
import { CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: "Register Your Business",
      description: "Fill in your details and let AI learn about your business from your website or documents."
    },
    {
      title: "Get Your Script",
      description: "Customize your bot's appearance and copy the generated embed script."
    },
    {
      title: "Go Live",
      description: "Paste the script into your website's HTML and start serving customers immediately."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-zinc-900/50" id="how-it-works">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-black dark:text-white">
            Integrate in Less Than 5 Minutes
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            No coding skills required. Just copy, paste, and you're done.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col p-6 bg-card rounded-xl shadow-sm border border-border hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shadow-md shadow-blue-600/20">
                            {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground pl-14">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
