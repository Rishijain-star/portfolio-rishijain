import { useState, useEffect, useRef } from 'react';

const skills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'React Native', level: 90 },
    { name: 'Flutter', level: 85 },
    { name: 'JavaScript/TypeScript', level: 92 },
    { name: 'HTML/CSS', level: 95 },
  ],
  backend: [
    { name: 'Node.js', level: 90 },
    { name: 'PHP', level: 85 },
    { name: 'MongoDB', level: 88 },
    { name: 'MySQL', level: 85 },
    { name: 'REST APIs', level: 92 },
  ],
  tools: ['Figma', 'Git', 'WordPress', 'Firebase', 'AWS', 'Docker'],
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Frontend Skills */}
          <div className="space-y-6 opacity-0 animate-slide-right" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold mb-6">Frontend & Mobile</h3>
            {skills.frontend.map((skill, index) => (
              <div key={skill.name} className="space-y-2 group">
                <div className="flex justify-between text-sm">
                  <span className="group-hover:text-primary transition-colors">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100}ms`,
                      background: 'linear-gradient(90deg, hsl(187 52% 45%), hsl(187 62% 55%))'
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 animate-shimmer opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Backend Skills */}
          <div className="space-y-6 opacity-0 animate-slide-right" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-semibold mb-6">Backend & Database</h3>
            {skills.backend.map((skill, index) => (
              <div key={skill.name} className="space-y-2 group">
                <div className="flex justify-between text-sm">
                  <span className="group-hover:text-primary transition-colors">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${(index * 100) + 500}ms`,
                      background: 'linear-gradient(90deg, hsl(187 52% 45%), hsl(187 62% 55%))'
                    }}
                  >
                    <div className="absolute inset-0 animate-shimmer opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mt-12 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-semibold mb-6 text-center">Tools & Others</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.tools.map((tool, index) => (
              <span
                key={tool}
                className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-default"
                style={{ animationDelay: `${0.7 + index * 0.05}s` }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;