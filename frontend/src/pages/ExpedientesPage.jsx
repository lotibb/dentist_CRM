import { useEffect, useState } from "react";
import { getExpedientes, deleteExpediente } from "../api/expedientes";
import { getPacientes } from "../api/pacientes";
import ExpedienteForm from "../components/ExpedienteForm";
import "../styles/ExpedientesPage.css";

export default function ExpedientesPage() {
  const [expedientes, setExpedientes] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getExpedientes();
      console.log('Expedientes cargados:', res.data);
      setExpedientes(res.data);
    } catch (err) {
      setError("Error al cargar los expedientes: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPacientes = async () => {
    try {
      const res = await getPacientes();
      setPacientes(res.data);
    } catch (err) {
      console.error("Error cargando pacientes:", err);
    }
  };

  useEffect(() => {
    load();
    loadPacientes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este expediente?")) return;
    
    try {
      await deleteExpediente(id);
      await load();
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
      setError("Error al eliminar el expediente: " + errorMessage);
    }
  };

  const getPacienteNombre = (idPaciente) => {
    const paciente = pacientes.find(p => (p.id_paciente || p.id) === idPaciente);
    return paciente ? paciente.nombre : "N/A";
  };

  return (
    <div className="expedientes-page">
      <h1>Expedientes Médicos</h1>

      {error && <div className="error-message">{error}</div>}

      <ExpedienteForm reload={load} editing={editing} setEditing={setEditing} pacientes={pacientes} />

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="expedientes-list">
          {expedientes.length === 0 ? (
            <p className="no-data">No se encontraron expedientes</p>
          ) : (
            <ul>
              {expedientes.map((exp) => (
                <li key={exp.id_expediente || exp.id} className="expediente-item">
                  <div className="expediente-info">
                    <div className="expediente-header">
                      <strong>{getPacienteNombre(exp.id_paciente)}</strong>
                      <span className="expediente-date">
                        {exp.fecha_consulta ? new Date(exp.fecha_consulta).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="expediente-main-info">
                      <div className="expediente-details">
                        <span className="detail-label">Diagnóstico:</span>
                        <span className="detail-value">{exp.diagnostico || 'N/A'}</span>
                      </div>
                      
                      {exp.sintomas && (
                        <div className="expediente-details">
                          <span className="detail-label">Síntomas:</span>
                          <span className="detail-value">{exp.sintomas}</span>
                        </div>
                      )}
                      
                      {exp.tratamiento && (
                        <div className="expediente-details">
                          <span className="detail-label">Tratamiento:</span>
                          <span className="detail-value">{exp.tratamiento}</span>
                        </div>
                      )}
                      
                      {exp.procedimientos && (
                        <div className="expediente-details">
                          <span className="detail-label">Procedimientos:</span>
                          <span className="detail-value">{exp.procedimientos}</span>
                        </div>
                      )}
                    </div>

                    <div className="expediente-secondary-info">
                      {(exp.antecedentes || exp.medicamentos || exp.alergias) && (
                        <div className="expediente-section">
                          <h4 className="section-title">Historial Médico</h4>
                          {exp.antecedentes && (
                            <div className="expediente-details">
                              <span className="detail-label">Antecedentes:</span>
                              <span className="detail-value">{exp.antecedentes}</span>
                            </div>
                          )}
                          {exp.medicamentos && (
                            <div className="expediente-details">
                              <span className="detail-label">Medicamentos:</span>
                              <span className="detail-value">{exp.medicamentos}</span>
                            </div>
                          )}
                          {exp.alergias && (
                            <div className="expediente-details">
                              <span className="detail-label">Alergias:</span>
                              <span className="detail-value">{exp.alergias}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {exp.proxima_cita && (
                        <div className="expediente-details">
                          <span className="detail-label">Próxima cita:</span>
                          <span className="detail-value">
                            {new Date(exp.proxima_cita).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      )}

                      {exp.observaciones_clinicas && (
                        <div className="expediente-details">
                          <span className="detail-label">Observaciones clínicas:</span>
                          <span className="detail-value">{exp.observaciones_clinicas}</span>
                        </div>
                      )}

                      {exp.prescripcion && (
                        <div className="expediente-details">
                          <span className="detail-label">Prescripción:</span>
                          <span className="detail-value">{exp.prescripcion}</span>
                        </div>
                      )}

                      {exp.notas && (
                        <div className="expediente-notes">
                          <span className="detail-label">Notas:</span>
                          <span className="detail-value">{exp.notas}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="expediente-actions">
                    <button className="btn-edit" onClick={() => setEditing(exp)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(exp.id_expediente || exp.id)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

