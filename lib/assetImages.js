const brandImages = {
  battery: {
    hankook: "/brands/hankook-battery.png",
    varta: "/brands/varta-battery.png",
    lg: "/brands/lg-battery.png",
  },
  solar: {
    jinko: "/brands/jinko-solar.png",
    trina: "/brands/trina-solar.png",
  },
  tire: {
    michelin: "/brands/michelin-tire.png",
    bridgestone: "/brands/bridgestone-tire.png",
  }
}

export function getAssetImage(type, manufacturer) {

  // 🔥 seguridad total
  const safeType = type || ""
  const name = (manufacturer || "").toLowerCase().trim()

  // si no hay tipo → default
  if (!safeType) return getDefaultImage()

  const typeMap = brandImages[safeType]

  // si no hay mapa → default
  if (!typeMap) return getDefaultImage(safeType)

  // 🔍 búsqueda por marca
  for (const brand in typeMap) {
    if (name.includes(brand)) {
      return typeMap[brand]
    }
  }

  // 🔥 fallback SIEMPRE
  return getDefaultImage(safeType)
}

function getDefaultImage(type) {
  if (type === "battery") return "/battery.png"
  if (type === "solar") return "/solar.png"
  if (type === "tire") return "/tire.png"
  return "/battery.png"
}