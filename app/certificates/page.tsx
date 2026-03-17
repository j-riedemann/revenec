"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

export default function CertificatesPage(){

  const [certificates,setCertificates] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const loadCertificates = async () => {

      const { data, error } = await supabase
        .from("certificates")
        .select(`
          *,
          assets (
            passport_id,
            manufacturer,
            asset_type
          )
        `)
        .order("created_at",{ascending:false})

      if(error){
        console.error("Error loading certificates:", error.message)
      } else {
        setCertificates(data || [])
      }

      setLoading(false)
    }

    loadCertificates()

  },[])

  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading certificates...
      </div>
    )
  }

  return(

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        Circular Certificates
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b text-gray-600 text-sm">
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Passport</th>
              <th className="text-left p-2">Asset</th>
              <th className="text-left p-2">Issuer</th>
              <th className="text-left p-2">Blockchain</th>
              <th className="text-left p-2">Verify</th>
            </tr>
          </thead>

          <tbody>

            {certificates.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No certificates yet
                </td>
              </tr>
            )}

            {certificates.map((cert)=>(
              <tr key={cert.id} className="border-b hover:bg-gray-50">

                <td className="p-2 font-medium">
                  {cert.certificate_type}
                </td>

                <td className="p-2">
                  {cert.assets?.passport_id || "—"}
                </td>

                <td className="p-2">
                  {cert.assets?.asset_type || "—"}
                </td>

                <td className="p-2">
                  {cert.issuer}
                </td>

                {/* 🔥 BLOCKCHAIN */}
                <td className="p-2">
                  {cert.blockchain_tx ? (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${cert.blockchain_tx}`}
                      target="_blank"
                      className="text-green-600 underline text-sm"
                    >
                      ✔ Verified
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Not registered
                    </span>
                  )}
                </td>

                {/* VERIFY */}
                <td className="p-2">
                  <Link
                    href={`/verify/${cert.hash}`}
                    className="text-blue-600 underline"
                  >
                    View
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