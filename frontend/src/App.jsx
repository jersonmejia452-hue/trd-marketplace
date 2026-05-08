function App() {
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
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <button
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
      </div>
    </div>
  );
}

export default App;
