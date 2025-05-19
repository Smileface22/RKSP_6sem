// BookCard.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './BookCard.css';

export const BookCard = () => {
  const { id } = useParams(); // Получаем id книги из URL
  const [book, setBook] = useState(null); // Состояние для хранения книги
  const [error, setError] = useState(null); // Состояние для ошибки

  useEffect(() => {
    const token = localStorage.getItem('token'); // Берем токен из localStorage

    if (!token) {
      setError('Пожалуйста, авторизуйтесь');
      return;
    }

    // Делаем запрос на сервер для получения книги по id
    fetch(`http://localhost:5000/book/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Передаем токен в заголовке
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка авторизации или книга не найдена');
        }
        return response.json();
      })
      .then(data => setBook(data)) // Если запрос успешный, записываем данные книги в состояние
      .catch(err => setError(err.message)); // Если ошибка, записываем сообщение ошибки
  }, [id]);

  if (error) {
    return <p>{error}</p>; // Если ошибка, показываем сообщение
  }

  if (!book) {
    return <p>Загружаем книгу...</p>; // Пока книга не загружена, показываем загрузку
  }

  const { title, author, description, image } = book; // Извлекаем данные о книге

  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <div className="info">
        <h2>{title}</h2>
        <p><strong>Автор:</strong> {author}</p>
        <p>{description}</p>
      </div>
      <Link to="/books">Вернуться к списку книг</Link>
    </div>
  );
};
