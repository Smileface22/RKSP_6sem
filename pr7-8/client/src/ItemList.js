import React from 'react';
import axios from 'axios';

const ItemList = ({ items, role, token, setEditingItem, fetchItems }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchItems();
    } catch {
      alert('Ошибка удаления');
    }
  };

  return (
    <div className="mt-4">
      <h4>Список элементов</h4>
      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <div>
              <button className="btn btn-sm btn-primary me-2" onClick={() => setEditingItem(item)}>Редактировать</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
