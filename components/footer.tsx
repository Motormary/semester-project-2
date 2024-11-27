import { ChevronUp } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-white px-4 text-center dark:bg-background border-t text-sm">
      <Link className="flex py-3 w-full items-center justify-center border-b" href="#">
        To top <ChevronUp className="inline-block" />
      </Link>
      <p className="py-8">Copyright EBOX 2024</p>
    </footer>
  )
}
