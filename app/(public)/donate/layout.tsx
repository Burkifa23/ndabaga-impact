import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Donate | Ndabaga Impact",
  description: "Support our mission to empower youth and create sustainable impact in Rwanda.",
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
