import { cn } from "@/lib/utils"
import Image from "next/image"

interface AvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export default function Avatar({ src, alt, size = 64, className }: AvatarProps) {
  return (
    <div className="overflow-hidden aspect-square rounded-full">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(className, "object-cover w-full h-full")}
      />
    </div>
  )
}
