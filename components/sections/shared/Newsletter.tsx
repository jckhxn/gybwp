"use client";

import { useState } from "react";
import { NewsletterSection } from "@/types";

interface NewsletterProps {
  section: NewsletterSection;
}

export function Newsletter({ section }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    title = "Stay Updated",
    subtitle = "Subscribe to our newsletter for the latest episodes and insights.",
    buttonText = "Subscribe",
    placeholderText = "Enter your email address",
    successMessage = "Thank you for subscribing!",
    backgroundColor = "gray",
  } = section;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // TODO: Implement newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
  };

  const backgroundClass = {
    default: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-gray-900",
    primary: "bg-blue-600",
  }[backgroundColor];

  const textClass =
    backgroundColor === "dark" || backgroundColor === "primary"
      ? "text-white"
      : "text-gray-900";

  const subtitleClass =
    backgroundColor === "dark" || backgroundColor === "primary"
      ? "text-gray-200"
      : "text-gray-600";

  return (
    <section className={`py-16 ${backgroundClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClass}`}>
            {title}
          </h2>

          <p className={`text-lg mb-8 ${subtitleClass}`}>{subtitle}</p>

          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
              {successMessage}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholderText}
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Subscribing..." : buttonText}
              </button>
            </form>
          )}

          <p className={`text-sm mt-4 ${subtitleClass}`}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FeaturedNews(props: any) {
  return <div>Featured News</div>;
}
