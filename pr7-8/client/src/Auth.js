import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken, setRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleLocal] = useState('user'); // по умолчанию пользователь

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/login', { username, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setRole(res.data.role);
      } else {
        await axios.post('http://localhost:5000/register', { username, password, role });
        alert('Регистрация прошла успешно. Теперь войдите.');
        setIsLogin(true);
      }
    } catch {
      alert('Ошибка авторизации или регистрации');
    }
  };

  return (
    <div className="container mt-4">
      <h3>{isLogin ? 'Вход' : 'Регистрация'}</h3>
      <input className="form-control mb-2" placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      {!isLogin && (
        <select className="form-control mb-2" value={role} onChange={e => setRoleLocal(e.target.value)}>
          <option value="user">Пользователь</option>
          <option value="admin">Администратор</option>
        </select>
      )}

      <button className="btn btn-primary mb-2" onClick={handleAuth}>
        {isLogin ? 'Войти' : 'Зарегистрироваться'}
      </button>

      <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </div>
  );
};

export default Auth;
