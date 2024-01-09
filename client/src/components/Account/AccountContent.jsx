import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function AccountContent() {
    const { currentUser, login, logout } = useContext(AuthContext);
}
