import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-96 w-full items-center justify-center gap-6">
      <h2>404</h2>
      <Separator decorative orientation="vertical" className="h-16" />
      <div className="flex flex-col items-center gap-2">
        <p className="mb-5">This is not the page you are looking for</p>
        <Button asChild variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
