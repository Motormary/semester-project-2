import RegisterCard from "@/components/auth/register/register-form"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "EBOX",
  description: "Sign up and start BOXing your items!",
}

export default async function RegisterPage() {

  return (
    <section className="w-full space-y-4">
      <Separator />
      <RegisterCard />
    </section>
  )
}
