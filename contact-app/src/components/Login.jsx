import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setError("");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Connexion</h1>

        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;