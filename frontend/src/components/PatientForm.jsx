import { useState, useEffect, useRef } from "react";
import { createPaciente, updatePaciente } from "../api/pacientes";
import "../styles/PatientForm.css";

export default function PatientForm({ reload, editing, setEditing }) {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    fecha_nacimiento: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm(editing);
      // Hacer scroll al formulario cuando se inicia la edición
      setTimeout(() => {
        formRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nombre || !form.telefono || !form.correo) {
      setError("Complete todos los campos requeridos");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      if (editing) {
        const id = editing.id_paciente || editing.id;
        await updatePaciente(id, form);
        setEditing(null);
      } else {
        await createPaciente(form);
      }

      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        fecha_nacimiento: "",
      });

      await reload();
    } catch (err) {
      console.error('Error guardando paciente:', err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
      setError("Error al guardar el paciente: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      fecha_nacimiento: "",
    });
    setError(null);
  };

  return (
    <div className="patient-form-container" ref={formRef}>
      <h2>{editing ? "Modificar paciente" : "Agregar paciente"}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre </label>
          <input
            id="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            placeholder="Número de teléfono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            placeholder="email@example.com"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha de nacimiento</label>
          <input
            id="fecha"
            type="date"
            value={form.fecha_nacimiento}
            onChange={(e) =>
              setForm({ ...form, fecha_nacimiento: e.target.value })
            }
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Guardando..." : (editing ? "Modificar" : "Crear")}
          </button>
          {editing && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
