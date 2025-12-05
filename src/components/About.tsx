import { Code2, Palette, Smartphone, Globe } from 'lucide-react';

const highlights = [
  { icon: Code2, label: '8+ Years Experience', delay: '0.1s' },
  { icon: Globe, label: 'Web Development', delay: '0.2s' },
  { icon: Smartphone, label: 'App Development', delay: '0.3s' },
  { icon: Palette, label: 'UI/UX Design', delay: '0.4s' },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed opacity-0 animate-slide-right" style={{ animationDelay: '0.1s' }}>
              I'm a passionate Full Stack Developer with over 8 years of experience in building 
              scalable web and mobile applications. My journey in tech has taken me through 
              various companies including <span className="text-foreground font-medium">Cloud Web Technology</span>, 
              <span className="text-foreground font-medium"> Kifwat India</span>, and 
              <span className="text-foreground font-medium"> MMF Infotech</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed opacity-0 animate-slide-right" style={{ animationDelay: '0.2s' }}>
              Currently working as a freelancer, I specialize in React, Node.js, PHP, 
              React Native, and Flutter. I also have expertise in Figma for creating 
              beautiful UI/UX designs that bring ideas to life.
            </p>
            <p className="text-muted-foreground leading-relaxed opacity-0 animate-slide-right" style={{ animationDelay: '0.3s' }}>
              I believe in writing clean, maintainable code and creating user experiences 
              that make a difference. Every project is an opportunity to learn something new 
              and push the boundaries of what's possible.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="card-gradient p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-500 group magnetic-hover opacity-0 animate-scale-in"
                style={{ animationDelay: item.delay }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                </div>
                <p className="font-medium group-hover:text-primary transition-colors duration-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;