import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';

const SignupPage = () => {
  const { register: registerUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showVerifyNotice, setShowVerifyNotice] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const password = watch("password");
  
  const onSubmit = async (data) => {
    setServerError("");
    try {
      await registerUser(data.name, data.email, data.password);
      setShowVerifyNotice(true);
    } catch (error) {
      // Try to extract error message from error object or error.message
      let msg = error?.message || "An unexpected error occurred. Please try again.";
      // If error.message is a stringified JSON, try to parse it
      try {
        const parsed = JSON.parse(msg);
        if (parsed?.message) msg = parsed.message;
        if (parsed?.errors && Array.isArray(parsed.errors) && parsed.errors.length > 0) {
          msg = parsed.errors[0].msg || parsed.errors[0].message || msg;
        }
      } catch {}
      setServerError(msg);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://personality-predictor-l9tt.onrender.com/api/auth/google';
  };

  const handleFacebookLogin = () => {
  window.location.href = 'https://personality-predictor-l9tt.onrender.com/api/auth/facebook';
  };


  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gradient">Personality Predictor</h1>
          </Link>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>
        <div className="bg-glass rounded-xl p-8">
          {showVerifyNotice ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
              <span className="block sm:inline font-semibold">Signup successful! Please check your email and verify your account before logging in.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {serverError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-2 animate-pulse">
                  <span className="block sm:inline font-semibold">{serverError}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required"
                  })}
                  className="bg-white/5 border-white/10 text-white"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              
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
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    className="bg-white/5 border-white/10 text-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="bg-white/5 border-white/10 text-white"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple to-teal hover:opacity-90"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'} <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple hover:text-teal font-medium">
              <ArrowLeft className="inline h-4 w-4" /> Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;