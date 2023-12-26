import React, { useEffect, useState } from 'react';

const Home = () => {
    const [userName, setUserName] = useState('');
    const callHomePage = async () => {
        try {
            const res = await fetch('/getUserData', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await res.json();
            setUserName(data.name);
            if (res.status !== 200) {
                throw new Error(`HTTP Error ${res.status}`);
                // console.log(res.status);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        callHomePage();
    }, [])
    return (
        <div className='text-center position-relative'>
            <div style={{ backgroundColor: "aliceblue" }} className='col-6 vh-100'></div >
            <p className='text-primary fw-bold' id="home-welcome">WELCOME</p>
            <h1 className='fw-bold' id="home-userName">{userName}</h1>
            <h1
                className="fw-bold"
                style={{ top: userName ? "50%" : "40%" }}
                id="home-we-are-home-developer"
            >
                {userName ? "HAPPY TO SEE YOU BACK" : "We are the Home Developer"}
            </h1>

        </div >

    )
}

export default Home