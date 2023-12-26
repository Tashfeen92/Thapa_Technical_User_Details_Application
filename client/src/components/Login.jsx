import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import '../App.css';

const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const newResponse = await res.json();
        if (res.status === 400 || !newResponse)
            alert('Invalid Credentials')
        else {
            dispatch({ type: "USER", payload: true })
            localStorage.setItem('myState', JSON.stringify({ 'state': true }))
            console.log('Login Successfully');
            navigate('/');
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row col-4 offset-4 col-lg-8 offset-lg-2'>
                <div style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", marginTop: "90px" }} className='bg-light mb-4'>
                    <div className='row' >
                        <div className='col-lg-6 py-lg-5 ps-lg-5 pe-lg-4'>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img style={{ borderRadius: "5px" }} className='img-fluid col-12 mb-3' src='https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg' alt="login Logo" />
                                <NavLink className='text-dark text-decoration-none h6 d-block' to='/signup'>Create an Account</NavLink>
                            </div>
                        </div>
                        <div className='col-lg-6 d-flex flex-column justify-content-center align-items-center py-lg-5 pe-lg-5 ps-lg-4'>
                            <h3 className='mb-3'>Login</h3>
                            <form method="POST" className='row'>
                                <div className="input-group mb-3">
                                    <span className="input-group-prepend input-group-text">
                                        <i className="zmdi zmdi-email"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name='email'
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-prepend input-group-text">
                                        <i className="zmdi zmdi-eye-off"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="password"
                                        name='password'
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        placeholder="Your Password"
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Login"
                                        onClick={handleLogin}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login