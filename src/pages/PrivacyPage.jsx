import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacySection = ({ icon: Icon, title, children }) => (
  <div className="bg-glass rounded-xl p-8 mb-8">
    <div className="flex items-center mb-4">
      <Icon className="text-purple mr-3 h-6 w-6" />
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="text-gray-300 space-y-4">
      {children}
    </div>
  </div>
);

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Privacy Policy</span>
            </h1>
            <p className="text-lg text-gray-300">
              Your privacy matters to us. Learn how we collect, use, and protect your personal information.
            </p>
          </div>

          <PrivacySection icon={Shield} title="Data Collection">
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Name and contact information when you create an account</li>
              <li>Chat messages and interactions with our AI system</li>
              <li>Usage data and analytics to improve our services</li>
              <li>Device and browser information for security purposes</li>
            </ul>
          </PrivacySection>

          <PrivacySection icon={Lock} title="Data Security">
            <p>
              We implement robust security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>End-to-end encryption for all chat communications</li>
              <li>Regular security audits and updates</li>
              <li>Secure data storage with industry-standard encryption</li>
              <li>Limited access to personal data by authorized personnel only</li>
            </ul>
          </PrivacySection>

          <PrivacySection icon={Eye} title="Data Usage">
            <p>
              Your data is used to:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Provide and improve our personality analysis services</li>
              <li>Personalize your experience and recommendations</li>
              <li>Maintain and enhance the security of our platform</li>
              <li>Communicate with you about our services</li>
            </ul>
          </PrivacySection>

          <PrivacySection icon={UserCheck} title="Your Rights">
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of data collection for specific purposes</li>
              <li>Export your data in a portable format</li>
            </ul>
          </PrivacySection>

          <div className="bg-glass rounded-xl p-8">
            <p className="text-gray-300">
              Last updated: April 14, 2025
            </p>
            <p className="text-gray-300 mt-4">
              For any privacy-related questions or concerns, please contact us at{' '}
              <a href="mailto:privacy@Personality Predictor.com" className="text-purple hover:text-teal">
                privacy@Personality Predictor.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;