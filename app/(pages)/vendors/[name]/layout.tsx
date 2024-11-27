import { ProfileNav } from "@/components/profile/profile-nav"
import { Suspense } from "react"
import ProfileInfo from "@/components/profile/profile-info"
import ListingWrapper from "@/components/profile/listings-wrapper"
import { ProfileLoading } from "./loading"



type props = {
  children: React.ReactNode
}

export default function Layout({ children}: props) {
  return (
    <div className="flex max-sm:flex-col w-full gap-4 h-full">
      <Suspense fallback={<ProfileLoading />}>
      <ProfileInfo />
      </Suspense>
      <div className="w-full">
        <aside>
          <ProfileNav />
        </aside>
        <ListingWrapper>
        {children}
        </ListingWrapper>
      </div>
    </div>
  )
}
