import ListingWrapper from "@/components/profile/listings-wrapper"
import ProfileInfo from "@/components/profile/profile-info"
import { ProfileNav } from "@/components/profile/profile-nav"
import { ReactNode, Suspense } from "react"
import { ProfileLoading } from "./loading"
import { Metadata } from "next"
import { getUser } from "@/app/actions/user/get"

type props = {
  params: Promise<{ slug: string[] }>
  children: ReactNode
}

export async function generateMetadata(
  { params }: props,
): Promise<Metadata> {
  const slug = (await params).slug
  
  const { data, success } = await getUser(slug[0])


  if (!success) {
    return {
      title: 'Profile Not Found',
      description: 'The requested profile could not be found.',
    }
  }

  return {
    title: data.data.name,
    description: data.data?.bio ?? "EBOX user profile, track users activity",
    openGraph: {
      images: [data.data.avatar.url]
    }
  }
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
