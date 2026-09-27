import { HelpCircle } from "lucide-react"

export const metadata = {
  title: "FAQ | Ndabaga Impact",
  description: "Frequently Asked Questions about Ndabaga Impact's programs and initiatives.",
}

const faqs = [
  {
    question: "What is Ndabaga Impact?",
    answer: "Ndabaga Impact is a Rwandan youth-led organization focused on empowering young people through digital skills, agriculture, and leadership programs to create sustainable community development."
  },
  {
    question: "Who can participate in your programs?",
    answer: "Our programs are generally designed for Rwandan youth aged 16-30 who are passionate about learning and contributing to their communities. Specific requirements may vary by program."
  },
  {
    question: "How can I volunteer with Ndabaga Impact?",
    answer: "You can apply to volunteer by visiting our Volunteer page and submitting the application form. We regularly look for mentors, workshop facilitators, and event coordinators."
  },
  {
    question: "How are the donations used?",
    answer: "100% of public donations go directly towards funding our core programs, including training materials for the digital lab, agricultural supplies for the farming cooperative, and community outreach events."
  },
  {
    question: "Where are you located?",
    answer: "Our headquarters is located in Kigali, Rwanda, but our impact and programs extend to various communities across the country."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <HelpCircle className="h-16 w-16 mx-auto text-black mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our organization and how you can get involved.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group bg-white rounded-xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold text-lg">
                <h2 className="font-medium">{faq.question}</h2>
                <span className="relative size-5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
