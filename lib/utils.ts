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

// Thanks to mr.jippity
export function calculateTimeDifference(endTime: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const difference = end - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
