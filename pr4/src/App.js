import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

import { BrowserRouter as Router, Routes , Route } from'react-router-dom';
import Dialogs from './components/dialogs/Dialogs'; // Импортируем компонент с диалогами
import DialogDetail from './components/dialogs/DialogDetail'; 

const dialogs = [
  { id: 1, name: 'Lumine', messages: ['Привет!', 'Как дела?'] },
  { id: 2, name: 'Aether', messages: ['Как ты?', 'Что нового?'] },
  { id: 3, name: 'Zhongli', messages: ['Здравствуйте!', 'Как ваше настроение?'] },
];


function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
        <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path="/dialogs" element={<Dialogs dialogs={dialogs} />} />
        <Route path="/dialogs/:id" element={<DialogDetail dialogs={dialogs}/>} /> 
      </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
