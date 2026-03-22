export default function Navbar(){

return(

<nav className="w-full bg-white shadow sticky top-0 z-50">

<div className="max-w-6xl mx-auto flex justify-between items-center p-4">

<div className="text-xl font-bold">
Revenec
</div>

<div className="space-x-6 text-gray-600">

<a href="#problema" className="hover:text-black">
Problem
</a>

<a href="#solucion" className="hover:text-black">
Solution
</a>

<a href="#tecnologia" className="hover:text-black">
Technology
</a>

<a href="#contacto" className="hover:text-black">
Contact
</a>

</div>

</div>

</nav>

)

}