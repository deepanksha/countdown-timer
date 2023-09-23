import React, { useState, useEffect } from "react";
import "./countdown.css";

const Countdown = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [inputHours, setInputHours] = useState("");
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");

  useEffect(() => {
    let countdownInterval;

    if (timerRunning) {
      countdownInterval = setInterval(() => {
        if (timeInSeconds <= 0) {
          clearInterval(countdownInterval);
          setTimerRunning(false);
        } else {
          setTimeInSeconds((prevTime) => prevTime - 1);
          updateDisplayTime();
        }
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    return () => clearInterval(countdownInterval);
  }, [timerRunning, timeInSeconds]);

  const updateDisplayTime = () => {
    setHours(Math.floor(timeInSeconds / 3600));
    setMinutes(Math.floor((timeInSeconds % 3600) / 60));
    setSeconds(timeInSeconds % 60);
  };

  const handleStartStop = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = () => {
    setTimerRunning(false);
    const newTimeInSeconds =
      (parseInt(inputHours, 10) || 0) * 3600 +
      (parseInt(inputMinutes, 10) || 0) * 60 +
      (parseInt(inputSeconds, 10) || 0);
    setTimeInSeconds(newTimeInSeconds);
    setInputHours("");
    setInputMinutes("");
    setInputSeconds("");
    updateDisplayTime();
  };

  const handleHourChange = (e) => {
    setInputHours(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setInputMinutes(e.target.value);
  };

  const handleSecondChange = (e) => {
    setInputSeconds(e.target.value);
  };

  return (
    <>
      <div className="countdown-container">
        <div className="countdown-values">
          <div className="countdown-value">
            <p className="big-text">{hours}</p>
            <span>hours</span>
          </div>
          <div className="countdown-value">
            <p className="big-text">{minutes}</p>
            <span>minutes</span>
          </div>
          <div className="countdown-value">
            <p className="big-text">{seconds}</p>
            <span>seconds</span>
          </div>
        </div>
        <div className="countdown-input-button">
          <input
            className="countdown-input"
            type="number"
            placeholder="Hours"
            value={inputHours}
            onChange={handleHourChange}
          />
          <input
            className="countdown-input"
            type="number"
            placeholder="Minutes"
            value={inputMinutes}
            onChange={handleMinuteChange}
          />
          <input
            className="countdown-input"
            type="number"
            placeholder="Seconds"
            value={inputSeconds}
            onChange={handleSecondChange}
          />
          <button className="countdown-button" onClick={handleStartStop}>
            {timerRunning ? "Stop" : "Start"}
          </button>
          <button className="countdown-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Countdown;
