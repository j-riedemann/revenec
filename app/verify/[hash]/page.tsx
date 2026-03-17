"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"

export default function VerifyPage(){

  const params = useParams()

  const [certificate,setCertificate] = useState(null)
  const [asset,setAsset] = useState(null)
  const [details,setDetails] = useState(null)

  useEffect(()=>{

    const loadCertificate = async ()=>{

      // 1️⃣ obtener certificado
      const { data:certData } = await supabase
        .from("certificates")
        .select("*")
        .eq("hash",params.hash)
        .single()

      setCertificate(certData)

      if(!certData) return

      // 2️⃣ obtener asset base
      const { data:assetData } = await supabase
        .from("assets")
        .select("*")
        .eq("id",certData.asset_id)
        .single()

      setAsset(assetData)

      if(!assetData) return

      // 3️⃣ obtener detalles según tipo
      let detailsData = null

      if(assetData.asset_type === "battery"){
        const { data } = await supabase
          .from("batteries")
          .select("*")
          .eq("asset_id", assetData.id)
          .single()

        detailsData = data
      }

      if(assetData.asset_type === "solar"){
        const { data } = await supabase
          .from("solar_panels")
          .select("*")
          .eq("asset_id", assetData.id)
          .single()

        detailsData = data
      }

      if(assetData.asset_type === "tire"){
        const { data } = await supabase
          .from("tires")
          .select("*")
          .eq("asset_id", assetData.id)
          .single()

        detailsData = data
      }

      setDetails(detailsData)

    }

    loadCertificate()

  },[])

  if(!certificate){
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading certificate...
      </div>
    )
  }

  return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[520px]">

        {/* TITLE DINAMICO */}
        <h1 className="text-2xl font-bold mb-6">

          {asset?.asset_type === "battery" && "🔋 Battery Certificate"}
          {asset?.asset_type === "solar" && "☀️ Solar Certificate"}
          {asset?.asset_type === "tire" && "🛞 Tire Certificate"}

        </h1>

        {/* STATUS */}
        <div className="mb-4 text-green-600 font-bold">
          ✔ VERIFIED
        </div>

        <p className="mb-2">
          <b>Certificate:</b> {certificate.certificate_type}
        </p>

        <p className="mb-2">
          <b>Issuer:</b> {certificate.issuer}
        </p>

        {/* ASSET BASE */}
        {asset && (
          <>
            <p className="mb-2">
              <b>Passport ID:</b> {asset.passport_id}
            </p>

            <p className="mb-2">
              <b>Manufacturer:</b> {asset.manufacturer}
            </p>

            <p className="mb-2">
              <b>Responsible:</b> {asset.responsible_name}
            </p>

            <p className="mb-4">
              <b>RUT:</b> {asset.responsible_rut}
            </p>
          </>
        )}

        {/* DATOS ESPECIFICOS */}

        {asset?.asset_type === "battery" && details && (
          <div className="mb-4 border-t pt-4">
            <h2 className="font-bold mb-2">Battery Data</h2>
            <p>Chemistry: {details.chemistry}</p>
            <p>Capacity: {details.capacity}</p>
            <p>State of Health: {details.state_of_health}</p>
          </div>
        )}

        {asset?.asset_type === "solar" && details && (
          <div className="mb-4 border-t pt-4">
            <h2 className="font-bold mb-2">Solar Panel Data</h2>
            <p>Type: {details.panel_type}</p>
            <p>Power: {details.power}</p>
          </div>
        )}

        {asset?.asset_type === "tire" && details && (
          <div className="mb-4 border-t pt-4">
            <h2 className="font-bold mb-2">Tire Data</h2>
            <p>Size: {details.size}</p>
            <p>Material: {details.material}</p>
          </div>
        )}

        {/* HASH */}
        <div className="mt-6 text-sm text-gray-500">
          Certificate Hash: {certificate.hash}
        </div>

      </div>

    </div>
  )
}