
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
            <div key={index} className="flex flex-col items-center space-y-4 p-6 border rounded-xl bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-lg transition-all duration-200">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">{feature.title}</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
