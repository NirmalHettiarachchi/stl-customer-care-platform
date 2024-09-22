import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary text-center">
          Reset Your Password
        </h2>
        <form className="space-y-4 mt-8">
          <div className="form-control">
            <label className="label text-secondary">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-200"
            />
          </div>
          <button className="btn bg-primary w-full hover:bg-primary-dark text-white">
            Send Reset Link
          </button>
          <p className="text-center text-secondary mt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
