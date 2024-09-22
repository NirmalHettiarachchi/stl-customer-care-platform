import Bill from "@components/Bill";

export default function Bills() {
  const bills = [
    { month: "August", amount: "LKR 1500", paid: true },
    { month: "July", amount: "LKR 1700", paid: true },
    { month: "June", amount: "LKR 1300", paid: false },
  ];

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Bills</h2>
      <div className="space-y-4">
        {bills.map((bill, index) => (
          <Bill bill={bill} index={index} />
        ))}
      </div>
    </div>
  );
}
