import { SidebarNav } from "@/components/profile/sidebar-nav"



type props = {
  children: React.ReactNode
  listings: React.ReactNode
}

export default function Layout({ children, listings }: props) {
  return (
    <div className="sm:flex w-full gap-4 pb-8">
      {children}
      <div className="w-full">
        <aside>
          <SidebarNav />
        </aside>
        {listings}
      </div>
    </div>
  )
}
