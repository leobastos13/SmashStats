import { auth, useAuth } from '../services/firebaseConfig'
import { useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [createUserWithEmailAndPassword, user, error] = useCreateUserWithEmailAndPassword(auth)
   
    const HandleRegister = (event) => {
        event.preventDefault();
        console.log('olá');
        setLoading(true);
        try {
            createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
        }
       
       if (error) {
            alert('The credetials are not valid. Please try different ones!');
        }
        setLoading(false);
    }

    useEffect(()=>{
        if (user) {
        navigate('/home');   
    } });

    
    const HandleEmailInput = (event) => {
        setEmail(event.target.value);
    }

    const HandlePasswordInput = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="container d-flex align-items-center justify-content-center flex-column mt-5 mb-5">
            <div className="header d-flex align-items-center flex-column mb-4">
                <h3>Create your account!</h3>
            </div>
            <form  className="d-flex align-items-center flex-column">
                <div>
                    <label className="fw-400 fs-4 mb-2" htmlFor="email">Email</label>
                    <input
                        className="d-flex flex-row align-items-start p-2 w-100 h-100 border border-primary rounded-3 mb-3"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="jake@example.com"
                        onChange={HandleEmailInput}
                    ></input>
                </div>
                <div>
                    <label className="fw-400 fs-4 mb-2" htmlFor="password">Password</label>
                    <input
                        className="d-flex flex-row align-items-start p-2 w-100 h-100 border border-primary rounded-3 mb-3"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="**************"
                        onChange={HandlePasswordInput}
                    ></input>
                </div>
                <button className="w-100 h-100 bg-primary border-0 rounded-3 text-light d-flex justify-content-center align-items-center gap-2 fs-5" onClick={(event) => {HandleRegister(event)}}>
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                    </svg>
                </button>
                <p className="mt-3 mb-0">Already have an account?</p>
                <Link className="fw-400 fs-6 text-decoration-underline text-primary" to="/">Sign In here!</Link>   
            </form>
        </div>
    )
}
export default Register;