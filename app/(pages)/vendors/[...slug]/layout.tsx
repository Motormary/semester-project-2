import ListingWrapper from "@/components/profile/listings-wrapper"
import ProfileInfo from "@/components/profile/profile-info"
import { ProfileNav } from "@/components/profile/profile-nav"
import { ReactNode, Suspense } from "react"
import { ProfileLoading } from "./loading"
import { Metadata } from "next"

type props = {
  params: Promise<{ slug: string[] }>
  children: ReactNode
}
export async function generateMetadata(
  { params }: props,
): Promise<Metadata> {
  const slug = (await params).slug


  if (!slug) {
    return {
      title: 'Profile Not Found',
      description: 'The requested profile could not be found.',
    }
  }

  return {
    title: `${slug[0]} | Profile`,
    description: "Overview for user listings and activity"
  }
}

export default async function Layout({ children, params }: props) {
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
