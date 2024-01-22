import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import AccountPreview from "./AccountPreview";
import { useNavigate } from "react-router-dom";

export default function AccountContent() {
    const { currentUser, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/register");
        }
    }, []);

    return (
        <div className="account">
            <div className="account-wrapper">
                <div className="account-heading">
                    <h1>Account</h1>
                    <button
                        className="logout-btn"
                        aria-label="Logout button"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
                <div className="account-content">
                    <AccountPreview type={"tbr"} />
                    <AccountPreview type={"ratings"} />
                </div>
            </div>
        </div>
    );
}
