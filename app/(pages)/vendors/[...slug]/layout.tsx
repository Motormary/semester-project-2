import ListingWrapper from "@/components/profile/listings-wrapper"
import ProfileInfo from "@/components/profile/profile-info"
import { ProfileNav } from "@/components/profile/profile-nav"
import { Suspense } from "react"
import { ProfileLoading } from "./loading"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string[] }>
}) {
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
