import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showOtp, setShowOtp] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate sending OTP and show OTP input field
    setShowOtp(true);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary text-center">
          Create an Account
        </h2>

        {!showOtp ? (
          <form className="space-y-4 mt-8" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label text-secondary">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-gray-200"
              />
            </div>
            <div className="form-control">
              <label className="label text-secondary">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="input input-bordered w-full bg-gray-200"
              />
            </div>
            <div className="form-control">
              <label className="label text-secondary">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="input input-bordered w-full bg-gray-200"
              />
            </div>
            <div className="form-control">
              <label className="label text-secondary">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered w-full bg-gray-200"
              />
            </div>
            <button className="btn bg-primary w-full hover:bg-primary-dark text-white">
              Register
            </button>
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
              <label className="label text-secondary">OTP</label>
              <input
                type="text"
                placeholder="Enter the OTP"
                className="input input-bordered w-full bg-gray-200"
              />
            </div>
            <button className="btn bg-primary w-full hover:bg-primary-dark text-white">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
