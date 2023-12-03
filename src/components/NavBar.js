import React from "react"
import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react"
import { auth, useAuth } from "../services/firebaseConfig"
import {useSignOut} from "react-firebase-hooks/auth"
import "../styles/NavBarStyles.css"

const NavBar = () => {
    //const currentUser = useAuth();
    const navigate = useNavigate();
    const [signOut, error] = useSignOut(auth);

    const [ loading, setLoading ] = useState(false);
    
    const logout = (event) => {
        event.preventDefault();
        setLoading(true);
        try {
           signOut();
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
        navigate('/');
    };

    if (error) {
        alert('It was not possible to sign out! Please try again!');
    }

    const [links, setLinks] = useState(true);

    const HandleButton = () => {
        setLinks(!links);
    }

    if (links === true) {
        return (
            <div className="Navbar">
                <div className="leftSide">
                    <div className="Links" id="hidden">
                        <Link className="Link" to= "/home">Home</Link>
                        <Link className="Link" to= "/players">Players</Link>
                        <Link className="Link" to= "/rankings">Rankings</Link>
                        <Link className="Link" to= "/facts">Facts</Link>
                    </div>
                    <button onClick={HandleButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    </button>
                </div>
                <div className="rightSide">
                    <button onClick={(event) => {logout(event)}}>
                        Log Out!
                        <Link to= "/"></Link>
                    </button>
                </div>
                
            </div>
        )  
    } else {
        return (
            <div className="Navbar">
                <div className="leftSide">
                    <div className="Links" id="">
                        <Link className="Link" to= "/players">Players</Link>
                        <Link className="Link" to= "/rankings">Rankings</Link>
                    </div>
                    <button onClick={HandleButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
                <div className="rightSide">
                    <button onClick={(event) => {logout(event)}}>
                        Log Out!
                        <Link to= "/"></Link>
                    </button>   
                </div>
            </div>
        )
    } 
}
export default NavBar