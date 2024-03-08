import React, { useState } from 'react';
import './LoginForm.css'; 

const LoginForm = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`}>
      <div className="form-container sign-up">
        <form>
           <h1>Create Account</h1>
           <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="text" placeholder="Username"/>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
           <h1>Sign In</h1>
           <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>oor use your email password</span>
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${isActive ? 'hidden' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button onClick={handleLoginClick}>Sign In</button>
          </div>
          <div className={`toggle-panel toggle-right ${isActive ? '' : 'hidden'}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button onClick={handleRegisterClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
