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
    <div className="aspect-square overflow-hidden rounded-full group-focus-visible:outline group-hover:outline outline-1 outline-offset-2">
      <Image
        loading="eager"
        src={src}
        alt={alt}
        width={size}
        height={size}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        placeholder="blur"
        className={cn(className, "h-full w-full object-cover")}
      />
    </div>
  )
}
