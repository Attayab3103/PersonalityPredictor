import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    
    if (token && userId) {
      // Store token in localStorage
      localStorage.setItem('token', token);
      // Login with the token
      loginWithToken(token);
    } else {
      // If no token or userId, redirect to login
      navigate('/login');
    }
  }, [searchParams, navigate, loginWithToken]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-white text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple mx-auto"></div>
        </div>
        <div>Authenticating...</div>
      </div>
    </div>
  );
};

export default AuthCallback;