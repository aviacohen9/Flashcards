import { Outlet } from "react-router-dom";

//app components
import Navbar from '../components/Navbar'

export default function RootLayout() {
  return (
     <div className="App">

          <Navbar/>

         <div className="content">
            <Outlet/>
         </div>
    
    </div>
  )
}