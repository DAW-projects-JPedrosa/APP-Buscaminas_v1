import React from 'react';
import { useState, useEffect } from 'react'

const Timer = ({isRunning}) => {
    const [time, setTime] = useState(0);
    const [run, setRun] = useState(isRunning);
  
    useEffect(() => {
        setRun(isRunning)
        if(!run) return;
        let intervalId = setInterval(() => setTime(time + 1), 10);
        return () => clearInterval(intervalId);
    }, [run, time]);
  
    // Hours calculation
    const hours = Math.floor(time / 360000);
  
    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);
  
    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);
  
    // Milliseconds calculation
    const milliseconds = time % 100;

    return (
      <span className="stopwatch-container">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    );
  };

export default Timer;