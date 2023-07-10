import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Laylot from "./Laylot";
import Home from "./components/home";
import Profile from "./components/profile";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Friends from "./components/leftbar.utils/friends";

function App() {
	const { currentUser } = useContext(AuthContext);
	const ProtectedLayout = ({ children }) => {
		if (!currentUser) {
			return <Navigate to="/login" />;
		}
		return children;
	};
	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedLayout>
						<Laylot />
					</ProtectedLayout>
				}
			>
				<Route path="/" element={<Home />} />
				<Route path="/relations" element={<Friends />} />
				<Route path="/profile/:id" element={<Profile />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}

export default App;
