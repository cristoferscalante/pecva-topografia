export async function GET() {
  return Response.json(
    {
      ok: true,
      service: "topography-website-design",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}
