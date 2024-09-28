import Bill from "@components/Bill";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getAllBills, payBill } from "@api/BillAPI";

export default function Bills() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  let [allBills, setAllBills] = useState([]);
  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };

  const handleConfirmPayment = async () => {
    try {
      await payBill(headers, selectedBill?.id);
      handleCloseModal();
      window.location.reload();
    } catch (err) {}
  };

  const formatDueDate = (dueDate) =>
    `${dueDate[0]}/${dueDate[1]}/${dueDate[2]}`;
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBill(null);
  };
  useEffect(() => {
    getAllBills(headers).then((res) => {
      let data = res.data;
      data.map((bill) => {
        bill.dueDate = formatDueDate(bill.dueDate);
      });
      setAllBills(data);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Bills</h2>
      <div className="space-y-4">
        {allBills.map((bill, index) => (
          <Bill
            bill={bill}
            index={index}
            setSelectedBill={setSelectedBill}
            setShowModal={setShowModal}
          />
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
            <p>
              Pay for <strong>{selectedBill?.month}</strong> bill (Amount:{" "}
              <strong>{selectedBill?.amount}</strong>)
            </p>
            <div className="mt-4">
              <label className="block mb-2">Select a Payment Method:</label>
              <select className="select select-bordered w-full">
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Mobile Payment</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="btn bg-gray-500 text-white"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn bg-primary text-white"
                onClick={handleConfirmPayment}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
