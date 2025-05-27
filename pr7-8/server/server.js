const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pksp7_8',
  password: '12345678', 
  port: 5432,
});

const SECRET = 'jwt-secret-key'; // вынеси в .env на практике

// 🔐 Middleware для проверки токена
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};

app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  
  // Проверка, что пользователь с таким логином не существует
  const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (userExists.rows.length > 0) {
    return res.status(400).json({ error: 'Пользователь уже существует' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
    [username, hashedPassword, role || 'user']
  );
  res.status(201).json({ message: 'Пользователь зарегистрирован' });
});


// ✅ Авторизация
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
  res.json({ token, role: user.role });
});

// 📄 Получение всех записей (пользователь — только свои)
app.get('/items', auth, async (req, res) => {
  const { id, role } = req.user;
  const query = role === 'admin'
    ? 'SELECT * FROM items'
    : 'SELECT * FROM items WHERE user_id = $1';
  const values = role === 'admin' ? [] : [id];
  const result = await pool.query(query, values);
  res.json(result.rows);
});

// ➕ Добавление
app.post('/items', auth, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  await pool.query('INSERT INTO items (name, user_id) VALUES ($1, $2)', [name, userId]);
  res.sendStatus(201);
});

// ✏️ Редактирование
app.put('/items/:id', auth, async (req, res) => {
  const { id: itemId } = req.params;
  const { name } = req.body;
  const { id: userId, role } = req.user;

  const query = role === 'admin'
    ? 'UPDATE items SET name = $1 WHERE id = $2'
    : 'UPDATE items SET name = $1 WHERE id = $2 AND user_id = $3';

  const values = role === 'admin' ? [name, itemId] : [name, itemId, userId];
  const result = await pool.query(query, values);

  res.sendStatus(result.rowCount ? 200 : 403);
});

// ❌ Удаление
app.delete('/items/:id', auth, async (req, res) => {
  const { id: itemId } = req.params;
  const { id: userId, role } = req.user;

  const query = role === 'admin'
    ? 'DELETE FROM items WHERE id = $1'
    : 'DELETE FROM items WHERE id = $1 AND user_id = $2';

  const values = role === 'admin' ? [itemId] : [itemId, userId];
  const result = await pool.query(query, values);

  res.sendStatus(result.rowCount ? 200 : 403);
});


app.listen(5000, () => console.log('Server running on port 5000'));
