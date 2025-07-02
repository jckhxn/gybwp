import { Section } from "@/types";
import { HomeHero } from "@/components/sections/hero/HomeHero";

// Section registry - maps Sanity section types to React components
export const sections = {
  homeHero: HomeHero,
};

export function SectionRenderer(props: { section: Section }) {
  const Section = sections[props.section._type as keyof typeof sections];

  if (!Section) {
    console.warn(`Section type "${props.section._type}" not found in registry`);
    return null;
  }

  return <Section section={props.section as any} />;
}
