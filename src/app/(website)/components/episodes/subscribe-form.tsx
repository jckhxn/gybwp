"use client";

import type React from "react";

import { useState } from "react";
import Button from "@/src/app/(website)/components/ui/button";
import { Input } from "@/src/app/(website)/components/ui/input";
import { Label } from "@/src/app/(website)/components/ui/label";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting
          ? "Subscribing..."
          : isSuccess
            ? "Subscribed!"
            : "Subscribe"}
      </Button>
    </form>
  );
}
