import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default async function BlogPage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_date", { ascending: false })

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            News, impact stories, and updates from across our programs and communities.
          </p>
        </div>

        {!posts || posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 hover:scale-[1.02] h-full flex flex-col">
                  <div className="relative overflow-hidden shrink-0">
                    <Image
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900 hover:bg-white/90 border-none shadow-sm backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {post.published_date && (
                      <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
                        {format(new Date(post.published_date), "MMMM d, yyyy")}
                      </p>
                    )}
                    <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 text-sm font-semibold text-black group-hover:underline underline-offset-2">
                      Read article →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
