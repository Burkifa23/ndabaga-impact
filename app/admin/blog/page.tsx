import { createClient } from "@/lib/supabase/server"
import BlogPostsClient from "./blog-posts-client"

export default async function AdminBlogPage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  return <BlogPostsClient initialPosts={posts || []} />
}
