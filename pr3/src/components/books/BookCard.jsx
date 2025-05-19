import { useParams, Link } from 'react-router-dom';
import "./BookCard.css";
export const BookCard = ({ books }) => {
  const { id } = useParams();  // Получаем id из URL
  const book = books.find(b => b.id === parseInt(id));  // Ищем книгу по id

  if (!book) {
    return <p>Книга не найдена</p>;  // Если книга не найдена
  }

  const { title, author, description, image } = book;

  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <div className="info"> 
        <h2>{title}</h2>
        <p><strong>Автор:</strong> {author}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

