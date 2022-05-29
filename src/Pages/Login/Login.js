import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/authentication-context/auth-context";
import styles from "./AuthPages.module.css";

export default function () {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { handleLogin } = useAuth();

  const location = useLocation();
  const path = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(loginForm, path);
    setLoginForm({
      email: "",
      password: "",
    });
  };

  const guestLogin = (event) => {
    event.preventDefault();
    handleLogin(
      {
        email: "guest@gmail.com",
        password: "guest",
      },
      path
    );
    setLoginForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className="content-container">
      <div className={styles.form__section}>
        <h3 className="page-title">Login</h3>
        <form onSubmit={handleSubmit} className={`"flex-column "${styles.form__container}`}>
            <div className={`flex-column ${styles.input__fields}`}>
            <label>Email</label>
                <input type="email" name="email" value={loginForm.email} required={true}
                  onChange={(event) => handleChange(event)}
                />
                <label>Password</label>
                <input type="password" name="password" value={loginForm.password} required={true}
                  onChange={(event) => handleChange(event)}
                />
            </div>
          
          
            <button className={styles.login__btn}> Login </button>
            <button onClick={guestLogin} className={styles.login__btn}>
              Login as Guest
            </button>
        </form>
        Don't have an account ?{" "}
        <Link  to="/signup">
          Create one now
        </Link>
      </div>
    </div>
  );
}