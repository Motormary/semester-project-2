"use client"
import React, { useActionState } from "react"
import { signup } from "./action"

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, null)
  return (
    <form
      className="flex gap-6 flex-col p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      action={action}>
      <div className="flex flex-col gap-1">
        <label className="text-white font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-400 text-black w-96"
          type="text"
          name="name"
          id="name"
        />
          <p className="text-red-500 text-sm">{state?.errors?.name ? state.errors.name : ""}</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-400 text-black w-96"
          type="text"
          name="email"
          id="email"
        />
          <p className="text-red-500 text-sm">{state?.errors?.email ? state.errors.email : ""}</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-400 text-black w-96"
          type="password"
          name="password"
          id="password"
        />
          <p className="text-red-500 text-sm">{state?.errors?.password ? state.errors.password : ""}</p>
      </div>

      <button
        className={`mt-4 p-2 rounded-md text-white font-semibold ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-slate-700 hover:bg-slate-800"
        }`}
        disabled={pending}
        type="submit">
        {pending ? "Submitting..." : "Sign up"}
      </button>
    </form>
  )
}
