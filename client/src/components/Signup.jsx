import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css';

const Signup = () => {

    const [userRegistrationData, setUserRegistrationData] = useState({ name: "", email: "", phone: "", work: "", password: "", confirmPassword: "" })
    let navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserRegistrationData({
            ...userRegistrationData,
            [name]: value, // Square Brackets Allows us to create Dynamic Property Names (Computed Property)
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const { name, email, phone, work, password, confirmPassword } = userRegistrationData;
        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, work, password, confirmPassword })
        })
        const newResponse = await res.json();
        if (res.status === 422 || !newResponse)
            alert("Invalid Registration")
        else {
            alert("Registered Successfully")
            navigate('/login');
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row col-4 offset-4 col-lg-8 offset-lg-2'>
                <div style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", marginTop: "25px" }} className='bg-light mb-4'>
                    <div className='row' >
                        <div className='col-lg-6 order-lg-2 py-lg-5 pe-lg-5 ps-lg-4 d-flex justify-content-center align-items-center'>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <img style={{ borderRadius: "5px" }} className='img-fluid col-12 mb-3' src='https://img.freepik.com/premium-photo/freelance-man-working-laptop-home-generated-by-ai_941600-2989.jpg?w=360' alt="login Logo" />
                                <NavLink className='text-dark text-decoration-none h6 d-block' to='/login'>Already a Member</NavLink>
                            </div>
                        </div>
                        <div className='col-lg-6 d-flex flex-column justify-content-center align-items-center py-lg-5 ps-lg-5 pe-lg-4'>
                            <h3 className='mb-3'>Sign Up</h3>
                            <form method="POST" className='row'>
                                <div className="input-group mb-3">
                                    <span className="input-group-prepend input-group-text">
                                        <i className="zmdi zmdi-account"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        value={userRegistrationData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-prepend input-group-text">
                                        <i className="zmdi zmdi-email"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={userRegistrationData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-prepend input-group-text">
                                        <i className="zmdi zmdi-phone"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phone"
                                        value={userRegistrationData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Your Phone Number"
                                        required
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-prepend input-group-text">
                                        <i className="zmdi zmdi-compass"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="work"
                                        value={userRegistrationData.work}
                                        onChange={handleInputChange}
                                        placeholder="Your Work"
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
                                        name="password"
                                        value={userRegistrationData.password}
                                        onChange={handleInputChange}
                                        placeholder="Your Password"
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
                                        name="confirmPassword"
                                        value={userRegistrationData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Your Confirm Password"
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Register"
                                        onClick={handleRegister}
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

export default Signup