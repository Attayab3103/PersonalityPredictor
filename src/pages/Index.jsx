import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;