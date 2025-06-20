import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://personality-predictor-l9tt.onrender.com/api'}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email })
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Failed to send reset email');
      }
      setSuccess(resData.message || 'Password reset link sent! Please check your email.');
    } catch (error) {
      let msg = error?.message || 'An unexpected error occurred. Please try again.';
      try {
        const parsed = JSON.parse(msg);
        if (parsed?.message) msg = parsed.message;
        if (parsed?.errors && Array.isArray(parsed.errors) && parsed.errors.length > 0) {
          msg = parsed.errors[0].msg || parsed.errors[0].message || msg;
        }
      } catch {}
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gradient">Personality Predictor</h1>
          </Link>
          <p className="text-gray-400 mt-2">Forgot your password?</p>
        </div>
        <div className="bg-glass rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-2 animate-pulse">
                <span className="block sm:inline font-semibold">{serverError}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-2 animate-pulse">
                <span className="block sm:inline font-semibold">{success}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="bg-white/5 border-white/10 text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple to-teal hover:opacity-90"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-purple hover:text-teal font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
