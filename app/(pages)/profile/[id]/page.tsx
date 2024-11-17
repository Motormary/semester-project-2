export default async function UserPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    console.log("🚀 ~ id:", id)
    return (
        <div>User page</div>
    )
}