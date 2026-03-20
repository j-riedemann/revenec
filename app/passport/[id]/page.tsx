"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import QRCode from "react-qr-code"
import GoogleMapView from "../../../components/GoogleMapView"
import { getAssetImage } from "../../../lib/assetImages"

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

  const getAssetStatus = (events) => {

  if (!events || events.length === 0) {
    return {
      label: "En operación",
      color: "text-blue-700",
      bg: "bg-blue-50"
    }
  }

  // 🔥 ORDENAR POR FECHA
  const sorted = [...events].sort((a,b) =>
    new Date(b.timestamp) - new Date(a.timestamp)
  )

  const lastEvent = sorted[0]

  switch(lastEvent.event_type){

    case "out_of_service":
      return {
        label: "Fuera de servicio",
        color: "text-red-700",
        bg: "bg-red-50"
      }

    case "recycling":
      return {
        label: "Reciclado",
        color: "text-blue-700",
        bg: "bg-blue-50"
      }

    case "second_life":
      return {
        label: "Segunda vida",
        color: "text-green-700",
        bg: "bg-green-50"
      }

    case "reconditioned":
      return {
        label: "Reacondicionado",
        color: "text-orange-700",
        bg: "bg-orange-50"
      }

    case "diagnosis":
      return {
        label: "Diagnóstico",
        color: "text-yellow-700",
        bg: "bg-yellow-50"
      }

    default:
      return {
        label: "En operación",
        color: "text-blue-700",
        bg: "bg-blue-50"
      }
  }
}
  
const status = getAssetStatus(events)

const getLastCircularEvent = (events) => {

  if (!events || events.length === 0) return null

  const sorted = [...events].sort((a,b) =>
    new Date(b.timestamp) - new Date(a.timestamp)
  )

  return sorted.find(e =>
    ["refurbished", "second_life", "recycling"].includes(e.event_type)
  ) || null
}

const lastCircularEvent = getLastCircularEvent(events)

const getEnvironmentalImpact = (event, asset, details) => {

  if (!event) return null

  switch(event.event_type){

    case "refurbished":
      return {
        title: "Reacondicionamiento",
        co2: "0.4 ton",
        energy: "—",
        material: "60%"
      }

    case "second_life":
      return {
        title: "Segunda vida",
        co2: "1.2 ton",
        energy: "50Ah",
        material: "100%"
      }

    case "recycling":
      return {
        title: "Reciclaje",
        co2: "0.8 ton",
        energy: "—",
        material: "80%"
      }

    default:
      return null
  }
}
const impact = getEnvironmentalImpact(lastCircularEvent, asset, details)

const getEventLabel = (type) => {
  switch(type){
    case "diagnosis": return "Diagnóstico"
    case "refurbished": return "Reacondicionamiento"
    case "second_life": return "Segunda vida"
    case "recycling": return "Reciclaje"
    case "out_of_service": return "Fuera de Servicio"
    default: return type
  }
}

const getEventColor = (type) => {
  switch(type){
    case "diagnosis": return "bg-yellow-400"
    case "refurbished": return "bg-orange-500"
    case "second_life": return "bg-green-500"
    case "recycling": return "bg-blue-500"
    case "out_of_service": return "bg-red-500"
    default: return "bg-gray-300"
  }
}

const getLastEventWithLocation = (events) => {

  if (!events || events.length === 0) return null

  const sorted = [...events].sort((a,b) =>
    new Date(b.timestamp) - new Date(a.timestamp)
  )

  return sorted.find(e => e.lat && e.lng) || null
}

