"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

export default function Dashboard(){

  const [assets,setAssets] = useState([])
  const assetTypeLabels = {
    battery: "Batería",
    solar: "Panel Solar",
    tire: "Neumático",
  }

  useEffect(()=>{

    const loadAssets = async ()=>{

      const { data } = await supabase
        .from("assets")
        .select("*")
        .order("created_at",{ascending:false})

      setAssets(data)
    }

    loadAssets()

  },[])

  return(

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        <div>Revenec</div>
        Pasaportes Registrados
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-2">ID Producto</th>
              <th className="text-left p-2">Registrante</th>
              <th className="text-left p-2">Tipo</th>
              <th className="text-left p-2">Fabricante</th>
              <th className="text-left p-2">Pasaporte</th>

            </tr>

          </thead>

          <tbody>

            {assets.map((asset)=>(

              <tr key={asset.id} className="border-b">

                

                <td className="p-2">{asset.passport_id}</td>
                <td className="p-2">{asset.responsible_name}</td>
                <td className="p-2">
                  {assetTypeLabels[asset.asset_type] || asset.asset_type}
                </td>
                <td className="p-2">{asset.manufacturer}</td>

                <td className="p-2">

                  <Link
                    href={`/passport/${asset.passport_id}`}
                    className="text-blue-600 underline"
                  >
                    Ver Pasaporte
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}