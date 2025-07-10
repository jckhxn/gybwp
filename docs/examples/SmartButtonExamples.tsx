import React from "react";
import { getComponentId } from "@/src/lib/sectionId";
import { SmartButton } from "@/src/components/ui/SmartButton";

interface ExampleSectionProps {
  section: {
    sectionId?: string;
    title?: string;
    content?: string;

    // Legacy button approach
    buttonText?: string;
    buttonLink?: string;

    // New componentLink approach
    ctaLink?: any; // componentLink data

    // Combined smart button approach
    smartButton?: {
      text?: string;
      link?: string;
      componentLink?: any;
    };
  };
  index?: number;
}

export function ExampleSection({ section, index }: ExampleSectionProps) {
  const componentId = getComponentId(section, "example-section", index);

  return (
    <div id={componentId} className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {section.title && (
          <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
        )}

        {section.content && <p className="text-lg mb-8">{section.content}</p>}

        <div className="flex flex-wrap gap-4">
          {/* Example 1: Legacy button using SmartButton */}
          {(section.buttonText || section.buttonLink) && (
            <SmartButton
              data={{
                text: section.buttonText,
                link: section.buttonLink,
              }}
              className="btn-primary"
              fallbackText="Learn More"
            />
          )}

          {/* Example 2: New componentLink using SmartButton */}
          {section.ctaLink && (
            <SmartButton
              data={{ componentLink: section.ctaLink }}
              className="btn-secondary"
              fallbackText="Get Started"
            />
          )}

          {/* Example 3: Smart button with both options */}
          {section.smartButton && (
            <SmartButton
              data={section.smartButton}
              className="btn-outline"
              fallbackText="Click Here"
              fallbackLink="/default-page"
            />
          )}

          {/* Example 4: SmartButton with custom children */}
          {section.ctaLink && (
            <SmartButton
              data={{ componentLink: section.ctaLink }}
              className="btn-icon"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                {section.ctaLink.linkText || "Go"}
              </span>
            </SmartButton>
          )}
        </div>
      </div>
    </div>
  );
}

// Example of usage in different scenarios
export function ButtonExamples() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold">SmartButton Examples</h1>

      {/* Legacy format */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Legacy Button Format</h3>
        <SmartButton
          data={{
            text: "Visit Our Blog",
            link: "/blog",
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        />
      </div>

      {/* ComponentLink format */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ComponentLink Format</h3>
        <SmartButton
          data={{
            componentLink: {
              linkType: "samePage",
              targetComponentId: "contact-section",
              linkText: "Scroll to Contact",
              scrollBehavior: "smooth",
              scrollOffset: 80,
            },
          }}
          className="bg-green-600 text-white px-6 py-2 rounded"
        />
      </div>

      {/* Combined format - componentLink takes priority */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Combined Format (ComponentLink Priority)
        </h3>
        <SmartButton
          data={{
            text: "Legacy Text",
            link: "/legacy-link",
            componentLink: {
              linkType: "external",
              externalUrl: "https://example.com",
              linkText: "Component Link Text",
              openInNewTab: true,
            },
          }}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        />
      </div>

      {/* Fallback behavior */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Fallback Behavior</h3>
        <SmartButton
          data={{}} // Empty data
          className="bg-gray-600 text-white px-6 py-2 rounded"
          fallbackText="Default Text"
          fallbackLink="/default-link"
        />
      </div>
    </div>
  );
}
