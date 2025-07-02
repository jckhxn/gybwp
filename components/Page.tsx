import type {
  PagePayload,
  EpisodePayload,
  PersonPayload,
  SponsorPayload,
} from "@/types";
import { SectionRenderer } from "./sections";

export interface PageProps {
  data?: PagePayload | EpisodePayload | PersonPayload | SponsorPayload | null;
  page?: PagePayload | EpisodePayload | PersonPayload | SponsorPayload | null;
}

export function Page({ data, page }: PageProps) {
  const pageData = data || page;

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {pageData?.sectionsBody?.map((section) => {
        return <SectionRenderer key={section._key} section={section} />;
      })}
    </div>
  );
}
