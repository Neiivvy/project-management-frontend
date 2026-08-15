import axiosInstance from "@/api/axios";

// Public: submit contact form
export const submitContactApi = async (contactData) => {
  const { data } = await axiosInstance.post("/contact", contactData);
  return data;
};

// Admin: GET all contacts
export const fetchContactsApi = async () => {
  const { data } = await axiosInstance.get("/admin/contacts");
  return data;
};

// Admin: GET single contact by ID
export const fetchContactByIdApi = async (id) => {
  const { data } = await axiosInstance.get(`/admin/contacts/${id}`);
  return data;
};

// Admin: DELETE a contact
export const deleteContactApi = async (id) => {
  const { data } = await axiosInstance.delete(`/admin/contacts/${id}`);
  return data;
};
