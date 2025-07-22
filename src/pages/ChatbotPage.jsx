import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

// Navigation component stub - replace with your actual import
const Navigation = () => <div className="h-16 bg-black/50 backdrop-blur-sm" />;

// Configuration for your Hugging Face Space
const HUGGINGFACE_SPACE_URL = 'https://hunzalarasheed1-personality-assessment-api.hf.space';
const TOTAL_QUESTIONS = 15;

// API endpoints configuration
const createEndpoint = (path) => ({
  url: `${HUGGINGFACE_SPACE_URL}${path}`,
  config: {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
});

const createPostEndpoint = (path) => ({
  url: `${HUGGINGFACE_SPACE_URL}${path}`,
  config: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
});

const endpoints = {
  startAssessment: createPostEndpoint('/start-assessment'),
  submitProfile: (sessionId) => createPostEndpoint(`/submit-profile/${sessionId}`),
  getQuestion: (sessionId) => createEndpoint(`/get-question/${sessionId}`),
  submitAnswer: createPostEndpoint('/submit-answer'),
  getResults: (sessionId) => createEndpoint(`/get-results/${sessionId}`),
  sessionStatus: (sessionId) => createEndpoint(`/session-status/${sessionId}`),
  health: createEndpoint('/health')
};

const formatTimeString = (timestamp) => {
  if (!timestamp) return '';
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

const Input = ({ value, onChange, onKeyDown, placeholder, className, onFocus, disabled }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className={`px-4 py-2 rounded-lg border-2 transition-all ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onFocus={onFocus}
    disabled={disabled}
  />
);

const Button = ({ onClick, className, disabled, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
    disabled={disabled}
  >
    {children}
  </button>
);

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('unknown');
  const [userProfile, setUserProfile] = useState({
    profession: '',
    field: '',
    interests: ''
  });
  const [profileStep, setProfileStep] = useState('profession');
  const [profileComplete, setProfileComplete] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    addMessage('bot', 'Welcome! I\'m your AI Personality Assessment Assistant. Before we begin, I need to know a bit about you. What is your profession?');
    checkHealthStatus();
  }, []);

  const sanitizeText = (text) => {
    return text.replace(/\*+/g, '');
  };

  const addMessage = (sender, text, personality_insight = null) => {
    setMessages(prev => [...prev, {
      id: `${Date.now()}-${Math.random()}`,
      text: sanitizeText(text),
      sender,
      personality_insight,
      timestamp: new Date()
    }]);
  };

  const checkHealthStatus = async () => {
    try {
      const { url, config } = endpoints.health;
      const response = await fetch(url, {
        ...config,
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (response.ok) {
        const data = await response.json();
        setConnectionStatus('connected');
        console.log('Health check successful:', data);
      } else {
        setConnectionStatus('error');
        console.warn('Health check failed:', response.status);
      }
    } catch (error) {
      setConnectionStatus('error');
      console.error('Health check error:', error);
    }
  };

  const handleProfileInput = async (value) => {
    if (!value.trim()) {
      addMessage('bot', 'Please provide a valid response.');
      return;
    }

    switch (profileStep) {
      case 'profession':
        setUserProfile(prev => ({ ...prev, profession: value }));
        setProfileStep('field');
        addMessage('bot', `Great! As a ${value}, what field or industry do you work in?`);
        break;
      
      case 'field':
        setUserProfile(prev => ({ ...prev, field: value }));
        setProfileStep('interests');
        addMessage('bot', `Excellent! Now, what are your main interests or hobbies outside of your work in ${value}?`);
        break;
      
      case 'interests':
        setUserProfile(prev => ({ ...prev, interests: value }));
        setProfileComplete(true);
        setProfileStep('complete');
        addMessage('bot', 'Perfect! I have your profile ready. Starting your personality assessment now...');
        // Automatically start assessment after profile completion
        setTimeout(() => startAssessment(), 1000);
        break;
    }
  };

  const startAssessment = async () => {
    try {
      setIsLoading(true);
      
      const { url, config } = endpoints.startAssessment;
      console.log('Starting assessment - URL:', url);
      
      const response = await fetch(url, {
        ...config,
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('Start assessment response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Parsed response data:', data);

      if (!data.session_id) {
        console.error('Missing session_id in response:', data);
        throw new Error('No session ID received from server');
      }

      console.log('Session ID received:', data.session_id);
      setSessionId(data.session_id);
      setAssessmentStarted(true);
      setConnectionStatus('connected');
      addMessage('bot', 'Great! Assessment session created successfully.');
      
      // Submit profile with user-provided values
      await submitProfile(data.session_id);
      
      // Small delay to ensure session is properly initialized
      setTimeout(() => {
        getNextQuestion(data.session_id);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting assessment:', error);
      setConnectionStatus('error');
      
      let userMessage;
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        userMessage = `Unable to connect to the assessment service. Please check if the service is running and try again.`;
      } else if (error.message.includes('status 503') || error.message.includes('status 502')) {
        userMessage = 'The assessment service is currently starting up. Please wait a moment and try again.';
      } else {
        userMessage = `Sorry, something went wrong: ${error.message}. Please refresh the page to try again.`;
      }
      addMessage('bot', userMessage);
      setSessionId(null);
      setAssessmentStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submitProfile = async (sid = sessionId) => {
    try {
      const { url, config } = endpoints.submitProfile(sid);
      console.log('Submitting profile - URL:', url);
      
      const response = await fetch(url, {
        ...config,
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(userProfile)
      });

      console.log('Submit profile response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Profile submission error:', errorText);
        throw new Error(`Failed to submit profile: ${response.status}`);
      }

      const data = await response.json();
      console.log('Profile submitted successfully:', data);
      return data;
    } catch (error) {
      console.error('Error submitting profile:', error);
      throw error;
    }
  };

  const getNextQuestion = async (sid = sessionId) => {
    try {
      const { url, config } = endpoints.getQuestion(sid);
      console.log('Getting question - URL:', url);
      
      const response = await fetch(url, {
        ...config,
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('Get question response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Get question error:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.detail?.includes('Invalid session state')) {
            console.log('Invalid session state, resubmitting profile...');
            await submitProfile(sid);
            return getNextQuestion(sid);
          }
          throw new Error(errorData.detail || `Server error: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`Server error: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('Question received:', data);
      
      if (!data.question) {
        throw new Error('Invalid question format received');
      }
      
      setCurrentQuestion(data.question_number || currentQuestion + 1);
      addMessage('bot', `Question ${data.question_number || currentQuestion + 1} of ${TOTAL_QUESTIONS}: ${data.question}`);
    } catch (error) {
      console.error('Error getting question:', error);
      addMessage('bot', `Sorry, I had trouble getting the next question: ${error.message}. Please refresh the page to try again.`);
      setSessionId(null);
      setAssessmentStarted(false);
    }
  };

  const submitAnswer = async (answer) => {
    if (!answer || answer.length < 5) {
      addMessage('bot', 'Please provide a more detailed response (at least 5 characters) to help me understand your personality better.');
      return;
    }

    try {
      setIsLoading(true);
      const { url, config } = endpoints.submitAnswer;
      console.log('Submitting answer - URL:', url);
      
      const response = await fetch(url, {
        ...config,
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          session_id: sessionId,
          answer: answer
        })
      });
      
      console.log('Submit answer response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Submit answer error:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.detail?.includes('Invalid session state')) {
            await submitProfile(sessionId);
            return submitAnswer(answer);
          }
          throw new Error(errorData.detail || `Server error: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`Server error: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('Answer submitted successfully:', data);
      
      // Check if assessment is complete
      if (data.completed || currentQuestion >= TOTAL_QUESTIONS) {
        addMessage('bot', 'Thank you! Processing your final results...');
        setTimeout(() => {
          getResults();
        }, 1000);
      } else {
        addMessage('bot', 'Thank you for your response!');
        setTimeout(() => {
          getNextQuestion();
        }, 500);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      addMessage('bot', `Sorry, there was an error processing your answer: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getResults = async () => {
    try {
      setIsLoading(true);
      addMessage('bot', 'Analyzing your responses and generating your personality profile...');
      
      const { url, config } = endpoints.getResults(sessionId);
      console.log('Getting results - URL:', url);
      
      const response = await fetch(url, {
        ...config,
        mode: 'cors',
        credentials: 'omit'
      });
      
      console.log('Get results response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Get results error:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.detail?.includes('Assessment not completed')) {
            addMessage('bot', 'It seems the assessment is not fully completed. Let me try to get the next question for you.');
            await getNextQuestion();
            return;
          }
          throw new Error(errorData.detail || `Server error: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`Server error: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('Results received:', data);
      
      if (!data.detailed_analysis || !data.personality_type) {
        throw new Error('Invalid results format received');
      }
      
      // Display results with personality type insight
      addMessage('bot', data.detailed_analysis, data.personality_type);
      
      // Reset for next assessment
      setAssessmentStarted(false);
      setSessionId(null);
      setCurrentQuestion(0);
      setProfileStep('profession');
      setProfileComplete(false);
      setUserProfile({ profession: '', field: '', interests: '' });
      
      // Offer to start again
      setTimeout(() => {
        addMessage('bot', "Would you like to take the assessment again? Just refresh the page to begin a new session!");
      }, 2000);
      
    } catch (error) {
      console.error('Error getting results:', error);
      addMessage('bot', `Sorry, I had trouble generating your results: ${error.message}. Please refresh the page to try the assessment again.`);
      setAssessmentStarted(false);
      setSessionId(null);
      setCurrentQuestion(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput('');
    addMessage('user', userInput);

    const lowerInput = userInput.toLowerCase();

    // Check for health/status command at any time
    if (lowerInput === 'health' || lowerInput === 'status') {
      await checkHealthStatus();
      const statusMessage = connectionStatus === 'connected' 
        ? '✅ Service is running and accessible!' 
        : '❌ Service appears to be down or unreachable. Please try again later.';
      addMessage('bot', statusMessage);
      return;
    }

    // Handle profile collection
    if (!profileComplete) {
      await handleProfileInput(userInput);
      return;
    }

    // Handle assessment answers
    if (sessionId && assessmentStarted) {
      await submitAnswer(userInput);
    } else {
      addMessage('bot', "I'm not sure what you mean. If you'd like to start a new assessment, please refresh the page.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle size={12} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={12} className="text-red-400" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />;
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Disconnected';
      default:
        return 'Checking...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 overflow-hidden">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl flex flex-col flex-1 overflow-hidden shadow-2xl">
          {/* Chat header */}
          <div className="border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple-600/20 p-2 rounded-full">
                <Bot size={24} className="text-purple-400" />
              </div>
              <div>
                <h2 className="font-semibold text-white">Personality Predictor AI</h2>
                <p className="text-xs text-gray-400">
                  {profileComplete && assessmentStarted 
                    ? `Question ${currentQuestion} of ${TOTAL_QUESTIONS}` 
                    : 'Personality Analysis Assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-xs px-2 py-1 gap-1 bg-teal-500/20 text-teal-400 rounded-full">
                <Sparkles size={12} /> AI-Powered
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                {getConnectionStatusIcon()}
                <span>{getConnectionStatusText()}</span>
              </div>
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
                    ? 'bg-purple-600/30 rounded-tr-sm text-white' 
                    : 'bg-white/5 rounded-tl-sm text-gray-200'}
                `}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'bot' 
                      ? <Bot size={16} className="text-teal-400" /> 
                      : <User size={16} className="text-purple-400" />}
                    <span className="text-xs text-gray-400">
                      {message.sender === 'bot' ? 'Personality Predictor AI' : 'You'} • {formatTimeString(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  {message.personality_insight && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-teal-400 italic font-medium">
                        🧠 Personality Type: {message.personality_insight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
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
            <div ref={messagesEndRef} className="h-1"></div>
          </div>

          {/* Chat input */}
          <div className="border-t border-white/10 p-4 sticky bottom-0 bg-gray-800/50 backdrop-blur-sm">
            <div className="flex gap-2 items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  !profileComplete 
                    ? `Enter your ${profileStep}...` 
                    : assessmentStarted 
                      ? "Type your answer here..." 
                      : "Type your message here..."
                }
                className="flex-1 bg-white/5 border-white/10 text-white placeholder-gray-400"
                onFocus={scrollToBottom}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-6"
                disabled={!input.trim() || isLoading}
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered By: AI Personality Predictor • Type "health" to check service status
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;