import { useState, useContext } from "react";
import FormInput from "../Login/FormInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function RegisterForm() {
    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
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
            id: 2,
            name: "password",
            type: "password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 3,
            name: "confirmPassword",
            type: "password",
            errorMessage: "Password doesn't match",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                import.meta.env.VITE_SERVER_URL + "/server/auth/register",
                values
            );
            navigate("/login");
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
        <div className="register-wrapper">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Register</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button className="register-form-btn" type="submit">
                    Register
                </button>
                {error && <p>{error}</p>}
                <span>
                    Have an account? <Link to="/login">Login</Link>
                </span>
                <button className="demo-btn" type="button" onClick={handleDemo}>
                    Demo
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
