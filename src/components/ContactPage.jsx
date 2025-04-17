import React from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/use-toast';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const SocialButton = ({ href, icon: Icon, label }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 transition-all hover:bg-purple/10 hover:border-purple hover:scale-110"
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple transition-colors" />
  </a>
);

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message.');
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName", { required: "First name is required" })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName", { required: "Last name is required" })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email</Label>
                  <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      } 
                    })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white font-medium">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    {...register("subject", { required: "Subject is required" })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white font-medium">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    rows={5}
                    {...register("message", { required: "Message is required" })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple to-teal hover:opacity-90"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div className="bg-glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <Mail className="text-white h-6 w-6" />
                  <span className="text-gray-200">contact@example.com</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Phone className="text-white h-6 w-6" />
                  <span className="text-gray-200">+1 234 567 890</span>
                </li>
                <li className="flex items-center space-x-4">
                  <MapPin className="text-white h-6 w-6" />
                  <span className="text-gray-200">123 Main Street, City, Country</span>
                </li>
              </ul>
              <div className="bg-glass rounded-xl p-8 mt-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Follow Us</h2>
                <p className="text-gray-300 mb-6">
                  Stay updated with our latest developments and insights on personality technology.
                </p>
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  <SocialButton 
                    href="https://facebook.com/Personality Predictor" 
                    icon={Facebook}
                    label="Follow us on Facebook"
                  />
                  <SocialButton 
                    href="https://twitter.com/Personality Predictor" 
                    icon={Twitter}
                    label="Follow us on Twitter"
                  />
                  <SocialButton 
                    href="https://instagram.com/Personality Predictor" 
                    icon={Instagram}
                    label="Follow us on Instagram"
                  />
                  <SocialButton 
                    href="https://linkedin.com/company/Personality Predictor" 
                    icon={Linkedin}
                    label="Follow us on LinkedIn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;