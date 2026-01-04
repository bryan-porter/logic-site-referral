import { Link, useLocation } from "wouter";
import logicLogo from "@assets/logic_logo_transparent_1765720135384.png";

const navLinks = [
  { href: "/", label: "Partner Program" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function LegalHeader() {
  const [location] = useLocation();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      <div className="container-padding mx-auto flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={logicLogo} alt="LOGIC Health" className="h-10 w-auto" />
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
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
