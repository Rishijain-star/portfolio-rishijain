import { Mail, MapPin, Send, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import QuotationForm from './QuotationForm';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showQuotation) {
    return <QuotationForm onBack={() => setShowQuotation(false)} />;
  }

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground">
            Have a project in mind? Let's work together!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="max-w-2xl mx-auto mb-12">
          <button
            onClick={() => setShowQuotation(true)}
            className="w-full p-6 card-gradient rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group magnetic-hover opacity-0 animate-scale-in"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Get Project Quotation</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step project details & estimate</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:translate-x-1 transition-all">
                <Send className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
              </div>
            </div>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6 opacity-0 animate-slide-right" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <a
                href="mailto:rishijain9343@gmail.com"
                className="flex items-center gap-4 p-4 card-gradient rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group magnetic-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">rishijain9343@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 card-gradient rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group magnetic-hover">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Indore, Madhya Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="group">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(187_52%_45%/0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;