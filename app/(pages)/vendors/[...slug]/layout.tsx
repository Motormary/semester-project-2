import ListingWrapper from "@/components/profile/listings-wrapper"
import ProfileInfo from "@/components/profile/profile-info"
import { ProfileNav } from "@/components/profile/profile-nav"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import { Suspense } from "react"
import { ProfileError } from "./error"
import { ProfileLoading } from "./loading"

type props = {
  children: React.ReactNode
}

export default function Layout({ children }: props) {
  return (
    <div className="flex h-full w-full gap-4 max-sm:flex-col">
      <Suspense fallback={<ProfileLoading />}>
        <ErrorBoundary errorComponent={ProfileError}>
          <ProfileInfo />
        </ErrorBoundary>
      </Suspense>
      <div className="h-full w-full">
        <aside>
          <ProfileNav />
        </aside>
        <ListingWrapper>{children}</ListingWrapper>
      </div>
    </div>
  )
}
