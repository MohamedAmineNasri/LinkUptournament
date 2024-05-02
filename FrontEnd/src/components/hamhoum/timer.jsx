import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  // Load timer state from localStorage on component mount
  useEffect(() => {
    const storedTimeLeft = parseInt(localStorage.getItem('timerTimeLeft'), 10);
    if (!isNaN(storedTimeLeft)) {
      setTimeLeft(timeLeft);
    }
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('timerTimeLeft', timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning]);

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
    }
  };

  const stopTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
    }
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setTimerRunning(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
    
    
    
    <div className='bg-black'>
      <h1 className='text-black-200'>Timer: {formatTime(timeLeft)}</h1>
      <button onClick={startTimer} className='text-red-200'>Start</button>
      <button onClick={stopTimer} className='text-black-200'>Stop</button>
      <button onClick={resetTimer} className='text-black-200'>Reset</button>
    </div></>
  );
};

export default Timer;
