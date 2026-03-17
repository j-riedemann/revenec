"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { mintPassportNFT } from "../../lib/passportNFT"

export default function CreatePassport() {

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
          nft_tx: txHash
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

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold mb-6">
          Create Digital Passport
        </h1>

        {/* TYPE SELECTOR */}
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e)=>setType(e.target.value)}
        >
          <option value="">Select type</option>
          <option value="battery">🔋 Battery</option>
          <option value="solar">☀️ Solar Panel</option>
          <option value="tire">🛞 Tire</option>
        </select>

        {/* COMMON */}
        <input
          className="w-full border p-2 mb-2"
          placeholder="Manufacturer"
          onChange={(e)=>setManufacturer(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2"
          placeholder="Responsible Name (Ley REP)"
          onChange={(e)=>setResponsibleName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          placeholder="Responsible RUT"
          onChange={(e)=>setResponsibleRut(e.target.value)}
        />

        {/* BATTERY */}
        {type === "battery" && (
          <>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Chemistry (LFP, NMC...)"
              onChange={(e)=>setChemistry(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-2"
              placeholder="Capacity (kWh)"
              onChange={(e)=>setCapacity(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-4"
              placeholder="State of Health (%)"
              onChange={(e)=>setSoh(e.target.value)}
            />
          </>
        )}

        {/* SOLAR */}
        {type === "solar" && (
          <>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Panel Type (mono/poly)"
              onChange={(e)=>setPanelType(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-4"
              placeholder="Power (W)"
              onChange={(e)=>setPower(e.target.value)}
            />
          </>
        )}

        {/* TIRE */}
        {type === "tire" && (
          <>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Size (205/55 R16)"
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
          Create Passport
        </button>

      </div>

    </div>
  )
}