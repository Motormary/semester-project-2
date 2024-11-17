import { Separator } from "./ui/separator"

export default function PageWrapper({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full space-y-4">
      <Separator />
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children}
    </div>
  )
}
