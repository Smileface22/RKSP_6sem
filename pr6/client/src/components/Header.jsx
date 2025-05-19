import { Link } from "react-router-dom";
import "./Header.css";

export function Header({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header className="header">
      <Link to="/"><h1>Склад книг</h1></Link>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/books">Список книг</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Войти</Link></li>
            </>
          ) : (
            <li><button onClick={handleLogout}>Выйти</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
