// server.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

let users = []; // Тут храним пользователей (в реальности нужна база)
const books = [
    { id: 1, title: 'Война и мир', author: 'Лев Толстой', description: 'Эпопея о русской аристократии.', image: 'https://sun9-78.userapi.com/impg/G2OzObHKHW2mx2XbMsuKUFNQ0CyLvTyHnBoukg/6rn1z9H3UtU.jpg?size=770x686&quality=95&sign=819c02c135e56ee24dd5987e9f960ef5&c_uniq_tag=lEZ1-gnwJyiBCuDCA5lM7-klocQSn-bQxbh6mKmdVwg&type=album' },
    { id: 2, title: '1984', author: 'Джордж Оруэлл', description: 'Антиутопия о тоталитарном обществе.', image: 'https://avatars.mds.yandex.net/i?id=2074d45b2b7dcfecaf928e1030334c93_l-5129576-images-thumbs&n=13' },
    { id: 3, title: 'Гарри Поттер', author: 'Дж. К. Роулинг', description: 'Приключения волшебника Гарри Поттера.', image: 'https://avatars.mds.yandex.net/get-mpic/5254153/img_id481576898018605918.jpeg/600x800' }
  ];

// Middleware для проверки токена
function authenticate(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Получаем токен из заголовков
  
  if (!token) {
    return res.status(401).json({ message: "Нет авторизации" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Неверный или истекший токен" });
    }
    req.user = decoded; // Сохраняем информацию о пользователе
    next(); // Даем доступ к следующему обработчику
  });
}

// 🔹 Регистрация пользователя
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.json({ message: "Регистрация успешна" });
});

// 🔹 Логин пользователя
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Неверные учетные данные" });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Эндпоинт для получения списка книг (с проверкой авторизации)
app.get("/books", authenticate, (req, res) => {
  res.json(books); // Отдаем книги только авторизованным пользователям
});

app.get("/book/:id", authenticate, (req, res) => {
    const { id } = req.params;
    const book = books.find((b) => b.id === parseInt(id)); // Ищем книгу по id
    if (!book) {
      return res.status(404).json({ message: "Книга не найдена" }); // Если книга не найдена
    }
    res.json(book); // Отправляем книгу в ответе
  });

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
