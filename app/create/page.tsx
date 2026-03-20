"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import { mintPassportNFT } from "../../lib/passportNFT"
import GoogleMapView from "../../components/GoogleMapView"



export default function CreatePassport() {

  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [location, setLocation] = useState("")

  const [type,setType] = useState("")
  const [manufacturer,setManufacturer] = useState("")
  const [responsibleName,setResponsibleName] = useState("")
  const [responsibleRut,setResponsibleRut] = useState("")

  // battery
  const [chemistry,setChemistry] = useState("")
  const [capacity,setCapacity] = useState("")
  const [soh,setSoh] = useState("")

  // solar
  const [panelType,setPanelType] = useState("")
  const [power,setPower] = useState("")

  // tire
  const [size,setSize] = useState("")
  const [material,setMaterial] = useState("")

 const generatePassportId = async (type, responsibleName) => {

  // 🔹 1. prefijo tipo
  const typePrefix = {
    battery: "BAT",
    solar: "SOL",
    tire: "NEU"
  }[type] || "UNK"

  // 🔹 2. prefijo responsable (primeras 3 letras sin espacios)
  const cleanName = responsibleName.replace(/\s+/g, "").toUpperCase()
  const responsiblePrefix = cleanName.substring(0,3)

  // 🔹 3. contar existentes
  const { data } = await supabase
    .from("assets")
    .select("passport_id")
    .ilike("passport_id", `${typePrefix}-${responsiblePrefix}-%`)

  const count = data?.length || 0

  // 🔹 4. correlativo +1
  const nextNumber = count + 1

  const correlativo = String(nextNumber).padStart(3,"0")

  return `${typePrefix}-${responsiblePrefix}-${correlativo}`
}

  const createPassport = async () => {

    if(!type){
      alert("Select asset type")
      return
    }

    const passportId = await generatePassportId(type, responsibleName)
    const txHash = await mintPassportNFT(passportId)

    // 1️⃣ crear asset base
    const { data: asset, error: assetError } = await supabase
      .from("assets")
      .insert([
        {
          passport_id: passportId,
          asset_type: type,
          manufacturer,
          responsible_name: responsibleName,
          responsible_rut: responsibleRut,
          nft_tx: txHash,
          location,
          lat,
          lng
        }
      ])
      .select()
      .single()

    if(assetError){
      alert("Error creating asset")
      return
    }

    // 2️⃣ insertar según tipo
    if(type === "battery"){

      await supabase.from("batteries").insert([
        {
          asset_id: asset.id,
          chemistry,
          capacity,
          state_of_health: soh
        }
      ])

    }

    if(type === "solar"){

      await supabase.from("solar_panels").insert([
        {
          asset_id: asset.id,
          panel_type: panelType,
          power
        }
      ])

    }

    if(type === "tire"){

      await supabase.from("tires").insert([
        {
          asset_id: asset.id,
          size,
          material
        }
      ])

    }

    alert("Passport created successfully!")

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

  return (

  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-10">

    <div className="flex gap-10">

      {/* FORMULARIO */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold mb-6">
          Crear Pasaporte Digital
        </h1>

        {/* TYPE SELECTOR */}
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e)=>setType(e.target.value)}
        >
          <option value="">Seleccionar tipo</option>
          <option value="battery">🔋 Batería</option>
          <option value="solar">☀️ Panel Solar</option>
          <option value="tire">🛞 Neumático</option>
        </select>

        <input
          className="w-full border p-2 mb-2"
          placeholder="Registrante"
          onChange={(e)=>setResponsibleName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          placeholder="RUT"
          onChange={(e)=>setResponsibleRut(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2"
          placeholder="Fabricante"
          onChange={(e)=>setManufacturer(e.target.value)}
        />

        {/* BATTERY */}
        {type === "battery" && (
          <>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Química (LFP, NMC...)"
              onChange={(e)=>setChemistry(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-2"
              placeholder="Capacidad (kWh)"
              onChange={(e)=>setCapacity(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-4"
              placeholder="Estado de Salud (%)"
              onChange={(e)=>setSoh(e.target.value)}
            />
          </>
        )}

        {/* SOLAR */}
        {type === "solar" && (
          <>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Tipo (mono/poly)"
              onChange={(e)=>setPanelType(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-4"
              placeholder="Potencia (W)"
              onChange={(e)=>setPower(e.target.value)}
            />
          </>
        )}

        {/* TIRE */}
        {type === "tire" && (
          <>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Medida (205/55 R16)"
              onChange={(e)=>setSize(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-4"
              placeholder="Material"
              onChange={(e)=>setMaterial(e.target.value)}
            />
          </>
        )}

        <button
          onClick={createPassport}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Crear Pasaporte
        </button>

      </div>
      
      {/* MAPA */}
<div className="bg-white p-4 rounded-xl shadow-lg w-[400px] h-[500px] flex flex-col">

  <h2 className="font-semibold mb-2">
    Ubicación del activo
  </h2>

  {/* INPUT PEQUEÑO */}
  <input
    className="border p-2 text-sm rounded mb-2"
    placeholder="Ej: Santiago, Chile"
    onChange={(e)=>setLocation(e.target.value)}
  />

  {/* MAPA */}
  
    <div className="flex-1 rounded-lg overflow-hidden">
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
  

</div>

</div>

  </div>
)
}