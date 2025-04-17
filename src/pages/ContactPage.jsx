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

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      // Replace with your backend API URL
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an issue sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Contact Us</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you soon.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName", { required: "First name is required" })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName", { required: "Last name is required" })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                    className="bg-white/5 border-white/10 text-white"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    {...register("subject", { required: "Subject is required" })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    rows={5}
                    {...register("message", { required: "Message is required" })}
                    className="bg-white/5 border-white/10 text-white"
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
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-purple h-5 w-5" />
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white">contact@PersonalityPredictor.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Phone className="text-purple h-5 w-5" />
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-white">+92 3174026038</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-purple h-5 w-5" />
                    <div>
                      <p className="text-gray-400">Address</p>
                      <p className="text-white">123 AI Avenue, Tech City, TC 12345</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Follow Us</h2>
                <p className="text-gray-300 mb-6">
                  Stay updated with our latest developments and insights on personality technology.
                </p>
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  <a 
                    href="https://facebook.com/Personality Predictor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-purple/10 p-3 rounded-full border border-white/10 hover:border-purple transition-all hover:scale-110"
                  >
                    <Facebook className="w-5 h-5 text-gray-300 hover:text-purple transition-colors" />
                  </a>
                  <a 
                    href="https://twitter.com/Personality Predictor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-purple/10 p-3 rounded-full border border-white/10 hover:border-purple transition-all hover:scale-110"
                  >
                    <Twitter className="w-5 h-5 text-gray-300 hover:text-purple transition-colors" />
                  </a>
                  <a 
                    href="https://instagram.com/Personality Predictor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-purple/10 p-3 rounded-full border border-white/10 hover:border-purple transition-all hover:scale-110"
                  >
                    <Instagram className="w-5 h-5 text-gray-300 hover:text-purple transition-colors" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/Personality Predictor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-purple/10 p-3 rounded-full border border-white/10 hover:border-purple transition-all hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5 text-gray-300 hover:text-purple transition-colors" />
                  </a>
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