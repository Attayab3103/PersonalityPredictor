import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark/50 border-t border-white/10 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Personality Predictor</h3>
            <p className="text-gray-400">
              AI-powered personality analysis for personal and professional growth.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/Personality Predictor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple"><Facebook size={20} /></a>
              <a href="https://twitter.com/Personality Predictor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple"><Twitter size={20} /></a>
              <a href="https://instagram.com/Personality Predictor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple"><Instagram size={20} /></a>
              <a href="https://linkedin.com/company/Personality Predictor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple"><Linkedin size={20} /></a>
              <a href="https://github.com/Personality Predictor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple"><Github size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/ai-analysis" className="text-gray-400 hover:text-purple">AI Analysis</Link></li>
              <li><Link to="/team-compatibility" className="text-gray-400 hover:text-purple">Team Compatibility</Link></li>
              <li><Link to="/chat" className="text-gray-400 hover:text-purple">Chat Analysis</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-purple">All Features</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-purple">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-purple">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-purple">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-purple">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-purple">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-purple">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-purple">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Personality Predictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
