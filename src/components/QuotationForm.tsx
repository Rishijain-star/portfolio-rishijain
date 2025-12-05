import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Upload, X, User, Briefcase, Code, DollarSign, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface QuotationFormProps {
  onBack: () => void;
}

const techOptions = [
  { id: 'react', label: 'React', icon: '⚛️' },
  { id: 'node', label: 'Node.js', icon: '🟢' },
  { id: 'php', label: 'PHP', icon: '🐘' },
  { id: 'reactnative', label: 'React Native', icon: '📱' },
  { id: 'flutter', label: 'Flutter', icon: '🦋' },
  { id: 'wordpress', label: 'WordPress', icon: '🔷' },
  { id: 'mongodb', label: 'MongoDB', icon: '🍃' },
  { id: 'mysql', label: 'MySQL', icon: '🐬' },
  { id: 'figma', label: 'Figma Design', icon: '🎨' },
];

const projectTypes = [
  { id: 'website', label: 'Website', description: 'Landing page or corporate site' },
  { id: 'webapp', label: 'Web Application', description: 'Full-featured web app' },
  { id: 'mobileapp', label: 'Mobile App', description: 'iOS & Android app' },
  { id: 'ecommerce', label: 'E-Commerce', description: 'Online store' },
  { id: 'design', label: 'UI/UX Design', description: 'Figma design only' },
  { id: 'other', label: 'Other', description: 'Custom project' },
];

const budgetOptions = [
  { id: 'small', label: '₹10K - ₹50K', description: 'Small project' },
  { id: 'medium', label: '₹50K - ₹2L', description: 'Medium project' },
  { id: 'large', label: '₹2L - ₹5L', description: 'Large project' },
  { id: 'enterprise', label: '₹5L+', description: 'Enterprise' },
  { id: 'discuss', label: 'Let\'s Discuss', description: 'Flexible budget' },
];

const timelineOptions = [
  { id: 'urgent', label: 'Urgent', description: '< 2 weeks' },
  { id: 'short', label: '1 Month', description: '2-4 weeks' },
  { id: 'medium', label: '2-3 Months', description: 'Standard' },
  { id: 'long', label: '3+ Months', description: 'Large scope' },
  { id: 'flexible', label: 'Flexible', description: 'No rush' },
];

const steps = [
  { id: 1, title: 'Basic Info', icon: User },
  { id: 2, title: 'Project Type', icon: Briefcase },
  { id: 3, title: 'Tech Stack', icon: Code },
  { id: 4, title: 'Budget & Timeline', icon: DollarSign },
  { id: 5, title: 'Details', icon: Send },
];

