import axios from "axios";
const ALL_SERVICE = `${import.meta.env.VITE_VAS_SERVICES}/telco-services`;
const ACTIVATE_SERVICE = `${
  import.meta.env.VITE_USER_SERVICE
}/telco-service-activations/activate`;
const DEACTIVATE_SERVICE = `${
  import.meta.env.VITE_USER_SERVICE
}/telco-service-activations/activate`;
const GET_ACTIVATED_SERVICES = `${
  import.meta.env.VITE_USER_SERVICE
}/telco-service-activations`;

export const getAllService = () => axios.get(ALL_SERVICE);
export const activateService = (telcoServiceId) =>
  axios.post(ACTIVATE_SERVICE, { params: { telcoServiceId: telcoServiceId } });
export const deactivateService = (telcoServiceId) =>
  axios.delete(DEACTIVATE_SERVICE, {
    params: { telcoServiceId: telcoServiceId },
  });
export const getActivatedServices = () => axios.get(GET_ACTIVATED_SERVICES);
