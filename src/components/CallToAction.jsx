import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-glass rounded-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -inset-x-40 top-0 h-[500px] bg-gradient-to-r from-purple/20 to-teal/20 blur-3xl" />
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Ready to </span>
                <span className="text-gradient">discover</span>
                <span className="text-white"> your </span>
                <span className="text-gradient">true personality</span>
                <span className="text-white">?</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Start chatting with our AI personality predictor and gain valuable insights about yourself.
              </p>
              <Button 
                className="bg-gradient-to-r from-purple to-teal hover:opacity-90"
                size="lg"
                asChild
              >
                <Link to="/signup">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
