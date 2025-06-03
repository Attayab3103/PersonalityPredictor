const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const HF_API_URL = process.env.REACT_APP_HF_API_URL || 'https://hunzalarasheed1-personality-assessment-api.hf.space';

// Ensure URLs don't have trailing slashes
const normalizeUrl = (url) => url.replace(/\/+$/, '');

// Total number of questions from the API for the Big Five personality traits
// 3 questions each for: EXT (Extroversion), EST (Emotional Stability), 
// AGR (Agreeableness), CSN (Conscientiousness), OPN (Openness)
const TOTAL_QUESTIONS = 15;

// Common fetch configuration for HuggingFace Space API
const commonConfig = {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
  }
};

// API endpoints for personality assessment
const endpoints = {  // Assessment flow endpoints
  startAssessment: {
    url: `${normalizeUrl(HF_API_URL)}/start-assessment`,
    config: { method: 'POST', headers: commonConfig.headers }
  },
  submitProfile: (sessionId) => ({
    url: `${normalizeUrl(HF_API_URL)}/submit-profile/${sessionId}`,
    config: { 
      method: 'POST', 
      headers: commonConfig.headers 
    }
  }),
  getQuestion: (sessionId) => ({
    url: `${normalizeUrl(HF_API_URL)}/get-question/${sessionId}`,
    config: { 
      method: 'GET', 
      headers: commonConfig.headers 
    }
  }),
  submitAnswer: {
    url: `${normalizeUrl(HF_API_URL)}/submit-answer`,
    config: { 
      method: 'POST', 
      headers: commonConfig.headers 
    }
  },
  getResults: (sessionId) => ({
    url: `${normalizeUrl(HF_API_URL)}/get-results/${sessionId}`,
    config: { 
      method: 'GET', 
      headers: commonConfig.headers 
    }
  }),
  getSessionStatus: (sessionId) => ({
    url: `${normalizeUrl(HF_API_URL)}/session-status/${sessionId}`,
    config: { 
      method: 'GET', 
      headers: commonConfig.headers 
    }
  }),
  health: {
    url: `${normalizeUrl(HF_API_URL)}/health`,
    config: { 
      method: 'GET', 
      headers: commonConfig.headers 
    }
  },
  regularChat: {
    url: `${normalizeUrl(API_URL)}/chat`,
    config: { 
      method: 'POST', 
      headers: commonConfig.headers 
    }
  },
  deleteSession: (sessionId) => ({
    url: `${normalizeUrl(HF_API_URL)}/delete-session/${sessionId}`,
    config: { 
      method: 'DELETE', 
      headers: commonConfig.headers 
    }
  })
};

export { endpoints, TOTAL_QUESTIONS };
