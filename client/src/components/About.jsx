import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {

    const [activeTab, setActiveTab] = useState('home');
    const [userData, setUserData] = useState({});
    let navigate = useNavigate();

    const handleTabSelect = (currentTab) => {
        setActiveTab(currentTab);
    };

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const newResponse = await res.json();
            setUserData(newResponse);
            if (res.status !== 200) {
                throw new Error(`HTTP Error ${res.status}`);
                console.log(res.status);
            }
        } catch (err) {
            console.log(err);
            navigate('/login')
        }
    }

    useEffect(() => {
        callAboutPage();
    }, [])

    return (
        <div className='container-fluid fw-bold text-center text-lg-start'>
            <div className='col-6 offset-3 col-lg-8 offset-lg-2 bg-light'>
                <form method='GET' style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", marginTop: "30px" }} className='bg-light mb-4'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-4 py-lg-5 ps-lg-5 pe-lg-4'>
                            <img className='col-12' src={userData.name === "muhammad" ? "https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg" : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"} alt="profilePic" />
                        </div>
                        <div className='col-lg-6 py-4 py-lg-5 ps-lg-4 pe-lg-4'>
                            <h6 className='small '>{userData.name}</h6>
                            <p className='small text-primary'>{userData.work}</p>
                            <p className='small'>Ranking:<span> 1/10</span></p>
                            <ul className="nav nav-tabs justify-content-center justify-content-lg-start" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" onClick={() => { handleTabSelect('home') }}>About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" onClick={() => { handleTabSelect('profile') }} role="tab">TimeLine</a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-lg-2 pb-4 py-lg-5 ps-lg-4 pe-lg-5'>
                            <input type="submit" className='btn btn-secondary' name="editButton" value="Edit" />
                        </div>
                    </div>
                    <div className='row' >
                        <div className='col-lg-4 pb-4 pb-lg-5 ps-lg-5 pe-lg-4'>
                            <p className=''>WORK LINKS</p>
                            <a className='text-dark text-decoration-none' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27" target='_blank'>Youtube</a><br />
                            <a className='text-dark text-decoration-none' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27" target='_blank'>LinkedIn</a><br />
                            <a className='text-dark text-decoration-none' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27" target='_blank'>Instagram</a><br />
                            <a className='text-dark text-decoration-none' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27" target='_blank'>Facebook</a><br />
                            <a className='text-dark text-decoration-none' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27" target='_blank'>GitHub</a><br />
                            <a className='text-dark text-decoration-none' href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=PLwGdqUZWnOp3t3qT7pvAznwUDzKbhEcCc&index=27" target='_blank'>Snapchat</a><br />
                        </div>
                        <div className='col-lg-8 pb-lg-5 ps-lg-4 pe-lg-5'>
                            <div className='tab-content profile-tab' id="myTabContent">
                                <div className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby='home-tab'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>User ID</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>{userData._id}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Name</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Email</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Phone Number</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Profession</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id='profile' role='tabpanel' aria-labelledby='profile-tab' >
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Experience</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>20 Years</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Hourly Rate</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>100$/Hour</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Projects</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>2153</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>English Level</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>Professional</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p>Availability</p>
                                        </div>
                                        <div className='col-6 text-primary'>
                                            <p>Always</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default About