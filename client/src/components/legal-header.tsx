import { useEffect, useState } from "react";
import { Link } from "wouter";
import logicLogo from "@assets/logic_logo_transparent_1765720135384.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function LegalHeader() {
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleLocationChange = () => setActivePath(window.location.pathname);
    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white border-b border-slate-800">
      <div className="container-padding mx-auto flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={logicLogo} alt="LOGIC Health" className="h-10 w-auto brightness-0 invert" />
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          {navLinks.map((link) => {
            const isActive = activePath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActivePath(link.href)}
                className={`transition-colors ${isActive ? "text-white underline underline-offset-4" : "hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
