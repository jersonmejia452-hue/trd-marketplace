import React, { useState } from "react";

function App() {
  const [isRegister, setIsRegister] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("comprador");
  const [message, setMessage] = useState("");

  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://trd-marketplace.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);

        setMessage(
          `Bienvenido ${data.user.nombre} (${data.user.role})`
        );
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error conectando con el backend");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://trd-marketplace.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre,
            email,
            password,
            role
          })
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error conectando con el backend");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
      }}
    >
      <h1>TRD Marketplace</h1>

      <h2>Universidad de La Sabana</h2>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          width: "350px",
          borderRadius: "10px",
          marginTop: "30px"
        }}
      >
        <h3>{isRegister ? "Registro" : "Login"}</h3>

        {isRegister && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          />
        )}

        <input
          type="email"
          placeholder="Correo institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        {isRegister && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          >
            <option value="comprador">Comprador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        )}

        <button
          onClick={isRegister ? handleRegister : handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1D4ED8",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          {isRegister ? "Registrarse" : "Ingresar"}
        </button>

        <p style={{ marginTop: "15px" }}>
          {message}
        </p>

        {user && (
          <div style={{ marginTop: "20px" }}>
            <h3>Mi perfil</h3>

            <p>
              <strong>Nombre:</strong> {user.nombre}
            </p>

            <p>
              <strong>Correo:</strong> {user.email}
            </p>

            <p>
              <strong>Rol:</strong> {user.role}
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
          style={{
            marginTop: "10px",
            background: "none",
            border: "none",
            color: "#1D4ED8",
            cursor: "pointer"
          }}
        >
          {isRegister ? "Ya tengo cuenta" : "Crear cuenta"}
        </button>
      </div>
    </div>
  );
}

export default App;
