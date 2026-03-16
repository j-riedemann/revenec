"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"

export default function VerifyPage(){

  const params = useParams()

  const [certificate,setCertificate] = useState(null)
  const [asset,setAsset] = useState(null)

  useEffect(()=>{

    const loadCertificate = async ()=>{

      const { data } = await supabase
        .from("certificates")
        .select("*")
        .eq("hash",params.hash)
        .single()

      setCertificate(data)

      if(data){

        const { data:assetData } = await supabase
          .from("assets")
          .select("*")
          .eq("id",data.asset_id)
          .single()

        setAsset(assetData)

      }

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

      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-2xl font-bold mb-6">
          CircularChain Certificate Verification
        </h1>

        <p className="mb-2">
          <b>Status:</b> VALID
        </p>

        <p className="mb-2">
          <b>Certificate:</b> {certificate.certificate_type}
        </p>

        <p className="mb-2">
          <b>Issuer:</b> {certificate.issuer}
        </p>

        {asset && (
          <>
            <p className="mb-2">
              <b>Asset Passport:</b> {asset.passport_id}
            </p>

            <p className="mb-2">
              <b>Manufacturer:</b> {asset.manufacturer}
            </p>
          </>
        )}

        <p className="mt-4 text-sm text-gray-500">
          Certificate Hash: {certificate.hash}
        </p>

      </div>

    </div>

  )
}