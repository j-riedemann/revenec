 "use client"

export default function GoogleMapView({ lat, lng, location }) {

  let mapUrl = ""

  if (location) {
    mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}&z=14&output=embed`
  } else if (lat && lng) {
    mapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <iframe
        src={mapUrl}
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>
  )
} 