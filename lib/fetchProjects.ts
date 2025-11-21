import axios from "axios";

export const fetchProjects = async (token: string, baseUrl: string) => {
  const response = await axios.get(
    `${baseUrl}/business/get-all-business-details`,
    {
      withCredentials: true,
    }
  );

  console.log("Fetched projects response:", response.data);

  if (response.data.status !== "success") {
    throw new Error("Failed to fetch projects");
  }

  return response.data.data;
};
