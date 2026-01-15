"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

import React from "react";
import routes from "@/src/app/(website)/routes";

// components
import { Button } from "@/src/components/ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  
  return (
    <div className="min-h-screen bg-surface-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container flex items-center min-h-[80vh] px-6 py-12 mx-auto relative z-10">
        <div className="flex flex-col items-center max-w-md mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          
          {/* Error Message */}
          <h1 className="text-3xl font-bold text-surface-900 md:text-4xl">
            {error?.message || "Page not found"}
          </h1>
          <p className="mt-4 text-surface-500 leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center w-full mt-8 gap-4">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full sm:w-auto px-6 py-2.5 text-surface-700 border-2 border-surface-300 hover:border-surface-400 hover:bg-surface-100 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back
            </Button>

            <Button
              asChild
              className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium shadow-soft hover:shadow-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Link href={routes.internal.home}>
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
          </div>
          
          {/* Additional Help */}
          <p className="mt-8 text-sm text-surface-400">
            Need help? <a href="/contact" className="text-primary hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}
