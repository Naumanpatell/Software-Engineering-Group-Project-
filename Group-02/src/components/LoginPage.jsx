import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="bg-light rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Illustration */}
          <div className="bg-gradient-to-br from-secondary via-accent to-secondary p-12 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-5"></div>
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-light/20 rounded-full animate-float"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 border-4 border-light/20 rounded-full animate-float-delayed"></div>
            
            <div className="relative z-10 text-center">
              {/* Isometric Illustration */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Platform */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 h-4 bg-primary/30 rounded-full blur-xl"></div>
                
                {/* Main device */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-56 h-40 bg-light rounded-2xl shadow-2xl transform rotate-[-5deg] perspective-1000 animate-float">
                  <div className="absolute inset-2 bg-gradient-to-br from-accent to-secondary rounded-xl"></div>
                  <div className="absolute top-4 left-4 right-4 h-2 bg-light/50 rounded"></div>
                  <div className="absolute top-8 left-4 right-4 h-2 bg-light/30 rounded"></div>
                  <div className="absolute top-12 left-4 right-4 h-2 bg-light/30 rounded"></div>
                </div>

                {/* Person */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 ml-8 animate-float-delayed">
                  {/* Body */}
                  <div className="relative">
                    <div className="w-16 h-20 bg-primary rounded-t-full"></div>
                    {/* Legs */}
                    <div className="flex gap-1 justify-center">
                      <div className="w-6 h-8 bg-primary rounded-b-lg"></div>
                      <div className="w-6 h-8 bg-primary rounded-b-lg"></div>
                    </div>
                  </div>
                  {/* Head */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-rose rounded-full">
                    <div className="absolute top-2 left-2 w-2 h-1 bg-primary rounded"></div>
                    <div className="absolute top-2 right-2 w-2 h-1 bg-primary rounded"></div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/50 rounded-full"></div>
                  </div>
                  {/* Arms */}
                  <div className="absolute top-2 -left-4 w-4 h-12 bg-primary rounded-full transform -rotate-12"></div>
                  <div className="absolute top-2 -right-4 w-4 h-12 bg-primary rounded-full transform rotate-45"></div>
                </div>

                {/* Floating icons */}
                <div className="absolute top-20 left-12 w-12 h-12 bg-light rounded-xl shadow-lg animate-float flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div className="absolute top-32 right-12 w-12 h-12 bg-light rounded-xl shadow-lg animate-float-delayed flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <div className="absolute top-8 right-20 w-10 h-10 bg-light rounded-full shadow-lg animate-float"></div>
                <div className="absolute bottom-32 left-8 w-8 h-8 bg-rose rounded-full shadow-lg animate-float-delayed"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-12 flex flex-col justify-center bg-light">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-lg text-secondary/60 font-light tracking-widest uppercase mb-2 animate-slideDown">
                  Welcome Back
                </h2>
                <h1 className="text-4xl font-display font-bold text-primary mb-2 animate-slideDown" style={{ animationDelay: '0.1s' }}>
                  Login Page
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-primary/70 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="test@123@gmail.com"
                      className="w-full pl-20 pr-4 py-4 bg-white border-2 border-secondary/20 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 text-primary placeholder:text-primary/40"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative animate-slideUp" style={{ animationDelay: '0.3s' }}>
                  <label htmlFor="password" className="block text-sm font-medium text-primary/70 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-20 pr-14 py-4 bg-white border-2 border-secondary/20 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 text-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      className="text-sm text-secondary/60 hover:text-secondary transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-secondary via-accent to-rose py-4 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: '0.4s' }}
                >
                  SIGN IN
                </button>

                {/* Register Link */}
                <div className="text-center animate-slideUp" style={{ animationDelay: '0.5s' }}>
                  <p className="text-primary/60">
                    DON'T HAVE AN ACCOUNT?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToRegister}
                      className="text-secondary font-semibold hover:text-accent transition-colors"
                    >
                      CREATE AN ACCOUNT
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;