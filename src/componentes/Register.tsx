import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!/^[a-zA-Z]+$/.test(username)) {
      setError("El nombre de usuario solo puede contener letras");
      return;
    }

    if (password === '') {
      setError("La contraseña no puede estar vacía");
      return;
    }

    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.find((user: { username: string }) => user.username === username);

    if (userExists) {
      setError("El usuario ya existe");
    } else {
      users.push({ username, password, role: "participante" });
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => navigate('/login')}>Back to Login</button>
    </div>
  );
};

export default Register;