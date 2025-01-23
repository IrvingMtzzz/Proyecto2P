import React, { useState } from "react";
import "./Actividades.css"; 

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
  actividades: Actividad[];
  setActividades: React.Dispatch<React.SetStateAction<Actividad[]>>;
  inscripciones: Inscripcion[];
  userRole: string;
}

const GestionActividades: React.FC<Props> = ({ actividades, setActividades, inscripciones, userRole }) => {
  const [form, setForm] = useState({ nombre: "", descripcion: "" });
  const [editando, setEditando] = useState<number | null>(null);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const manejarAccion = () => {
    if (form.nombre.trim() && form.descripcion.trim()) {
      const nuevaActividad = {
        id_actividad: editando || actividades.length + 1,
        ...form,
      };
      const actualizadas = editando
        ? actividades.map((a) => (a.id_actividad === editando ? nuevaActividad : a))
        : [...actividades, nuevaActividad];
      setActividades(actualizadas);
      limpiarFormulario();
    } else alert("Por favor, complete todos los campos.");
  };

  const limpiarFormulario = () => {
    setForm({ nombre: "", descripcion: "" });
    setEditando(null);
  };

  const manejarEdicion = (a: Actividad) => {
    setForm(a);
    setEditando(a.id_actividad);
  };

  const eliminarActividad = (id: number) => {
    const actividadTieneInscripciones = inscripciones.some((inscripcion) => inscripcion.id_actividad === id);

    if (actividadTieneInscripciones) {
      alert("No se puede eliminar esta actividad porque tiene participantes inscritos.");
      return;
    }

    setActividades(actividades.filter((a) => a.id_actividad !== id));
  };

  return (
    <div className="activities-container">
      <h2>Gestión de Actividades</h2>
      {userRole === 'admin' && (
        <div className="activities-form-container">
          <div className="activities-form">
            <input
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={manejarCambio}
            />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={manejarCambio}
            />
            <button onClick={manejarAccion}>
              {editando ? "Guardar Cambios" : "Agregar Actividad"}
            </button>
          </div>
        </div>
      )}
      <table className="activities-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((a) => (
            <tr key={a.id_actividad}>
              <td>{a.nombre}</td>
              <td>{a.descripcion}</td>
              <td>
                {userRole === 'admin' && (
                  <>
                    <button onClick={() => manejarEdicion(a)}>Editar</button>
                    <button onClick={() => eliminarActividad(a.id_actividad)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionActividades;