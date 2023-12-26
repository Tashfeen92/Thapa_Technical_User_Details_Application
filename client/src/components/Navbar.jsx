import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App';

const Navbar = () => {

    const { state, dispatch } = useContext(UserContext);
    console.log(`Navbar ${state}`)

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img style={{ maxWidth: "90px" }} src="https://www.pixelstalk.net/wp-content/uploads/images6/21-9-Wallpaper-HD-Free-download.jpg" alt="logo" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item pe-3">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                            {
                                !state ? (
                                    <>
                                        <li className="nav-item pe-3">
                                            <NavLink className="nav-link" to="/login">Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>

        </div >
    )
}

export default Navbar