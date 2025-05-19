import "./Header.css";
export function Header(){
    return(
        <header className="header">
            <img src='/cat.jpg' />
            <a href="#"><h1>Котосайт</h1></a>
        </header>
    );
}