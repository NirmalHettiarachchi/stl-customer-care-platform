import axios from "axios";
const REGISTER_SERVICE = `${import.meta.env.VITE_USER_SERVICE}/register`;
const AUTHENTICATE_SERVICE = `${
  import.meta.env.VITE_USER_SERVICE
}/authenticate`;
const PASSWORD_RESET_SERVICE = `${
  import.meta.env.VITE_USER_SERVICE
}/password-reset`;
const CONFIRM_RESET_SERVICE = `${
  import.meta.env.VITE_USER_SERVICE
}/password-reset/confirm`;

export const registerUser = (data) => axios.post(REGISTER_SERVICE, data);
export const loginUser = (data) => axios.post(AUTHENTICATE_SERVICE, data);
export const passwordReset = (headers) =>
  axios.post(PASSWORD_RESET_SERVICE, {}, { headers });

export const confirmReset = (headers, newPassword, token) =>
  axios.post(
    `${CONFIRM_RESET_SERVICE}?token=${token}&newPassword=${newPassword}`,
    {},
    { headers }
  );
