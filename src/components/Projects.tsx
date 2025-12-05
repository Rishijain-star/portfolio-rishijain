import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Yogsanjog',
    description: 'A comprehensive web platform built with React and Node.js, featuring modern UI and robust backend architecture.',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: 'https://yogsanjog.com',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Clikkle',
    description: 'Full-stack application developed with JSX frontend and Node.js backend, integrated with MongoDB for data management.',
    tech: ['JSX', 'Node.js', 'MongoDB'],
    link: 'https://clikkle.com',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'AI Live Code',
    description: 'WordPress-based website with custom functionality and optimized performance.',
    tech: ['WordPress', 'PHP', 'MySQL'],
    link: 'https://ailivecode.com',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'AI Gift Suggestion App',
    description: 'Mobile application built with React Native, featuring AI-powered gift recommendations based on user preferences.',
    tech: ['React Native', 'AI/ML', 'Firebase'],
    link: '#',
    color: 'from-orange-500/20 to-red-500/20',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br ${project.color} p-6 hover:border-primary/50 transition-all duration-500 magnetic-hover opacity-0 animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-background/50 rounded-full text-xs group-hover:bg-primary/20 transition-colors duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary text-sm hover:underline group/link"
                  >
                    View Project 
                    <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </a>
                )}
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-pulse-glow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;