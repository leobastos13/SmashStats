import { auth } from '../services/firebaseConfig'
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
        <div style={{backgroundColor: '#1d4050', padding: '98px'}}>
        <div className="container d-flex align-items-center justify-content-center flex-column mt-5 mb-5">
            <div style={{paddingLeft: '570px', position: 'relative', top: '25px'}} className="header d-flex align-items-center flex-column mb-4 text-white">
                <h3>Create your account!</h3>
                <img style={{paddingRight: '1360px', position: 'relative', top: '-40px'}} src="assets/icons/logo-removebg-preview.png"></img>
            </div>
            <form style={{paddingLeft: '570px', marginTop: '-65px'}} className="d-flex align-items-center flex-column">
                <div>
                    <label className="fw-400 fs-4 mb-2 text-white" htmlFor="email">Email</label>
                    <input
                        className="d-flex flex-row align-items-start p-2 w-100 h-100 rounded-3 mb-3"
                        style={{border: 'solid 2px', borderColor: '#63ed85'}}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="jake@example.com"
                        onChange={HandleEmailInput}
                    ></input>
                </div>
                <div>
                    <label className="fw-400 fs-4 mb-2 text-white" htmlFor="password">Password</label>
                    <input
                        className="d-flex flex-row align-items-start p-2 w-100 h-100 rounded-3 mb-3"
                        style={{border: 'solid 2px', borderColor: '#63ed85'}}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="**************"
                        onChange={HandlePasswordInput}
                    ></input>
                </div>
                <button style={{backgroundColor: '#63ed85'}} className="w-100 h-100 border-0 rounded-3 text-light d-flex justify-content-center align-items-center gap-2 fs-5" onClick={(event) => {HandleRegister(event)}}>
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                    </svg>
                </button>
                <p className="mt-3 mb-0 text-white">Already have an account?</p>
                <Link style={{color: '#63ed85'}} className="fw-400 fs-6 text-decoration-underline" to="/">Sign In here!</Link>   
            </form>
        </div>
        </div>
    )
}
export default Register;