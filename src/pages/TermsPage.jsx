import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Scale, Shield, AlertTriangle, FileText } from 'lucide-react';

const TermsSection = ({ icon: Icon, title, children }) => (
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

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Terms of Service</span>
            </h1>
            <p className="text-lg text-gray-300">
              Please read these terms carefully before using Personality Predictor.
            </p>
          </div>

          <TermsSection icon={Scale} title="Acceptance of Terms">
            <p>
              By accessing or using Personality Predictor's services, you agree to be bound by these Terms of Service
              and our Privacy Policy. If you disagree with any part of the terms, you may not access our services.
            </p>
          </TermsSection>

          <TermsSection icon={Shield} title="User Responsibilities">
            <p>As a user of Personality Predictor, you agree to:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Provide accurate and complete information when creating an account</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Not use the service for any unlawful purpose or in violation of these terms</li>
              <li>Not attempt to interfere with or disrupt our services</li>
              <li>Not use automated systems or software to extract data from our platform</li>
            </ul>
          </TermsSection>

          <TermsSection icon={AlertTriangle} title="Limitations of Liability">
            <p>
              Personality Predictor provides personality analysis services for informational purposes only. We make
              no guarantees about the accuracy or reliability of our analysis.
            </p>
            <p className="mt-4">
              We are not liable for:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Any decisions made based on our personality analysis</li>
              <li>Service interruptions or data loss</li>
              <li>Any indirect, consequential, or incidental damages</li>
              <li>Third-party actions or content</li>
            </ul>
          </TermsSection>

          <TermsSection icon={FileText} title="Intellectual Property">
            <p>
              All content, features, and functionality of Personality Predictor, including but not limited to text,
              graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software,
              are the exclusive property of Personality Predictor and protected by international copyright, trademark,
              and other intellectual property laws.
            </p>
          </TermsSection>

          <div className="bg-glass rounded-xl p-8">
            <p className="text-gray-300">
              Last updated: April 14, 2025
            </p>
            <p className="text-gray-300 mt-4">
              For any questions about these terms, please contact us at{' '}
              <a href="mailto:legal@Personality Predictor.com" className="text-purple hover:text-teal">
                legal@PersonalityPredictor.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;