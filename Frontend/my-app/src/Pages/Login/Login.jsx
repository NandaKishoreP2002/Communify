import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../api/api'
import styles from "./styles.module.css";

const Login = ({ onLoginSuccess }) => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState()

	const handleLogin = () => {
        login({ email, password, handleLoginSuccess, handleLoginFailure })
    }

    const handleLoginSuccess = (data) => {
		console.log("login success", data);
		onLoginSuccess(data);
        // dispatch(setUser({ ...data?.user, token: data?.token }));
    }

    const handleLoginFailure = (error) => {
        setError(error)
		alert(error);
    }

	
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Members Log in</h2>
					<input type="text" className={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
					<input type="text" className={styles.input} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
					<button type="submit" onClick={() => handleLogin()} className={styles.btn}>Log In</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing in with Google</span>
					</button>
					<p className={styles.text}>
						New Here ? <Link to="/signup">Sing Up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;