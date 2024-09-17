import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/DataSlice.js";

function WelcomePage() {
  const [username, setUserName] = useState("");
  const [RequiredTime, setTaskTime] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const AuthData = {
      username: username,
      RequiredTime: RequiredTime,
    };
    // Store user data in localStorage
    localStorage.setItem("UserAuthData", JSON.stringify(AuthData));
    dispatch(login({ username, RequiredTime }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      {/* Quiz App Description */}
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          Welcome to the Ultimate Quiz Challenge!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Test your knowledge and challenge yourself in this engaging quiz. Enter your details below to begin. You've got limited time, so be quick!
        </p>
      </div>

      {/* Form for User Input */}
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Start the Quiz</h2>

        {/* User Name Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Enter your name
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Task Time Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="RequiredTime"
          >
            Time to complete the quiz (in seconds)
          </label>
          <input
            type="number"
            id="taskTime"
            value={RequiredTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Time in seconds"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default WelcomePage;
