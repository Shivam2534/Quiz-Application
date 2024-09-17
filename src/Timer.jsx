import { useEffect, useState } from "react";
import q from "./data.json";

function Timer({ setcurr }) {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    let UserAuthData = JSON.parse(localStorage.getItem("UserAuthData"));
    if (UserAuthData) {
      setTimeLeft(UserAuthData.RequiredTime);
    }

    // Set up interval for countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          console.log("publish results");
          setcurr(q.length); // Handle the "publish results" case
          clearInterval(timer); // Stop the timer once timeLeft reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [setcurr]);

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
    <div className="border border-gray-500 text-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
      <p className="font-semibold">Time Remaining: {formatTime(timeLeft)}</p>
    </div>
  );
}

export default Timer;
