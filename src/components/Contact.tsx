import { useState, useRef, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Check, Github, Linkedin, Loader2, Mail, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: ""
  });
  const formRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Using your provided EmailJS credentials
      await emailjs.send(
        'service_allj5vv', // Your Service ID
        'template_br3ixmw', // Your Template ID
        formData,
        'VBT7nava25POHUkGI' // Your Public Key
      );
      
      setIsSubmitted(true);
      setFormData({ from_name: "", from_email: "", message: "" });
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">Contact Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          {/* Left Side - Get In Touch Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-purple-500/30 p-8 rounded-2xl hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,69,219,0.4)] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
              <p className="text-gray-300 mb-6">
                Have a project in mind or just want to chat about AI and machine learning?
                Feel free to reach out to me through the form or via my contact details.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-200">
                  <Mail className="h-5 w-5 text-purple-400 mr-3" />
                  <span className="text-sm">madhavbaidyaiitbhu@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <Phone className="h-5 w-5 text-purple-400 mr-3" />
                  <span>+91 6900541047</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href="https://github.com/MadsDoodle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-colors"
                  aria-label="Github"
                >
                  <Github className="h-5 w-5 text-purple-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/madhav-sukla-baidya-20a151285/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Middle - Goodbye Image */}
            <div className="flex items-center justify-center relative mt-8">
              {/* Pulsating Glow Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-purple-600/30 rounded-full blur-[100px] animate-pulse-slow"></div>
              </div>
              
              {/* Image Container */}
              <div className="relative z-10 animate-float">
                <img
                  src="images/footer.png"
                  alt="Goodbye"
                  className="w-full max-w-sm h-auto object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form Card */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-purple-500/30 p-8 rounded-2xl hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,69,219,0.4)] transition-all duration-300">
              <div ref={formRef} className="space-y-6">
                <div>
                  <label htmlFor="from_name" className="block text-sm font-medium mb-2 text-gray-200">Name</label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={(e) => setFormData({...formData, from_name: e.target.value})}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm",
                      "border border-purple-500/30 focus:border-purple-400",
                      "outline-none transition-colors text-white",
                      "placeholder:text-gray-500"
                    )}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="from_email" className="block text-sm font-medium mb-2 text-gray-200">Email</label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={(e) => setFormData({...formData, from_email: e.target.value})}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm",
                      "border border-purple-500/30 focus:border-purple-400",
                      "outline-none transition-colors text-white",
                      "placeholder:text-gray-500"
                    )}
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm",
                      "border border-purple-500/30 focus:border-purple-400",
                      "outline-none transition-colors resize-none text-white",
                      "placeholder:text-gray-500"
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
                  onClick={handleSubmit}
                  disabled={isSubmitting || isSubmitted}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-purple-400",
                    "text-white font-semibold flex items-center justify-center gap-2",
                    "hover:shadow-[0_0_30px_rgba(139,69,219,0.6)] transition-all duration-300",
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;