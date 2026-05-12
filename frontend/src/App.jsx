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

  const [products, setProducts] = useState([]);

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

      if (response.ok) {
        setProducts([
          ...products,
          {
            titulo,
            descripcion,
            precio,
            vendedor: user.nombre
          }
        ]);

        setTitulo("");
        setDescripcion("");
        setPrecio("");
      }

      setMessage(data.message);
    } catch (error) {
      setMessage("Error creando producto");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        backgroundColor: "#eeeeee",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          backgroundColor: "#00205B",
          color: "white",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "0 0 16px 16px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <img
            src="/la_sabana.jpg"
            alt="Logo"
            style={{
              width: "130px",
              backgroundColor: "white",
              padding: "6px",
              borderRadius: "8px"
            }}
          />

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px"
              }}
            >
              TRD Marketplace
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "14px"
              }}
            >
              Compra y vende dentro de la Universidad
            </p>
          </div>
        </div>

        <input
          placeholder="Buscar productos..."
          style={{
            width: "350px",
            padding: "12px",
            borderRadius: "8px",
            border: "none"
          }}
        />
      </div>

      {!user ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "60px"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              width: "400px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <h2>{isRegister ? "Registro" : "Login"}</h2>

            {isRegister && (
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
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
                padding: "12px",
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
                padding: "12px",
                marginBottom: "15px"
              }}
            />

            {isRegister && (
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px"
                }}
              >
                <option value="comprador">Comprador</option>
                <option value="vendedor">Vendedor</option>
              </select>
            )}

            <button
              onClick={
                isRegister
                  ? handleRegister
                  : handleLogin
              }
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2968C8",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px"
              }}
            >
              {isRegister
                ? "Registrarse"
                : "Ingresar"}
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
                color: "#2968C8",
                cursor: "pointer"
              }}
            >
              {isRegister
                ? "Ya tengo cuenta"
                : "Crear cuenta"}
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "40px"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              marginBottom: "30px"
            }}
          >
            <h2>
              Bienvenido {user.nombre}
            </h2>

            <p>
              <strong>Rol:</strong> {user.role}
            </p>
          </div>

          {(user.role === "vendedor" ||
            user.role === "admin") && (
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                marginBottom: "30px"
              }}
            >
              <h2>Crear producto</h2>

              <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) =>
                  setTitulo(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "12px",
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
                  padding: "12px",
                  marginBottom: "15px"
                }}
              />

              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) =>
                  setPrecio(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px"
                }}
              />

              <button
                onClick={handleCreateProduct}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#00A650",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px"
                }}
              >
                Publicar producto
              </button>
            </div>
          )}

          <div>
            <h2>Productos publicados</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px"
              }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow:
                      "0 2px 10px rgba(0,0,0,0.1)"
                  }}
                >
                  <div
                    style={{
                      height: "180px",
                      backgroundColor: "#f2f2f2",
                      borderRadius: "8px",
                      marginBottom: "15px"
                    }}
                  ></div>

                  <h3>{product.titulo}</h3>

                  <p>{product.descripcion}</p>

                  <h2 style={{ color: "#00A650" }}>
                    ${product.precio}
                  </h2>

                  <p>
                    <strong>Vendedor:</strong>{" "}
                    {product.vendedor}
                  </p>

                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#2968C8",
                      color: "white",
                      border: "none",
                      borderRadius: "8px"
                    }}
                  >
                    Ver producto
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
