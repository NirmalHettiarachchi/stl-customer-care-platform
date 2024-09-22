import {
  Cog6ToothIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid"; // Updated Heroicons v2 imports

const Services = () => {
  const services = [
    { name: "International Roaming", active: false },
    { name: "Ringback Tone", active: true },
    { name: "Data Top-Up", active: false },
  ];

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Your Services</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div className="flex items-center">
              <Cog6ToothIcon className="w-6 h-6 text-primary mr-2" />
              <h3 className="text-lg font-semibold">{service.name}</h3>
            </div>
            <button
              className={`btn ${
                service.active ? "bg-red-500" : "bg-primary"
              } text-white flex items-center`}
            >
              {service.active ? (
                <>
                  <XCircleIcon className="w-5 h-5 mr-1" /> Deactivate
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-1" /> Activate
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
