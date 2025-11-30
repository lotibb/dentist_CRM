import { useState, useEffect } from "react";
import { getPacientes } from "../api/pacientes";
import { getDentistas } from "../api/dentistas";
import { createCita } from "../api/citas";
import "../styles/NewCitaPage.css";

export default function NewCitaPage() {
  const [pacientes, setPacientes] = useState([]);
  const [dentistas, setDentistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    id_paciente: "",
    id_dentista: "",
    fecha_cita: "",
    motivo: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [pacientesRes, dentistasRes] = await Promise.all([
          getPacientes(),
          getDentistas()
        ]);
        console.log('Pacientes:', pacientesRes.data);
        console.log('Dentistas:', dentistasRes.data);
        setPacientes(pacientesRes.data);
        setDentistas(dentistasRes.data);
      } catch (err) {
        setError("Error cargando datos: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.id_paciente || !form.id_dentista || !form.fecha_cita || !form.motivo) {
      setError("Complete todos los campos requeridos");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
   
      const payload = {
        id_dentista: Number(form.id_dentista),
        id_paciente: Number(form.id_paciente),
        fecha_cita: form.fecha_cita + ':00', 
        motivo: form.motivo
      };
      
  
      if (isNaN(payload.id_dentista) || isNaN(payload.id_paciente)) {
        setError("Seleccione un paciente y dentista válidos");
        return;
      }
      
      console.log('Sending payload:', payload);
      await createCita(payload);
      setSuccess(true);
      setForm({
        id_paciente: "",
        id_dentista: "",
        fecha_cita: "",
        motivo: "",
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message;
      setError("Error en la creacion de cita: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-cita-page">
      <h1>Crear nueva cita</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">¡Cita creada con éxito!</div>}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <form onSubmit={handleSubmit} className="cita-form">
          <div className="form-group">
            <label htmlFor="patient">Paciente</label>
            <select
              id="patient"
              value={form.id_paciente}
              onChange={(e) =>
                setForm({ ...form, id_paciente: e.target.value })
              }
              required
            >
              <option value="">Elige un paciente</option>
              {pacientes.map((p) => (
                <option key={p.id_paciente || p.id} value={p.id_paciente || p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dentist">Dentista</label>
            <select
              id="dentist"
              value={form.id_dentista}
              onChange={(e) =>
                setForm({ ...form, id_dentista: e.target.value })
              }
              required
            >
              <option value="">Elige un dentista</option>
              {dentistas.map((d) => (
                <option key={d.id_dentista || d.id} value={d.id_dentista || d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="datetime">Fecha y hora </label>
            <input
              id="datetime"
              type="datetime-local"
              value={form.fecha_cita}
              onChange={(e) =>
                setForm({ ...form, fecha_cita: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="motif">Motivo</label>
            <input
              id="motif"
              placeholder="Motivo de la consulta"
              value={form.motivo}
              onChange={(e) =>
                setForm({ ...form, motivo: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Creando..." : "Crear la cita"}
          </button>
        </form>
      )}
    </div>
  );
}
