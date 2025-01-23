import React, { useState, useEffect } from "react";

const GestionUsuarios: React.FC = () => {
  const [users, setUsers] = useState<{ username: string; role: string }[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    setUsers(users);
  }, []);

  const handleDelete = (username: string) => {
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.username}>
              {user.username} ({user.role})
              <button onClick={() => handleDelete(user.username)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados.</p>
      )}
    </div>
  );
};

export default GestionUsuarios;
