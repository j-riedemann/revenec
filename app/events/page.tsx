"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function CreateEvent(){

  const [assetId,setAssetId] = useState("")
  const [event,setEvent] = useState("")
  const [actor,setActor] = useState("")
  const [description,setDescription] = useState("")

  const createEvent = async () => {

  // buscar asset usando passport_id
  const { data:asset } = await supabase
    .from("assets")
    .select("*")
    .ilike("passport_id", assetId.trim())
    .single()

  if(!asset){
    alert("Asset not found")
    return
  }

  // insertar evento usando UUID del asset
  const { error } = await supabase
    .from("events")
    .insert([
      {
        asset_id: asset.id,
        event_type: event,
        actor: actor,
        description: description
      }
    ])

  if(error){
    alert(error.message)
  } else {
    alert("Event created!")
  }

}

  return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold mb-6">
          Add Lifecycle Event
        </h1>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Passport ID"
          onChange={(e)=>setAssetId(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Event type"
          onChange={(e)=>setEvent(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Actor"
          onChange={(e)=>setActor(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-5"
          placeholder="Description"
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button
          onClick={createEvent}
          className="w-full bg-black text-white p-2 rounded"
        >
          Add Event
        </button>

      </div>

    </div>

  )
}