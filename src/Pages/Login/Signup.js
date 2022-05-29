import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/authentication-context/auth-context";
import styles from "./AuthPages.module.css";

export default function () {
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
  });
  
  const { handleSignup } = useAuth();

  const location = useLocation();
  const path = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    setSignupForm({
      ...signupForm,
      [event.target.name]:
        event.target.name === "contact"
          ? event.target.value.trim().replace(/[^0-9]/g, "")
          : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignup(signupForm, path);
    setSignupForm({
      firstName: "",
      lastName: "",
      contact: "",
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
              <label>First Name</label>
                <input type="text" name="firstName" value={signupForm.firstName} required={true}
                  onChange={(event) => handleChange(event)}
                />
                <label>Last Name</label>
                <input type="text" name="lastName" value={signupForm.lastName} required={true}
                  onChange={(event) => handleChange(event)}
                />
                <label>Email</label>
                <input type="email" name="email" value={signupForm.email} required={true}
                  onChange={(event) => handleChange(event)}
                />
                <label>Contact</label>
                <input type="contact" name="contact" value={signupForm.contact} required={true}
                  onChange={(event) => handleChange(event)}
                />
                <label>Password</label>
                <input type="password" name="password" value={signupForm.password} required={true}
                  onChange={(event) => handleChange(event)}
                />
            </div>
          
          
            <button className={styles.login__btn}> Signup </button>
        </form>
        Already have an account ?{" "}
        <Link  to="/login">
          Create one now
        </Link>
      </div>
    </div>
  );
}