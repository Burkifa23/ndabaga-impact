import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function BlogPage() {
  const categories = ["All", "Impact Stories", "Insights", "Youth Voices", "Innovation"]

  const articles = [
    {
      title: "How Digital Skills Training Transformed Rural Communities",
      excerpt:
        "Discover how our remote skills labs are bridging the digital divide and creating opportunities in rural Rwanda.",
      category: "Impact Stories",
      author: "Marie Uwimana",
      date: "2024-01-15",
      image: "/placeholder.svg?height=300&width=400&text=Digital+Skills",
      readTime: "5 min read",
    },
    {
      title: "The Future of Youth Leadership in Africa",
      excerpt: "Exploring emerging trends and opportunities for young leaders across the African continent.",
      category: "Insights",
      author: "Jean Baptiste Niyonzima",
      date: "2024-01-12",
      image: "/placeholder.svg?height=300&width=400&text=Youth+Leadership",
      readTime: "8 min read",
    },
    {
      title: "From Farm to Tech: A Young Entrepreneur's Journey",
      excerpt: "Meet Grace, who used agricultural training to build a successful agri-tech startup.",
      category: "Youth Voices",
      author: "Grace Mukamana",
      date: "2024-01-10",
      image: "/placeholder.svg?height=300&width=400&text=Entrepreneur+Journey",
      readTime: "6 min read",
    },
    {
      title: "Innovation in Community Health: Youth-Led Solutions",
      excerpt: "How young health advocates are creating innovative solutions for community wellness.",
      category: "Innovation",
      author: "Dr. Samuel Nkurunziza",
      date: "2024-01-08",
      image: "/placeholder.svg?height=300&width=400&text=Health+Innovation",
      readTime: "7 min read",
    },
    {
      title: "Building Sustainable Agriculture Through Youth Engagement",
      excerpt: "The role of young farmers in promoting sustainable agricultural practices in Rwanda.",
      category: "Impact Stories",
      author: "Alice Mukamana",
      date: "2024-01-05",
      image: "/placeholder.svg?height=300&width=400&text=Sustainable+Agriculture",
      readTime: "4 min read",
    },
    {
      title: "Digital Transformation: Lessons from the Field",
      excerpt: "Key insights from implementing digital solutions in rural communities.",
      category: "Insights",
      author: "Patrick Niyonshuti",
      date: "2024-01-03",
      image: "/placeholder.svg?height=300&width=400&text=Digital+Transformation",
      readTime: "9 min read",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Our Online Magazine</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stories of impact, insights from the field, and voices of the youth who are shaping Rwanda's future.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "bg-black text-white hover:bg-gray-800" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Article */}
          <Card className="mb-16 overflow-hidden bg-black text-white border-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <Badge className="bg-white/20 text-white w-fit mb-4">Featured Story</Badge>
                <h2 className="text-3xl font-bold mb-4">{articles[0].title}</h2>
                <p className="text-lg opacity-90 mb-6">{articles[0].excerpt}</p>
                <div className="flex items-center gap-4 mb-6 text-sm opacity-80">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {articles[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(articles[0].date).toLocaleDateString()}
                  </div>
                </div>
                <Button className="bg-white text-black hover:bg-gray-100 w-fit">
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative min-h-[400px]">
                <Image
                  src={articles[0].image || "/placeholder.svg"}
                  alt={articles[0].title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Card>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">{article.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-gray-50 transition-colors">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
