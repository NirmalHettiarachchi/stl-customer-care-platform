import { useEffect, useState } from "react";
import { passwordReset, confirmReset } from "@api/UserAPI";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };
  useEffect(() => {
    (async () => {
      // let res = await passwordReset(headers);
      setToken("f0bf3041-bc9b-4e9b-b16b-9c33d5f91224");
    })();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword == confirmPassword) {
      try {
        await confirmReset(headers, newPassword, token);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary text-center">
          Change Password
        </h2>
        <form className="space-y-4 mt-8" onSubmit={handleChangePassword}>
          <div className="form-control">
            <label className="label text-secondary">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="input input-bordered w-full bg-gray-200"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label text-secondary">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="input input-bordered w-full bg-gray-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="btn bg-primary w-full hover:bg-primary-dark text-white"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
