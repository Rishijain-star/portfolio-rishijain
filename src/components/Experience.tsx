import { Briefcase } from 'lucide-react';

const experiences = [
  {
    company: 'Freelancer',
    role: 'Full Stack Developer',
    period: 'Present',
    description: 'Working on diverse web and mobile projects for clients worldwide. Specializing in React, Node.js, and mobile app development.',
  },
  {
    company: 'MMF Infotech',
    role: 'Software Developer',
    period: 'Previous',
    description: 'Developed scalable web applications and contributed to multiple client projects using modern tech stack.',
  },
  {
    company: 'Kifwat India',
    role: 'Full Stack Developer',
    period: 'Previous',
    description: 'Built and maintained full-stack applications, worked on both frontend and backend systems.',
  },
  {
    company: 'Cloud Web Technology',
    role: 'Developer',
    period: 'Previous',
    description: 'Started my professional journey, working on web development projects and learning industry best practices.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative opacity-0 animate-slide-right"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline Dot with pulse effect */}
                <div className="absolute -left-[41px] w-5 h-5 bg-background border-4 border-primary rounded-full group-hover:scale-125 transition-transform">
                  <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
                </div>
                
                <div className="card-gradient p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-500 group magnetic-hover">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">{exp.company}</h3>
                        <p className="text-primary text-sm">{exp.role}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground group-hover:bg-primary/20 transition-colors duration-300">
                        <Briefcase size={12} />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;