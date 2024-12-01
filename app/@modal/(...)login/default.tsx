"use client"

import LoginCard from "@/components/auth/login/login-form"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  function handleChange(state: boolean) {
    if (!state) {
     router.back()
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={handleChange}>
      <DialogContent>
        <DialogTitle className="sr-only">Login modal</DialogTitle>
        <LoginCard
          className="border-none bg-transparent shadow-none"
          closeModal={handleChange}
        />
      </DialogContent>
    </Dialog>
  )
}
