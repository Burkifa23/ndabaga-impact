import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Ndabaga Impact",
  description:
    "Read the Terms of Service governing your use of the Ndabaga Impact website, programs, and donation platform.",
}

const LAST_UPDATED = "August 1, 2026"
const CONTACT_EMAIL = "legal@ndabagaimpact.org"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-black text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Please read these terms carefully before using our platform. They govern your use of our
            website, programs, volunteer portal, and donation services.
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
                  ["acceptance", "1. Acceptance of Terms"],
                  ["about-us", "2. About Ndabaga Impact"],
                  ["eligibility", "3. Eligibility"],
                  ["conduct", "4. Acceptable Use"],
                  ["volunteers", "5. Volunteer Applications"],
                  ["donations", "6. Donations"],
                  ["ip", "7. Intellectual Property"],
                  ["third-party", "8. Third-Party Links"],
                  ["disclaimers", "9. Disclaimers"],
                  ["liability", "10. Limitation of Liability"],
                  ["indemnification", "11. Indemnification"],
                  ["governing-law", "12. Governing Law"],
                  ["changes", "13. Changes to These Terms"],
                  ["contact", "14. Contact Information"],
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
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between
                you and <strong>Ndabaga Impact</strong>, a nonprofit youth empowerment organization
                registered in Rwanda. These Terms govern your access to and use of our website,
                volunteer portal, donation platform, and related services.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                If you are using our platform on behalf of an organization, you represent that you
                have the authority to bind that organization to these Terms.
              </p>
            </div>

            {/* Section 1 */}
            <div id="acceptance" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using the Ndabaga Impact website, participating in our programs,
                submitting a volunteer application, or making a donation, you agree to be bound by
                these Terms and our Privacy Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you do not agree with any part of these Terms, you must not use our platform or
                services. We reserve the right to update these Terms at any time. Continued use of
                the platform after changes are posted constitutes your acceptance of the revised Terms.
              </p>
            </div>

            {/* Section 2 */}
            <div id="about-us" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">2. About Ndabaga Impact</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ndabaga Impact is a nonprofit youth-led organization registered in Rwanda. Our mission
                is to empower young people through digital skills training, mentorship,
                entrepreneurship support, and community-centered programs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms govern your access to and use of our public website, volunteer application
                portal, donation platform, blog, event listings, and any other services we offer
                (collectively, &ldquo;Services&rdquo;).
              </p>
            </div>

            {/* Section 3 */}
            <div id="eligibility" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">3. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Use of our Services is permitted to individuals who are 16 years of age or older. If
                you are under 18, you must have the consent of a parent or legal guardian to use our
                Services, submit applications, or participate in our programs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our Services, you represent and warrant that you meet these eligibility
                requirements. If you do not meet them, you must not access or use our platform.
              </p>
            </div>

            {/* Section 4 */}
            <div id="conduct" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">4. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use our platform only for lawful purposes and in a way that does not
                infringe the rights of others. You must not:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li>Use our platform to transmit unsolicited or unauthorized advertising or promotional materials (spam).</li>
                <li>Attempt to gain unauthorized access to any part of our platform, its servers, or connected systems.</li>
                <li>Introduce any viruses, trojans, worms, or other malicious code.</li>
                <li>Reproduce, duplicate, copy, sell, or resell any portion of our platform without express written permission.</li>
                <li>Post or transmit content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.</li>
                <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity.</li>
                <li>Scrape, crawl, or index our platform using automated tools without prior written consent.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We reserve the right to suspend or terminate access to any user who violates these conduct standards.
              </p>
            </div>

            {/* Section 5 */}
            <div id="volunteers" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">5. Volunteer Applications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you submit a volunteer application through our platform, you agree that:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li>The information you provide is accurate, complete, and current to the best of your knowledge.</li>
                <li>Providing false or misleading information is grounds for immediate rejection or termination of any volunteer engagement.</li>
                <li>Submission of an application does not guarantee acceptance. Acceptance decisions are made at the sole discretion of Ndabaga Impact.</li>
                <li>Ndabaga Impact reserves the right to reject any application without providing a reason.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Volunteers who are accepted into programs agree to abide by separate program-specific codes of conduct
                communicated at the time of onboarding.
              </p>
            </div>

            {/* Section 6 */}
            <div id="donations" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">6. Donations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All donations made through our platform are voluntary contributions to support the mission of Ndabaga Impact.
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li>
                  <strong>Non-refundability</strong> &mdash; All donations are final. We do not issue refunds except in the case of
                  confirmed technical errors resulting in duplicate charges. To request a review, contact us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black">{CONTACT_EMAIL}</a>{" "}
                  within 14 days of the transaction.
                </li>
                <li>
                  <strong>Pledge intent</strong> &mdash; Submitting a donation form on our platform constitutes a pledge.
                  Ndabaga Impact staff may follow up to facilitate the transfer through your selected payment method.
                </li>
                <li>
                  <strong>Tax receipts</strong> &mdash; Ndabaga Impact is a registered nonprofit in Rwanda. We will provide
                  official acknowledgement of your donation upon request. Tax deductibility depends on your jurisdiction
                  and applicable tax laws.
                </li>
                <li>
                  <strong>Use of funds</strong> &mdash; Donations are used to fund our programs, operations, and
                  organizational development in accordance with our stated mission. We publish annual impact reports.
                </li>
                <li>
                  <strong>In-Kind donations</strong> &mdash; Donated goods or services are subject to valuation and
                  acceptance at our discretion. We reserve the right to decline in-kind donations that do not align
                  with our program needs.
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div id="ip" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on our platform &mdash; including text, graphics, logos, images, videos, and software &mdash;
                is the property of Ndabaga Impact or its content licensors and is protected by applicable intellectual
                property laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are granted a limited, non-exclusive, non-transferable license to access and view our content for
                personal, non-commercial purposes only. You must not:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li>Copy, reproduce, or redistribute our content without written permission.</li>
                <li>Use our logos, branding, or trademarks without prior written consent.</li>
                <li>Create derivative works based on our platform content.</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div id="third-party" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">8. Third-Party Links &amp; Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform may contain links to third-party websites, resources, or partner organizations.
                These links are provided for informational purposes only. Ndabaga Impact does not endorse and is not
                responsible for the content, privacy practices, or services of any third-party sites. Your interactions
                with third-party services are governed by those parties&apos; own terms and policies.
              </p>
            </div>

            {/* Section 9 */}
            <div id="disclaimers" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">9. Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform and services are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis.
                Ndabaga Impact makes no warranties, express or implied, regarding:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li>The accuracy, completeness, or timeliness of any content on the platform.</li>
                <li>The uninterrupted or error-free operation of our platform.</li>
                <li>The results that may be obtained from using our services or programs.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To the maximum extent permitted by applicable law, Ndabaga Impact disclaims all implied warranties,
                including warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </div>

            {/* Section 10 */}
            <div id="liability" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">10. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, Ndabaga Impact and its officers, directors,
                employees, volunteers, and agents shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of &mdash; or inability to use &mdash;
                our platform or services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our total aggregate liability for any claim arising under these Terms shall not exceed RWF&nbsp;10,000
                or the equivalent amount you donated, whichever is applicable.
              </p>
            </div>

            {/* Section 11 */}
            <div id="indemnification" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">11. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Ndabaga Impact and its officers, directors,
                employees, volunteers, and agents from and against any claims, liabilities, damages, losses, costs,
                or expenses (including reasonable legal fees) arising out of or related to:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2 text-gray-700 leading-relaxed">
                <li>Your violation of these Terms.</li>
                <li>Your use of our platform or services.</li>
                <li>Your violation of any third-party rights, including intellectual property or privacy rights.</li>
                <li>Any content you submit to or through our platform.</li>
              </ul>
            </div>

            {/* Section 12 */}
            <div id="governing-law" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">12. Governing Law &amp; Disputes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms are governed by and construed in accordance with the laws of Rwanda, without regard
                to its conflict of law provisions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any dispute arising from or relating to these Terms or your use of our platform shall first be
                attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be
                submitted to the competent courts of Rwanda.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are a user located outside Rwanda, you agree that the laws of Rwanda govern this agreement
                and that you submit to the jurisdiction of its courts.
              </p>
            </div>

            {/* Section 13 */}
            <div id="changes" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">13. Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. When we make material changes, we will
                update the &ldquo;Last Updated&rdquo; date at the top of this page. Your continued use of the platform
                following the posting of revised Terms constitutes your acceptance of the changes. If you do not
                agree to the revised Terms, you must stop using our platform and services.
              </p>
            </div>

            {/* Section 14 */}
            <div id="contact" className="bg-white rounded-2xl border p-8 shadow-sm scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-5">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms, or wish to report a violation, please contact us:
              </p>
              <address className="not-italic text-gray-700 space-y-1">
                <p className="font-semibold">Ndabaga Impact &mdash; Legal</p>
                <p>Kigali, Rwanda</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-black font-medium">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </address>
            </div>

            {/* Plain-language summary */}
            <div className="bg-gray-100 rounded-2xl p-8 border">
              <h3 className="font-bold text-gray-900 mb-3 text-base">Summary (plain language)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Use the platform lawfully and in good faith.</li>
                <li>✓ Be honest on volunteer applications and contact forms.</li>
                <li>✓ Donations are final and support our mission.</li>
                <li>✓ Our content is protected &mdash; don&apos;t copy or redistribute it without permission.</li>
                <li>✓ We&apos;re not liable for unexpected downtime or third-party service issues.</li>
                <li>✓ These Terms are governed by Rwandan law.</li>
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                This summary is for convenience only. The full sections above are legally binding.
              </p>
            </div>

            {/* Footer note */}
            <div className="p-6 bg-gray-900 text-white rounded-2xl text-sm">
              <p className="font-semibold mb-1">Legal questions or concerns?</p>
              <p className="text-gray-400">
                Email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-2 hover:text-gray-300">
                  {CONTACT_EMAIL}
                </a>{" "}
                &mdash; we are committed to resolving any issues in a fair and timely manner.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-black transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>
              <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                ← Back to Home
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
