export default function handler(req, res) {
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  res.status(200).json({ text: 'Hello' })
}
