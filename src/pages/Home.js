import { Link } from "react-router-dom";
import { auth, useAuth } from "../services/firebaseConfig";


import NavBar from "../components/NavBar";

const Home = () => {
    const currentUser = useAuth();
    
    return (
        <div>
            <NavBar></NavBar>
            <h1> Welcome {currentUser?.email}!</h1>
        </div>
        
    )
}
export default Home;