import { Briefcase } from "lucide-react"

export const metadata = {
  title: "Careers | Ndabaga Impact",
  description: "Join our team and help us make a lasting impact.",
}

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Briefcase className="h-16 w-16 mx-auto text-black mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Careers</h1>
        <p className="text-xl text-gray-600 mb-12">
          We are always looking for passionate individuals who share our vision for empowering youth and building sustainable communities.
        </p>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Open Positions</h2>
          <p className="text-gray-600 mb-8">
            There are currently no open positions. However, you can always reach out to us or check back later!
          </p>
          <a href="/#contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
