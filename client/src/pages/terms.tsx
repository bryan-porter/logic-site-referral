import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service | LOGIC Health";

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "LOGIC Health Management Website Terms of Use. Review the terms and conditions governing your access to and use of our website.");
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
          <h1 className="text-4xl font-bold font-heading text-foreground mb-2">Website Terms of Use</h1>
          <p className="text-muted-foreground mb-8">Last Updated: October 1, 2025</p>

          {/* 1. Acceptance of Terms */}
          <section id="acceptance" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground leading-relaxed">
              LOGIC Health Management ("LOGIC," "we," "us," or "our") maintains this website and any webpages that link to these Website Terms of Use (collectively, the "Website"). These Website Terms of Use ("Terms") govern your access to and use of the Website.
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              By accessing or using the Website, you agree to these Terms. If you do not agree, do not use the Website.
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              We may update these Terms at any time by posting the revised version on the Website. Your continued use of the Website after any update constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* 2. Website Use */}
          <section id="website-use" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">2. Website Use</h2>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Permitted Use</h3>
            <p className="text-foreground leading-relaxed">
              You may access and view content on the Website for informational and recruiting purposes only, and only in compliance with these Terms and applicable law. The Website is intended for users who are at least 18 years old.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Prohibited Activities</h3>
            <p className="text-foreground leading-relaxed">When using the Website, you agree not to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Use the Website in any manner that could disable, damage, overburden, or impair the Website</li>
              <li>Attempt to gain unauthorized access to any portion of the Website or to any systems or networks connected to the Website</li>
              <li>Use any automated means (e.g., scraping, bots, spiders) or interface not provided by us to access the Website or extract data</li>
              <li>Upload, transmit, or introduce malware, viruses, or other malicious code</li>
              <li>Interfere with or disrupt the integrity or performance of the Website</li>
              <li>Copy, modify, distribute, sell, lease, or create derivative works from any portion of the Website except as expressly permitted by these Terms</li>
              <li>Use the Website to submit false or misleading information, including in any form submissions</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Submissions and Forms</h3>
            <p className="text-foreground leading-relaxed">
              If you submit information through the Website (including career or referral forms), you represent that the information is accurate and that you have the right to provide it. Do not submit sensitive personal information or protected health information (PHI) through the Website unless a form explicitly requests it and indicates it will be handled accordingly.
            </p>
          </section>

          {/* 3. Intellectual Property */}
          <section id="intellectual-property" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">3. Intellectual Property</h2>
            <p className="text-foreground leading-relaxed">
              All content on the Website—including text, graphics, logos, images, videos, design elements, and software—is owned by LOGIC or our licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              Nothing in these Terms grants you any right to use any of our trademarks, logos, domain names, or other distinctive brand features without our prior written consent. You may not reproduce, redistribute, sell, create derivative works from, decompile, reverse engineer, or disassemble any portion of the Website except as expressly permitted by law or with our prior written permission.
            </p>
          </section>

          {/* 4. Privacy */}
          <section id="privacy" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">4. Privacy</h2>
            <p className="text-foreground leading-relaxed">
              Our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> describes how we collect, use, and share information when you use our Website. By using the Website, you consent to the collection and use of information as described in our Privacy Policy.
            </p>
          </section>

          {/* 5. Cookies and Tracking */}
          <section id="cookies" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">5. Cookies and Tracking</h2>
            <p className="text-foreground leading-relaxed">
              We use cookies and similar technologies to enhance your experience on our Website. You can set your browser to refuse all or some browser cookies, but some parts of the Website may not function properly if you disable cookies.
            </p>
          </section>

          {/* 6. Links to Third-Party Websites */}
          <section id="third-party" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">6. Links to Third-Party Websites</h2>
            <p className="text-foreground leading-relaxed">
              Our Website may contain links to third-party websites that are not owned or controlled by LOGIC. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. Access third-party sites at your own risk and review their terms and policies.
            </p>
          </section>

          {/* 7. International Users */}
          <section id="international" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">7. International Users</h2>
            <p className="text-foreground leading-relaxed">
              The Website is operated from the United States. If you access the Website from outside the United States, you understand that your information may be transferred to, stored, and processed in the United States and other jurisdictions that may not provide the same data protection laws as your country of residence.
            </p>
          </section>

          {/* 8. Disclaimers */}
          <section id="disclaimers" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">8. Disclaimers</h2>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">No Warranties</h3>
            <p className="text-foreground leading-relaxed uppercase text-sm">
              THE WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, AND SERVICES MADE AVAILABLE THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOGIC DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Not Medical Advice</h3>
            <p className="text-foreground leading-relaxed">
              The Website content is for general informational purposes only and is not medical advice. The Website is not intended to create a provider-patient relationship or to substitute for professional medical advice, diagnosis, or treatment. If you believe you have a medical emergency, call 911 (or your local emergency number).
            </p>
          </section>

          {/* 9. Limitation of Liability */}
          <section id="limitation" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">9. Limitation of Liability</h2>
            <p className="text-foreground leading-relaxed uppercase text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL LOGIC OR ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, CONTRACTORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO YOUR USE OF (OR INABILITY TO USE) THE WEBSITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p className="text-foreground leading-relaxed uppercase text-sm mt-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOGIC'S TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE WEBSITE OR THESE TERMS WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100).
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              (Some jurisdictions do not allow certain limitations of liability, so some of the above may not apply to you.)
            </p>
          </section>

          {/* 10. Indemnification */}
          <section id="indemnification" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">10. Indemnification</h2>
            <p className="text-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless LOGIC and its officers, directors, employees, contractors, agents, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your use of the Website; (b) your violation of these Terms; or (c) your violation of any applicable law or the rights of a third party.
            </p>
          </section>

          {/* 11. Governing Law; Venue */}
          <section id="governing-law" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">11. Governing Law; Venue</h2>
            <p className="text-foreground leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of the State of Texas, without regard to conflict of law principles.
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              Any dispute arising out of or relating to these Terms or the Website will be brought exclusively in the state or federal courts located in Travis County, Texas, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          {/* 12. Contact Information */}
          <section id="contact" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">12. Contact Information</h2>
            <p className="text-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <address className="not-italic bg-slate-50 rounded-lg p-4 mt-4 text-foreground">
              LOGIC Health Management<br />
              5900 BALCONES DR STE 100<br />
              AUSTIN, TX 78731<br />
              United States<br />
              Email: <a href="mailto:legal@logichm.com" className="text-primary hover:underline">legal@logichm.com</a>
            </address>
          </section>

          {/* 13. Severability */}
          <section id="severability" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">13. Severability</h2>
            <p className="text-foreground leading-relaxed">
              If any provision of these Terms is held to be unlawful, void, or unenforceable, that provision will be deemed severable and will not affect the validity and enforceability of the remaining provisions.
            </p>
          </section>

          {/* 14. Entire Agreement */}
          <section id="entire-agreement" className="mb-10 scroll-mt-8">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">14. Entire Agreement</h2>
            <p className="text-foreground leading-relaxed">
              These Terms constitute the entire agreement between you and LOGIC regarding your use of the Website and supersede any prior or contemporaneous understandings on that subject.
            </p>
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
