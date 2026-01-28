import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import headerLogo from "../../assets/img/logos/header_logo.svg";
import headerSearch from "../../assets/img/ui/header_search.svg";
import headerRight1 from "../../assets/img/ui/header_right_1.svg";
import headerRight2 from "../../assets/img/ui/header_right_2.svg";
import headerRight3 from "../../assets/img/ui/header_right_3.svg";

const Header = () => {
    const { user, login, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authError, setAuthError] = useState('');

    const menuRef = useRef(null);
    const authRef = useRef(null);
    const buttonRef = useRef(null);
    const authButtonRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const toggleAuth = () => {
        if (user) {
            setIsAuthOpen(true);
        } else {
            setIsAuthOpen(prev => !prev);
        }
    };

    const handleOutsideClick = (e) => {
        if (
            (!menuRef.current || !menuRef.current.contains(e.target)) &&
            (!authRef.current || !authRef.current.contains(e.target)) &&
            (!buttonRef.current || !buttonRef.current.contains(e.target)) &&
            (!authButtonRef.current || !authButtonRef.current.contains(e.target)) &&
            !e.target.closest('.auth-menu')
        ) {
            setIsMenuOpen(false);
            setIsAuthOpen(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');

        if (!email || !password) return setAuthError('Please fill in all fields');

        try {
            const loggedUser = await login({ email, password });
            if (!loggedUser?.id) {
                setAuthError("Couldn't get the user");
                return;
            }
            setIsAuthOpen(false);
        } catch (error) {
            setAuthError('Invalid email or password');
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <header className={`header center ${isMenuOpen || isAuthOpen ? 'menu-open' : ''}`}>
            <section className="header__left">
                <Link to="/" className="header__logo">
                    <img src={headerLogo} alt="logo" />
                </Link>
                <Link to="#" className="header__search">
                    <img src={headerSearch} alt="search" />
                </Link>
            </section>

            <section className="header__right">
                <img
                    src={headerRight1}
                    alt="Open/close menu"
                    className="nav__img"
                    onClick={toggleMenu}
                    ref={buttonRef}
                    style={{ cursor: "pointer" }}
                />

                <div className={`menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                    <h2 className="menu__heading">MENU</h2>

                    <h3 className="menu__subheading">MAN</h3>
                    <ul className="menu__ul">
                        <li>
                            <Link className="menu__link" to="#">Accessories</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Bags</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Denim</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">T-Shirts</Link>
                        </li>
                    </ul>

                    <h3 className="menu__subheading">WOMAN</h3>
                    <ul className="menu__ul">
                        <li>
                            <Link className="menu__link" to="#">Accessories</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Jackets & Coats</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Polos</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">T-Shirts</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Shirts</Link>
                        </li>
                    </ul>

                    <h3 className="menu__subheading">KIDS</h3>
                    <ul className="menu__ul">
                        <li>
                            <Link className="menu__link" to="#">Accessories</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Jackets & Coats</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Polos</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">T-Shirts</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Shirts</Link>
                        </li>
                        <li>
                            <Link className="menu__link" to="#">Bags</Link>
                        </li>
                    </ul>
                </div>

                <img
                    src={headerRight2}
                    alt="auth"
                    className="header__img"
                    onClick={toggleAuth}
                    ref={authButtonRef}
                    style={{ cursor: "pointer" }}
                />

                {user ? (
                    <div
                        className={`auth-menu_logged ${isAuthOpen ? 'active' : ''}`}
                        ref={authRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="auth-menu_logged__user">
                            <p className="auth-menu_logged__greeting">
                                Welcome, {user.firstName} {user.lastName}
                            </p>
                            <p className="auth-menu_logged__greeting">{user.email}</p>
                            <button
                                className="auth-menu_logged__button auth-menu_logged__button_logout"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`auth-menu ${isAuthOpen ? 'active' : ''}`}
                        ref={authRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form className="auth-menu__form" onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                className="auth-menu__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="auth-menu__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {authError && <p className="auth-error">{authError}</p>}
                            <button className="auth-menu__button" type="submit">
                                Sign in
                            </button>
                            <p className="auth-menu__link">
                                <Link to="/registration">Create account</Link>
                            </p>
                        </form>
                    </div>
                )}

                <Link to="/cart" className="header__nav header__nav_mobile">
                    <img src={headerRight3} alt="cart" className="header__img" />
                </Link>
            </section>
        </header>
    );
};

export default Header;