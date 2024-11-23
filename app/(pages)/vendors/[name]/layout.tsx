import { ProfileNav } from "@/components/profile/profile-nav"



type props = {
  children: React.ReactNode
  listings: React.ReactNode
}

export default function Layout({ children, listings }: props) {
  return (
    <div className="sm:flex max-sm:space-y-4 w-full gap-4 pb-8">
      {children}
      <div className="w-full">
        <aside>
          <ProfileNav />
        </aside>
        {listings}
      </div>
    </div>
  )
}
