import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Send, User, Bot, Sparkles } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // FastAPI server URL

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Personality Predictor, your AI personality analysis assistant. Start chatting with me, and I'll analyze your communication style to provide insights about your personality traits. How are you feeling today?",
      sender: 'bot',
      personality_insight: null,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    
    if (token && userId) {
      loginWithToken(token);
    }
  }, [searchParams, loginWithToken]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      personality_insight: null,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now(),
        text: data.text,
        personality_insight: data.personality_insight,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Show a fallback message if the API call fails
      const errorMessage = {
        id: Date.now(),
        text: "I apologize, but I'm having trouble analyzing your message right now. Please try again later.",
        sender: 'bot',
        personality_insight: null,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navigation />
      
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 overflow-hidden">
        <div className="bg-glass rounded-xl flex flex-col flex-1 overflow-hidden">
          
          {/* Chat header */}
          <div className="border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple/20 p-2 rounded-full">
                <Bot size={24} className="text-purple" />
              </div>
              <div>
                <h2 className="font-semibold text-white">Personality Predictor AI</h2>
                <p className="text-xs text-gray-400">Personality Analysis Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-xs px-2 py-1 gap-1 bg-teal/20 text-teal rounded-full">
                <Sparkles size={12} /> AI-Powered
              </span>
            </div>
          </div>
          
          {/* Chat messages */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] md:max-w-[70%] rounded-2xl p-3 
                  ${message.sender === 'user' 
                    ? 'bg-purple/30 rounded-tr-sm text-white' 
                    : 'bg-white/5 rounded-tl-sm text-gray-200'}
                `}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'bot' 
                      ? <Bot size={16} className="text-teal" /> 
                      : <User size={16} className="text-purple" />}
                    <span className="text-xs text-gray-400">
                      {message.sender === 'bot' ? 'Personality Predictor AI' : 'You'} • {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  {message.personality_insight && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-teal italic">
                        {message.personality_insight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-[70%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-1" />
          </div>
          
          {/* Chat input */}
          <div className="border-t border-white/10 p-4 sticky bottom-0 bg-dark">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message here..."
                className="bg-white/5 border-white/10 text-white"
                onFocus={scrollToBottom}
              />
              <Button 
                onClick={handleSend} 
                className="bg-gradient-to-r from-purple to-teal hover:opacity-90"
                disabled={!input.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatbotPage;
