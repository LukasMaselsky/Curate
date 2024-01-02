import LoginForm from "../../components/Login/LoginForm";
import Navbar from "../../components/Navbar/Navbar";
import "./LoginRegister.css";

export default function Login() {
    return (
        <>
            <Navbar />
            <main className="login-main">
                <LoginForm />
            </main>
        </>
    );
}
