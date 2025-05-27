import React, { useState, useEffect } from 'react';
import Login from './Auth';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (token) fetchItems();
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} setRole={setRole} />;
  }

  return (
    <div className="container mt-4">
      <h2>Добро пожаловать! Роль: {role}</h2>
      <button className="btn btn-secondary mb-3" onClick={logout}>Выйти</button>

      <ItemForm
        token={token}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        fetchItems={fetchItems}
      />
      <ItemList
        items={items}
        role={role}
        token={token}
        setEditingItem={setEditingItem}
        fetchItems={fetchItems}
      />
    </div>
  );
};

export default App;
