import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Volunteer | Ndabaga Impact",
  description: "Join us in empowering youth. Share your time and skills to make a lasting impact.",
}

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
