"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import QRCode from "react-qr-code"

export default function PassportPage(){

  const params = useParams()

  const [asset,setAsset] = useState(null)
  const [details,setDetails] = useState(null)
  const [events,setEvents] = useState([])
  const [certificate,setCertificate] = useState(null)

  useEffect(()=>{

    const loadData = async ()=>{

      // 1️⃣ obtener asset base
      const { data: assetData } = await supabase
        .from("assets")
        .select("*")
        .eq("passport_id", params.id)
        .single()

      setAsset(assetData)

      if(!assetData) return

      // 2️⃣ obtener detalles según tipo
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

      // 3️⃣ eventos
      const { data: eventsData } = await supabase
        .from("events")
        .select("*")
        .eq("asset_id", assetData.id)

      setEvents(eventsData || [])

      // 4️⃣ certificado
      const { data: certData } = await supabase
        .from("certificates")
        .select("*")
        .eq("asset_id", assetData.id)
        .single()

      setCertificate(certData)

    }

    loadData()

  },[])

  if(!asset){
    return <div className="p-10">Loading passport...</div>
  }

  const passportUrl = `${window.location.origin}/passport/${asset.passport_id}`

  return(

    <div className="flex justify-center min-h-screen bg-gray-100 p-10">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[520px]">

        <div className="flex justify-between items-center mb-6">

  {/* TEXTO */}
  <div>
    <h1 className="text-3xl font-bold leading-tight">

            <div>Pasaporte Digital</div>

            <div className="text-gray-500 text-3l">
              {asset.asset_type === "battery" && "Batería"}
              {asset.asset_type === "solar" && "Panel Solar"}
              {asset.asset_type === "tire" && "Neumático"}
            </div>

          </h1>
        </div>

        {/* IMAGEN */}
        {asset.asset_type === "solar" && (
          <img
            src="/solar.png"
            alt="solar panel"
            className="w-16 h-16 object-contain"
          />
        )}

        {asset.asset_type === "battery" && (
          <img
            src="/battery.png"
            alt="battery"
            className="w-16 h-16 object-contain"
          />
        )}

        {asset.asset_type === "tire" && (
          <img
            src="/tire.png"
            alt="tire"
            className="w-16 h-16 object-contain"
          />
        )}

      </div>

        <div className="text-white mt-6 p-4 rounded-lg border bg-[#003366] flex justify-between items-start gap-4">

        {/* IZQUIERDA (contenido) */}
        <div className="flex-1">

          {/* BASE INFO */}
          <div className="space-y-1 mb-6">

            <p><b>ID:</b> {asset.passport_id}</p>
            <p><b>Registrante:</b> {asset.responsible_name}</p>
            <p><b>RUT:</b> {asset.responsible_rut}</p>

          </div>

          {/* TYPE DATA */}

          {asset.asset_type === "battery" && details && (
            <div className="mb-1">
              <h2 className="font-bold mb-2">Información del producto</h2>
              <p><b>Fabricante:</b> {asset.manufacturer}</p>
              <p><b>Química:</b> {details.chemistry}</p>
              <p><b>Capacidad:</b> {details.capacity}</p>
              <p><b>Estado de salud:</b> {details.state_of_health}</p>
            </div>
          )}

          {asset.asset_type === "solar" && details && (
            <div className="mb-1">
              <h2 className="font-bold mb-2">Información del producto</h2>
              <p><b>Fabricante:</b> {asset.manufacturer}</p>
              <p><b>Tipo:</b> {details.panel_type}</p>
              <p><b>Potencia:</b> {details.power}</p>
            </div>
          )}

          {asset.asset_type === "tire" && details && (
            <div className="mb-1">
              <h2 className="font-bold mb-2">Información del producto</h2>
              <p><b>Fabricante:</b> {asset.manufacturer}</p>
              <p><b>Medida:</b> {details.size}</p>
            </div>
          )}

          </div> 

        {/* DERECHA (QR) */}
        <div className="bg-white p-2 rounded shadow">
          <QRCode value={passportUrl} size={110} />
        </div>

      </div> 

    
             

        {/* BLOCKCHAIN */}
        <div className="border-b mt-6 mb-6 flex justify-between items-center">

          <h2 className="text-blue-800 font-semibold">
          ✔ Verified on Blockchain
          </h2>

          {asset.nft_tx ? (
          <a
            href={`https://sepolia.etherscan.io/tx/${asset.nft_tx}`}
            target="_blank"
            className="text-blue-800 underline text-sm"
          >
            View NFT Transaction
          </a>
          ) : (
            <p className="text-gray-500 text-sm">NFT not minted</p>
          )}

          </div>
        

        {/* EVENTS */}
        <h2 className="font-bold mb-2">Eventos ciclo de vida</h2>

        <ul className="space-y-0">

          {events.map((event)=>(
            <li key={event.id} className="p-2">
              <p>{event.event_type}</p>
              <p className="text-sm text-gray-500">{event.actor}</p>
              <p className="text-sm text-gray-500">{event.timestamp}</p>
            </li>
          ))}

        </ul>

      </div>

    </div>
      

    

  )
}