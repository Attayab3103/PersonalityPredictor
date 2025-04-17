
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navigation />
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">About Personality Predictor</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our mission, vision, and the technology behind our AI personality predictor.
            </p>
          </div>
          
          <div className="space-y-12 text-gray-200">
            <section className="bg-glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-purple">Our Mission</h2>
              <p className="mb-4">
                At Personality Predictor, we're dedicated to helping people understand themselves and others better 
                through cutting-edge artificial intelligence. We believe that self-awareness is the first 
                step towards personal growth and better relationships.
              </p>
              <p>
                Our AI-powered chatbot analyzes conversation patterns to provide deep insights into personality 
                traits, helping users discover aspects of themselves they might not have been aware of.
              </p>
            </section>
            
            <section className="bg-glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-teal">Our Technology</h2>
              <p className="mb-4">
                Personality Predictor utilizes advanced machine learning algorithms trained on millions of conversations 
                and psychological profiles. Our technology can identify subtle language patterns that correlate 
                with specific personality traits.
              </p>
              <p className="mb-4">
                We combine natural language processing with psychological frameworks like the Big Five personality 
                traits, Myers-Briggs Type Indicator, and other validated models to provide comprehensive personality insights.
              </p>
              <p>
                All analysis is performed with strict privacy controls, ensuring your conversations remain secure and confidential.
              </p>
            </section>
            
            <section className="bg-glass rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-purple">Our Team</h2>
              <p className="mb-4">
                Our interdisciplinary team brings together experts in psychology, artificial intelligence, 
                and user experience design. We're passionate about creating technology that helps people 
                connect better with themselves and others.
              </p>
              <p>
                Founded in 2023, Personality Predictor continues to innovate and expand its capabilities to provide 
                increasingly accurate and helpful personality insights.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
