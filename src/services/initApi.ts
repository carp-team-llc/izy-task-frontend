import AxiosClient from "./AxiosClient";

const rootApi = AxiosClient(import.meta.env.VITE_DEV_API_HIHI);

export default rootApi;