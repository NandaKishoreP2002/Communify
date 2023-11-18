import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { sendEmail } from '../../api/api'

const ComposeEmail = (userDetails) => {
    const navigate = useNavigate()
    const user = userDetails.user;
    const from = user.email;
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState()

  const handleSendEmail = () => {
        setError()
        sendEmail({ to, subject, message, handleEmailSuccess, handleEmailFailure })
        console.log('Sending email:', { from, to, subject, message });
    }

    const handleEmailSuccess = () => {
        alert("Email sent")
        navigate('/')
    }

    const handleEmailFailure = (error) => {
        
        setError(error)
    }
    const gotoHome = () => {
        navigate("/");
        console.log("Go to home");
    }

  return (
    <div>
      <h2 className={styles.heading} >Compose Email</h2>
      <form className="totalform">
          <input type="email" className={styles.input} placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <br />
          <input type="text" className={styles.inputsecond} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <br />
          <textarea value={message} className={styles.message} placeholder="Type Your Message" onChange={(e) => setMessage(e.target.value)} />
        <br />
        <div>
			<button className={styles.firstbutton} onClick={handleSendEmail}>
				Send Email
			</button>
			<button className={styles.secondbutton} onClick={gotoHome}>
				Home
			</button>
		</div>
        {/* <button type="button" className={styles.btn} onClick={handleSendEmail}>Send Email</button> */}
      </form>
    </div>
  );
};

export default ComposeEmail;
