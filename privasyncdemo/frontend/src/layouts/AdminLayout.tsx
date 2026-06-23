import Navbar from "@/frontend/src/components/Navbar";
import Sidebar from "@/frontend/src/components/Sidebar";


export default function AdminLayout({
children
}:{
children:React.ReactNode
}){


return(

<div>

<Navbar/>


<div className="flex">

<Sidebar/>


<main className="flex-1 p-6">

{children}

</main>


</div>


</div>

)

}