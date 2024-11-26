import RegisterCard from "@/components/auth/register/register-form"
import { Separator } from "@/components/ui/separator"

export default async function RegisterPage() {
  return (
    <div className="w-full space-y-4">
      <Separator />
      <RegisterCard />
    </div>
  )
}
