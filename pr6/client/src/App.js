import { useState, useEffect  } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { BookList } from "./components/books/BookList";
import { BookCard } from "./components/books/BookCard";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";


function App() {
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Берем токен из localStorage
    if (token) {
      setUser(token); // Если токен есть, устанавливаем user как авторизованного
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* Проверяем, авторизован ли пользователь, если нет, редиректим на страницу login */}
          <Route
            path="/books"
            element={user ? <BookList /> : <Navigate to="/login" />}
          />
          <Route path="/book/:id" element={<BookCard />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
