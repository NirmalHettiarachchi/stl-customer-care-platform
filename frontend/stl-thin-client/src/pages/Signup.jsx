import { useState } from "react";
import { Link } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@api/UserAPI";

const Signup = () => {
  const [showSucess, setShowSucess] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  } else {
    let [userDetails, setUserDetails] = useState({
      username: "",
      password: "",
      confirm_password: "",
      role: "user",
    });
    const handleRegister = async (e) => {
      e.preventDefault();
      if (userDetails.confirm_password !== userDetails.password) {
        setError("Password didn't match");
        return;
      }
      try {
        let res = await registerUser(userDetails);
        let data = await res.data;

        if (data.id) {
          setShowSucess("Registration Sucessfull Now you can login");
          // window.location.href = "../";
        } else {
          setError("User account already exits");
        }
      } catch (err) {
        setError("Something went wrong.");
      }

      // setShowSucess(true);
    };

    let [error, setError] = useState(null);

    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-primary text-center">
            Create an Account
          </h2>

          {!showSucess ? (
            <form className="space-y-4 mt-8" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label text-secondary">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full bg-gray-200"
                  onInput={(e) => {
                    setUserDetails({
                      ...userDetails,
                      username: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label text-secondary">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="input input-bordered w-full bg-gray-200"
                  onInput={(e) => {
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label text-secondary">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered w-full bg-gray-200"
                  onInput={(e) => {
                    setUserDetails({
                      ...userDetails,
                      confirm_password: e.target.value,
                    });
                  }}
                />
              </div>
              <button className="btn bg-primary w-full hover:bg-primary-dark text-white">
                Register
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
                Already have an account?{" "}
                <Link to="/login" className="text-accent hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          ) : (
            <form className="space-y-4 mt-8">
              <div className="form-control">
                <p className="text-center text-secondary mt-4 text-primary">
                  Registration successfull?{" "}
                  <Link to="/login" className="text-accent hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
};

export default Signup;
