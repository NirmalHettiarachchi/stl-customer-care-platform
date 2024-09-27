import Service from "@components/Service";
import { useEffect, useState } from "react";
import { getAllService } from "@api/VASServiceAPI";

const Services = () => {
  let [services, setServices] = useState([]);
  useEffect(() => {
    getAllService().then((res) => {
      console.log(res.data);
    });
  }, []);
  // const services = [
  //   { name: "International Roaming", active: false },
  //   { name: "Ringback Tone", active: true },
  //   { name: "Data Top-Up", active: false },
  // ];

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Your Services</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <Service service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Services;
