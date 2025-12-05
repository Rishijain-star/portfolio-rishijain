import { ArrowDown, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import rishiPhoto from '@/assets/rishi-photo.png';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-bounce-subtle" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full text-sm text-muted-foreground opacity-0 animate-fade-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Available for Freelance
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight opacity-0 animate-fade-up stagger-1">
              Hi, I'm{' '}
              <span className="gradient-text animate-gradient bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_auto]">Rishi Jain</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground opacity-0 animate-fade-up stagger-2">
              Full Stack Developer & UI/UX Designer
            </p>
            
            <p className="text-muted-foreground max-w-lg leading-relaxed opacity-0 animate-fade-up stagger-3">
              8+ years of experience crafting web & mobile applications using React, Node.js, 
              Flutter, and React Native. Transforming ideas into digital reality.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground opacity-0 animate-fade-up stagger-4">
              <span className="flex items-center gap-2 hover:text-primary transition-colors">
                <MapPin size={16} className="text-primary" />
                Indore, India
              </span>
              <span className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                rishijain9343@gmail.com
              </span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 opacity-0 animate-fade-up stagger-5">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(187_52%_45%/0.4)] hover:scale-105"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                View Projects
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2 opacity-0 animate-slide-right" style={{ animationDelay: '0.6s' }}>
              <a
                href="https://github.com/Rishijain-star"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/rishi-jain-b14945262/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end opacity-0 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/10 scale-125 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
              
              {/* Image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 glow-effect group-hover:border-primary/50 transition-all duration-500">
                <img
                  src={rishiPhoto}
                  alt="Rishi Jain"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          <span className="text-xs">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce-subtle" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;