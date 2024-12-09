import { getCurrentUser } from "@/app/actions/user/get"
import RegisterCard from "@/components/auth/register/register-form"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "EBOX",
  description: "Sign up and start BOXing your items!",
}

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
