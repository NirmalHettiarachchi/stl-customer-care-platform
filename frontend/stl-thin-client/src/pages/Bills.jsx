import Bill from "@components/Bill";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getAllBills } from "@api/BillAPI";

export default function Bills() {
  let [allBills, setAllBills] = useState([]);
  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };

  useEffect(() => {
    getAllBills(headers).then((res) => {
      let data = res.data;
      setAllBills(data);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Bills</h2>
      <div className="space-y-4">
        {allBills.map((bill, index) => (
          <Bill bill={bill} index={index} />
        ))}
      </div>
    </div>
  );
}
