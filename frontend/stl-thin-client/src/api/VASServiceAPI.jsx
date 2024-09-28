import axios from "axios";
const ALL_VAS_SERVICE = `${import.meta.env.VITE_VAS_SERVICE}/telco-services`;
const ACTIVATE_VAS_SERVICE = `${
  import.meta.env.VITE_VAS_SERVICE
}/telco-service-activations/activate`;
const DEACTIVATE_VAS_SERVICE = `${
  import.meta.env.VITE_VAS_SERVICE
}/telco-service-activations/deactivate`;
const GET_ACTIVATED_VAS_SERVICES = `${
  import.meta.env.VITE_VAS_SERVICE
}/telco-service-activations`;

export const getAllService = () => axios.get(ALL_VAS_SERVICE);
export const activateService = (headers, telcoServiceId) =>
  axios.post(
    `${ACTIVATE_VAS_SERVICE}?telcoServiceId=${telcoServiceId}`,
    {},
    {
      headers,
    }
  );
export const deactivateService = (headers, telcoServiceId) =>
  axios.delete(`${DEACTIVATE_VAS_SERVICE}?telcoServiceId=${telcoServiceId}`, {
    headers,
  });
export const getActivatedServices = (headers) => {
  return axios.get(GET_ACTIVATED_VAS_SERVICES, { headers });
};
