import { Card } from "@/components/ui/card"
import ProfileListingSearch from "@/components/ui/profile-listing-search-bar"

type props = {
  children: React.ReactNode
}

export default function ListingWrapper({ children }: props) {
  return (
    <Card className="h-full w-full space-y-4 p-4 xs:has-[.listings]:rounded-tl-none [&>.listings]:has-[[data-pending]]:animate-pulse">
      <ProfileListingSearch />
      <section id="listings" className="flex flex-wrap">
        {children}
      </section>
    </Card>
  )
}
