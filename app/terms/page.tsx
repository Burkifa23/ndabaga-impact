import Link from "next/link"

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-6">Last updated: May 30, 2025</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Ndabaga Impact. These terms and conditions outline the rules and regulations for the use of our
            website.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use
            Ndabaga Impact's website if you do not accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. License to Use Website</h2>
          <p>
            Unless otherwise stated, Ndabaga Impact and/or its licensors own the intellectual property rights for all
            material on this website. All intellectual property rights are reserved.
          </p>
          <p>
            You may view and/or print pages from the website for your own personal use subject to restrictions set in
            these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from the website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>Redistribute content from Ndabaga Impact (unless content is specifically made for redistribution)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions
            relating to our website and the use of this website (including, without limitation, any warranties implied
            by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill).
          </p>
          <p>Nothing in this disclaimer will:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Limit or exclude our or your liability for death or personal injury resulting from negligence</li>
            <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
            <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
            <li>Exclude any of our or your liabilities that may not be excluded under applicable law</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Limitations and Exclusions</h2>
          <p>
            The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a)
            are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in
            relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort
            (including negligence) and for breach of statutory duty.
          </p>
          <p>
            To the extent that the website and the information and services on the website are provided free of charge,
            we will not be liable for any loss or damage of any nature.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <p className="mb-6">Email: info@ndabagaimpact.org</p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-black font-medium hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
