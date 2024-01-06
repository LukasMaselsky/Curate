import "./Navbar.css";
import Searchbar from "./Searchbar";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faUser,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ search, setSearch }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    const { currentUser } = useContext(AuthContext);

    return (
        <nav>
            <div className="logo-section">
                <h1>TO BE W/R</h1>
            </div>
            <div className="other-section">
                {windowWidth > 750 ? (
                    <>
                        <Searchbar search={search} setSearch={setSearch} />
                        <NavNormal currentUser={currentUser} />
                    </>
                ) : (
                    <NavHamburger
                        currentUser={currentUser}
                        search={search}
                        setSearch={setSearch}
                    />
                )}
            </div>
        </nav>
    );
}

function NavNormal({ currentUser }) {
    // if window rezised without closing hamburger
    useEffect(() => {
        document.body.style.position = "static";
        document.getElementsByTagName("main")[0].style.opacity = "1";
    }, []);
    
    return (
        <div className="account-section">
            {currentUser ? (
                <FontAwesomeIcon className="account-icon" icon={faCircleUser} />
            ) : (
                <>
                    <Link to="/">
                        <button className="featured-btn">Featured</button>
                    </Link>
                    <Link to="/login">
                        <button className="login-btn">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="register-btn">Register</button>
                    </Link>
                </>
            )}
        </div>
    );
}

function NavHamburger({ currentUser, search, setSearch }) {
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        return () => {
            document.body.style.position = "static";
        };
    }, []);

    const toggle = () => {
        if (!navOpen) {
            setNavOpen(true);
            document.body.style.position = "fixed";
            document.getElementsByTagName("main")[0].style.opacity = "0.5";
        } else {
            setNavOpen(false);
            document.body.style.position = "static";
            document.getElementsByTagName("main")[0].style.opacity = "1";
        }
    };

    return (
        <div className="account-section">
            <FontAwesomeIcon
                className="hamburger-icon"
                icon={faBars}
                onClick={toggle}
            />
            <div
                className="hamburger-nav"
                style={{ display: navOpen ? "block" : "none" }}
            >
                <div className="hamburger-nav-section">
                    <Searchbar search={search} setSearch={setSearch} />
                </div>
                <div className="hamburger-nav-section">
                    <Link to="/" className="hamburger-nav-button">
                        <p>Featured</p>
                    </Link>
                </div>
                <p className="hamburger-nav-label">Account</p>
                {currentUser ? (
                    <>
                        <div className="hamburger-nav-section">
                            <Link
                                to="/account"
                                className="hamburger-nav-button"
                            >
                                <p>Account</p>
                            </Link>
                        </div>
                        <div className="hamburger-nav-section">
                            <Link
                                to="/account/watchlist"
                                className="hamburger-nav-button"
                            >
                                <p>Watchlist</p>
                            </Link>
                        </div>
                        <div className="hamburger-nav-section">
                            <Link
                                to="/account"
                                className="hamburger-nav-button"
                            >
                                <p>Something</p>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="hamburger-nav-section">
                            <Link to="/login" className="hamburger-nav-button">
                                <p>Login</p>
                            </Link>
                        </div>
                        <div className="hamburger-nav-section">
                            <Link
                                to="register"
                                className="hamburger-nav-button"
                            >
                                <p>Register</p>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
