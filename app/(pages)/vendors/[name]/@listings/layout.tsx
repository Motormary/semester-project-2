import { Card } from "@/components/ui/card"

type props = {
  children: React.ReactNode
}

export default async function Page({ children }: props) {
  return <Card className="w-full h-full p-4 xs:has-[.listings]:rounded-tl-none">{children}</Card>
}
