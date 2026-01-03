import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | LOGIC Health";

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "LOGIC Health Management Privacy Policy. Learn how we collect, use, and protect your information when you visit our website.");
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-slate-900 text-white py-8">
        <div className="container-padding mx-auto">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding mx-auto py-12 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold font-heading text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: October 1, 2025</p>

          {/* Introduction */}
          <section id="intro" className="mb-10 scroll-mt-8">
            <p className="text-foreground leading-relaxed">
              This Privacy Policy ("Policy") explains how LOGIC Health Management ("LOGIC," "we," "us," or "our") collects, uses, shares, and protects information when you visit or interact with our website (the "Website").
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              If you have questions about this Policy or our privacy practices, contact us at:
            </p>
            <address className="not-italic bg-slate-50 rounded-lg p-4 mt-4 text-foreground">
              LOGIC Health Management<br />
              5900 Balcones Dr. Suite 100<br />
              Austin, TX 78731<br />
              United States<br />
              Email: legal@logichm.com
            </address>
          </section>

          {/* Scope */}
          <section id="scope" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Scope</h2>
            <p className="text-foreground leading-relaxed">
              This Policy applies to information collected through the Website, including when you:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground">
              <li>browse pages and interact with Website features;</li>
              <li>submit information through forms (including career, referral partner, or recruiting-related submissions);</li>
              <li>communicate with us through the Website.</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              This Website is not intended to collect protected health information ("PHI") for medical treatment. Do not submit PHI through Website forms unless the form explicitly requests it and indicates it will be handled accordingly.
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              If you are a patient receiving services through a healthcare provider that partners with LOGIC, information collected by your healthcare provider is governed by that provider's Notice of Privacy Practices and applicable law, including HIPAA. This Website Policy does not replace a provider's Notice of Privacy Practices.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="information-we-collect" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Information We Collect</h2>
            <p className="text-foreground leading-relaxed">
              The information we collect depends on how you interact with the Website. We may collect:
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1) Information you provide to us</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Contact details (e.g., name, email address, phone number, organization)</li>
              <li>Professional information (e.g., role, experience, résumé/CV, LinkedIn URL, referral partner details)</li>
              <li>Communications content (e.g., messages you send to us)</li>
              <li>Any other information you choose to submit through Website forms</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2) Information collected automatically</h3>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>Device and network information (e.g., IP address, browser type, operating system)</li>
              <li>Website usage data (e.g., pages visited, time spent, clicks, referring URLs)</li>
              <li>Approximate location (e.g., city/state) derived from IP address</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3) Cookies and similar technologies</h3>
            <p className="text-foreground leading-relaxed">
              We may use cookies, pixels, and similar technologies to support Website functionality, remember preferences, analyze traffic, and improve performance. See "Cookies and Analytics" below.
            </p>
          </section>

          {/* Sensitive Information */}
          <section id="sensitive-information" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Sensitive Information</h2>
            <p className="text-foreground leading-relaxed">
              We do not intentionally seek sensitive personal information (including health data) through this Website. If you choose to submit sensitive information, you consent to our processing of it consistent with this Policy and applicable law.
            </p>
          </section>

          {/* How We Collect Information */}
          <section id="how-we-collect" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">How We Collect Information</h2>
            <p className="text-foreground leading-relaxed">We collect information through:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground">
              <li>Forms and submissions you complete on the Website</li>
              <li>Your communications with us through the Website</li>
              <li>Automatic collection via cookies/log files and similar technologies</li>
              <li>Service providers that help us operate the Website (e.g., hosting, analytics, form processing)</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section id="how-we-use" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">How We Use Information</h2>
            <p className="text-foreground leading-relaxed">We may use information to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground">
              <li>Respond to inquiries and communicate with you</li>
              <li>Process and evaluate recruiting and referral partner submissions</li>
              <li>Improve and maintain the Website, including performance and security</li>
              <li>Conduct analytics to understand Website usage and effectiveness</li>
              <li>Comply with legal obligations and enforce our rights</li>
              <li>Prevent fraud, misuse, or unauthorized access</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4 font-semibold">
              We do not sell your personal information.
            </p>
          </section>

          {/* How We Share Information */}
          <section id="how-we-share" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">How We Share Information</h2>
            <p className="text-foreground leading-relaxed">We may share information:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground">
              <li>With service providers that perform services for us (e.g., hosting, analytics, form handling, database infrastructure) under appropriate contractual protections</li>
              <li>With professional advisors (e.g., legal, accounting) as needed</li>
              <li>To comply with law, regulation, legal process, or enforceable governmental request</li>
              <li>To protect rights, safety, and security of LOGIC, users, partners, or the public</li>
              <li>In connection with a corporate transaction (e.g., merger, acquisition, financing, or sale of assets), subject to standard confidentiality protections</li>
            </ul>
          </section>

          {/* Cookies and Analytics */}
          <section id="cookies" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Cookies and Analytics</h2>
            <p className="text-foreground leading-relaxed">
              Cookies are small files stored on your device that help websites function and remember preferences.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground">
              <li>You can typically control cookies via browser settings and delete existing cookies.</li>
              <li>If you block cookies, some Website features may not function properly.</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              We may use analytics tools (such as Google Analytics or similar services) to help measure traffic and usage trends. These tools may collect information such as IP address, device identifiers, and usage events. You may be able to opt out using provider-specific mechanisms (for example, Google's opt-out options).
            </p>
          </section>

          {/* Your Choices */}
          <section id="your-choices" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Your Choices</h2>
            <p className="text-foreground leading-relaxed">
              Depending on your location and applicable law, you may have choices to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground">
              <li>Request access to or deletion of personal information we maintain about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Opt out of certain marketing communications (if any are sent), via the unsubscribe link or by contacting us</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              To exercise these choices, contact legal@logichm.com.
            </p>
          </section>

          {/* Data Retention */}
          <section id="data-retention" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Data Retention</h2>
            <p className="text-foreground leading-relaxed">
              We retain personal information for as long as reasonably necessary to fulfill the purposes described in this Policy, including to comply with legal obligations, resolve disputes, and enforce agreements.
            </p>
          </section>

          {/* Security */}
          <section id="security" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Security</h2>
            <p className="text-foreground leading-relaxed">
              We implement reasonable administrative, technical, and physical safeguards designed to protect personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Children's Privacy */}
          <section id="childrens-privacy" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Children's Privacy</h2>
            <p className="text-foreground leading-relaxed">
              The Website is not intended for children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, contact us and we will take appropriate steps.
            </p>
          </section>

          {/* State-Specific Privacy Rights */}
          <section id="state-rights" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">State-Specific Privacy Rights</h2>
            <p className="text-foreground leading-relaxed">
              Certain U.S. states provide residents additional privacy rights (which may include rights to access, delete, correct, or obtain a copy of personal information; and to opt out of certain processing such as targeted advertising, where applicable). To submit a request, email legal@logichm.com. We may take steps to verify your identity before fulfilling a request.
            </p>
          </section>

          {/* International Users */}
          <section id="international" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">International Users</h2>
            <p className="text-foreground leading-relaxed">
              LOGIC operates from the United States. If you access the Website from outside the U.S., you understand information may be transferred to and processed in the U.S. and other jurisdictions that may not provide the same level of data protection as your home country.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section id="changes" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-foreground leading-relaxed">
              We may update this Policy from time to time. We will update the "Last Updated" date when changes are posted. Your continued use of the Website indicates acceptance of the updated Policy.
            </p>
          </section>

          {/* Contact Us */}
          <section id="contact" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Contact Us</h2>
            <address className="not-italic bg-slate-50 rounded-lg p-4 text-foreground">
              LOGIC Health Management<br />
              5900 Balcones Dr. Suite 100<br />
              Austin, TX 78731<br />
              United States<br />
              Email: legal@logichm.com
            </address>
          </section>

          {/* Back to Home */}
          <div className="border-t border-border pt-8 mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-8 border-t border-border">
        <div className="container-padding mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LOGIC Health. All rights reserved.
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
