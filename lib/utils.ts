import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function removeEmptyObjValues(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null),
  )
}
