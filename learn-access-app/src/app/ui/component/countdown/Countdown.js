import React, {useState, useEffect} from 'react';
import modules from "./countdown.module.css"

const Countdown = ({targetDate}) => {

    //adapted from https://www.w3schools.com/howto/howto_js_countdown.asp, Title: Creating a Countdown Timer, Organisation: W3Schools, Accessed 08/02/2025
    const calculateTimeLeft = () => {
        const difference = Date.parse(targetDate) - new Date();

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const active = timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds;

    const format0s = (time) => {
        if (time < 10) {
            return `0${time}`;
        }

        return time;
    }

    const makeDisplayString = () => {
        return "Expires " + (timeLeft.days || "0") + ":" + (timeLeft.hours ? format0s(timeLeft.hours) : "00") + ":" + (timeLeft.minutes ? format0s(timeLeft.minutes) : "00") + ":" + (timeLeft.seconds ? format0s(timeLeft.seconds) : "00")
    }
    return (
        <div className={modules.countdown}>
            {active ? makeDisplayString() : <span>Expired</span>}
        </div>
    );
};

export default Countdown;
