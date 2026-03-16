export default function Navbar(){

return(

<nav className="w-full bg-white shadow sticky top-0 z-50">

<div className="max-w-6xl mx-auto flex justify-between items-center p-4">

<div className="text-xl font-bold">
Revenec
</div>

<div className="space-x-6 text-gray-600">

<a href="#problema" className="hover:text-black">
Problema
</a>

<a href="#solucion" className="hover:text-black">
Solución
</a>

<a href="#tecnologia" className="hover:text-black">
Tecnología
</a>

<a href="#contacto" className="hover:text-black">
Contacto
</a>

</div>

</div>

</nav>

)

}