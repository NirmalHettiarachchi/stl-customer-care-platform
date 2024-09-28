import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { loginUser } from "@api/UserAPI";

const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  } else {
    let [userDetails, setUserDetails] = useState({
      username: "",
      password: "",
    });
    let [error, setError] = useState(null);
    const signIn = useSignIn();

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        let res = await loginUser(userDetails);
        let jwt = await res.data;
        let status = signIn({
          auth: {
            token: jwt,
            type: "Bearer",
          },
        });
        if (status) {
          window.location.href = "../";
        } else {
          setError("Username or password invalid");
        }
      } catch (err) {
        setError("Username or password invalid");
      }
    };
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-primary text-center">
            Login to Your Account
          </h2>
          <form className="space-y-4 mt-8">
            <div className="form-control">
              <label className="label text-secondary">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="input input-bordered w-full bg-gray-200"
                onInput={(e) => {
                  setUserDetails({ ...userDetails, username: e.target.value });
                  console.log(userDetails);
                }}
              />
            </div>
            <div className="form-control">
              <label className="label text-secondary">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-gray-200"
                onInput={(e) => {
                  setUserDetails({ ...userDetails, password: e.target.value });
                }}
              />
            </div>
            <button
              className="btn bg-primary w-full hover:bg-primary-dark text-white"
              onClick={handleLogin}
            >
              Login
            </button>
            {error ? (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            ) : (
              <></>
            )}
            <p className="text-center text-secondary mt-4">
              <Link
                to="/forgot-password"
                className="text-accent hover:underline"
              >
                Forgot your password?
              </Link>
            </p>
            <p className="text-center text-secondary mt-4">
              Need help?{" "}
              <Link to="/chat" className="text-accent hover:underline">
                Chat with support
              </Link>
            </p>
            <p className="text-center text-secondary">
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent hover:underline">
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
