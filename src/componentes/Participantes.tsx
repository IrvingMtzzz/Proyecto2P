import React, { useState } from "react";
import './Participantes.css';

interface Participante {
  id_participante: number;
  nombre: string;
  edad: number;
  email: string;
}

interface Inscripcion {
  id_inscripcion: number;
  id_participante: number;
  id_actividad: number;
}

interface Props {
  participantes: Participante[];
  setParticipantes: React.Dispatch<React.SetStateAction<Participante[]>>;
  inscripciones: Inscripcion[];
  setInscripciones: React.Dispatch<React.SetStateAction<Inscripcion[]>>;
  userRole: string;
}

const GestionParticipantes: React.FC<Props> = ({ participantes, setParticipantes, inscripciones, setInscripciones, userRole }) => {
  const [form, setForm] = useState({ nombre: "", edad: 0, email: "" });
  const [editando, setEditando] = useState<number | null>(null);
  const [participanteAgregado, setParticipanteAgregado] = useState<Participante | null>(null);

  const validarCampos = () => /^[a-zA-Z\s]+$/.test(form.nombre) && form.edad > 0 && /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(form.email);

  const correoRegistrado = (email: string) => {
    return participantes.some(p => p.email === email && p.id_participante !== editando);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const manejarAccion = () => {
    if (validarCampos()) {
      if (correoRegistrado(form.email)) {
        alert("Este correo ya está registrado como participante.");
        return;
      }
      
      const nuevoParticipante = {
        id_participante: editando || participantes.length + 1,
        ...form,
      };
      const actualizados = editando
        ? participantes.map((p) => (p.id_participante === editando ? nuevoParticipante : p))
        : [...participantes, nuevoParticipante];
      setParticipantes(actualizados);
      setParticipanteAgregado(nuevoParticipante);
      limpiarFormulario();
    } else {
      alert("Por favor, ingrese datos válidos.");
    }
  };

  const limpiarFormulario = () => {
    setForm({ nombre: "", edad: 0, email: "" });
    setEditando(null);
  };

  const manejarEdicion = (p: Participante) => {
    setForm(p);
    setEditando(p.id_participante);
    setParticipanteAgregado(null);
  };

  const eliminarParticipante = (id: number) => {
    setParticipantes(participantes.filter((p) => p.id_participante !== id));
    setInscripciones(inscripciones.filter((inscripcion) => inscripcion.id_participante !== id));
    if (participanteAgregado && participanteAgregado.id_participante === id) {
      setParticipanteAgregado(null);
    }
  };

  return (
    <div className="participants-container">
      <h2>Gestión de Participantes</h2>
      {userRole === 'participante' && participanteAgregado ? (
        <div className="participant-info">
          <h3>Información del Participante</h3>
          <p>Nombre: {participanteAgregado.nombre}</p>
          <p>Edad: {participanteAgregado.edad}</p>
          <p>Email: {participanteAgregado.email}</p>
          <button onClick={() => eliminarParticipante(participanteAgregado.id_participante)}>Eliminar mi registro</button>
        </div>
      ) : (
        <div className="participants-form-container">
          <form className="participants-form">
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={manejarCambio} />
            <select name="edad" value={form.edad} onChange={manejarCambio}>
              <option value={0} disabled>Seleccione Edad</option>
              {[...Array(120)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <input name="email" placeholder="Email" value={form.email} onChange={manejarCambio} />
            <button type="button" onClick={manejarAccion}>
              {editando ? "Guardar Cambios" : "Agregar Participante"}
            </button>
          </form>
        </div>
      )}
      <table className="participants-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((p) => (
            <tr key={p.id_participante}>
              <td>{p.nombre}</td>
              <td>{p.edad}</td>
              <td>{p.email}</td>
              <td>
                {userRole === 'admin' || (participanteAgregado && participanteAgregado.id_participante === p.id_participante) ? (
                  <>
                    <button onClick={() => manejarEdicion(p)}>Editar</button>
                    <button onClick={() => eliminarParticipante(p.id_participante)}>Eliminar</button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionParticipantes;