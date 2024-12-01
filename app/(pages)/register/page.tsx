import { getCurrentUser } from "@/app/actions/user/get"
import RegisterCard from "@/components/auth/register/register-form"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const { success } = await getCurrentUser()
  if (success) redirect("/")

  return (
    <div className="w-full space-y-4">
      <Separator />
      <RegisterCard />
    </div>
  )
}
