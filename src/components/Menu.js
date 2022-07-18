import '../styles/Menu.css';
function Menu({ email, signOut }) {
    return (
        <div className="menu">
            <p className="menu__email">{email}</p>
            <button onClick={signOut} className="menu__button">Выйти</button>
        </div>
    )
}

export default Menu;