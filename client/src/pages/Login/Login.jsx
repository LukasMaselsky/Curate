import LoginForm from "../../components/Login/LoginForm";
import Navbar from "../../components/Navbar/Navbar";
import "./LoginRegister.css";

export default function Login({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="login-main">
                <LoginForm />
            </main>
        </>
    );
}
