import { useState } from "react";
import { FaBookReader, FaEraser, FaBible } from "react-icons/fa";

function App() {
  const [mostrar, setMostrar] = useState({});
  const [libro, setLibro] = useState("");
  const [versiculo, setVersiculo] = useState("");
  const [capitulo, setCapitulo] = useState("");
  const [modal, setModal] = useState(false);
  const [version, setVersion] = useState("rv1960");

  const handleLibro = (event) => setLibro(event.target.value);
  const handleCapitulo = (e) => setCapitulo(e.target.value);
  const handleVersiculo = (e) => setVersiculo(e.target.value);
  const handleVersion = (e) => setVersion(e.target.value);

  const obtenerDatos = async (lib, cap, ver, version) => {
    try {
      const res = await fetch(
        `https://bible-api.deno.dev/api/read/${version}/${lib}/${cap}/${ver}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los datos", error);
      return {};
    }
  };

  const verVersiculo = async () => {
    const data = await obtenerDatos(libro, capitulo, versiculo, version);
    setMostrar(data);
    setModal(true);
    console.log(data);
  };

  const borrar = () => {
    setCapitulo("");
    setLibro("");
    setVersiculo("");
    setModal(false);
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h3 style={styles.title}>📖 Consulta Bíblica</h3>
        <select value={version} onChange={handleVersion} style={styles.select}>
          <option value="rv1960">Reina Valera 1960</option>
          <option value="rv1995">Reina Valera 1995</option>
          <option value="nvi">Nueva Versión Internacional</option>
          <option value="dhh">Dios Habla Hoy</option>
          <option value="pdt">Palabra de Dios para Todos</option>
        </select>
        <input
          type="text"
          placeholder="Libro"
          value={libro}
          onChange={handleLibro}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Capítulo"
          value={capitulo}
          onChange={handleCapitulo}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Versículo"
          value={versiculo}
          onChange={handleVersiculo}
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button onClick={verVersiculo} style={styles.btnPrimary}>
            <FaBookReader /> Buscar
          </button>
          <button onClick={borrar} style={styles.btnDanger}>
            <FaEraser /> Limpiar
          </button>
        </div>
      </div>

      {modal && (
        <div style={styles.modal}>
          <p style={styles.modalTitle}>
            <strong>Versículo <FaBible /></strong>
          </p>
          <p style={styles.verse}>{mostrar.verse}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  body: {
    background: "linear-gradient(to bottom right, #fdf6e3, #e0cda9)",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "15px",
    color: "#6f4e37",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: "#6f4e37",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  btnDanger: {
    flex: 1,
    backgroundColor: "#b22222",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  modal: {
    marginTop: "20px",
    backgroundColor: "#fef3d3",
    borderLeft: "5px solid #6f4e37",
    padding: "15px",
    borderRadius: "10px",
    maxWidth: "400px",
    width: "100%",
  },
  modalTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#6f4e37",
  },
  verse: {
    fontSize: "1rem",
    color: "#333",
  },
};

export default App;