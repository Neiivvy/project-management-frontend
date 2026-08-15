"use client";

import { useState } from "react";
import {
  FaLocationArrow,
  FaMailBulk,
  FaMailchimp,
  FaPhone,
  FaSearchLocation,
  FaVoicemail,
} from "react-icons/fa";
import { FaLocationPin, FaMapLocation, FaMessage } from "react-icons/fa6";

import useContactStore from "@/store/admin/useContactStore";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { submitContact } = useContactStore();

  const validateForm = () => {
    const newErrors = {};

    // Name: required, at least 3 characters
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    // Email: required, valid format
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Phone: required, exactly 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits";
      }
    }

    // Message: required, at least 15 characters
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Message must be at least 15 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContact(formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-6 px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl max-lg:max-w-3xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6 shadow-xs border border-slate-300">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Get in touch
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Feel free to contact us and we will get back to you as soon as
            possible
          </p>

          {submitSuccess && (
            <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              Thank you! Your message has been sent successfully.
            </div>
          )}

          {submitError && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {submitError}
            </div>
          )}

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 text-slate-900 font-medium text-sm inline-block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className={`px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 ${
                  errors.name
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-slate-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 text-slate-900 font-medium text-sm inline-block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 ${
                  errors.email
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-slate-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 text-slate-900 font-medium text-sm inline-block"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+977 1234567890"
                className={`px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 ${
                  errors.phone
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-slate-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 text-slate-900 font-medium text-sm inline-block"
              >
                Message
              </label>
              <textarea
                placeholder="Write message"
                rows={5}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 ${
                  errors.message
                    ? "outline-red-500 focus:outline-red-500"
                    : "outline-slate-300"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 text-sm rounded-md font-semibold cursor-pointer text-white border border-green-600 bg-green-600 hover:bg-green-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-lg p-6 shadow-xs border border-slate-300">
            <h3 className="text-lg font-semibold text-slate-900 mb-8">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <FaLocationPin className="text-green-700" />
                <div>
                  <h4 className="font-semibold text-green-700 text-sm mb-2">
                    Our Location
                  </h4>
                  <p className="text-slate-600 text-sm">Prithvi Path</p>
                  <p className="text-slate-600 text-sm mt-0.5">
                    Dharan 56700, Nepal
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhone className="text-green-700" />
                <div>
                  <h4 className="font-semibold text-green-700 text-sm mb-2">
                    Phone Number
                  </h4>
                  <p className="text-slate-600 text-sm">+977 1234567890</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaMailBulk className="text-green-700" />
                <div>
                  <h4 className="font-semibold text-green-700 text-sm mb-2">
                    Email Address
                  </h4>
                  <p className="text-slate-600 text-sm">contact@business.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 relative h-64 rounded-md overflow-hidden mt-12">
            <iframe
              src="https://maps.google.com/maps?q=Code+IT,+Prithvi+Path,+Dharan+56700&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="left-0 top-0 h-full w-full "
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
