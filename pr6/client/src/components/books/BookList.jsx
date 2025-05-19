import { Link } from "react-router-dom";
import "./BookList.css";
import { useState, useEffect } from 'react';

export const BookList = () => { 
  const [bookList, setBookList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Берем токен из localStorage
    if (!token) {
      setError('Пожалуйста, авторизуйтесь');
      return;
    }

    fetch('http://localhost:5000/books', {
      headers: {
        'Authorization': `Bearer ${token}`, // Передаем токен в заголовке
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка авторизации');
        }
        return response.json();
      })
      .then(data => setBookList(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="book-list">
      {bookList.map(book => (
          <div className="book-cards">
            <Link key={book.id} to={`/book/${book.id}`}>
                <img src={book.image} alt={book.title} />
                <h2>{book.title}</h2>
                <p><strong>Автор:</strong> {book.author}</p>
            </Link>
          </div>
      ))}
    </div>
  );
};
