import { useState, useEffect, useCallback } from 'react';

export const useExtensionTimer = (initialMinutes = 0, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isExtended, setIsExtended] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onTimeUp) onTimeUp();
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, onTimeUp]);

  const startTimer = useCallback((minutes) => {
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    setIsExtended(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
    setIsRunning(false);
    setIsExtended(false);
  }, []);

  const extendTimer = useCallback((additionalMinutes) => {
    setTimeLeft(prev => prev + (additionalMinutes * 60));
    setIsExtended(true);
    setIsRunning(true);
  }, []);

  const formatTime = useCallback(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  }, [timeLeft]);

  const getProgressPercentage = useCallback(() => {
    if (initialMinutes === 0) return 0;
    return ((initialMinutes * 60 - timeLeft) / (initialMinutes * 60)) * 100;
  }, [timeLeft, initialMinutes]);

  return {
    timeLeft,
    isRunning,
    isExtended,
    formattedTime: formatTime(),
    progressPercentage: getProgressPercentage(),
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    extendTimer,
    hasExtended: isExtended
  };
};