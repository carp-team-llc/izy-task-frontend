import AxiosClient from "./AxiosClient";

const rootApi = AxiosClient(import.meta.env.VITE_DEV_API_HIHI_LOCAL);

export default rootApi;