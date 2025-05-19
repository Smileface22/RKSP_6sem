import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

import { BrowserRouter as Router, Routes , Route } from'react-router-dom';
import {BookList} from './components/books/BookList';  
import {BookCard} from './components/books/BookCard';  

const books = [
  { id: 1, title: 'Война и мир', author: 'Лев Толстой', description: 'Эпопея о русской аристократии.', image: 'https://sun9-78.userapi.com/impg/G2OzObHKHW2mx2XbMsuKUFNQ0CyLvTyHnBoukg/6rn1z9H3UtU.jpg?size=770x686&quality=95&sign=819c02c135e56ee24dd5987e9f960ef5&c_uniq_tag=lEZ1-gnwJyiBCuDCA5lM7-klocQSn-bQxbh6mKmdVwg&type=album' },
  { id: 2, title: '1984', author: 'Джордж Оруэлл', description: 'Антиутопия о тоталитарном обществе.', image: 'https://avatars.mds.yandex.net/i?id=2074d45b2b7dcfecaf928e1030334c93_l-5129576-images-thumbs&n=13' },
  { id: 3, title: 'Гарри Поттер', author: 'Дж. К. Роулинг', description: 'Приключения волшебника Гарри Поттера.', image: 'https://avatars.mds.yandex.net/get-mpic/5254153/img_id481576898018605918.jpeg/600x800' }
];

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
        <Routes>
          <Route path="/" element={<Main />} /> 
          <Route path="/books" element={<BookList books={books} />} />  
          <Route path="/book/:id" element={<BookCard books={books} />} /> 
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
