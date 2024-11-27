import LoginCard from "@/components/auth/login/login-form"
import { Separator } from "@/components/ui/separator"

export default async function LoginPage() {
  return (
    <div className="w-full space-y-4">
      <Separator />
      <LoginCard />
    </div>
  )
}
