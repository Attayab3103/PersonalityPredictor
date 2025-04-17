import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Brain, ChartBar, Target, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const InsightCard = ({ icon: Icon, title, description }) => (
  <div className="bg-glass rounded-xl p-6 transition-all hover:-translate-y-1">
    <div className="text-purple mb-4"><Icon /></div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const AiAnalysisPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartAnalysis = () => {
    if (isAuthenticated) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">AI-Powered Personality Analysis</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Advanced machine learning algorithms analyze your communication patterns to provide deep insights into your personality traits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <InsightCard
              icon={Brain}
              title="Cognitive Analysis"
              description="Understand your thinking patterns, problem-solving approach, and decision-making style."
            />
            <InsightCard
              icon={ChartBar}
              title="Behavioral Patterns"
              description="Discover your natural tendencies, reactions, and behavioral preferences in different situations."
            />
            <InsightCard
              icon={Target}
              title="Growth Areas"
              description="Identify opportunities for personal development and areas where you can improve."
            />
          </div>

          <div className="bg-glass rounded-xl p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">How It Works</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple/10 p-2 rounded-lg">
                      <span className="text-purple font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Chat Naturally</h3>
                      <p className="text-gray-300">
                        Engage in natural conversations with our AI chatbot. No structured questions or surveys needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple/10 p-2 rounded-lg">
                      <span className="text-purple font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">AI Processing</h3>
                      <p className="text-gray-300">
                        Our AI analyzes your communication style, word choice, and expression patterns.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple/10 p-2 rounded-lg">
                      <span className="text-purple font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Get Insights</h3>
                      <p className="text-gray-300">
                        Receive detailed personality insights and actionable recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                {/* Add an illustration or image here */}
                <div className="w-full h-64 bg-purple/10 rounded-xl"></div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              className="bg-gradient-to-r from-purple to-teal hover:opacity-90"
              size="lg"
              onClick={handleStartAnalysis}
            >
              Start Your Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiAnalysisPage;