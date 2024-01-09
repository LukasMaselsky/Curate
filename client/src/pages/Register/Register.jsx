import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/Register/RegisterForm";
import "../Login/LoginRegister.css";

export default function Register({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="register-main">
                <RegisterForm />
            </main>
        </>
    );
}
