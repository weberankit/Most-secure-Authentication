import { useRef, useState } from "react";
import axios from "axios";
const ForgotPasswordPage = () => {
  const emailRef = useRef(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the email value from the ref
    const email = emailRef.current.value;

    try {
      // Make an API call using axios
      const response = await axios.post(
        "YOUR_BACKEND_API_URL/forgot-password",
        {
          email,
        }
      );

      if (response.data.success) {
        setMessage("A reset link has been sent to your email.");
        setError("");
      } else {
        setError("Something went wrong. Please try again.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              ref={emailRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Send Reset Link
          </button>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
