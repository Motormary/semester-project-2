import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-10">
        <h2 className="text-2xl">404</h2>
      <div className="h-20 border-l" />
      <div className="text-center">
        <p className="mb-5">This is not the page you are looking for</p>
        <Button asChild variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
