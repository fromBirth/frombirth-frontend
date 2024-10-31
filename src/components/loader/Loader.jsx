import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 3 ? prevDots + "." : ""));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loader-container">
            <div className="loader-spinner">
                <p className="loader-text">Loading{dots}</p>
            </div>
        </div>
    );
};

export default Loader;
