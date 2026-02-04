import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const RegisterPage = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register attempt:', formData);
    // Add your registration logic here
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="bg-light rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Form */}
          <div className="p-12 flex flex-col justify-center bg-light order-2 md:order-1">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-lg text-secondary/60 font-light tracking-widest uppercase mb-2 animate-slideDown">
                  Join Us Today
                </h2>
                <h1 className="text-4xl font-display font-bold text-primary mb-2 animate-slideDown" style={{ animationDelay: '0.1s' }}>
                  Create Account
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="relative animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <label htmlFor="name" className="block text-sm font-medium text-primary/70 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-20 pr-4 py-4 bg-white border-2 border-secondary/20 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 text-primary placeholder:text-primary/40"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative animate-slideUp" style={{ animationDelay: '0.3s' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-primary/70 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="test@123@gmail.com"
                      className="w-full pl-20 pr-4 py-4 bg-white border-2 border-secondary/20 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 text-primary placeholder:text-primary/40"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative animate-slideUp" style={{ animationDelay: '0.4s' }}>
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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
                </div>

                {/* Confirm Password Input */}
                <div className="relative animate-slideUp" style={{ animationDelay: '0.5s' }}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary/70 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-rose rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-20 pr-14 py-4 bg-white border-2 border-secondary/20 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all duration-300 text-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-secondary via-accent to-rose py-4 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: '0.6s' }}
                >
                  CREATE ACCOUNT
                </button>

                {/* Login Link */}
                <div className="text-center animate-slideUp" style={{ animationDelay: '0.7s' }}>
                  <p className="text-primary/60">
                    ALREADY HAVE AN ACCOUNT?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-secondary font-semibold hover:text-accent transition-colors"
                    >
                      SIGN IN
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="bg-gradient-to-br from-rose via-accent to-secondary p-12 flex items-center justify-center relative overflow-hidden order-1 md:order-2">
            <div className="absolute inset-0 bg-noise opacity-5"></div>
            <div className="absolute top-10 right-10 w-20 h-20 border-4 border-light/20 rounded-full animate-float"></div>
            <div className="absolute bottom-20 left-10 w-16 h-16 border-4 border-light/20 rounded-full animate-float-delayed"></div>
            
            <div className="relative z-10 text-center">
              {/* Isometric Illustration */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Platform */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 h-4 bg-primary/30 rounded-full blur-xl"></div>
                
                {/* Document/Form */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-52 h-64 bg-light rounded-2xl shadow-2xl transform rotate-[5deg] perspective-1000 animate-float">
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-secondary/30 rounded w-3/4"></div>
                    <div className="h-3 bg-accent/30 rounded w-full"></div>
                    <div className="h-3 bg-accent/30 rounded w-5/6"></div>
                    <div className="h-8 bg-gradient-to-r from-secondary to-accent rounded mt-4"></div>
                    <div className="h-3 bg-secondary/20 rounded w-2/3"></div>
                    <div className="h-3 bg-secondary/20 rounded w-4/5"></div>
                  </div>
                </div>

                {/* Person */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 -ml-8 animate-float-delayed">
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
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-light rounded-full">
                    <div className="absolute top-2 left-2 w-2 h-1 bg-primary rounded"></div>
                    <div className="absolute top-2 right-2 w-2 h-1 bg-primary rounded"></div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/50 rounded-full"></div>
                  </div>
                  {/* Arms */}
                  <div className="absolute top-2 -left-4 w-4 h-12 bg-primary rounded-full transform rotate-12"></div>
                  <div className="absolute top-2 -right-4 w-4 h-12 bg-primary rounded-full transform -rotate-45"></div>
                </div>

                {/* Floating icons */}
                <div className="absolute top-20 right-12 w-12 h-12 bg-light rounded-xl shadow-lg animate-float flex items-center justify-center">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div className="absolute top-32 left-12 w-12 h-12 bg-light rounded-xl shadow-lg animate-float-delayed flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div className="absolute top-8 left-20 w-10 h-10 bg-light rounded-full shadow-lg animate-float"></div>
                <div className="absolute bottom-32 right-8 w-8 h-8 bg-light rounded-full shadow-lg animate-float-delayed"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;