import React from "react";
import "./AcercaDe.css"; 

const AcercaDe: React.FC = () => {
  return (
    <div className="activities-container">
      <div className="activities-form-container">
        <h2>Acerca de</h2>
        <div className="activities-form">
          <p><strong>Nombre:</strong> Irving Martínez</p>
          <p><strong>NRC:</strong> 3822</p>
          <p>PROGRAMACIÓN INTEGRATIVA DE COMPONENTES</p>
          <p><strong>Título:</strong> Proyecto del segundo parcial</p>
          <p>
             Este proyecto consiste en el desarrollo de una aplicación web dinámica
            que optimiza la gestión de casos de estudio relacionados con participantes y actividades. Utiliza ReactJS
            con TypeScript, react-router-dom para la navegación y localStorage para almacenar datos de manera local.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
