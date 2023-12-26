import React, { useEffect, useState } from 'react';

const Contact = () => {

    // Hide & Show Contact Page
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
    const callContactPage = async () => {
        try {
            const res = await fetch('/getUserData', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await res.json();
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
            if (res.status !== 200) {
                throw new Error(`HTTP Error ${res.status}`);
                // console.log(res.status);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        callContactPage();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;
        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        })
        const data = await res.json();
        if (!data || res.status === 422)
            alert("Message Failed!")
        else {
            alert("Message Sent!")
            setUserData({ ...userData, message: "" })
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row col-lg-10 offset-lg-1'>
                <div className='col-6 offset-3 col-lg-4 offset-lg-0 mt-5'>
                    <div style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='bg-light d-flex justify-content-start align-items-center py-1 px-3'>
                        <span>
                            <i className="zmdi zmdi-smartphone-iphone"></i>
                        </span>
                        <div className='ps-3'>
                            <h5>Phone</h5>
                            <span className="small">+92 305 4567895</span>
                        </div>
                    </div>
                </div>
                <div className='col-6 offset-3 col-lg-4 offset-lg-0 mt-5'>
                    <div style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='bg-light d-flex justify-content-start align-items-center py-1 ps-3'>
                        <span>
                            <i className="zmdi zmdi-email"></i>
                        </span>
                        <div className='ps-3'>
                            <h5>Email</h5>
                            <span className="small">thapa@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className='col-6 offset-3 col-lg-4 offset-lg-0 mt-5'>
                    <div style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className=' bg-light d-flex justify-content-start align-items-center py-1 ps-3'>
                        <span>
                            <i className="zmdi zmdi-gps-dot"></i>
                        </span>
                        <div className='ps-3'>
                            <h5>Address</h5>
                            <span className="small">123 Main St, Pakistan</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row col-6 offset-3 col-lg-8 offset-lg-2 bg-light my-5' style={{ borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className='col-10 offset-1 '>
                    <h3 className='mt-4'>Get in Touch</h3>
                    <form method="POST">
                        <div className='row mt-3'>
                            <div className='col-lg-4 mb-4'>
                                <input className='form-control fw-bold' type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder='Your Name' />
                            </div>
                            <div className='col-lg-4 mb-4'>
                                <input className='form-control fw-bold' type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder='Your Email' />
                            </div>
                            <div className='col-lg-4 mb-4'>
                                <input className='form-control fw-bold' type="number" name="phone" value={userData.phone} onChange={handleInputChange} placeholder='Your Phone Number' />
                            </div>
                        </div>
                        <textarea style={{ height: "120px" }} className='form-control mb-4 fw-bold' name="message" value={userData.message} onChange={handleInputChange} placeholder='Message'></textarea>
                        <input className='btn btn-primary mb-4' type='submit' value='Send Message' onClick={handleSendMessage} />
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Contact