
import { Zap, Headphones, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: "Boost Engagement",
      description: "Instantly respond to customer queries and keep them engaged with your brand 24/7."
    },
    {
      icon: <Headphones className="h-10 w-10 text-blue-500" />,
      title: "Reduce Support Costs",
      description: "Automate repetitive tasks and let your team focus on complex issues."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
      title: "Increase Conversions",
      description: "Guide visitors through your sales funnel and turn leads into customers effortlessly."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-black" id="features">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-black dark:text-white">
            Why Choose Our Chatbot?
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Our platform provides everything you need to build, deploy, and manage AI chatbots that actually work for your business.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="group flex flex-col items-center space-y-4 p-6 border border-border rounded-xl bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-center text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
