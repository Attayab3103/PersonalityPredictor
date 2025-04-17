import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    await login(data.email, data.password);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://personalitypredictor-react-webapp-2.onrender.com/api/auth/google';
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gradient">Personality Predictor</h1>
          </Link>
          <p className="text-gray-400 mt-2">Sign in to access your account</p>
        </div>
        
        <div className="bg-glass rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            
            <div className="flex justify-end">
              <Link to="#" className="text-sm text-purple hover:text-teal">
                Forgot password?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple to-teal hover:opacity-90"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'} <LogIn className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-[#0F0F1A] text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mt-6">
              <Button 
                variant="outline" 
                className="border-white/10 hover:bg-white/5"
                onClick={handleGoogleLogin}
                type="button"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.09 10.27v3.46H13.5c-.18 1.45-1.36 2.27-2.8 2.27-1.7 0-3.15-1.37-3.15-3.15 0-1.78 1.44-3.15 3.15-3.15.77 0 1.5.29 2.04.75l2.05-2.05c-1-.93-2.32-1.5-4.09-1.5-3.34 0-6.14 2.72-6.14 6.06S3.36 19.06 6.7 19.06c5.14 0 6.25-4.59 5.57-8.77H9.09z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple hover:text-teal font-medium">
              Sign up <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;