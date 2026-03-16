import { supabase } from "@/lib/supabase"

export async function GET(request, context) {

  const params = await context.params
  const passportId = params.passport.trim()

  const { data } = await supabase
    .from("assets")
    .select("*")
    .ilike("passport_id", passportId)
    .single()

  if (!data) {
    return Response.json({ error: "not found" })
  }

  const metadata = {
    name: `CircularChain Passport ${data.passport_id}`,
    description: "Digital Product Passport for circular asset",

    attributes: [
      {
        trait_type: "Manufacturer",
        value: data.manufacturer
      },
      {
        trait_type: "Chemistry",
        value: data.chemistry
      },
      {
        trait_type: "Capacity",
        value: data.capacity
      }
    ]
  }

  return Response.json(metadata)

}