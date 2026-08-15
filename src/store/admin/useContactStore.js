import { create } from "zustand";
import {
  submitContactApi,
  fetchContactsApi,
  fetchContactByIdApi,
  deleteContactApi,
} from "@/api/admin/contact";

const useContactStore = create((set, get) => ({
  contacts: [],
  selectedContact: null,
  isLoading: false,
  error: null,

  submitContact: async (contactData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await submitContactApi(contactData);
      set({ isLoading: false });
      return data;
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to submit contact",
        isLoading: false,
      });
      throw err;
    }
  },

  fetchContacts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchContactsApi();
      set({
        contacts: data.data ?? [],
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to load contacts",
        isLoading: false,
      });
    }
  },

  fetchContactById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchContactByIdApi(id);
      set({
        selectedContact: data.data ?? null,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to load contact",
        isLoading: false,
      });
    }
  },

  deleteContact: async (id) => {
    const prevContacts = get().contacts;

    // Optimistic update
    set({
      contacts: prevContacts.filter((c) => c._id !== id),
    });

    try {
      await deleteContactApi(id);
    } catch (err) {
      // Revert on failure
      set({
        contacts: prevContacts,
        error: err?.response?.data?.message || "Failed to delete contact",
      });
    }
  },

  clearSelectedContact: () => set({ selectedContact: null }),
}));

export default useContactStore;
