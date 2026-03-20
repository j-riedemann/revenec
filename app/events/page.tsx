"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { registerOnBlockchain } from "../../lib/contract"
import GoogleMapView from "../../components/GoogleMapView"

export default function EventsPage(){

  const [assetId,setAssetId] = useState("")
  const [event,setEvent] = useState("")
  const [actor,setActor] = useState("")
  const [description,setDescription] = useState("")
  const [loading,setLoading] = useState(false)
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [location, setLocation] = useState("")

  const createEvent = async () => {

  setLoading(true)

  try {

    console.log("EVENT SELECTED:", event)

    // 1️⃣ buscar asset
    const { data:asset } = await supabase
      .from("assets")
      .select("*")
      .ilike("passport_id", assetId.trim())
      .single()

    if(!asset){
      alert("Asset not found")
      setLoading(false)
      return
    }

    // 2️⃣ crear evento
    const { error } = await supabase
      .from("events")
      .insert([
        {
          asset_id: asset.id,
          event_type: event,
          actor,
          description,
          lat,
          lng,
          location,
          timestamp: new Date().toISOString()
        }
      ])

    if(error){
      alert(error.message)
      setLoading(false)
      return
    }

    // 🔥 NORMALIZAR EVENTO
    const normalizedEvent = event?.toLowerCase().trim()

    console.log("NORMALIZED EVENT:", normalizedEvent)

    // 3️⃣ certificación automática + blockchain
    if(normalizedEvent === "second_life" || normalizedEvent === "recycling"){

      console.log("CREATING CERTIFICATE...")

      const hash = crypto.randomUUID()

      const { data:existing } = await supabase
        .from("certificates")
        .select("*")
        .eq("asset_id", asset.id)

      if(!existing || existing.length === 0){

        try {

          const txHash = await registerOnBlockchain(
            asset.passport_id,
            hash
          )

          console.log("Blockchain TX:", txHash)

          await supabase.from("certificates").insert([
            {
              asset_id: asset.id,
              issuer: "Revenec",
              certificate_type: normalizedEvent,
              hash,
              blockchain_tx: txHash
            }
          ])

        } catch (err) {

          console.error("Blockchain error:", err)

          await supabase.from("certificates").insert([
            {
              asset_id: asset.id,
              issuer: "Revenec",
              certificate_type: normalizedEvent,
              hash
            }
          ])

        }

      } else {
        console.log("Certificate already exists")
      }

    } else {
      console.log("Event does NOT trigger certificate")
    }

    alert("Event created successfully!")

    // limpiar
    setAssetId("")
    setActor("")
    setDescription("")
    setEvent("")

  } catch (err) {

    console.error("Unexpected error:", err)
    alert("Something went wrong")

  }

  setLoading(false)
}

useEffect(() => {
  if (!navigator.geolocation) {
    setLat(-33.45)
    setLng(-70.66)
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    },
    (error) => {
      console.log("Location error", error)

      // fallback
      setLat(-33.45)
      setLng(-70.66)
    }
  )
  }, [])


  return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-105">

        <h1 className="text-2xl font-bold mb-6">
          Registrar Evento Ciclo de Vida
        </h1>

        {/* Passport ID */}
        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="ID (ej: BAT-XXX-1234)"
          value={assetId}
          onChange={(e)=>setAssetId(e.target.value)}
        />

        {/* Event selector */}
        <select
          className="w-full border p-3 rounded mb-3"
          value={event}
          onChange={(e)=>setEvent(e.target.value)}
        >
          <option value="">Seleccionar evento</option>
          <option value="diagnosis">Diagnóstico</option>
          <option value="refurbished">Reacondicionamiento</option>
          <option value="second_life">Segunda Vida</option>
          <option value="recycling">Reciclaje</option>
          <option value="out_of_service">Fuera de Servicio</option>
        </select>

        {/* Actor */}
        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Actor"
          value={actor}
          onChange={(e)=>setActor(e.target.value)}
        />

        {/* Description */}
        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Descripción"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

          {/* INPUT PEQUEÑO */}
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Ubicación. Ej: Santiago, Chile"
          onChange={(e)=>setLocation(e.target.value)}
        />

  {/* MAPA */}
  
    <div className="flex-1 rounded-lg overflow-hidden mb-4 h-[250px]">
      {location ? (
        <GoogleMapView location={location} />
      ) : lat && lng ? (
        <GoogleMapView lat={lat} lng={lng} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Obteniendo ubicación...
        </div>
      )}
      
    </div>
  
        {/* Button */}
        <button
          onClick={createEvent}
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Procesando..." : "Registrar"}
        </button>

      </div>

    </div>

  )
}