import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import logo from "../images/logo.jpg";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    console.log("Changing data");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    console.log("Attempting login");
    console.log(`FormData: ${formData.email} ${formData.password}`);

    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4781/api/user/login",
        formData
      );
      console.log(`Response Code: ${response.status}`);

      console.log(response.data.user);
      // ✅ Store user data in context & local storage
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("LOGGED IN");

      // ✅ Redirect to dashboard or home page
      navigate("/ebitda-visualization");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message ||
          "❌ Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={logo}
          className="mx-auto h-25 w-auto rounded-full"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorMessage && (
          <p className="text-red-500 text-center font-semibold bg-red-100 p-2 rounded-md">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white rounded-md hover:bg-indigo-500"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign Up Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
