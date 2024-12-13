"use client"

import {
  Monitor,
  Moon,
  MoonIcon,
  Sun,
  SunIcon
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
    <DropdownMenuGroup className="flex items-center space-x-[1px] py-0.5">
      <DropdownMenuItem
        title="Light theme"
        className={cn(
          theme === "light"
            ? "bg-primary hover:bg-primary focus:bg-primary"
            : "hover:bg-primary/70 focus:bg-primary/70",
          "group/light h-5 w-7 rounded-none rounded-l-full p-0 outline outline-1 transition-colors hover:cursor-pointer",
        )}
        onClick={(e) => {
          e.preventDefault()
          setTheme("light")
        }}
        aria-label="light-theme"
        aria-controls="theme"
      >
        <SunIcon
          className={cn(
            theme === "light"
              ? "text-primary-foreground"
              : "group-hover/light:text-primary-foreground group-focus/light:text-primary-foreground",
            "m-auto transition-colors",
          )}
        />
      </DropdownMenuItem>
      <DropdownMenuItem
      title="System theme"
        className={cn(
          theme === "system"
            ? "bg-primary hover:bg-primary focus:bg-primary"
            : "hover:bg-primary/70 focus:bg-primary/70",
          "group/system h-5 w-7 rounded-none p-0 outline outline-1 transition-colors hover:cursor-pointer",
        )}
        onClick={(e) => {
          e.preventDefault()
          setTheme("system")
        }}
        aria-label="system-theme"
        aria-controls="theme"
      >
        <Monitor
          className={cn(
            theme === "system"
              ? "text-primary-foreground"
              : "group-hover/system:text-primary-foreground group-focus/system:text-primary-foreground",
            "m-auto transition-colors",
          )}
        />
      </DropdownMenuItem>
      <DropdownMenuItem
      title="Dark theme"
        className={cn(
          theme === "dark"
            ? "bg-primary hover:bg-primary focus:bg-primary"
            : "hover:bg-primary/70 focus:bg-primary/70",
          "group/dark h-5 w-7 rounded-none rounded-r-full p-0 outline outline-1 transition-colors hover:cursor-pointer",
        )}
        onClick={(e) => {
          e.preventDefault()
          setTheme("dark")
        }}
        aria-label="dark-theme"
        aria-controls="theme"
      >
        <MoonIcon
          className={cn(
            theme === "dark"
              ? "text-primary-foreground"
              : "group-hover/dark:text-primary-foreground group-focus/dark:text-primary-foreground",
            "m-auto transition-colors",
          )}
        />
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}
