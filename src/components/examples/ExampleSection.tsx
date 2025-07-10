import React from "react";
import ComponentLink, {
  ComponentLinkData,
} from "@/src/components/ui/ComponentLink";
import { generateComponentId } from "@/src/lib/componentLink";

interface ExampleSectionProps {
  title?: string;
  description?: string;
  componentLink?: ComponentLinkData;
  sectionId?: string;
}

export default function ExampleSection({
  title = "Example Section",
  description = "This is an example section that can be linked to.",
  componentLink,
  sectionId,
}: ExampleSectionProps) {
  // Generate ID from title if not provided
  const elementId = sectionId || generateComponentId(title);

  return (
    <section
      id={elementId}
      className="py-12 px-4 bg-white border-b border-gray-200"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>

        {description && (
          <p className="text-lg text-gray-600 mb-6">{description}</p>
        )}

        {componentLink && (
          <ComponentLink
            data={componentLink}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {componentLink.linkText || "Learn More"}
          </ComponentLink>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            <strong>Component ID:</strong> {elementId}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This section can be linked to using the component linking system.
          </p>
        </div>
      </div>
    </section>
  );
}

// Example usage in a page
export function ExamplePageWithComponentLinks() {
  const exampleComponentLink: ComponentLinkData = {
    linkType: "samePage",
    targetComponentId: "contact-section",
    linkText: "Contact Us",
    scrollBehavior: "smooth",
    scrollOffset: 80,
  };

  const externalComponentLink: ComponentLinkData = {
    linkType: "external",
    externalUrl: "https://example.com",
    linkText: "Visit External Site",
    openInNewTab: true,
  };

  return (
    <div className="min-h-screen">
      <ExampleSection
        title="Hero Section"
        description="This is the hero section of the page."
        componentLink={exampleComponentLink}
        sectionId="hero-section"
      />

      <ExampleSection
        title="About Section"
        description="Learn more about our services."
        componentLink={externalComponentLink}
        sectionId="about-section"
      />

      <ExampleSection
        title="Contact Section"
        description="Get in touch with us."
        sectionId="contact-section"
      />
    </div>
  );
}
