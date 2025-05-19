import "./Header.css";
import { Link } from 'react-router-dom'; 
export function Header(){
    return(
        <header className="header">
            <Link to="/"><h1>Склад книг</h1></Link>
            <nav>
                <ul>
                    <li><Link to="/">Главная</Link></li>  
                    <li><Link to="/dialogs">Диалоги</Link></li>  
                </ul>
            </nav>
        </header>
    );
}