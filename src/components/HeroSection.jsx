import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Brain, MessageSquare, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Discover Your</span>
            <span className="text-gradient"> True</span>
            <span className="text-gradient"> Personality</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Experience AI-powered personality analysis through natural conversation.
            Get insights into your traits, behaviors, and potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-purple to-teal hover:opacity-90"
              size="lg"
              asChild
            >
              <Link to="/chat">
                Start Chatting <MessageSquare className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/5 text-white border-purple/20 hover:border-purple hover:bg-purple/10 hover:text-purple transition-colors"
              asChild
            >
              <Link to="/features">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-dark to-transparent z-10" />
          <div className="absolute -inset-x-40 top-0 h-[500px] bg-gradient-to-r from-purple/20 to-teal/20 blur-3xl" />
          <div className="relative z-20">
            {/* Add your hero image or illustration here */}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-glass rounded-xl p-6">
            <div className="text-purple mb-4">
              <Brain size={32} />
            </div>
            <h3 className="text-xl text-white font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-400">
              Advanced algorithms analyze your communication patterns to reveal personality insights.
            </p>
          </div>
          
          <div className="bg-glass rounded-xl p-6">
            <div className="text-purple mb-4">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl text-white font-semibold mb-2">Natural Conversation</h3>
            <p className="text-gray-400">
              Chat naturally with our AI and receive real-time personality assessments.
            </p>
          </div>
          
          <div className="bg-glass rounded-xl p-6">
            <div className="text-purple mb-4">
              <Brain size={32} />
            </div>
            <h3 className="text-xl text-white font-semibold mb-2">Deep Insights</h3>
            <p className="text-gray-400">
              Get detailed insights about your personality traits, strengths, and growth areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
