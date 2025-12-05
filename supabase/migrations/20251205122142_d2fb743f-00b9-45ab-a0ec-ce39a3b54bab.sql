-- Create contact_messages table for simple contact form
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_quotations table for detailed project requests
CREATE TABLE public.project_quotations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  project_type TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  budget_range TEXT,
  timeline TEXT,
  project_description TEXT NOT NULL,
  additional_requirements TEXT,
  file_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_quotations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit contact message" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit quotation" 
ON public.project_quotations 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for quotation files
INSERT INTO storage.buckets (id, name, public) VALUES ('quotation-files', 'quotation-files', true);

-- Storage policies for quotation files
CREATE POLICY "Anyone can upload quotation files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'quotation-files');

CREATE POLICY "Anyone can view quotation files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'quotation-files');