import axios from "axios";
const REGISTER_SERVICE = `${import.meta.env.VITE_USER_SERVICE}/register`;
const AUTHENTICATE_SERVICE = `${
  import.meta.env.VITE_USER_SERVICE
}/authenticate`;

export const registerUser = (data) => axios.post(REGISTER_SERVICE, data);
export const loginUser = (data) => axios.post(AUTHENTICATE_SERVICE, data);
