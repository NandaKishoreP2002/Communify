import styles from "./styles.module.css";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";

function Home(userDetails) {
	const navigate = useNavigate();
	const user = userDetails.user;
	console.log("userDetails", userDetails);
	console.log("user", user)
	console.log("picture", user.picture);
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};

	const compose = () => {
		navigate("/compose");
		console.log("ready to compose");
	}

	const history = () => {
		navigate("/history");
		console.log("Shows history");
	}


	const fetchImageAsBase64 = async (imageUrl) => {
		try {
		  const response = await fetch(imageUrl);
		  const data = await response.blob();
		  const base64 = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(data);
		  });
		  return base64;
		} catch (error) {
		  console.error('Error fetching image:', error);
		  return null;
		}
	  };
	  
	  // In your component:
	  const [imageData, setImageData] = useState(null);

	  
	  useEffect(() => {
		const loadImage = async () => {
			
		  const base64Data = await fetchImageAsBase64(user.picture);
		  setImageData(base64Data);
		};
	  
		loadImage();
	  }, [user.picture]);
	  


	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Welcome to Communify</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/profile.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Profile</h2>
					{user.picture && (
						<img
							src={imageData}
							alt="profile"
							className={styles.profile_img}
						/>
						)}
					{/* <img
						src={imageData}
						alt="profile"
						className={styles.profile_img}
					/> */}
					{/* <input
						type="text"
						defaultValue={user.name}
						className={styles.input}
						placeholder="UserName"
					/>
					<input
						type="text"
						defaultValue={user.email}
						className={styles.input}
						placeholder="Email"
					/> */}
					<p><span>Username: </span><span>{user.name}</span></p>
					<p><span>Email: </span><span>{user.email}</span></p>
					<div>
						<button className={styles.twobutton} onClick={compose}>
							Compose
						</button>
						<button className={styles.twobutton} onClick={history}>
							History
						</button>
					</div>
					<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;