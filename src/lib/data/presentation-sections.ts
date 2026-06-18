export const presentationSections = [
  { id: "hero", label: "Home" },
  { id: "stats", label: "Stats" },
  { id: "cta", label: "Get Started" },
] as const;

export type PresentationSectionId =
  (typeof presentationSections)[number]["id"];
