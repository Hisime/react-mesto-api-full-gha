import {Link, Route, Routes} from "react-router-dom";

function Header({onSignOut, userEmail}) {
    function handleSignOut() {
        onSignOut();
    }
    return (
        <header className="header">
            <div className="header__logo"></div>
            <Routes>
                <Route path="sign-in"
                       element={
                           <Link className="header__link" to="/sign-up">Регистрация</Link>
                       }
                />
                <Route path="sign-up"
                       className="header__link"
                       element={
                           <Link className="header__link" to="/sign-in">Войти</Link>
                       }
                />
                <Route path="/"
                       className="header__link"
                       element={
                           <>
                               <p className="header__email">{userEmail}</p>
                               <button className="header__link header__link_grey" onClick={handleSignOut}>Выйти</button>
                           </>
                       }
                />

            </Routes>
        </header>
    )
}

export default Header;
