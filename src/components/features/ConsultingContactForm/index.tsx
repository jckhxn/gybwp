"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2, Mail, Phone, Building2, User } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

export default function ConsultingContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/mrbkoojk", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(initialFormData);
      } else {
        const errorData = await response.json();
        setError(
          errorData?.errors?.[0]?.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch {
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-8 bg-green-50 border border-green-200 rounded-2xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700 mb-4">
          Thank you for your interest in our consulting services. Jeff will get
          back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-4 py-2 text-green-700 border-2 border-green-300 hover:bg-green-100 rounded-xl font-medium transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-surface-700 flex items-center gap-2 font-medium"
            >
              <User className="w-4 h-4 text-primary" />
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="bg-surface-50 border-surface-200 text-surface-900 placeholder:text-surface-400 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-surface-700 flex items-center gap-2 font-medium"
            >
              <Mail className="w-4 h-4 text-secondary" />
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="bg-surface-50 border-surface-200 text-surface-900 placeholder:text-surface-400 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="company"
              className="text-surface-700 flex items-center gap-2 font-medium"
            >
              <Building2 className="w-4 h-4 text-accent" />
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              className="bg-surface-50 border-surface-200 text-surface-900 placeholder:text-surface-400 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-surface-700 flex items-center gap-2 font-medium"
            >
              <Phone className="w-4 h-4 text-surface-500" />
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="bg-surface-50 border-surface-200 text-surface-900 placeholder:text-surface-400 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-surface-700 font-medium">
            Tell us about your needs *
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe your business challenges, goals, or specific areas where you need consulting support..."
            className="bg-surface-50 border-surface-200 text-surface-900 placeholder:text-surface-400 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl resize-none"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending Message...
            </>
          ) : (
            "Start the Conversation"
          )}
        </button>

        <p className="text-xs text-surface-400 text-center">
          * Required fields. We respect your privacy and will never share your
          information.
        </p>
      </form>
    </div>
  );
}
