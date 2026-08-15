"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaTrash, FaEye, FaTimes, FaInbox } from "react-icons/fa";

import useContactStore from "@/store/admin/useContactStore";

export default function AdminContactPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all' | 'new'

  const {
    contacts,
    isLoading,
    fetchContacts,
    deleteContact,
  } = useContactStore();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const filteredContacts =
    filter === "new"
      ? contacts.filter((c) => {
          const date = new Date(c.createdAt);
          const now = new Date();
          const diff = now - date;
          return diff < 7 * 24 * 60 * 60 * 1000; // last 7 days
        })
      : contacts;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#181d19]">
            Contact Submissions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and manage messages submitted through the contact form
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-[#1a7a4c] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("new")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "new"
                  ? "bg-[#1a7a4c] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              New (7 days)
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium text-[#181d19]">
              {filteredContacts.length}
            </span>
            <span>submission{filteredContacts.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#0f5238] border-t-transparent" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-3">
              <FaInbox className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-slate-700">
              No contact submissions
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {filter === "new"
                ? "No new submissions in the last 7 days"
                : "You don't have any contact submissions yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className="p-4 sm:p-5 hover:bg-slate-50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a7a4c]/10 text-[#1a7a4c]">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#181d19] truncate">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-slate-400">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {contact.email}
                      </p>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#1a7a4c] hover:bg-[#1a7a4c]/5 transition"
                    >
                      <FaEye className="text-xs" />
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      <FaTrash className="text-xs" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedContact(null)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-[#181d19]">
                Contact Details
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="rounded-lg p-2 transition hover:bg-slate-100"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-[#181d19] font-medium">
                    {selectedContact.name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-[#181d19] font-medium">
                    {selectedContact.email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Phone
                  </label>
                  <p className="mt-1 text-sm text-[#181d19] font-medium">
                    {selectedContact.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Submitted
                  </label>
                  <p className="mt-1 text-sm text-[#181d19] font-medium">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Message
                </label>
                <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 p-5">
              <button
                onClick={() => setSelectedContact(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedContact._id);
                  setSelectedContact(null);
                }}
                className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
