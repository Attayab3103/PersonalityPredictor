import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { BriefcaseIcon, Rocket, Heart, Users, Send } from 'lucide-react';

const JobCard = ({ title, department, location, type }) => (
  <div className="bg-glass rounded-xl p-6 transition-all hover:border-purple/20 hover:translate-y-[-2px]">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400">{department}</p>
      </div>
      <BriefcaseIcon className="text-purple h-6 w-6" />
    </div>
    <div className="space-y-2 mb-6">
      <p className="text-gray-300 flex items-center">
        <span className="inline-block w-20 text-gray-400">Location:</span> {location}
      </p>
      <p className="text-gray-300 flex items-center">
        <span className="inline-block w-20 text-gray-400">Type:</span> {type}
      </p>
    </div>
    <Button className="w-full bg-gradient-to-r from-purple to-teal hover:opacity-90">
      Apply Now <Send className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-glass rounded-xl p-6 text-center">
    <div className="inline-block p-3 bg-purple/10 rounded-full mb-4">
      <Icon className="text-purple h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const CareersPage = () => {
  const openPositions = [
    {
      title: "AI Research Scientist",
      department: "Research & Development",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Machine Learning Engineer",
      department: "Engineering",
      location: "London, UK",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Join Our Team</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Help us revolutionize personality analysis through AI technology. We're looking for
              passionate individuals who want to make a difference.
            </p>
          </div>

          {/* Company Values */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={Rocket}
                title="Innovation First"
                description="We push boundaries and embrace new technologies to solve complex problems."
              />
              <ValueCard
                icon={Heart}
                title="User-Centered"
                description="Everything we do is focused on creating value for our users."
              />
              <ValueCard
                icon={Users}
                title="Diverse & Inclusive"
                description="We celebrate differences and create an environment where everyone belongs."
              />
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why Join Us?</h2>
            <div className="bg-glass rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Health & Wellness</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>Comprehensive health insurance</li>
                    <li>Mental health support</li>
                    <li>Wellness programs</li>
                    <li>Gym membership</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Work-Life Balance</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>Flexible work hours</li>
                    <li>Remote work options</li>
                    <li>Unlimited PTO</li>
                    <li>Paid parental leave</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Growth</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>Learning stipend</li>
                    <li>Conference attendance</li>
                    <li>Mentorship programs</li>
                    <li>Career development</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Perks</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>Stock options</li>
                    <li>401(k) matching</li>
                    <li>Home office setup</li>
                    <li>Team events</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Open Positions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {openPositions.map((position, index) => (
                <JobCard key={index} {...position} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;