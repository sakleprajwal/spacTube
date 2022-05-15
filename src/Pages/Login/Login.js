import { React, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const initialFormData = { email: "", password: "" };

    const [loginForm, setLoginForm] = useState(initialFormData);
    const { email, password } = loginForm;

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        (async () => {
          try {
            const res = await axios.post("api/auth/login", { email, password });
            if (res.status === 200) {
              localStorage.setItem("token", res?.data?.encodedToken)
            }
          }
          catch (err) {
            console.log(err)
          }
        })()
    }

    function loginFormHandler(e) {
        const { name, value } = e.target;
    
        setLoginForm(oldFormData => ({ ...oldFormData, [name]: value }))
    }

    return (
        <div>
            <form onSubmit={loginSubmitHandler}>
                <h1>Login</h1>
                <div >
                    <div >
                        <label htmlFor="email">Email address</label>
                        <input type="text" name="email" placeholder="sakleprajwal@gmail.com" defaultValue={loginForm.email} onChange={loginFormHandler} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholder="prajwal" defaultValue={loginForm.password} onChange={loginFormHandler} />
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox" id="term&condition"/>
                        <label htmlFor="term&condition">Remember me</label>
                    </div>
                    <a href="#">Forgot your password?</a>
                </div>
                <button type='submit'>Login</button>
                <button>Create New Account</button>
            </form>
        </div>
    );
};

export default Login;