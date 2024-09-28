import React, { useEffect, useState } from "react";
import {
  Cog6ToothIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid"; // Updated Heroicons v2 imports
import { activateService, deactivateService } from "@api/VASServiceAPI";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export default function Service({ service, index }) {
  const [activeFlag, setActiveFlag] = useState();
  useEffect(() => {
    setActiveFlag(service.active);
  }, []);
  const authHeader = useAuthHeader();
  const headers = {
    Authorization: authHeader,
  };
  return (
    <div
      key={index}
      className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
    >
      <div className="flex items-center mx-4">
        <Cog6ToothIcon className="w-6 h-6 text-primary mx-2" />
        <div>
          <h3 className="text-lg font-semibold">{service.serviceName}</h3>
          <p className="text-gray-600">Price: {service.price}</p>{" "}
        </div>
      </div>

      {activeFlag ? (
        <button
          className={`btn ${
            activeFlag ? "bg-red-500" : "bg-primary"
          } text-white flex items-center`}
          onClick={() => {
            deactivateService(headers, service.id).then((res) => {
              setActiveFlag(false);
            });
          }}
        >
          {" "}
          <XCircleIcon className="w-5 h-5 mr-1" />
          Deactivate
        </button>
      ) : (
        <button
          className={`btn ${
            activeFlag ? "bg-red-500" : "bg-primary"
          } text-white flex items-center`}
          onClick={() => {
            activateService(headers, service.id).then((res) => {
              setActiveFlag(true);
            });
          }}
        >
          <CheckCircleIcon className="w-5 h-5 mr-1" />
          Activate
        </button>
      )}
    </div>
  );
}
