import { TYPE_META } from "@/lib/definitions"

type props = {
  meta: TYPE_META
}

export default function ListingResults({ meta }: props) {
    return (
        <div className="w-full text-center">
        <small className="text-muted-foreground">
          {meta.totalCount} {meta.totalCount === 1 ? "result" : "results"}
        </small>
      </div>
    )
}
