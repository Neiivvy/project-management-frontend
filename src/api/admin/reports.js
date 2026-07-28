import axiosInstance from "@/api/axios";

export const fetchAdminOverviewApi = async () => {
  const { data } = await axiosInstance.get("/reports/admin/overview");
  return data;
};

export const fetchProjectReportApi = async (projectId) => {
  const { data } = await axiosInstance.get(
    `/reports/project/${projectId}`
  );
  return data;
};

export const fetchUserReportApi = async (userId) => {
  const { data } = await axiosInstance.get(
    `/reports/user/${userId}`
  );
  return data;
};