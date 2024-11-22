
type props = {
  children: React.ReactNode
}

export default async function Page({ children }: props) {
  return <div className="w-full h-full p-4 bg-card rounded-tr-md rounded-b-md">{children}</div>
}
