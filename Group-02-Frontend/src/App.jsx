import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-primary font-body overflow-hidden">
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        {isLogin ? (
          <LoginPage onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterPage onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default App;