import { ProfileNav } from "@/components/profile/profile-nav"
import { Suspense } from "react"
import Loading from "./_loading"



type props = {
  children: React.ReactNode
  listings: React.ReactNode
}

export default function Layout({ children, listings }: props) {
  return (
    <div className="flex max-sm:flex-col w-full gap-4 h-full">
      <Suspense fallback={<Loading />}>
      {children}
      </Suspense>
      <div className="w-full">
        <aside>
          <ProfileNav />
        </aside>
        {listings}
      </div>
    </div>
  )
}
