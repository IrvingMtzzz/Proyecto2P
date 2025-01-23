import React, { useState } from "react";
import "./DetallesActividad.css"; 

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

interface Props {
  participantes: Participante[];
  actividades: Actividad[];
  inscripciones: Inscripcion[];
  setInscripciones: React.Dispatch<React.SetStateAction<Inscripcion[]>>;
  userRole: string;
}

const DetallesActividades: React.FC<Props> = ({ participantes, actividades, inscripciones, setInscripciones, userRole }) => {
  const [idActividad, setIdActividad] = useState<number>(0);
  const [participantesSeleccionados, setParticipantesSeleccionados] = useState<number[]>([]);

  const agregarInscripciones = () => {
    if (idActividad > 0 && participantesSeleccionados.length > 0) {
      const nuevasInscripciones = participantesSeleccionados.map((idParticipante) => ({
        id_inscripcion: Date.now() + idParticipante,
        id_participante: idParticipante,
        id_actividad: idActividad,
      }));

      const duplicados = nuevasInscripciones.some((inscripcion) =>
        inscripciones.some(
          (existente) =>
            existente.id_participante === inscripcion.id_participante &&
            existente.id_actividad === inscripcion.id_actividad
        )
      );

      if (duplicados) {
        alert("Algunos participantes ya están inscritos en esta actividad.");
        return;
      }

      setInscripciones([...inscripciones, ...nuevasInscripciones]);
      setIdActividad(0);
      setParticipantesSeleccionados([]);
    } else {
      alert("Por favor, seleccione una actividad y al menos un participante.");
    }
  };

  const eliminarInscripcion = (id_inscripcion: number) => {
    setInscripciones(inscripciones.filter((inscripcion) => inscripcion.id_inscripcion !== id_inscripcion));
  };

  const obtenerParticipantesPorActividad = (idActividad: number) => {
    return inscripciones
      .filter((inscripcion) => inscripcion.id_actividad === idActividad)
      .map((inscripcion) => participantes.find((p) => p.id_participante === inscripcion.id_participante))
      .filter(Boolean) as Participante[];
  };

  return (
    <div className="details-container">
      <h2>Detalles de Actividades</h2>

      {userRole === 'admin' && (
        <>
          <select
            className="activity-select"
            value={idActividad}
            onChange={(e) => setIdActividad(Number(e.target.value))}
          >
            <option value={0} disabled>
              Seleccione Actividad
            </option>
            {actividades.map((actividad) => (
              <option key={actividad.id_actividad} value={actividad.id_actividad}>
                {actividad.nombre}
              </option>
            ))}
          </select>

          <div className="participants-selection">
            <h4>Seleccione Participantes</h4>
            <div className="participants-list">
              {participantes.map((participante) => (
                <div key={participante.id_participante} className="participant-item">
                  <input
                    type="checkbox"
                    value={participante.id_participante}
                    checked={participantesSeleccionados.includes(participante.id_participante)}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      if (e.target.checked) {
                        setParticipantesSeleccionados((prev) => [...prev, id]);
                      } else {
                        setParticipantesSeleccionados((prev) => prev.filter((pId) => pId !== id));
                      }
                    }}
                  />
                  {participante.nombre} ({participante.email})
                </div>
              ))}
            </div>
          </div>

          <button className="associate-button" onClick={agregarInscripciones}>Asociar Participantes</button>
        </>
      )}

      <div className="activities-breakdown">
        <h3>Actividades y Participantes</h3>
        {actividades.map((actividad) => (
          <section key={actividad.id_actividad} className="activity-section">
            <h4>{actividad.nombre}</h4>
            <p>{actividad.descripcion}</p>
            <h5>Participantes:</h5>
            <ul>
              {obtenerParticipantesPorActividad(actividad.id_actividad).map((participante) => (
                <li key={participante.id_participante}>
                  {participante.nombre} - {participante.email}
                  {userRole === 'admin' && (
                    <button
                      className="remove-button"
                      onClick={() =>
                        eliminarInscripcion(
                          inscripciones.find(
                            (inscripcion) =>
                              inscripcion.id_participante === participante.id_participante &&
                              inscripcion.id_actividad === actividad.id_actividad
                          )?.id_inscripcion || 0
                        )
                      }
                    >
                      Eliminar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DetallesActividades;