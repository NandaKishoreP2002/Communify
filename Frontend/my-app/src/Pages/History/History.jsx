import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './History.css';

function History(userDetails) {
    const navigate = useNavigate()
    const user = userDetails.user;
    // const fromValue = user.email;
    const fromValue = "saas.demo@tensorgo.co";
  const [mails, setMails] = useState([]);
//   const [fromValue, setFromValue] = useState('');

  useEffect(() => {
    const fetchMailsByFrom = async () => {
      try {
        console.log("inside history");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/history/mails/${fromValue}`);
        if(response) {
            console.log("history response", response);
            setMails(response.data.mails);
        }
        else {
            console.log("error occured in fetching mail list");
        }
        
      } catch (error) {
        console.error('Error fetching mails:', error);
      }
    };

    // Trigger the API request when the component mounts or when 'fromValue' changes
    fetchMailsByFrom();
  }, [fromValue]);


  const gotoHome = () => {
    navigate("/");
    console.log("Go to home");
}

  return (
    <div>
      <ul>
        {mails.map((mail) => (
          <div className="maildiv" key={mail._id}>
            <p><strong>From:</strong> {mail.from}</p>
            <p><strong>To:</strong> {mail.to}</p>
            <p><strong>Subject:</strong> {mail.subject} </p>
            <p><strong>Message:</strong> {mail.message}</p>
          </div>
        ))}
      </ul>
      {/* <div className="container"> */}
        <button className="homebutton" onClick={gotoHome}>
            Home
        </button>
      {/* </div> */}
      
    </div>
  );
}

export default History;
