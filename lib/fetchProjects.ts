import axios from "axios";
import { projects } from "@/types/types";

export const fetchProjects = async (baseUrl: string): Promise<projects[]> => {
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
