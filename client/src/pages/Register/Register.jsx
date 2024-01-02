import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/Register/RegisterForm";
import "../Login/LoginRegister.css";

export default function Register() {
    return (
        <>
            <Navbar />
            <main className="register-main">
                <RegisterForm />
            </main>
        </>
    );
}
