import { EditUserSchema, TYPE_USER_EDIT } from "@/lib/definitions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleErrors } from "@/lib/handle-errors"
import updateUser from "@/app/actions/user/patch"
import { Textarea } from "../ui/textarea"
import { DialogFooter, DialogTrigger } from "../ui/dialog"
import { useTransition } from "react"
import { RefreshCcw } from "lucide-react"
import { toast } from "sonner"

type props = {
  closeModal: (state: boolean) => void
  userData: TYPE_USER_EDIT
}

export default function EditForm({ userData, closeModal }: props) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<TYPE_USER_EDIT>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      bio: userData.bio ?? "",
      avatar: userData.avatar,
    },
  })

  function onSubmit(formData: TYPE_USER_EDIT) {
    startTransition(async () => {
      const { error, source, success } = await updateUser(formData)

      if (!success) handleErrors<TYPE_USER_EDIT>(error, source, form)
      if (success) {
        toast.success("Profile updated")
        closeModal(false)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                {field.value ? field.value.length : "0"} / 160
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar.url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="gap-4">
          <DialogTrigger asChild>
            <Button variant="outline" onCanPlay={(e) => e.preventDefault()}>
              Close
            </Button>
          </DialogTrigger>
          <Button disabled={isPending} type="submit">
            {isPending ? <RefreshCcw className="size-5 animate-spin min-w-10" /> : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
