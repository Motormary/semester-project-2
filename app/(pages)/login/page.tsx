import { getCurrentUser } from "@/app/actions/user/get"
import LoginCard from "@/components/auth/login/login-form"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const { success } = await getCurrentUser()
  if (success) redirect("/")

  return (
    <div className="w-full space-y-4">
      <Separator />
      <LoginCard />
    </div>
  )
}
