import LoginCard from "@/components/auth/login/login-form"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "EBOX Login",
  description: "Sign in and start BOXing your items!",
}

export default async function LoginPage() {

  return (
    <div className="w-full space-y-4">
      <Separator />
      <LoginCard />
    </div>
  )
}
