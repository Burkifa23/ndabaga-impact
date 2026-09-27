import { Users } from "lucide-react"

export const metadata = {
  title: "Our Team | Ndabaga Impact",
  description: "Meet the dedicated team behind Ndabaga Impact.",
}

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Users className="h-16 w-16 mx-auto text-black mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A passionate group of individuals dedicated to empowering Rwandan youth and creating sustainable community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center p-8 transition-transform hover:-translate-y-1">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden">
                <img src={`/placeholder.svg?height=128&width=128&text=T${i}`} alt="Team Member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Team Member {i}</h3>
              <p className="text-gray-500 font-medium">Core Position</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
