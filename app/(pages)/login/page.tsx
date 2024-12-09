import { getCurrentUser } from "@/app/actions/user/get"
import LoginCard from "@/components/auth/login/login-form"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "EBOX Login",
  description: "Sign in and start BOXing your items!",
}

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
