import axiosInstance from "@/api/axios";

export async function fetchTasksByProjectApi(projectId) {
  const { data } = await axiosInstance.get("/tasks", {
    params: {
      projectId,
    },
  });

  return data;
}