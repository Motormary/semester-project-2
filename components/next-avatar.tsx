import { cn } from "@/lib/utils"
import Image from "next/image"

interface AvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export default function Avatar({
  src,
  alt,
  size = 64,
  className,
}: AvatarProps) {
  return (
    <div className="aspect-square overflow-hidden rounded-full">
      <Image
        loading="eager"
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(className, "h-full w-full object-cover")}
      />
    </div>
  )
}
