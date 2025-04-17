import React from 'react';
import { Brain, Lock, BarChart3, Users } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-glass rounded-xl p-6 transition-transform hover:-translate-y-1 hover:border hover:border-purple/20">
    <div className="text-purple mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: "Advanced AI Analysis",
      description: "Our AI analyzes your communication patterns to provide deep personality insights."
    },
    {
      icon: <Lock size={32} />,
      title: "Privacy First",
      description: "Your data is encrypted and protected. We prioritize your privacy and security."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Detailed Reports",
      description: "Get comprehensive personality analysis reports with actionable insights."
    },
    {
      icon: <Users size={32} />,
      title: "Team Compatibility",
      description: "Understand team dynamics and improve collaboration with personality insights."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Explore Our </span>
            <span className="text-gradient">Key Features</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover how our AI-powered personality analysis can help you understand yourself better.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
