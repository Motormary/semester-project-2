"use client"

import { Moon, MoonIcon, PcCase, Sun, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="fixed bottom-5 left-5 z-50 rounded-full"
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-md:w-52">
        <DropdownMenuItem
          className="max-md:py-5 max-md:text-xl"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuSeparator className="md:hidden" />
        <DropdownMenuItem
          className="max-md:py-5 max-md:text-xl"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator className="md:hidden" />
        <DropdownMenuItem
          className="max-md:py-5 max-md:text-xl"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex items-center space-x-1.5 py-0.5 hover:cursor-pointer">
      <button aria-label="light-theme" aria-controls="theme">
        <SunIcon
          onClick={() => setTheme("light")}
          className={cn(
            theme === "light"
              ? "outline-3 bg-primary stroke-secondary outline-offset-0"
              : "text-muted-foreground outline-1 outline-offset-2 outline-muted",
            "h-[16px] w-[32px] rounded-l-full outline",
          )}
        />
      </button>
      <button aria-label="system-theme" aria-controls="theme">
        <PcCase
          onClick={() => setTheme("system")}
          className={cn(
            theme === "system"
              ? "outline-3 bg-primary stroke-secondary outline-offset-0"
              : "text-muted-foreground outline-1 outline-offset-2 outline-muted",
            "h-[16px] w-[32px] outline",
          )}
        />
      </button>
      <button aria-label="dark-theme" aria-controls="theme">
        <MoonIcon
          onClick={() => setTheme("dark")}
          className={cn(
            theme === "dark"
              ? "outline-3 bg-primary stroke-secondary outline-offset-0"
              : "text-muted-foreground outline-1 outline-offset-2 outline-muted",
            "h-[16px] w-[32px] rounded-r-full outline",
          )}
        />
      </button>
    </div>
  )
}
