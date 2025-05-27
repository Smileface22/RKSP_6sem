import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ token, editingItem, setEditingItem, fetchItems }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingItem) setName(editingItem.name);
  }, [editingItem]);

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await axios.put(`http://localhost:5000/items/${editingItem.id}`, { name }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/items', { name }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setName('');
      setEditingItem(null);
      fetchItems();
    } catch {
      alert('Ошибка сохранения');
    }
  };

  return (
    <div>
      <h4>{editingItem ? 'Редактировать' : 'Добавить'} элемент</h4>
      <input className="form-control mb-2" value={name} onChange={e => setName(e.target.value)} />
      <button className="btn btn-success" onClick={handleSubmit}>
        {editingItem ? 'Сохранить' : 'Добавить'}
      </button>
    </div>
  );
};

export default ItemForm;
