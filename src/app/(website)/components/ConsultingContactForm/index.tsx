"use client";

import { useState } from "react";
import Button from "@/src/app/(website)/components/ui/button";
import { Input } from "@/src/app/(website)/components/ui/input";
import { Label } from "@/src/app/(website)/components/ui/label";
import { Textarea } from "@/src/app/(website)/components/ui/textarea";
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
      <div className="max-w-md mx-auto p-8 bg-green-50 border border-green-200 rounded-xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700 mb-4">
          Thank you for your interest in our consulting services. Jeff will get
          back to you within 24 hours.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="text-green-700 border-green-300 hover:bg-green-50"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          Ready to Transform Your Business?
        </h3>
        <p className="text-gray-300">
          Let&apos;s discuss how we can help you achieve your talent and growth
          objectives.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-gray-200 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-gray-200 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
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
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="company"
              className="text-gray-200 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-gray-200 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-200">
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
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Message...
            </>
          ) : (
            "Start the Conversation"
          )}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          * Required fields. We respect your privacy and will never share your
          information.
        </p>
      </form>
    </div>
  );
}
