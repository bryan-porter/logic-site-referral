import { useEffect } from "react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Mapping of URL slugs to DOM section IDs
const SECTION_MAP: Record<string, string | null> = {
  "opportunity": "opportunity",
  "who-its-for": "who-its-for",
  "how-it-works": "how-it-works",
  "comp": "comp",
  "faq": "faq",
  "partner-program": null, // scroll to top
  "compensation": "comp",  // alias
};

export default function HomeEntry({ params }: { params?: { section?: string } }) {
  const slug = params?.section;

  // If slug is provided but not recognized, show 404
  if (slug !== undefined && !(slug in SECTION_MAP)) {
    return <NotFound />;
  }

  useEffect(() => {
    if (slug === undefined) {
      window.scrollTo(0, 0);
      return;
    }

    const sectionId = SECTION_MAP[slug];

    // Use requestAnimationFrame + small timeout to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (sectionId === null) {
          // Special case: scroll to top
          window.scrollTo(0, 0);
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "auto" });
          }
        }
      }, 50);
    });
  }, [slug]);

  return <Home />;
}
