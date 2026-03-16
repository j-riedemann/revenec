"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { mintPassportNFT } from "../../lib/passportNFT"

export default function CreatePassport() {

  const [manufacturer,setManufacturer] = useState("")
  const [chemistry,setChemistry] = useState("")
  const [capacity,setCapacity] = useState("")
  const [soh,setSoh] = useState("")

  const generatePassportId = () => {

    const number = Math.floor(Math.random()*10000)

    return `BAT-${number.toString().padStart(4,"0")}`

    }

  const createPassport = async () => {

    const passportId = generatePassportId()
    const txHash = await mintPassportNFT(passportId)

    const { error } = await supabase
      .from("assets")
      .insert([
        {
          passport_id: passportId,
          asset_type:"battery",
          manufacturer,
          chemistry,
          capacity,
          state_of_health:soh,
          nft_tx: txHash
        }
      ])

    if(error){
      alert("Error creating passport")
    } else {
      alert("Passport created!")
    }

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold mb-6">
          Create Digital Battery Passport
        </h1>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Manufacturer"
          onChange={(e)=>setManufacturer(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Chemistry"
          onChange={(e)=>setChemistry(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Capacity"
          onChange={(e)=>setCapacity(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-5"
          placeholder="State of Health"
          onChange={(e)=>setSoh(e.target.value)}
        />

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