import "./Navbar.css";
import logo from "../../assets/logo.svg";
import Searchbar from "./Searchbar";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faUser,
    faBars,
    faX,
    faStar,
    faBookmark,
    faCompass,
    faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PoweredBy from "../PoweredBy";

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
                <Link to="/">
                    <img className="logo" src={logo}></img>
                </Link>
            </div>
            <div className="other-section">
                {windowWidth > 900 ? (
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
                <>
                    <Link to="/">
                        <button className="home-btn">Home</button>
                    </Link>
                    <Link to="/featured">
                        <button className="featured-btn">Featured</button>
                    </Link>
                    <Link to="/account/ratings">
                        <button className="ratings-btn">Ratings</button>
                    </Link>
                    <Link to="/account/tbr">
                        <button className="tbr-btn">To be read</button>
                    </Link>
                    <Link to="/account">
                        <FontAwesomeIcon
                            className="account-icon"
                            icon={faCircleUser}
                        />
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/featured">
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
                    <FontAwesomeIcon
                        className="close-icon"
                        icon={faX}
                        onClick={toggle}
                    />
                </div>
                <div className="hamburger-nav-section">
                    <Searchbar search={search} setSearch={setSearch} />
                </div>
                <div className="hamburger-nav-section">
                    <Link to="/" className="hamburger-nav-button">
                        <FontAwesomeIcon
                            icon={faHouse}
                            style={{ padding: "0 0.4rem 0 0" }}
                        />
                        <p>Home</p>
                    </Link>
                </div>
                <div className="hamburger-nav-section">
                    <Link to="/featured" className="hamburger-nav-button">
                        <FontAwesomeIcon
                            icon={faCompass}
                            style={{ padding: "0 0.5rem 0 2px" }}
                        />
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
                                <FontAwesomeIcon
                                    icon={faCircleUser}
                                    style={{ padding: "0 0.5rem 0 2px" }}
                                />
                                <p>Account</p>
                            </Link>
                        </div>
                        <div className="hamburger-nav-section">
                            <Link
                                to="/account/tbr"
                                className="hamburger-nav-button"
                            >
                                <FontAwesomeIcon
                                    icon={faBookmark}
                                    style={{ padding: "0 0.6rem 0 4px" }}
                                />
                                <p>To be read</p>
                            </Link>
                        </div>
                        <div className="hamburger-nav-section">
                            <Link
                                to="/account/ratings"
                                className="hamburger-nav-button"
                            >
                                <FontAwesomeIcon
                                    icon={faStar}
                                    style={{ padding: "0 0.5rem 0 0" }}
                                />
                                <p>Ratings</p>
                            </Link>
                        </div>
                        <PoweredBy className={"powered-by-nav"} />
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
                        <PoweredBy className={"powered-by-nav"} />
                    </>
                )}
            </div>
        </div>
    );
}
