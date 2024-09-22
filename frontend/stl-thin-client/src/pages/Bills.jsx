import {
  CreditCardIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"; // Updated Heroicons v2 imports

const Bills = () => {
  const bills = [
    { month: "August", amount: "LKR 1500", paid: true },
    { month: "July", amount: "LKR 1700", paid: true },
    { month: "June", amount: "LKR 1300", paid: false },
  ];

  const handlePayment = () => {
    alert("Proceeding to payment...");
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Bills</h2>
      <div className="space-y-4">
        {bills.map((bill, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div className="flex items-center">
              <CreditCardIcon className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-lg font-semibold">{bill.month}</h3>
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
        ))}
      </div>
    </div>
  );
};

export default Bills;
