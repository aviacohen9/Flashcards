import { Route, createRoutesFromElements } from 'react-router-dom'

//loaders
import  { authLoader } from './loaders/authLoader'
import  { userLoader } from './loaders/userLoader'

//layouts
import RootLayout from './layouts/RootLayout'
import CardsLayout  from './layouts/CardsLayout'

//pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import TermsOfUse from './pages/TermsOfUse';
import Dashboard from './pages/Dashboard'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import AllCards from './pages/cards/AllCards';
import AddCard from './pages/cards/AddCard';
import EditCard from './pages/cards/EditCard'
import CardDetails , { CardDetailsLoader } from './pages/cards/CardDetails';
import CardsError from './pages/cards/CardsError'
import NotFound from './pages/NotFound';


const routesConfig= createRoutesFromElements(

        <Route path='/' element={<RootLayout/>} >
  
                <Route index element={<Home/>} loader={authLoader}/>
  
                <Route exact path="signup" loader={authLoader} element={<Signup/>} />
                     
                <Route exact path="login" loader={authLoader} element={  <Login/>} />

                <Route exact path="termsOfUse" element={  <TermsOfUse/>} />

                <Route exact path="aboutUs" element={  <AboutUs/>} />

                <Route exact path='dashboard' element={ <Dashboard/>} />
  
                <Route exact path="cards" element={<CardsLayout/>} errorElement={<CardsError/>}   >
  
                          <Route exact path="" element={<AllCards/>} loader={userLoader} />
  
                          <Route exact path=":card_id" element={<CardDetails/ >} loader={CardDetailsLoader}  />
  
                          <Route exact path="addcard" element={<AddCard/>} />
  
                          <Route exact path="editcard/:card_id" element={<EditCard/>} />
                    
                </Route>
  
            
  
  
                <Route  path="*" element={<NotFound/>} ></Route>
                
        </Route>
    )
  

  export default routesConfig;

  

/*
const routesConfig = [
        {
                path:'/', element:<RootLayout/>, children:[
                        { eapath:'/', element:<Home/> },
                        { path:'/signup', element:<Signup/> },
                        { path:'/login', element: <Login/> }

                ]
        }
]
*/
