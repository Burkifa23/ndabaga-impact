import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { format } from "date-fns"

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single()

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image
          src={post.image_url || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-16 md:pb-14 max-w-5xl mx-auto w-full">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          {post.published_date && (
            <p className="text-gray-300 text-sm font-medium tracking-wide">
              {format(new Date(post.published_date), "MMMM d, yyyy")}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          asChild
          variant="ghost"
          className="mb-10 -ml-4 text-gray-500 hover:text-black hover:bg-transparent"
        >
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {post.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium border-l-4 border-black pl-6">
            {post.excerpt}
          </p>
        )}

        <div className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-p:leading-relaxed">
          {post.content.split("\n\n").map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
