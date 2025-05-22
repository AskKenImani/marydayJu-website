import React, { useState } from 'react';
import HeaderContribution from './HeaderContribution';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';

function AuthPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authForm, setAuthForm] = useState(null); 
  const [user, setUser] = useState(null); 

  // Handles login AND navigation from LoginForm
  const handleLogin = (data) => {
    if (data === 'register') {
      setAuthForm('register');
    } else {
      // Successful login
      setUser({
        userId: data,
        userName: 'User', 
      });
    }
  };

  // Handles registration AND navigation from RegisterForm
  const handleRegister = (data) => {
    if (data === 'login') {
      setAuthForm('login');
    } else {
      
      console.log('Registered successfully:', data);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAuthForm(null);
  };

  return (
    <div>
      <HeaderContribution 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        loggedIn={!!user}
        setAuthForm={setAuthForm}
      />

      {!user ? (
        <div className="auth-container">
          {authForm === 'login' && <LoginForm onLogin={handleLogin} />}
          {authForm === 'register' && <RegisterForm onRegister={handleRegister} />}
        </div>
      ) : (
        <Dashboard 
          onLogout={handleLogout}
          userName={user.userName}
          userId={user.userId}
        />
      )}
    </div>
  );
}

export default AuthPage;
