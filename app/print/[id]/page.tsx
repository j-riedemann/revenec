"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import QRCode from "react-qr-code"

export default function PrintPage(){

  const params = useParams()

  const [asset,setAsset] = useState(null)

  useEffect(()=>{

    const loadAsset = async ()=>{

      const { data } = await supabase
        .from("assets")
        .select("*")
        .eq("passport_id", params.id)
        .single()

      setAsset(data)
    }

    loadAsset()

  },[])

  if(!asset){
    return <div className="p-10">Loading...</div>
  }

  const passportUrl = `${window.location.origin}/passport/${asset.passport_id}`

  return(

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* BOTÓN PRINT (no se imprime) */}
      <button
        onClick={()=>window.print()}
        className="mb-6 px-4 py-2 bg-black text-white rounded print:hidden"
      >
        Print Sticker
      </button>

      {/* STICKER */}
      <div className="bg-white w-[300px] h-[300px] p-4 rounded-xl shadow flex flex-col items-center justify-between border">

        {/* HEADER */}
        <div className="text-center">
          <div className="font-bold text-sm">
            REVENEC
          </div>

          <div className="text-xs text-gray-500">
            Digital Product Passport
          </div>
        </div>

        {/* QR */}
        <QRCode value={passportUrl} size={160} />

        {/* FOOTER */}
        <div className="text-center">

          <div className="font-semibold text-sm">
            {asset.passport_id}
          </div>

          <div className="text-[10px] text-gray-500">
            Scan to verify
          </div>

        </div>

      </div>

      {/* PRINT STYLES */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }

          button {
            display: none;
          }
        }
      `}</style>

    </div>

  )
}