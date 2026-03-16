"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import QRCode from "react-qr-code"

export default function PassportPage() {

  const params = useParams()
  
  const [asset,setAsset] = useState(null)
  const [events,setEvents] = useState([])
  const [certificate,setCertificate] = useState(null)
  const passportUrl = asset
  ? `${window.location.origin}/passport/${asset.passport_id}`
  : ""

  useEffect(() => {

    const loadAsset = async () => {

      const { data } = await supabase
        .from("assets")
        .select("*")
        .ilike("passport_id", params.id)
        .single()

      setAsset(data)

      if(!data) return

// ahora usamos el UUID del asset
const { data:eventsData } = await supabase
  .from("events")
  .select("*")
  .eq("asset_id", data.id)

setEvents(eventsData || [])

const { data:certificateData } = await supabase
  .from("certificates")
  .select("*")
  .eq("asset_id", data.id)
  .single()

      setCertificate(certificateData)
    }

    loadAsset()

  },[])

  if(!asset){
    return <div style={{padding:40}}>Loading passport...</div>
  }

  return (

  <div className="flex justify-center min-h-screen bg-gray-100 p-10">

    <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

      <h1 className="text-2xl font-bold mb-6">
        Digital Battery Passport
      </h1>

    <div className="flex justify-center mb-6">

     <QRCode
        value={passportUrl}
        size={120}
     />

    </div>

      <div className="mt-4 bg-gray-900 text-white p-5 rounded-xl">

<h2 className="text-lg font-bold mb-2">
CircularChain Digital Passport
</h2>

<p className="text-xl font-semibold">
{asset.passport_id}
</p>

<div className="mt-3 text-sm space-y-1">

<p>Manufacturer: {asset.manufacturer}</p>
<p>Chemistry: {asset.chemistry}</p>
<p>Capacity: {asset.capacity}</p>
<p>State of Health: {asset.state_of_health}</p>

</div>


</div>

<div className="mt-6 border-t pt-4">

  <h2 className="text-xl font-bold mb-2">
    Blockchain Passport
  </h2>

  <p>
    <b>NFT Mint Transaction:</b>
  </p>

  {asset.nft_tx ? (
    <a
      href={`https://sepolia.etherscan.io/tx/${asset.nft_tx}`}
      target="_blank"
      className="text-blue-600 underline"
    >
      View on Blockchain
    </a>
  ) : (
    <p className="text-gray-500">
      NFT not minted
    </p>
  )}

</div>

<div className="mt-2 text-green-600 font-semibold">
✔ Blockchain Verified
</div>

      <h2 className="text-xl font-bold mt-6">
      Lifecycle Events
      </h2>

      <div className="mt-4 space-y-4">

{events.map((event)=>(

<div key={event.id} className="flex items-start">

<div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3"></div>

<div>

<p className="font-semibold">
{event.event_type}
</p>

<p className="text-sm text-gray-600">
{event.description}
</p>

<p className="text-sm text-gray-500">
Actor: {event.actor}
</p>

<p className="text-sm text-gray-500">
{new Date(event.timestamp).toLocaleDateString()}
</p>

</div>

</div>

))}

</div>



{certificate && (

  <div className="mt-8 border p-4 rounded bg-green-50">

    <h2 className="text-xl font-bold mb-2">
      CircularChain Certificate
    </h2>

    <p>
      <b>Type:</b> {certificate.certificate_type}
    </p>

    <p>
      <b>Issuer:</b> {certificate.issuer}
    </p>

    <p>
      <b>Certificate Hash:</b>

<a
  href={`/verify/${certificate.hash}`}
  className="text-blue-600 underline ml-2"
>
  {certificate.hash}
</a>
    </p>

  </div>

)}

    </div>

  </div>

)

  
}