import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

interface Props {
  onLogout: () => void;
  role: string;
}

const Navbar: React.FC<Props> = ({ onLogout, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-inverse">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              <Link id="len1" className="nav-link hoverable" to="/">Inicio</Link>
              <Link id="len2" className="nav-link hoverable" to="/participantes">Participantes</Link>
              <Link id="len3" className="nav-link hoverable" to="/actividades">Actividades</Link>
              <Link id="len4" className="nav-link hoverable" to="/detalles">Detalles de Actividades</Link>
              <Link id="len5" className="nav-link hoverable" to="/acerca-de">Acerca de</Link>
              {role === 'admin' && (
                <Link id="len6" className="nav-link hoverable" to="/usuarios">Usuarios</Link>
              )}
              <button
                className="nav-link hoverable btn"
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;