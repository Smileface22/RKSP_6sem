import { Link } from 'react-router-dom';
import "./BookList.css";

export const BookList = ({ books }) => { 
  return (
    <div className="book-list">
      {books.map(book => (
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

