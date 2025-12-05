import { Globe, Smartphone, Server, Palette } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive web applications using React, Node.js, and PHP with focus on performance and user experience.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps using React Native and Flutter that work seamlessly on iOS and Android.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Scalable server-side solutions with Node.js, PHP, MongoDB, and MySQL for robust data management.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed in Figma with focus on user-centered design principles.',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
];

const Services = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative card-gradient p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-500 text-center magnetic-hover overflow-hidden opacity-0 animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-xl border border-primary/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;