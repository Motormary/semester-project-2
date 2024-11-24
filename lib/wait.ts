export default async function wait(time: number = 1000): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Resolved"), time))
}
