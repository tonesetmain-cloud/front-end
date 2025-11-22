import axios from "axios";

export const fetchProjects = async (baseUrl: string) => {
  const response = await axios.get(
    `${baseUrl}/business/get-all-business-details`,
    {
      withCredentials: true,
    }
  );

  if (response.data.status !== "success") {
    throw new Error("Failed to fetch projects");
  }

  return response.data.data;
};
