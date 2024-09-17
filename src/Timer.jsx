import { useEffect, useState } from "react";
import q from "./data.json";

function Timer({ setcurr }) {
  const duration = 60 * 60 * 0.5; // sec
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("publish results");
      setcurr(q.length);
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format timeLeft in hh:mm:ss format
  const formatTime = (seconds) => {
    let dateObj = new Date(seconds * 1000);
    let hour = dateObj.getUTCHours();
    let minute = dateObj.getUTCMinutes();
    let second = dateObj.getSeconds();

    return `${hour}:${minute < 10 ? "0" : ""}${minute}:${
      second < 10 ? "0" : ""
    }${second}`;
  };

  return (
    <div className=" border border-gray-500 text-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
      <p className="font-semibold ">Time Remaining: {formatTime(timeLeft)}</p>
    </div>
  );
}

export default Timer;
