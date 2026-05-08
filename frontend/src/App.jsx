import React, { useState } from "react";

function App() {
  const [isRegister, setIsRegister] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("comprador");
  const [message, setMessage] = useState("");

  const [user, setUser] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

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

  const handleCreateProduct = async () => {
    try {
      const response = await fetch(
        "https://trd-marketplace.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            titulo,
            descripcion,
            precio,
            vendedor: user.nombre
          })
        }
      );

      const data = await response.json();

      setMessage(data.message);

      setTitulo("");
      setDescripcion("");
      setPrecio("");
    } catch (error) {
      setMessage("Error creando producto");
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#001F5B",
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "30px"
        }}
      >
        <img
          src="/la_sabana.jpg"
          alt="Logo Universidad"
          style={{
            width: "220px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px"
          }}
        />

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "42px"
            }}
          >
            Marketplace
          </h1>

          <p
            style={{
              marginTop: "10px",
              fontSize: "18px"
            }}
          >
            Plataforma universitaria de compra y venta
          </p>
        </div>
      </div>

      {!user ? (
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            width: "350px",
            borderRadius: "10px"
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
      ) : (
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "500px"
          }}
        >
          <h2>
            Bienvenido {user.nombre}
          </h2>

          <p>
            <strong>Rol:</strong> {user.role}
          </p>

          {(user.role === "vendedor" ||
            user.role === "admin") && (
            <>
              <h2 style={{ marginTop: "30px" }}>
                Crear producto
              </h2>

              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px"
                }}
              />

              <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) =>
                  setDescripcion(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px"
                }}
              />

              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px"
                }}
              />

              <button
                onClick={handleCreateProduct}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#16A34A",
                  color: "white",
                  border: "none",
                  borderRadius: "5px"
                }}
              >
                Guardar producto
              </button>
            </>
          )}

          <p style={{ marginTop: "20px" }}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
