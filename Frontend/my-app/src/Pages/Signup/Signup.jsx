import React, { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import { register } from '../../api/api'
import styles from "./styles.module.css";

function Signup() {
	const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState()

	const navigate = useNavigate()
	const handleRegister = () => {
		// console.log("inside register");
        setIsRegistered(false)
        setError()
        register({ name, email, password, handleRegisterSuccess, handleRegisterFailure })
    }
	const handleRegisterSuccess = () => {
        setIsRegistered(true)
        alert("Registration successful")
        navigate('/login')
    }

    const handleRegisterFailure = (error) => {
        // console.log("Email already present");
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
			<h1 className={styles.heading}>Sign up Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/signup.jpg" alt="signup" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Create Account</h2>
					<input type="text" className={styles.input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
					<input type="text" className={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
					<input
						type="password"
						className={styles.input}
						placeholder="Password"
						value={password} onChange={(e) => setPassword(e.target.value)} required
					/>
					<button type="submit" onClick={() => handleRegister()}className={styles.btn}>Sign Up</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing up with Google</span>
					</button>
					<p className={styles.text}>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;