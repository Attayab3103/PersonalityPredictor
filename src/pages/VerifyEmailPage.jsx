import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmailPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const token = query.get('token');
    const email = query.get('email');
    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    fetch(`${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`)
      .then(async (res) => {
        if (res.redirected) {
          // If backend redirects, follow it
          window.location.href = res.url;
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage('Your email has been verified! You can now log in.');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed.');
      });
  }, [query, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="bg-glass p-8 rounded-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className={status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-gray-700'}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
