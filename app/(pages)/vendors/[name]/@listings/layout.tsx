import { Card } from "@/components/ui/card"

type props = {
  children: React.ReactNode
}

export default async function Page({ children }: props) {
  return <Card className="w-full rounded-tl-none h-full p-4">{children}</Card>
}
