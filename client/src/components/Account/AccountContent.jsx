import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useEffect } from "react";

export default function AccountContent() {
    const { currentUser, login, logout } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            navigate("/register");
        }
    }, []);
}
