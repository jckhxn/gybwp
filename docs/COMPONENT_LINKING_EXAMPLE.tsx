// Example: How to set up component linking in your Next.js app

// 1. ROOT LAYOUT (app/layout.tsx)
import { ComponentLinksProvider } from "@/src/components/providers/ComponentLinksProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ComponentLinksProvider scrollOffset={80}>
          {children}
        </ComponentLinksProvider>
      </body>
    </html>
  );
}

// 2. SECTION COMPONENT WITH ID (src/components/sections/MySection.tsx)
import { getComponentId } from "@/src/lib/sectionId";
import ComponentLink from "@/src/components/ui/ComponentLink";

interface MySectionProps {
  section: {
    sectionId?: string;
    title?: string;
    ctaLink?: any; // componentLink data
  };
  index?: number;
}

export function MySection({ section, index }: MySectionProps) {
  const componentId = getComponentId(section, "my-section", index);

  return (
    <div id={componentId} className="py-16">
      <h2>{section.title}</h2>

      {/* Component link usage */}
      {section.ctaLink && (
        <ComponentLink data={section.ctaLink}>
          <button className="btn-primary">
            {section.ctaLink.linkText || "Learn More"}
          </button>
        </ComponentLink>
      )}
    </div>
  );
}

// 3. PAGE COMPONENT (app/my-page/page.tsx)
import { MySection } from "@/src/components/sections/MySection";

export default function MyPage() {
  // This is a server component - no hooks needed!
  // ComponentLinksProvider handles all client-side navigation

  const sections = [
    {
      _type: "mySection",
      title: "Welcome",
      ctaLink: {
        linkType: "samePage",
        targetComponentId: "contact-section",
        linkText: "Get in Touch",
      },
    },
    {
      _type: "mySection",
      sectionId: "contact-section", // Explicit ID
      title: "Contact Us",
    },
  ];

  return (
    <main>
      {sections.map((section, index) => (
        <MySection key={index} section={section} index={index} />
      ))}
    </main>
  );
}

// 4. SANITY SCHEMA (sanity/schemas/sections/mySection.ts)
import { defineField, defineType } from "sanity";

export default defineType({
  name: "mySection",
  title: "My Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description:
        "Optional custom ID for this section. Will auto-generate from title if not provided.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "Call to Action Link",
      type: "componentLink", // <- Use componentLink type
    }),
  ],
});

// 5. PROGRAMMATIC NAVIGATION (for client components)
("use client");

import { navigateToComponent } from "@/src/hooks/useComponentLinks";

export function NavigationButton() {
  const handleClick = () => {
    navigateToComponent("contact-section");
  };

  return <button onClick={handleClick}>Jump to Contact</button>;
}