const lastEvent = getLastEventWithLocation(events)

  return(

    <div className="flex justify-center min-h-screen bg-gray-100 p-10">
      <div className="flex gap-8">

        {/* PASAPORTE */}
        <div className="bg-white p-8 rounded-xl shadow-lg w-[520px]">
            <div className="flex justify-between items-center mb-6">

              {/* TEXTO */}
              <div>
                <div>
                  <h1 className="text-3xl font-bold">
                    Pasaporte Digital
                  </h1>

                  <p className="text-gray-500 text-2xl font-bold">
                    {asset.asset_type === "battery" && "Batería"}
                    {asset.asset_type === "solar" && "Panel Solar"}
                    {asset.asset_type === "tire" && "Neumático"}
                  </p>
                </div>
              </div>                
            </div>

                    <div className="text-white mt-6 p-4 rounded-lg border bg-[#003366] flex justify-between items-start gap-4">

                    {/* IZQUIERDA (contenido) */}
                    <div className="flex-1">

                      {/* BASE INFO */}
                      <div className="space-y-1 mb-6">

                        <p><b>ID:</b> {asset.passport_id}</p>
                        <p><b>Registrante:</b> {asset.responsible_name}</p>
                        <p><b>RUT:</b> {asset.responsible_rut}</p>
                        <p><b>Lugar de Emisión:</b> {asset.location}</p>

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
                        <li key={event.id} className="flex items-start gap-3 p-2">

                        {/* DOT */}
                        <div className={`w-3 h-3 mt-2 rounded-full ${getEventColor(event.event_type)}`} />

                        {/* CONTENIDO */}
                        <div>
                          <p className="font-semibold">
                            {getEventLabel(event.event_type)}
                          </p>

                          <p className="text-sm text-gray-500">
                            Organismo: {event.actor}
                          </p>

                          <p className="text-sm text-gray-500">
                            Descripción: {event.description}
                          </p>

                          <p className="text-sm text-gray-500">
                            Ubicación: {event.location}
                          </p>

                          <p className="text-sm text-gray-400">
                            Fecha de registro: {event.timestamp}
                          </p>
                        </div>

                      </li>
                      ))}

                    </ul>

        </div> {/* FIN PASAPORTE */}
      

      {/* PANEL DERECHO */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-[520px] flex flex-col">

          {/* FOTO */}
          
          <p className="text-sm text-gray-600 mt-2 text-left font-bold">
            Fotografía de referencia
          </p>
            
          <div className="flex justify-center mb-4">
            
            <img
              src={getAssetImage(asset.asset_type, asset.manufacturer)}
              onError={(e) => {
                e.currentTarget.src = "/battery.png"
              }}
              className="w-48 h-48 object-contain rounded-lg"
            />

          </div>


          {/* MAPA */}
          {/* TEXTO UBICACIÓN */}
          {lastEvent?.location ? (
            <p className="text-sm text-gray-600 mt-2 text-left font-bold">
              Última ubicación registrada: {lastEvent.location}
            </p>
          ) : asset.location ? (
            <p className="text-sm text-gray-600 mt-2 text-left font-bold">
              Última ubicación registrada: {asset.location}
            </p>
          ) : null}
          <div className="h-[250px] rounded-xl overflow-hidden">

              {lastEvent ? (
              lastEvent.location && lastEvent.location.trim() !== "" ? (
                <GoogleMapView location={lastEvent.location} />
              ) : (
                <GoogleMapView lat={lastEvent.lat} lng={lastEvent.lng} />
              )
            ) : asset.location && asset.location.trim() !== "" ? (
              <GoogleMapView location={asset.location} />
            ) : asset.lat && asset.lng ? (
              <GoogleMapView lat={asset.lat} lng={asset.lng} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Ubicación no disponible
              </div>
            )}

          </div>
          <div className={`mt-4 p-3 rounded-lg text-center ${status.bg}`}>

            <p className="text-sm text-gray-500">
              Estado del activo
            </p>

            <p className={`text-lg font-semibold ${status.color}`}>
              {status.label}
            </p>

          </div>
            <p className="text-xs text-gray-400 mt-1">
              Basado en eventos registrados
            </p>
        
        {impact && (
          <div className="mt-4 p-4 rounded-xl bg-green-50 border">

            <p className="text-sm font-semibold text-green-700 mb-2">
              🌱 Impacto ambiental ({impact.title})
            </p>

            <div className="text-sm text-gray-700 space-y-1">

              <p>
                <b>CO₂ evitado:</b> {impact.co2}
              </p>

              <p>
                <b>Energía recuperada:</b> {impact.energy}
              </p>

              <p>
                <b>Material valorizado:</b> {impact.material}
              </p>

            </div>

          </div>
        )}
        
        </div>
        

      </div> {/* flex gap-8 */}
    </div> 
    

  )
}