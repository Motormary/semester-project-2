import { Box } from "lucide-react"

export default function FloatingBoxes() {
  const boxes = Array.from({ length: 14 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 70 + 15,
    rotation: Math.random() * 360,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden max-md:hidden">
      {boxes.map((box, index) => (
        <Box
          key={index}
          className="absolute text-muted-foreground dark:text-muted"
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.size}px`,
            height: `${box.size}px`,
            opacity: 0.2,
            transform: `rotate(${box.rotation}deg)`,
            transition: "all 0.5s ease-in-out",
          }}
        />
      ))}
    </div>
  )
}
