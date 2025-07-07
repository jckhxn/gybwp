"use client";

import { useState } from "react";
import Button from "@/src/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactModalProps {
  trigger?: React.ReactNode;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  subject: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

const ContactModal = ({ trigger, className }: ContactModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    subject: "Sponsorship Inquiry",
  });
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading" });

    try {
      const response = await fetch("https://formspree.io/f/mrbkoojk", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });

        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            company: "",
            message: "",
            subject: "Sponsorship Inquiry",
          });
          setStatus({ type: "idle" });
          setIsOpen(false);
        }, 2000);
      } else {
        setStatus({
          type: "error",
          message:
            result?.errors?.[0]?.message ||
            "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className={className} size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-white">
            <Mail className="w-5 h-5" />
            Contact Us
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Interested in sponsoring our podcast? Send us a message and
            we&apos;ll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                disabled={status.type === "loading"}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                disabled={status.type === "loading"}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-200">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your company name (optional)"
              disabled={status.type === "loading"}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-200">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What is this regarding?"
              disabled={status.type === "loading"}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-200">
              Message <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your sponsorship interests, budget, timeline, and any specific requirements..."
              rows={4}
              required
              disabled={status.type === "loading"}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400 resize-none"
            />
          </div>

          {/* Status Messages */}
          {status.type === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">{status.message}</span>
            </div>
          )}

          {status.type === "error" && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{status.message}</span>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={status.type === "loading"}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || status.type === "loading"}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {status.type === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
