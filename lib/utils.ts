import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ErrorSource } from "./definitions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function removeEmptyObjValues(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null),
  )
}

export function failedToVerify() {
  return {
    success: false,
    source: ErrorSource.SESSION,
    data: null as any,
    error: "You don't have the authorization to use this feature",
  }
}
