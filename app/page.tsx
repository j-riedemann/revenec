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
Dynamic digital product passports for traceability
</p>

<p className="opacity-90 mb-6">
Digital infrastructure for traceability, second-life certification and
lifecycle verification of technological products.
</p>

<a
 href="/dashboard"
 className="bg-white text-black px-6 py-3 rounded font-semibold"
>
View demo
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
Products supported
</h2>

<p className="text-gray-600 mb-16">
Digital passports for traceability and certification of technological products
</p>

<div className="grid md:grid-cols-3 gap-10">

{/* BATERIA */}

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">

<img
 src="/batterypass1.png"
 className="h-80 mx-auto mb-6 object-contain"
/>

<h3 className="text-xl font-semibold mb-2">
Batteries
</h3>

<p className="text-gray-600">
Second-life certificaction and traceability of reused modules.
</p>

</div>


{/* PANEL SOLAR */}

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">

<img
 src="/panelpass1.png"
 className="h-80 mx-auto mb-6 object-contain"
/>

<h3 className="text-xl font-semibold mb-2">
Solar panels
</h3>

<p className="text-gray-600">
Lifecycle tracking and value of materials.
</p>

</div>


{/* NEUMATICO */}

<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">

<img
 src="/tirepass1.png"
 className="h-80 mx-auto mb-6 object-contain"
/>

<h3 className="text-xl font-semibold mb-2">
Tires
</h3>

<p className="text-gray-600">
Digital registration of recycling and reusing processes.
</p>

</div>

</div>

</div>

</section>

<section className="py-24 px-6">

<div className="max-w-6xl mx-auto">

<h2 className="text-3xl font-bold text-center mb-12">
How does Revenec work
</h2>

<div className="grid md:grid-cols-4 gap-8">

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">①</div>
<p>Product registered</p>
</div>

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">②</div>
<p>Digital passport</p>
</div>

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">③</div>
<p>Lifecycle events</p>
</div>

<div className="text-center">
<div className="text-green-600 text-4xl mb-3">④</div>
<p>Circular certification</p>
</div>

</div>

</div>

</section>

<section className="py-28 px-6 bg-gray-50">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-4">
Circular ecosystem
</h2>

<p className="text-gray-600 mb-16">
Revenec connects key stakeholders of the circular economy through verifiable digital passports
</p>

<div className="grid md:grid-cols-4 gap-10">

{/* GENERADORES */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">🏭</div>

<h3 className="font-semibold mb-2">
Generators
</h3>

<p className="text-sm text-gray-600">
Organizations that produce technological waste streams
</p>

</div>


{/* GESTORES */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">🚛</div>

<h3 className="font-semibold mb-2">
Reoresentatives
</h3>

<p className="text-sm text-gray-600">
Organizations that transport and manage waste
</p>

</div>


{/* RECICLADORES */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">♻️</div>

<h3 className="font-semibold mb-2">
Recyclers
</h3>

<p className="text-sm text-gray-600">
Companies that value materials and components
</p>

</div>


{/* MERCADO */}

<div className="bg-white p-6 rounded-xl shadow">

<div className="text-4xl mb-4">📊</div>

<h3 className="font-semibold mb-2">
Circular markets
</h3>

<p className="text-sm text-gray-600">
Companies that buy circularity atributes
</p>

</div>

</div>

</div>

</section>

{/* PROBLEMA */}

<section id="problema" className="bg-gray-100 py-20 px-6">

<div className="max-w-4xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-6">
The challenge of the circular economy
</h2>

<p className="text-gray-600">
The growth of technologies such as batteries, solar panels, and tires 
is generating new streams of complex waste. Today, there are no reliable digital systems 
that allow tracking their lifecycle or verifying their recovery/value.
</p>

</div>

</section>

<section className="py-28 px-6 bg-white">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-4">
Revenec benefits
</h2>

<p className="text-gray-600 mb-16">
Digital infrastructure to accelerate circular economy
</p>

<div className="grid md:grid-cols-4 gap-10">

{/* REGULACION */}

<div className="bg-gray-50 p-6 rounded-xl shadow">

<div className="text-4xl mb-4">📜</div>

<h3 className="font-semibold mb-2">
Regulatory compliance
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