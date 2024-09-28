import Service from "@components/Service";
import { useEffect, useState } from "react";
import { getAllService, getActivatedServices } from "@api/VASServiceAPI";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const Services = () => {
  let [allServices, setAllServices] = useState([]);
  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };
  const getServiceList = async () => {
    let res = await getAllService();
    let allServices = res.data;
    res = await getActivatedServices(headers);
    let activatedServices = res.data;
    allServices.forEach((element) => {
      if (
        activatedServices.find(
          ({ telcoService }) => element.id == telcoService?.id
        )
      ) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
    setAllServices(allServices);
  };
  useEffect(() => {
    getServiceList();
  }, []);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Your Services</h2>
      <div className="space-y-4">
        {allServices.map((service, index) => (
          <Service service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Services;
