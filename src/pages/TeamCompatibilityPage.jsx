import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Users, Puzzle, LineChart, ArrowRight, UserPlus, UsersRound, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-glass rounded-xl p-6 transition-all hover:-translate-y-1">
    <div className="text-purple mb-4"><Icon /></div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const TeamCompatibilityPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAnalyzeTeam = () => {
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
              <span className="text-gradient">Team Compatibility Analysis</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Build stronger teams by understanding personality dynamics and improving collaboration through AI-powered insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={() => <Users size={32} />}
              title="Team Dynamics"
              description="Analyze how different personality types interact and complement each other within your team."
            />
            <FeatureCard
              icon={() => <Puzzle size={32} />}
              title="Role Matching"
              description="Find the perfect role for each team member based on their personality strengths."
            />
            <FeatureCard
              icon={() => <LineChart size={32} />}
              title="Performance Insights"
              description="Track team dynamics over time and identify areas for improvement."
            />
          </div>

          <div className="bg-glass rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-white text-center">How Team Analysis Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="text-purple h-8 w-8" />
                </div>
                <h3 className="font-semibold text-white mb-2">Add Team Members</h3>
                <p className="text-gray-300">
                  Invite your team members to complete their personality assessments.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersRound className="text-purple h-8 w-8" />
                </div>
                <h3 className="font-semibold text-white mb-2">Analyze Dynamics</h3>
                <p className="text-gray-300">
                  Our AI analyzes individual traits and team composition.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="text-purple h-8 w-8" />
                </div>
                <h3 className="font-semibold text-white mb-2">Get Recommendations</h3>
                <p className="text-gray-300">
                  Receive actionable insights to improve team collaboration.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-glass rounded-xl p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Benefits for Your Team</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple/10 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Enhanced Communication</h4>
                      <p className="text-gray-300">Understand different communication styles and preferences within your team.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple/10 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Conflict Resolution</h4>
                      <p className="text-gray-300">Learn how to address and prevent conflicts based on personality differences.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple/10 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-purple rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Improved Collaboration</h4>
                      <p className="text-gray-300">Create balanced teams that leverage diverse personality strengths.</p>
                    </div>
                  </li>
                </ul>
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
              onClick={handleAnalyzeTeam}
            >
              Analyze Your Team <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamCompatibilityPage;