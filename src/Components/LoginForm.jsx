import React, { useState } from "react";
import axios from "axios";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  const [loginDetails, setLoginDetails] = useState({ login: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://importa-kfql.onrender.com/api/v1/auth/signin",
        loginDetails
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("==good==");
        console.log(response.data.token);

        setSuccess("Login successful!");

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 ">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="login"
              name="login"
              value={loginDetails.login}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  style={{ fontSize: "20px", color: "#B0B1B2" }}
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#D9851F] text-white py-2 px-4 rounded hover:bg-[#cd7a16]"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
