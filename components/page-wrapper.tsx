import { Separator } from "./ui/separator"

export default function PageWrapper({
  title,
  children,
  separator,
}: {
  title: string
  children: React.ReactNode
  separator?: boolean
}) {
  return (
    <div className="w-full space-y-4">
      {separator ? <Separator /> : null}
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children}
    </div>
  )
}
