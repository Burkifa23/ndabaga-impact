import { createClient } from "@/lib/supabase/server"
import GalleryClient from "./gallery-client"

export default async function AdminGalleryPage() {
  const supabase = createClient()

  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })

  return <GalleryClient initialImages={images || []} />
}
