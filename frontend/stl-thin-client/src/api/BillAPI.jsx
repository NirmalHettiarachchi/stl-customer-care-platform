import axios from "axios";
const ALL_BILLS_SERVICE = `${import.meta.env.VITE_BILL_SERVICE}/bills`;
const PAY_BILL_SERVICE = `${import.meta.env.VITE_BILL_SERVICE}/bills/pay`;

export const getAllBills = (headers) =>
  axios.get(ALL_BILLS_SERVICE, { headers });

export const payBill = (headers, billId) =>
  axios.post(`${PAY_BILL_SERVICE}/${billId}`, {}, { headers });
