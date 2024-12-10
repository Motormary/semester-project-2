import ListingWrapper from "@/components/profile/listings-wrapper"
import ProfileInfo from "@/components/profile/profile-info"
import { ProfileNav } from "@/components/profile/profile-nav"
import { ReactNode, Suspense } from "react"
import { ProfileLoading } from "./loading"

type props = {
  params: Promise<{ slug: string[] }>
  children: ReactNode
}

export default async function Layout({
  children,
  params,
}:props) {
  const slugs = await params
  return (
    <div className="flex h-full w-full gap-4 max-sm:flex-col">
      <Suspense fallback={<ProfileLoading />}>
        <ProfileInfo params={slugs} />
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