const QuotationForm = ({ onBack }: QuotationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectType: '',
    techStack: [] as string[],
    budgetRange: '',
    timeline: '',
    projectDescription: '',
    additionalRequirements: '',
    files: [] as File[],
    fileUrls: [] as string[],
  });

  const handleTechToggle = (techId: string) => {
    if (formData.techStack.length >= 5 && !formData.techStack.includes(techId)) {
      toast({
        title: "Maximum 5 technologies",
        description: "You can select up to 5 technologies.",
        variant: "destructive",
      });
      return;
    }
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(techId)
        ? prev.techStack.filter(t => t !== techId)
        : [...prev.techStack, techId],
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.files.length + files.length > 5) {
      toast({
        title: "Maximum 5 files",
        description: "You can upload up to 5 files.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles],
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const uploadFiles = async () => {
    const uploadedUrls: string[] = [];
    
    for (const file of formData.files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error, data } = await supabase.storage
        .from('quotation-files')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('quotation-files')
        .getPublicUrl(fileName);
      
      uploadedUrls.push(urlData.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      let fileUrls: string[] = [];
      
      if (formData.files.length > 0) {
        setUploadingFiles(true);
        fileUrls = await uploadFiles();
        setUploadingFiles(false);
      }

      const { error } = await supabase.from('project_quotations').insert({
        client_name: formData.clientName,
        client_email: formData.clientEmail,
        client_phone: formData.clientPhone || null,
        project_type: formData.projectType,
        tech_stack: formData.techStack,
        budget_range: formData.budgetRange,
        timeline: formData.timeline,
        project_description: formData.projectDescription,
        additional_requirements: formData.additionalRequirements || null,
        file_urls: fileUrls,
      });

      if (error) throw error;

      toast({
        title: "Quotation submitted!",
        description: "Thank you! I'll review your project and get back to you within 24 hours.",
      });
      onBack();
    } catch (error) {
      console.error('Error submitting quotation:', error);
      toast({
        title: "Error",
        description: "Failed to submit quotation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.clientName && formData.clientEmail;
      case 2:
        return formData.projectType;
      case 3:
        return formData.techStack.length > 0;
      case 4:
        return formData.budgetRange && formData.timeline;
      case 5:
        return formData.projectDescription;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-up">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number (Optional)</label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-up">
            <p className="text-muted-foreground mb-6">What type of project do you need?</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projectTypes.map((type, index) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, projectType: type.id })}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 magnetic-hover ${
                    formData.projectType === type.id
                      ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(187_52%_45%/0.3)]'
                      : 'border-border bg-secondary/50 hover:border-primary/50'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <h4 className="font-medium mb-1">{type.label}</h4>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-up">
            <p className="text-muted-foreground mb-2">Select up to 5 technologies you need</p>
            <p className="text-sm text-primary mb-6">{formData.techStack.length}/5 selected</p>
            <div className="grid grid-cols-3 gap-3">
              {techOptions.map((tech, index) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleTechToggle(tech.id)}
                  className={`p-4 rounded-xl border text-center transition-all duration-300 magnetic-hover ${
                    formData.techStack.includes(tech.id)
                      ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(187_52%_45%/0.3)]'
                      : 'border-border bg-secondary/50 hover:border-primary/50'
                  }`}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <span className="text-2xl mb-2 block">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 animate-fade-up">
            <div>
              <p className="text-muted-foreground mb-4">What's your budget range?</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {budgetOptions.map((option, index) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetRange: option.id })}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 magnetic-hover ${
                      formData.budgetRange === option.id
                        ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(187_52%_45%/0.3)]'
                        : 'border-border bg-secondary/50 hover:border-primary/50'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground mb-4">Expected timeline?</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timelineOptions.map((option, index) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeline: option.id })}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 magnetic-hover ${
                      formData.timeline === option.id
                        ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(187_52%_45%/0.3)]'
                        : 'border-border bg-secondary/50 hover:border-primary/50'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-up">
            <div>
              <label className="block text-sm font-medium mb-2">Project Description *</label>
              <textarea
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                placeholder="Describe your project idea, goals, and any specific features you need..."
                rows={4}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Additional Requirements (Optional)</label>
              <textarea
                value={formData.additionalRequirements}
                onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                placeholder="Any specific requirements, reference links, or special considerations..."
                rows={3}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:border-primary focus:outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_hsl(187_52%_45%/0.2)]"
              />
            </div>
            
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Files (Max 5 files, 10MB each)
              </label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, PNG, JPG (max 10MB)
                  </p>
                </label>
              </div>
              
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg animate-scale-in"
                    >
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 p-1 hover:bg-destructive/20 rounded transition-colors"
                      >
                        <X size={16} className="text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Get <span className="gradient-text">Quotation</span>
            </h2>
            <p className="text-muted-foreground text-sm">Fill in your project details</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress line background */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-border rounded-full" />
            {/* Progress line fill */}
            <div 
              className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(187_52%_45%/0.4)]'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </div>
                  <span className={`text-xs mt-2 hidden md:block ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="card-gradient rounded-2xl border border-border p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-[0_0_30px_hsl(187_52%_45%/0.4)]"
            >
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-[0_0_30px_hsl(187_52%_45%/0.4)]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {uploadingFiles ? 'Uploading...' : 'Submitting...'}
                </>
              ) : (
                <>
                  Submit Request
                  <Send size={18} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuotationForm;