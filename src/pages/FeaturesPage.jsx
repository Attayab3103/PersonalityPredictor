import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Brain, MessageSquare, Lock, PieChart, Users, Zap, Layers, BarChart3, BrainCircuit } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-glass rounded-xl p-6 transition-all hover:translate-y-[-5px] hover:shadow-lg hover:shadow-purple/10">
      <div className="mb-4 text-purple">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesPage = () => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze conversation patterns to predict personality traits with high accuracy."
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Interactive Chatbot",
      description: "Engage in natural conversations with our chatbot designed to understand and respond to your unique communication style."
    },
    {
      icon: <Lock size={32} />,
      title: "Privacy Focused",
      description: "Your data is encrypted and protected. We prioritize your privacy with industry-leading security practices."
    },
    {
      icon: <PieChart size={32} />,
      title: "Detailed Reports",
      description: "Receive comprehensive personality insights with visualized data and actionable recommendations."
    },
    {
      icon: <Users size={32} />,
      title: "Team Compatibility",
      description: "Understand team dynamics and improve collaboration by analyzing personality compatibility."
    },
    {
      icon: <Zap size={32} />,
      title: "Fast Results",
      description: "Get instant personality predictions within minutes of conversation, with increasing accuracy over time."
    },
    {
      icon: <Layers size={32} />,
      title: "Multi-Dimensional Analysis",
      description: "Explore different layers of your personality including traits, cognitive patterns, and emotional tendencies."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Progress Tracking",
      description: "Monitor how your personality traits evolve over time with our longitudinal analysis tools."
    },
    {
      icon: <BrainCircuit size={32} />,
      title: "Personalized Insights",
      description: "Receive custom growth recommendations based on your unique personality profile and goals."
    }
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Our Features</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover how our personality prediction technology can provide valuable insights into behaviors, preferences, and traits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;