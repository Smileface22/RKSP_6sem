import logo from './cat.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Привет мир, как жизнь?
        </p>
      </header>
    </div>
  );
}

export default App;
