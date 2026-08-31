import React, { useState, useRef, useEffect } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'monospace', fontSize: '48px' }}>{formatTime(time)}</h1>
      <button onClick={start} disabled={isRunning}>▶ Start</button>
      <button onClick={stop} disabled={!isRunning}>⏸ Stop</button>
      <button onClick={reset}>🔄 Reset</button>
    </div>
  );
}

export default Stopwatch;