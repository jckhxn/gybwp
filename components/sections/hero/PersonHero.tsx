import React from "react";
import Image from "next/image";
import { PersonPayload } from "@/types";

interface PersonHeroProps {
  person?: PersonPayload;
  title?: string;
  subtitle?: string;
}

export function PersonHero({ person, title, subtitle }: PersonHeroProps) {
  if (!person) return null;

  const isConsultant = person.role === 'host-consultant';
  const profileData = isConsultant ? person.consultingProfile : person.guestProfile;

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/70 to-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 px-4 py-2 text-sm font-medium text-primary border border-primary/30 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {isConsultant ? 'Host & Consultant' : 'Guest'}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-[1.1]">
            {title || person.name}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              About {person.name}
            </h2>
            
            {profileData?.bio && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {profileData.bio}
              </p>
            )}

            {isConsultant && person.consultingProfile?.expertise && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {person.consultingProfile.expertise.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-2xl blur-2xl opacity-30"></div>
              {(person.consultingProfile?.profileImage || person.guestProfile?.profileImage) && (
                <Image
                  alt={person.name}
                  className="relative rounded-2xl object-cover shadow-2xl border border-gray-200/50"
                  height={400}
                  src={person.consultingProfile?.profileImage || person.guestProfile?.profileImage}
                  width={400}
                  style={{
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
