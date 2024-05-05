import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      setStartTime(Date.now() - time); 
      interval = setInterval(() => {
        setTime(Date.now() - startTime); 
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, time, startTime]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const centiseconds = Math.floor((milliseconds / 10) % 100);
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}:${("0" + centiseconds).slice(-2)}`;
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <span>{formatTime(time)}</span>
      </div>
      <div>
        {!running ? (
          <button onClick={() => setRunning(true)}>Start</button>
        ) : (
          <button onClick={() => setRunning(false)}>Stop</button>
        )}
        <button onClick={() => { setTime(0); setStartTime(0); }}>Reset</button>
      </div>
    </div>
  );
}

export default App;
