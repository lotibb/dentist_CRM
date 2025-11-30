import { Routes, Route, Link } from "react-router-dom";
import PatientsPage from "./pages/PacientsPage";
import NewCitaPage from "./pages/NewCitaPage";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>CRM Dentista</h2>
        </div>
        <div className="nav-links">
          <Link to="/patients" className="nav-link">👥 Pacientes</Link>
          <Link to="/citas/nueva" className="nav-link">📅 Nueva cita</Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<PatientsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/citas/nueva" element={<NewCitaPage />} />
        </Routes>
      </main>
    </div>
  );
}
