import { Card } from "@/components/ui/card"
import ProfileListingSearch from "@/components/ui/search-bar"

type props = {
  children: React.ReactNode
}

export default async function Page({ children }: props) {
  return (
    <Card className="h-full w-full p-4 xs:has-[.listings]:rounded-tl-none space-y-4">
      <ProfileListingSearch />
      {children}
    </Card>
  )
}
