import axios from "axios";

export const fetchUserId = async (baseURL: string) => {
  const response = await axios.get(`${baseURL}/auth/get-user-id`, {
    withCredentials: true,
  });
  if (response.data.status !== "success") {
    throw new Error("Failed to fetch user ID");
  }
  return response.data.data.userId;
};
