import { Link } from "react-router-dom";

const Login = () => {
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
            />
          </div>
          <div className="form-control">
            <label className="label text-secondary">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-200"
            />
          </div>
          <button className="btn bg-primary w-full hover:bg-primary-dark text-white">
            Login
          </button>
          <p className="text-center text-secondary mt-4">
            <Link to="/forgot-password" className="text-accent hover:underline">
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
};

export default Login;
