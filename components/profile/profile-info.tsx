type props = {
  id: string
}

export default async function ProfileInfo({ id }: props) {
  console.log(id)
  return <div>Profile</div>
}
