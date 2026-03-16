"use client"

import { supabase } from "../../lib/supabase"

export default function TestPage() {

  const testInsert = async () => {

    const { data, error } = await supabase
      .from("assets")
      .insert([
        {
          asset_type: "battery",
          manufacturer: "Test Manufacturer",
          chemistry: "LFP",
          capacity: "50 kWh",
          state_of_health: "85%"
        }
      ])

    if (error) {
      console.log("Error:", error)
      alert(JSON.stringify(error))
    } else {
      console.log("Success:", data)
      alert("Asset created!")
    }

  }

  return (
    <div style={{padding:40}}>
      <h1>Supabase Test</h1>

      <button onClick={testInsert}>
        Insert Test Asset
      </button>

    </div>
  )
}