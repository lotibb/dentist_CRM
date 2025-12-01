import { useState, useEffect, useRef } from "react";
import { createExpediente, updateExpediente } from "../api/expedientes";
import { getPacientes } from "../api/pacientes";
import { getDentistas } from "../api/dentistas";
import "../styles/ExpedienteForm.css";

export default function ExpedienteForm({ reload, editing, setEditing, pacientes: initialPacientes }) {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    id_paciente: "",
    id_dentista: "",
    fecha_consulta: "",
    diagnostico: "",
    tratamiento: "",
    sintomas: "",
    antecedentes: "",
    medicamentos: "",
    alergias: "",
    procedimientos: "",
    proxima_cita: "",
    observaciones_clinicas: "",
    prescripcion: "",
    notas: "",
  });
  const [pacientes, setPacientes] = useState(initialPacientes || []);
  const [dentistas, setDentistas] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        id_paciente: editing.id_paciente || "",
        id_dentista: editing.id_dentista || "",
        fecha_consulta: editing.fecha_consulta 
          ? new Date(editing.fecha_consulta).toISOString().slice(0, 16)
          : "",
        diagnostico: editing.diagnostico || "",
        tratamiento: editing.tratamiento || "",
        sintomas: editing.sintomas || "",
        antecedentes: editing.antecedentes || "",
        medicamentos: editing.medicamentos || "",
        alergias: editing.alergias || "",
        procedimientos: editing.procedimientos || "",
        proxima_cita: editing.proxima_cita 
          ? new Date(editing.proxima_cita).toISOString().slice(0, 16)
          : "",
        observaciones_clinicas: editing.observaciones_clinicas || "",
        prescripcion: editing.prescripcion || "",
        notas: editing.notas || "",
      });
      // Hacer scroll al formulario cuando se inicia la edición
      setTimeout(() => {
        formRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [editing]);

  useEffect(() => {
    const loadData = async () => {
      if (!initialPacientes || initialPacientes.length === 0) {
        try {
          setLoading(true);
          const [pacientesRes, dentistasRes] = await Promise.all([
            getPacientes(),
            getDentistas()
          ]);
          setPacientes(pacientesRes.data);
          setDentistas(dentistasRes.data);
        } catch (err) {
          console.error("Error cargando datos:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setPacientes(initialPacientes);
        loadDentistas();
      }
    };

    const loadDentistas = async () => {
      try {
        const res = await getDentistas();
        setDentistas(res.data);
      } catch (err) {
        console.error("Error cargando dentistas:", err);
      }
    };

    loadData();
  }, [initialPacientes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.id_paciente || !form.id_dentista || !form.fecha_consulta || !form.diagnostico) {
      setError("Complete todos los campos requeridos");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const payload = {
        id_paciente: Number(form.id_paciente),
        id_dentista: Number(form.id_dentista),
        fecha_consulta: form.fecha_consulta,
        diagnostico: form.diagnostico,
        tratamiento: form.tratamiento || null,
        sintomas: form.sintomas || null,
        antecedentes: form.antecedentes || null,
        medicamentos: form.medicamentos || null,
        alergias: form.alergias || null,
        procedimientos: form.procedimientos || null,
        proxima_cita: form.proxima_cita || null,
        observaciones_clinicas: form.observaciones_clinicas || null,
        prescripcion: form.prescripcion || null,
        notas: form.notas || null,
      };
      
      if (isNaN(payload.id_paciente) || isNaN(payload.id_dentista)) {
        setError("Seleccione un paciente y dentista válidos");
        return;
      }
      
      if (editing) {
        const id = editing.id_expediente || editing.id;
        await updateExpediente(id, payload);
        setEditing(null);
      } else {
        await createExpediente(payload);
      }

      setForm({
        id_paciente: "",
        id_dentista: "",
        fecha_consulta: "",
        diagnostico: "",
        tratamiento: "",
        sintomas: "",
        antecedentes: "",
        medicamentos: "",
        alergias: "",
        procedimientos: "",
        proxima_cita: "",
        observaciones_clinicas: "",
        prescripcion: "",
        notas: "",
      });

      await reload();
    } catch (err) {
      console.error('Error guardando expediente:', err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
      setError("Error al guardar el expediente: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({
      id_paciente: "",
      id_dentista: "",
      fecha_consulta: "",
      diagnostico: "",
      tratamiento: "",
      notas: "",
    });
    setError(null);
  };

  return (
    <div className="expediente-form-container" ref={formRef}>
      <h2>{editing ? "Modificar expediente" : "Agregar expediente"}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Cargando datos...</div>
      ) : (
        <form onSubmit={handleSubmit} className="expediente-form">
          <div className="form-group">
            <label htmlFor="paciente">Paciente *</label>
            <select
              id="paciente"
              value={form.id_paciente}
              onChange={(e) => setForm({ ...form, id_paciente: e.target.value })}
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
            <label htmlFor="dentista">Dentista *</label>
            <select
              id="dentista"
              value={form.id_dentista}
              onChange={(e) => setForm({ ...form, id_dentista: e.target.value })}
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
            <label htmlFor="fecha_consulta">Fecha y hora de consulta *</label>
            <input
              id="fecha_consulta"
              type="datetime-local"
              value={form.fecha_consulta}
              onChange={(e) => setForm({ ...form, fecha_consulta: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="diagnostico">Diagnóstico *</label>
            <textarea
              id="diagnostico"
              placeholder="Diagnóstico del paciente"
              value={form.diagnostico}
              onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sintomas">Síntomas</label>
            <textarea
              id="sintomas"
              placeholder="Síntomas que presenta el paciente"
              value={form.sintomas}
              onChange={(e) => setForm({ ...form, sintomas: e.target.value })}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="antecedentes">Antecedentes médicos</label>
            <textarea
              id="antecedentes"
              placeholder="Antecedentes médicos relevantes"
              value={form.antecedentes}
              onChange={(e) => setForm({ ...form, antecedentes: e.target.value })}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicamentos">Medicamentos</label>
            <textarea
              id="medicamentos"
              placeholder="Medicamentos que está tomando el paciente"
              value={form.medicamentos}
              onChange={(e) => setForm({ ...form, medicamentos: e.target.value })}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="alergias">Alergias</label>
            <textarea
              id="alergias"
              placeholder="Alergias conocidas del paciente"
              value={form.alergias}
              onChange={(e) => setForm({ ...form, alergias: e.target.value })}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tratamiento">Tratamiento</label>
            <textarea
              id="tratamiento"
              placeholder="Tratamiento aplicado"
              value={form.tratamiento}
              onChange={(e) => setForm({ ...form, tratamiento: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="procedimientos">Procedimientos realizados</label>
            <textarea
              id="procedimientos"
              placeholder="Procedimientos realizados durante la consulta"
              value={form.procedimientos}
              onChange={(e) => setForm({ ...form, procedimientos: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="proxima_cita">Próxima cita</label>
            <input
              id="proxima_cita"
              type="datetime-local"
              value={form.proxima_cita}
              onChange={(e) => setForm({ ...form, proxima_cita: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="observaciones_clinicas">Observaciones clínicas</label>
            <textarea
              id="observaciones_clinicas"
              placeholder="Observaciones clínicas adicionales"
              value={form.observaciones_clinicas}
              onChange={(e) => setForm({ ...form, observaciones_clinicas: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prescripcion">Prescripción</label>
            <textarea
              id="prescripcion"
              placeholder="Prescripción médica o receta"
              value={form.prescripcion}
              onChange={(e) => setForm({ ...form, prescripcion: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas adicionales</label>
            <textarea
              id="notas"
              placeholder="Notas adicionales sobre la consulta"
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              rows="3"
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
      )}
    </div>
  );
}

