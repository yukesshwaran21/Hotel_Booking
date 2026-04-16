import { useState } from 'react';
import './AuthForm.css';

const initialLoginState = {
  email: '',
  password: ''
};

const initialRegisterState = {
  name: '',
  email: '',
  password: ''
};

function AuthForm({ mode, onSubmit, loading }) {
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [registerForm, setRegisterForm] = useState(initialRegisterState);

  const isLogin = mode === 'login';

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(isLogin ? loginForm : registerForm);
  };

  return (
    <section className="auth-form-wrapper">
      <h2 className="auth-title">{isLogin ? 'User Login' : 'User Registration'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <label>
            Name
            <input
              type="text"
              name="name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              placeholder="Enter your full name"
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={isLogin ? loginForm.email : registerForm.email}
            onChange={isLogin ? handleLoginChange : handleRegisterChange}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={isLogin ? loginForm.password : registerForm.password}
            onChange={isLogin ? handleLoginChange : handleRegisterChange}
            placeholder="Enter your password"
            minLength={6}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </section>
  );
}

export default AuthForm;
