import { Link } from 'react-router-dom';
import "./Dialogs.css"

const Dialogs = ({ dialogs }) => {
  return (
    <div className="dialogs-container">
      <h2>Список диалогов</h2>
      {dialogs.map((dialog) => (
        <div key={dialog.id} className="dialog-item">
          <Link to={`/dialogs/${dialog.id}`}>{dialog.name}</Link>
        </div>
      ))}
    </div>
  );
};
export default Dialogs;
