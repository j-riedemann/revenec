"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { registerOnBlockchain } from "../../lib/contract"

export default function CreateCertificate(){

  const [assetId,setAssetId] = useState("")
  const [type,setType] = useState("Second Life")

  const generateHash = () => {
    return Math.random().toString(36).substring(2,12)
  }

  const createCertificate = async () => {

  const hash = generateHash()

  const { data:asset } = await supabase
    .from("assets")
    .select("*")
    .eq("passport_id", assetId)
    .single()

  if(!asset){
    alert("Asset not found")
    return
  }

  const txHash = await registerOnBlockchain(asset.passport_id, hash)

  const { error } = await supabase
    .from("certificates")
    .insert([
      {
        asset_id: asset.id,
        issuer: "CircularChain",
        certificate_type: type,
        hash: hash,
        blockchain_tx: txHash
      }
    ])

  if(error){
    alert(error.message)
  } else {
    alert("Certificate created!")
  }

}

  return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold mb-6">
          Issue Circular Certificate
        </h1>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Asset ID"
          onChange={(e)=>setAssetId(e.target.value)}
        />

        <button
          onClick={createCertificate}
          className="w-full bg-black text-white p-2 rounded"
        >
          Issue Certificate
        </button>

      </div>

    </div>

  )
}