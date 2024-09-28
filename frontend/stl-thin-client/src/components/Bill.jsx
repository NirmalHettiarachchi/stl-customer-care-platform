import React from "react";
import {
  CreditCardIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function Bill({ bill, index }) {
  const handlePayment = () => {
    alert("Proceeding to payment...");
  };
  return (
    <div
      key={index}
      className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
    >
      <div className="flex items-center">
        <CreditCardIcon className="w-6 h-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold">{bill.dueDate}</h3>
      </div>
      <div>
        <p className="text-gray-600">Amount: {bill.amount}</p>
        {bill.paid ? (
          <p className="text-green-500 flex items-center">
            <CheckIcon className="w-5 h-5 mr-1" /> Paid
          </p>
        ) : (
          <button
            className="btn bg-primary text-white flex items-center"
            onClick={handlePayment}
          >
            <XMarkIcon className="w-5 h-5 mr-1" /> Pay Now
          </button>
        )}
      </div>
    </div>
  );
}
