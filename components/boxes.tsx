import { Box } from "lucide-react"

export default function FloatingBoxes() {
    return (
        <div className="absolute inset-0 left-0 top-1/2 flex justify-evenly flex-wrap z-50">
            <Box className="text-muted"/>
            <Box className="text-muted"/>
            <Box className="text-muted"/>
            <Box className="text-muted"/>
        </div>
    )
}