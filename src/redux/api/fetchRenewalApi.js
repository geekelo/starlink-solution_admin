import { createAxiosInstance } from "../../config/axios";

export const fetchRenewalsAPI = async () => {
  const axiosInstance = createAxiosInstance();

  const response = await axiosInstance.get("/api/v1/admin/kit_renewals");
  console.log(response)
  return response.data?.data || []; 
};
