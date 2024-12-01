"use client"

import LoginCard from "@/components/auth/login/login-form"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  function handleChange(state: boolean) {
    if (!state) {
      setOpen(state)
      router.back()
    }
    setOpen(state)
  }
  // Todo: Double check state handling
  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent>
        <DialogTitle className="sr-only">Login modal</DialogTitle>
        <LoginCard className="border-none shadow-none" closeModal={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
