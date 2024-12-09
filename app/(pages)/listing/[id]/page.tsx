import getListing from "@/app/actions/listings/get"
import InteractiveListing from "@/components/listing/interactive-listing"
import OtherListings from "@/components/listing/other-listings"
import SimilarListing from "@/components/listing/similar-listings"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { checkAndThrowError } from "@/lib/handle-errors"
import { Metadata } from "next"
import { Suspense } from "react"
import { LoadingInteractive, LoadingOthers } from "./loading"

type props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: props): Promise<Metadata> {
  const id = (await params).id

  const { data, success } = await getListing(id)

  if (!success) {
    return {
      title: "Listing Not Found",
      description: "The requested listing could not be found.",
    }
  }

  return {
    title: data.data.title,
    description: data.data.description,
    authors: {
      name: data.data.seller.name
    },
    openGraph: {
      title: data.data.title,
      tags: data.data.tags,
      description: data.data.description,
      images: [data.data.media?.[0]?.url ?? "/public/logo_filled_white.png"],
    },
  }
}

export default async function ListingPage({ params }: props) {
  const id = (await params).id
  const { data, success, error, source } = await getListing(id)

  if (!success) checkAndThrowError(error, source)

  return (
    <section className="h-fit w-full space-y-4 overflow-hidden">
      <Separator />
      <h1>Listing</h1>
      <Card className="flex flex-col gap-y-6 p-[5%] pb-8 md:p-6 xl:flex-row xl:gap-6">
        <Suspense fallback={<LoadingInteractive />}>
          <InteractiveListing listing={data.data} />
        </Suspense>
        <Separator className="xl:hidden" />
        <Suspense fallback={<LoadingOthers />}>
          <OtherListings
            currentListingId={data.data.id}
            user={data.data.seller.name}
          />
        </Suspense>
      </Card>
      <Suspense fallback={null}>
        <SimilarListing currentListingId={data.data.id} tags={data.data.tags} />
      </Suspense>
    </section>
  )
}
