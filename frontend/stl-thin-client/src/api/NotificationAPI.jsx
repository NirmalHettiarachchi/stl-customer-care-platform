import axios from "axios";
const NOTIFICATION_API = `${
  import.meta.env.VITE_NOTIFICATION_SERVICE
}/notifications`;

export const getNotifications = (headers) =>
  axios.get(NOTIFICATION_API, { headers });
