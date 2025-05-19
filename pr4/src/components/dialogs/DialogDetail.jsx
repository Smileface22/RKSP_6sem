import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DialogDetail.css';

const DialogDetail = ({dialogs}) => {
  const { id } = useParams(); // Получаем id из URL
  const dialog = dialogs.find(d => d.id === parseInt(id)); // Ищем диалог по id

  if (!dialog) {
    return <p>Диалог не найден</p>; // Если диалог не найден
  }

  return (
    <div className="dialog-detail-container">
      <h2>Диалог с {dialog.name}</h2>
      <ul>
        {dialog.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <Link to="/dialogs">Вернуться к списку диалогов</Link>
    </div>
  );
};

export default DialogDetail;
