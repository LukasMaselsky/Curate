import "./Navbar.css";
import Searchbar from "./Searchbar";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
    const { currentUser } = useContext(AuthContext);

    return (
        <nav>
            <div className="logo-section">
                <h1>TO BE W/R</h1>
            </div>
            <div className="other-section">
                <Searchbar search={search} setSearch={setSearch} />
                <div className="account-section">
                    {currentUser ? (
                        <FontAwesomeIcon
                            className="account-icon"
                            icon={faCircleUser}
                        />
                    ) : (
                        <>
                            <Link to="/">
                                <button className="featured-btn">
                                    Featured
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="login-btn">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="register-btn">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavNormal() {}

function NavHamburger() {}
