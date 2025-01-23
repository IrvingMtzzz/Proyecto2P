import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }: { onLogin: (isLoggedIn: boolean, role: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const adminUser = { username: 'admin', password: '123', role: 'admin' };
    if (!users.find((user: { username: string }) => user.username === 'admin')) {
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }

    const user = users.find(
      (user: { username: string; password: string; role: string }) =>
        user.username === username && user.password === password
    );

    if (user) {
      onLogin(true, user.role);
      navigate('/');
    } else {
      setError('Usuario y/o contraseña incorrectos');
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Iniciar Sesión</h1>
          
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
          <button type="button" onClick={handleLogin}>Login</button>
          <button type="button" onClick={() => navigate('/register')}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;