// Login.js
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Auth.css";

export const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToBooks, setRedirectToBooks] = useState(false); // Стейт для редиректа

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Сохраняем токен в localStorage
      setUser(data.token); // Обновляем состояние в родительском компоненте
      setRedirectToBooks(true); // Устанавливаем флаг редиректа
    } else {
      alert(data.message); // Показать ошибку
    }
  };

  if (redirectToBooks) {
    return <Navigate to="/books" />; // Если успешно, редиректим на страницу книг
  }

  return (
    <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="auth-button" type="submit">Войти</button>
      </form>
      <div className="account-link">
        <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
      </div>
    </div>
  );
};
