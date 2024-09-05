import AxiosClient from "./AxiosClient";

const rootApi = AxiosClient(process.env.EXPO_PUBLIC_AUTH_API);

export default rootApi;