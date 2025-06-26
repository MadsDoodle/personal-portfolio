
import { useState, useRef, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Check, Github, Linkedin, Loader2, Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      if (formRef.current) {
        // Using your provided EmailJS credentials
        await emailjs.sendForm(
          'service_allj5vv', // Your Service ID
          'template_br3ixmw', // Your Template ID
          formRef.current, 
          'VBT7nava25POHUkGI' // Your Public Key
        );
        
        setIsSubmitted(true);
        formRef.current.reset();
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-12 relative">
      <div className="section-container">
        <h2 className="text-5xl font-bold text-center mb-10 text-foreground">Contact Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-morph p-8 rounded-2xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <p className="text-foreground/80 mb-6">
              Have a project in mind or just want to chat about AI and machine learning?
              Feel free to reach out to me through the form or via my contact details.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span>madhavbaidyaiitbhu@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span>+91 6900541047</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/MadsDoodle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Github"
              >
                <Github className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://www.linkedin.com/in/madhav-sukla-baidya-20a151285/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
          
          <div className="glass-morph p-8 rounded-2xl animate-fade-in [animation-delay:0.2s]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm",
                    "border border-white/10 focus:border-primary",
                    "outline-none transition-colors",
                    "placeholder:text-foreground/50"
                  )}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="from_email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm",
                    "border border-white/10 focus:border-primary",
                    "outline-none transition-colors",
                    "placeholder:text-foreground/50"
                  )}
                  placeholder="Your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm",
                    "border border-white/10 focus:border-primary",
                    "outline-none transition-colors resize-none",
                    "placeholder:text-foreground/50"
                  )}
                  placeholder="Your message"
                />
              </div>
              
              {submitError && (
                <div className="text-red-400 text-sm text-center">
                  {submitError}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={cn(
                  "w-full btn-primary flex items-center justify-center gap-2",
                  (isSubmitting || isSubmitted) && "opacity-80 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
