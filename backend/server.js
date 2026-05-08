const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@unisabana.edu.co",
    password: "1234",
    role: "admin"
  },
  {
    id: 2,
    nombre: "Vendedor",
    email: "vendedor@unisabana.edu.co",
    password: "1234",
    role: "vendedor"
  },
  {
    id: 3,
    nombre: "Comprador",
    email: "comprador@unisabana.edu.co",
    password: "1234",
    role: "comprador"
  }
];

app.get("/", (req, res) => {
  res.send("TRD Marketplace Backend funcionando");
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password obligatorios"
    });
  }

  if (!email.endsWith("@unisabana.edu.co")) {
    return res.status(403).json({
      message: "Solo se permite correo institucional"
    });
  }

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Credenciales inválidas"
    });
  }

  return res.status(200).json({
    message: "Login exitoso",
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      role: user.role
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
