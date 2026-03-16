import Navbar from "../components/Navbar"

export default function Home(){

return(

<div className="min-h-screen bg-white">

<Navbar />

{/* HERO */}

<section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-32 px-6">

<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

<div>

<h1 className="text-5xl font-bold mb-6">
Revenec
</h1>

<p className="text-xl mb-6">
Pasaportes digitales para trazabilidad de activos, facilitando el cumplimiento de la Ley REP
</p>

<p className="opacity-90 mb-6">
Infraestructura digital para trazabilidad, certificación de segunda vida
y verificación del ciclo de vida de activos tecnológicos.
</p>

<a
 href="/dashboard"
 className="bg-white text-black px-6 py-3 rounded font-semibold"
>
Ver demo
</a>

</div>

<div>

<div className="flex justify-end">
<img
 src="/Passport1.png"
 className="w-80 rounded-xl shadow-2xl transform hover:scale-105 transition"
/>
</div>

</div>

</div>

</section>

<section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-green-50">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-4">
Activos circulares que gestionamos
</h2>

<p className="text-gray-600 mb-16">
Pasaportes digitales para trazabilidad y certificación de activos tecnológicos
</p>

<div className="grid md:grid-cols-3 gap-10">

{/* BATERIA */}

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">

<img
 src="/batterypass1.png"
 className="h-80 mx-auto mb-6 object-contain"
/>

<h3 className="text-xl font-semibold mb-2">
Baterías
</h3>

<p className="text-gray-600">
Certificación de segunda vida y trazabilidad de módulos reutilizados.
</p>

</div>


{/* PANEL SOLAR */}

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">

<img
 src="/panelpass1.png"
 className="h-80 mx-auto mb-6 object-contain"
/>

<h3 className="text-xl font-semibold mb-2">
Paneles solares
</h3>

<p className="text-gray-600">
Seguimiento del ciclo de vida y valorización de materiales.
</p>

</div>


{/* NEUMATICO */}

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">

<img
 src="/tirepass1.png"
 className="h-80 mx-auto mb-6 object-contain"
/>

<h3 className="text-xl font-semibold mb-2">
Neumáticos
</h3>

<p className="text-gray-600">
Registro digital de procesos de reciclaje y reutilización.
</p>

</div>

</div>

</div>

</section>

<section className="py-24 px-6">

<div className="max-w-6xl mx-auto">

<h2 className="text-3xl font-bold text-center mb-12">
Cómo funciona Revenec
</h2>

<div className="grid md:grid-cols-4 gap-8">

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">①</div>
<p>Activo registrado</p>
</div>

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">②</div>
<p>Pasaporte digital</p>
</div>

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">③</div>
<p>Eventos de ciclo de vida</p>
</div>

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">④</div>
<p>Certificación circular</p>
</div>

</div>

</div>

</section>

<section className="py-28 px-6 bg-gray-50">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-4">
Ecosistema circular
</h2>

<p className="text-gray-600 mb-16">
Revenec conecta a los actores clave de la economía circular mediante pasaportes digitales verificables
</p>

<div className="grid md:grid-cols-4 gap-10">

{/* GENERADORES */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">🏭</div>

<h3 className="font-semibold mb-2">
Generadores
</h3>

<p className="text-sm text-gray-600">
Empresas que generan activos o residuos tecnológicos
</p>

</div>


{/* GESTORES */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">🚛</div>

<h3 className="font-semibold mb-2">
Gestores
</h3>

<p className="text-sm text-gray-600">
Operadores que transportan y gestionan activos
</p>

</div>


{/* RECICLADORES */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">♻️</div>

<h3 className="font-semibold mb-2">
Recicladores
</h3>

<p className="text-sm text-gray-600">
Empresas que valorizan materiales y componentes
</p>

</div>


{/* MERCADO */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">📊</div>

<h3 className="font-semibold mb-2">
Mercados circulares
</h3>

<p className="text-sm text-gray-600">
Empresas que compran atributos de circularidad
</p>

</div>

</div>

</div>

</section>

{/* PROBLEMA */}

<section id="problema" className="bg-gray-100 py-20 px-6">

<div className="max-w-4xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-6">
El desafío de la economía circular
</h2>

<p className="text-gray-600">
El crecimiento de tecnologías como baterías, paneles solares y neumáticos
está generando nuevos flujos de residuos complejos. Hoy no existen sistemas
digitales confiables que permitan rastrear su ciclo de vida o verificar su
valorización.
</p>

</div>

</section>

<section className="py-28 px-6 bg-white">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-4">
Beneficios de Revenec
</h2>

<p className="text-gray-600 mb-16">
Infraestructura digital para acelerar la economía circular
</p>

<div className="grid md:grid-cols-4 gap-10">

{/* REGULACION */}

<div className="bg-gray-50 p-6 rounded-xl shadow">

<div className="text-4xl mb-4">📜</div>

<h3 className="font-semibold mb-2">
Cumplimiento regulatorio
</h3>

<p className="text-sm text-gray-600">
Facilita el cumplimiento de normativas ambientales y sistemas de responsabilidad extendida del productor.
</p>

</div>


{/* TRAZABILIDAD */}

<div className="bg-gray-50 p-6 rounded-xl shadow">

<div className="text-4xl mb-4">🔍</div>

<h3 className="font-semibold mb-2">
Trazabilidad verificable
</h3>

<p className="text-sm text-gray-600">
Seguimiento transparente del ciclo de vida de activos tecnológicos.
</p>

</div>


{/* SEGUNDA VIDA */}

<div className="bg-gray-50 p-6 rounded-xl shadow">

<div className="text-4xl mb-4">🔋</div>

<h3 className="font-semibold mb-2">
Certificación de segunda vida
</h3>

<p className="text-sm text-gray-600">
Validación digital de procesos de reutilización y reacondicionamiento.
</p>

</div>


{/* MERCADOS */}

<div className="bg-gray-50 p-6 rounded-xl shadow">

<div className="text-4xl mb-4">📈</div>

<h3 className="font-semibold mb-2">
Mercados circulares
</h3>

<p className="text-sm text-gray-600">
Creación de nuevos mercados basados en atributos verificables de circularidad.
</p>

</div>

</div>

</div>

</section>





{/* SOLUCIÓN */}

<section id="solucion" className="py-20 px-6">

<div className="max-w-4xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-6">
Pasaportes digitales para activos circulares
</h2>

<p className="text-gray-600">
Revenec permite crear pasaportes digitales que registran el ciclo de vida
de activos tecnológicos desde su producción hasta su reutilización o reciclaje.
</p>

</div>

</section>


{/* TECNOLOGÍA */}

<section id="tecnologia" className="bg-gray-100 py-20 px-6">

<div className="max-w-4xl mx-auto">

<h2 className="text-3xl font-bold mb-10 text-center">
Tecnología
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div>
<h3 className="font-semibold mb-2">Pasaportes digitales</h3>
<p className="text-gray-600">
Registro estructurado del ciclo de vida de materiales.
</p>
</div>

<div>
<h3 className="font-semibold mb-2">Trazabilidad</h3>
<p className="text-gray-600">
Seguimiento de activos a lo largo de la cadena de valor.
</p>
</div>

<div>
<h3 className="font-semibold mb-2">Certificación</h3>
<p className="text-gray-600">
Verificación digital de eventos de reutilización o reciclaje.
</p>
</div>

</div>

</div>

</section>

<section className="py-28 px-6 bg-gradient-to-b from-green-50 to-white">

<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

{/* TEXTO */}

<div>

<h2 className="text-3xl font-bold mb-6">
Pasaportes digitales en acción
</h2>

<p className="text-gray-600 mb-8">
Cada activo registrado en Revenec cuenta con un pasaporte digital que
almacena información verificable sobre su ciclo de vida, eventos de
gestión y certificaciones de circularidad.
</p>

<ul className="space-y-4 text-gray-700">

<li>✔ Registro único del activo</li>

<li>✔ Eventos verificables de diagnóstico y reutilización</li>

<li>✔ Certificados digitales de valorización</li>

<li>✔ Verificación pública de información</li>

</ul>

<a
 href="/dashboard"
 className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700"
>
Explorar demo
</a>

</div>


{/* IMAGEN */}

<div className="flex justify-center">

<img
 src="/Passport1.png"
 className="w-96 rounded-xl shadow-2xl"
/>

</div>

</div>

</section>


{/* CONTACTO */}

<section id="contacto" className="bg-gray-900 text-white text-center py-16">

<h2 className="text-2xl font-bold mb-4">
Contacto
</h2>

<p>
contacto@revenec.com
</p>

<footer className="text-center text-gray-500 py-6">

<p>© 2026 Revenec</p>

</footer>

</section>


</div>

)

}