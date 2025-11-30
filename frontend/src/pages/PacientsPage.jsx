import { useEffect, useState } from "react";
import { getPacientes, deletePaciente } from "../api/pacientes";
import PatientForm from "../components/PatientForm";
import "../styles/PatientsPage.css";

export default function PatientsPage() {
  const [pacientes, setPacientes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPacientes();
      console.log('Pacientes cargados:', res.data);
      setPacientes(res.data);
    } catch (err) {
      setError("Error al cargar los pacientes: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este paciente?")) return;
    
    try {
      await deletePaciente(id);
      await load();
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
      setError("Error al eliminar el paciente: " + errorMessage);
    }
  };

  return (
    <div className="patients-page">
      <h1>Pacientes</h1>

      {error && <div className="error-message">{error}</div>}

      <PatientForm reload={load} editing={editing} setEditing={setEditing} />

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : (
        <div className="patients-list">
          {pacientes.length === 0 ? (
            <p className="no-data">No se encontraron pacientes</p>
          ) : (
            <ul>
              {pacientes.map((p) => (
                <li key={p.id_paciente || p.id} className="patient-item">
                  <div className="patient-info">
                    <strong>{p.nombre}</strong>
                    <span>{p.telefono}</span>
                    <span>{p.correo}</span>
                  </div>
                  <div className="patient-actions">
                    <button className="btn-edit" onClick={() => setEditing(p)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(p.id_paciente || p.id)}>
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
