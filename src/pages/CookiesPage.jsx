import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Cookie, Settings, Info, Shield } from 'lucide-react';

const CookieSection = ({ icon: Icon, title, children }) => (
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

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Cookie Policy</span>
            </h1>
            <p className="text-lg text-gray-300">
              Understanding how and why we use cookies to improve your experience.
            </p>
          </div>

          <CookieSection icon={Info} title="What Are Cookies?">
            <p>
              Cookies are small text files that are placed on your device when you visit our website.
              They help us provide you with a better experience by:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Remembering your preferences and settings</li>
              <li>Understanding how you use our website</li>
              <li>Keeping you signed in to your account</li>
              <li>Providing personalized content and features</li>
            </ul>
          </CookieSection>

          <CookieSection icon={Cookie} title="Types of Cookies We Use">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-white mb-2">Essential Cookies</h3>
                <p>Required for the website to function properly. These cannot be disabled.</p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">Functional Cookies</h3>
                <p>Enable personalized features and remember your preferences.</p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">Analytics Cookies</h3>
                <p>Help us understand how visitors interact with our website.</p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">Marketing Cookies</h3>
                <p>Used to deliver relevant advertisements and track their effectiveness.</p>
              </div>
            </div>
          </CookieSection>

          <CookieSection icon={Settings} title="Managing Your Cookie Preferences">
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that are
              already on your device and you can set most browsers to prevent them from being placed.
            </p>
            <p className="mt-4">
              You can manage your cookie preferences in the following ways:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Through your browser settings</li>
              <li>Using our cookie preference center</li>
              <li>By contacting our support team</li>
            </ul>
          </CookieSection>

          <CookieSection icon={Shield} title="Third-Party Cookies">
            <p>
              Some of our pages display content from external providers, such as Google Analytics
              and social media platforms. To view this content, you first have to accept their
              specific terms and conditions, which includes their cookie policies.
            </p>
            <p className="mt-4">
              These third-party services are outside of our control. We cannot be responsible for
              how they use cookies or handle your data.
            </p>
          </CookieSection>

          <div className="bg-glass rounded-xl p-8">
            <p className="text-gray-300">
              Last updated: April 14, 2025
            </p>
            <p className="text-gray-300 mt-4">
              For questions about our cookie policy, contact us at{' '}
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

export default CookiesPage;