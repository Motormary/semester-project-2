import Image from "next/image"
import background from "public/bg5.svg"

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        alt="Background"
        src={background}
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        priority
      />
    </div>
  )
}
