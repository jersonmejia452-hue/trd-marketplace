import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
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
          width: "300px",
          borderRadius: "10px",
          marginTop: "30px"
        }}
      >
        <h3>Login</h3>

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

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1D4ED8",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Ingresar
        </button>

        <p style={{ marginTop: "15px" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default App;
