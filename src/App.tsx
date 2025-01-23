import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GestionParticipantes from "./componentes/Participantes";
import GestionActividades from "./componentes/Actividades";
import DetallesActividades from "./componentes/DetallesActividad";
import Login from "./componentes/Login";
import Register from "./componentes/Register";
import Navbar from "./componentes/Navbar";
import GestionUsuarios from "./componentes/GestionUsuarios";
import AcercaDe from "./componentes/AcercaDe"; // Importa el componente
import "./App.css"; 

interface Participante {
  id_participante: number;
  nombre: string;
  edad: number;
  email: string;
}

interface Actividad {
  id_actividad: number;
  nombre: string;
  descripcion: string;
}

interface Inscripcion {
  id_inscripcion: number;
  id_participante: number;
  id_actividad: number;
}

const App: React.FC = () => {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const storedParticipantes = localStorage.getItem("participantes");
    const storedActividades = localStorage.getItem("actividades");
    const storedInscripciones = localStorage.getItem("inscripciones");
    const logeddIn = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");

    if (storedParticipantes) {
      setParticipantes(JSON.parse(storedParticipantes));
    }
    if (storedActividades) {
      setActividades(JSON.parse(storedActividades));
    }
    if (storedInscripciones) {
      setInscripciones(JSON.parse(storedInscripciones));
    }
    if (logeddIn === "true") setIsAuthenticated(true);
    if (role) setUserRole(role);
  }, []);

  useEffect(() => {
    localStorage.setItem("participantes", JSON.stringify(participantes));
  }, [participantes]);

  useEffect(() => {
    localStorage.setItem("actividades", JSON.stringify(actividades));
  }, [actividades]);

  useEffect(() => {
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));
  }, [inscripciones]);

  const handleLogin = (status: boolean, role: string) => {
    setIsAuthenticated(status);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", JSON.stringify(status));
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <>
                <Navbar onLogout={handleLogout} role={userRole} />
                <div style={{ padding: "20px" }}>
                  <Routes>
                    <Route path="/" element={<h1>¡Bienvenido a la App de Gestión!</h1>} />
                    <Route
                      path="/participantes"
                      element={
                        <GestionParticipantes
                          participantes={participantes}
                          setParticipantes={setParticipantes}
                          inscripciones={inscripciones}
                          setInscripciones={setInscripciones}
                          userRole={userRole}
                        />
                      }
                    />
                    <Route
                      path="/actividades"
                      element={
                        <GestionActividades
                          actividades={actividades}
                          setActividades={setActividades}
                          inscripciones={inscripciones}
                          userRole={userRole}
                        />
                      }
                    />
                    <Route
                      path="/detalles"
                      element={
                        <DetallesActividades
                          participantes={participantes}
                          actividades={actividades}
                          inscripciones={inscripciones}
                          setInscripciones={setInscripciones}
                          userRole={userRole}
                        />
                      }
                    />
                    {userRole === "admin" && (
                      <Route path="/usuarios" element={<GestionUsuarios />} />
                    )}
                    <Route path="/acerca-de" element={<AcercaDe />} /> {/* Nueva ruta */}
                  </Routes>
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
