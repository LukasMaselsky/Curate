import { useState, useContext } from "react";
import FormInput from "../Login/FormInput";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function LoginForm() {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special characters",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(values);
            navigate("/");
        } catch (err) {
            setError(err.response.data); // error message from server error
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleDemo = async () => {
        try {
            await login({
                username: import.meta.env.VITE_DEMO_USERNAME,
                password: import.meta.env.VITE_DEMO_PASSWORD,
            });
            navigate("/");
        } catch (err) {
            if (!err.response) {
                setError("Please check your internet connection");
            } else {
                setError(err.response.data); // error message from server error
            }
        }
    };

    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                {error && <span>{error}</span>}
                <button
                    type="submit"
                    className="login-form-btn"
                    aria-label="Login button"
                >
                    Login
                </button>
                <button
                    type="button"
                    className="demo-btn"
                    aria-label="Login demo button"
                    onClick={handleDemo}
                >
                    Demo
                </button>
            </form>
        </div>
    );
}
