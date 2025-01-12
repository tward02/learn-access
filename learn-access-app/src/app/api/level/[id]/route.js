export async function GET(request, { params }) {
    const id = (await params).id
    return Response.json({ "message": "this is working: " + id })
}