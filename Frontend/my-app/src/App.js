import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import History from "./Pages/History/History";
import ComposeEmail from "./Pages/Compose/Compose";
import "./App.css";

function App() {
	const navigate = useNavigate()
	const [user, setUser] = useState(null);
	const handleLoginSuccess = (userData) => {
		setUser(userData.user);
		navigate('/')
	  };

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			console.log("data object", data);
			setUser(data.user._json);
			console.log("setting user", user);
		} catch (err) {
			console.log(err);
			console.log("inside get user error");
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <Home user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={
						user ? (
						<Navigate to="/" replace={true} />
						) : (
						<Login onLoginSuccess={handleLoginSuccess} />
						)
					}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <Signup />}
				/>
				<Route
					path="/compose"
					element={user ? <ComposeEmail user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					path="/history"
					element={user ? <History user={user}/> : <Navigate to="/login" />}
				/>
				
			</Routes>
		</div>
	);
}

export default App;