import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Ndabaga Impact",
  description:
    "Learn how Ndabaga Impact collects, uses, and protects your personal information when you interact with our platform, programs, and services.",
}

const LAST_UPDATED = "August 1, 2026"
const CONTACT_EMAIL = "privacy@ndabagaimpact.org"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-black text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            We believe in radical transparency. This document explains exactly what data we collect,
            why we collect it, and how we protect it.
          </p>
          <p className="mt-6 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar TOC */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">On this page</p>
              <nav className="space-y-1">
                {[
                  ["information-we-collect", "1. Information We Collect"],
                  ["how-we-use", "2. How We Use It"],
                  ["sharing", "3. Sharing of Information"],
                  ["retention", "4. Data Retention"],
                  ["security", "5. Data Security"],
                  ["your-rights", "6. Your Rights"],
                  ["cookies", "7. Cookies"],
                  ["third-party", "8. Third-Party Links"],
                  ["children", "9. Children's Privacy"],
                  ["changes", "10. Changes to This Policy"],
                  ["contact", "11. Contact Us"],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-sm text-gray-500 hover:text-black transition-colors py-1 border-l-2 border-transparent hover:border-black pl-3"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 min-w-0 space-y-6">
            {/* Intro */}
            <div className="bg-white rounded-2xl border p-8 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                Ndabaga Impact (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is a Rwandan youth-led nonprofit
                organization committed to empowering young people through digital skills, mentorship,
                and community-centered innovation. This Privacy Policy describes how we collect, use,
                and protect the personal information of individuals who visit our website, participate
                in our programs, donate to our cause, or otherwise interact with us.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                By using our website or services, you agree to the practices described in this
                policy. If you do not agree, please discontinue use of our platform.
              </p>
            </div>

            {/* Section 1 */}
            <div id="information-we-collect" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>We collect information you provide directly to us and information automatically collected when you use our platform.</p>
                <div>
                  <p className="font-semibold mb-2">Information you provide:</p>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    <li><strong>Contact information</strong> &mdash; your name, email address, phone number, and postal address when you fill out our contact form, volunteer application, or donation form.</li>
                    <li><strong>Volunteer application details</strong> &mdash; skills, experience, motivation, and availability submitted through our volunteer portal.</li>
                    <li><strong>Donation records</strong> &mdash; donor name, amount pledged, currency, and donation method (e.g., mobile money, bank transfer, in-kind). We do not store payment credentials on our servers.</li>
                    <li><strong>Communications</strong> &mdash; messages you send us through the contact form or by email.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Information collected automatically:</p>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    <li><strong>Usage data</strong> &mdash; pages visited, time spent on the site, referring URLs, and browser/device type.</li>
                    <li><strong>Cookies and similar technologies</strong> &mdash; session cookies necessary for platform functionality and optional analytics cookies (see Section 7).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="how-we-use" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">2. How We Use Your Information</h2>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong>Operate and improve our platform</strong> &mdash; deliver the services you request and troubleshoot technical issues.</li>
                <li><strong>Process volunteer applications</strong> &mdash; review, communicate about, and manage your application to join our programs.</li>
                <li><strong>Acknowledge donations</strong> &mdash; record your pledge, issue acknowledgement communications, and maintain accurate financial records as required by Rwandan non-profit regulations.</li>
                <li><strong>Respond to inquiries</strong> &mdash; reply to messages submitted through our contact form in a timely manner.</li>
                <li><strong>Send program updates</strong> &mdash; share news, impact reports, and event announcements if you have opted in to communications.</li>
                <li><strong>Comply with legal obligations</strong> &mdash; fulfil our duties under applicable Rwandan law and regulatory requirements.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="sharing" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">3. Sharing of Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We do not sell, rent, or trade your personal information. We may share your data only in the following limited circumstances:</p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong>Service providers</strong> &mdash; trusted third-party vendors who help us operate our website and programs (e.g., hosting providers, email delivery services). These parties are contractually bound to handle your data securely and only for the purpose of supporting our services.</li>
                <li><strong>Program partners</strong> &mdash; if your volunteer application is relevant to a specific partner organization, we may share your application details with that partner with your prior knowledge.</li>
                <li><strong>Legal requirements</strong> &mdash; if required by law, court order, or government authority in Rwanda or any applicable jurisdiction.</li>
                <li><strong>Organizational restructuring</strong> &mdash; in the unlikely event of a merger or transfer of our organization&apos;s operations, your data may be transferred as part of that process, subject to this Privacy Policy.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="retention" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">4. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We retain your personal information for as long as is necessary to fulfil the purposes described in this policy, unless a longer retention period is required by law.</p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong>Contact form messages</strong> &mdash; retained for 24 months, then securely deleted.</li>
                <li><strong>Volunteer application data</strong> &mdash; retained for the duration of your engagement with us and for 36 months thereafter.</li>
                <li><strong>Donation records</strong> &mdash; retained for a minimum of 7 years as required by Rwandan financial and non-profit regulations.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">When data is no longer needed, we securely delete or anonymize it.</p>
            </div>

            {/* Section 5 */}
            <div id="security" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We implement reasonable technical and organizational measures to protect your personal information. These include:</p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li>Encrypted data storage and transmission (TLS/HTTPS).</li>
                <li>Role-based access controls that limit internal access to personal data to authorized personnel only.</li>
                <li>Regular review of our data handling practices and vendor security posture.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                While we take data security seriously, no system is completely immune to threats. We encourage you to notify us immediately at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black">{CONTACT_EMAIL}</a>{" "}
                if you believe your data has been compromised.
              </p>
            </div>

            {/* Section 6 */}
            <div id="your-rights" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">6. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You have the following rights regarding your personal data held by Ndabaga Impact:</p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong>Access</strong> &mdash; request a copy of the personal data we hold about you.</li>
                <li><strong>Correction</strong> &mdash; request that we correct any inaccurate or incomplete information.</li>
                <li><strong>Deletion</strong> &mdash; request that we delete your personal data where we have no legal obligation to retain it.</li>
                <li><strong>Withdrawal of consent</strong> &mdash; opt out of marketing communications at any time by clicking &ldquo;Unsubscribe&rdquo; in any email we send, or by contacting us directly.</li>
                <li><strong>Data portability</strong> &mdash; request that we provide your data in a structured, machine-readable format.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise any of these rights, email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline hover:text-black">{CONTACT_EMAIL}</a>.
                We will respond within 30 days.
              </p>
            </div>

            {/* Section 7 */}
            <div id="cookies" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">7. Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Our website uses cookies &mdash; small text files stored in your browser. We use:</p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li><strong>Essential cookies</strong> &mdash; strictly necessary for site functionality (e.g., session management). These cannot be disabled.</li>
                <li><strong>Analytics cookies</strong> &mdash; help us understand how visitors use our site so we can improve it. Analytics data is aggregated and does not identify individuals.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">You can control cookies through your browser settings. Disabling analytics cookies will not affect your ability to use the site.</p>
            </div>

            {/* Section 8 */}
            <div id="third-party" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">8. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites including partner organizations, social media platforms, and resources.
                Once you leave our site, this Privacy Policy no longer applies. We encourage you to review the privacy policies of any
                third-party sites you visit. We are not responsible for the content or privacy practices of external sites.
              </p>
            </div>

            {/* Section 9 */}
            <div id="children" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">9. Children&apos;s Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform is not directed to children under the age of 16. We do not knowingly collect personal information from children.
                If you are a parent or guardian and believe your child has submitted personal information to us without your consent,
                please contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black">{CONTACT_EMAIL}</a>{" "}
                so we can delete it promptly.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Note:</strong> Ndabaga Impact runs youth programs. Participation for individuals under 18 requires parental/guardian
                consent obtained separately through our program enrollment process.
              </p>
            </div>

            {/* Section 10 */}
            <div id="changes" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">10. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements.
                When we make material changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page.
                We encourage you to review this policy periodically. Your continued use of our platform after any changes constitutes
                your acceptance of the updated policy.
              </p>
            </div>

            {/* Section 11 */}
            <div id="contact" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you have any questions, concerns, or requests related to this Privacy Policy or your personal data, please contact us:
              </p>
              <address className="not-italic text-gray-700 space-y-1">
                <p className="font-semibold">Ndabaga Impact</p>
                <p>Kigali, Rwanda</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black font-medium">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </address>
            </div>

            {/* Footer note */}
            <div className="p-6 bg-gray-900 text-white rounded-2xl text-sm">
              <p className="font-semibold mb-1">Questions about this policy?</p>
              <p className="text-gray-400">
                Email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-2 hover:text-gray-300">
                  {CONTACT_EMAIL}
                </a>{" "}
                &mdash; we respond to all privacy inquiries within 30 days.
              </p>
            </div>

            <div className="text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
                ← Back to Home
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
