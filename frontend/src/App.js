import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//app routes configuration 
import routesConfig from './routesConfig'

//style
import './styling/App.css';


/*
const router = createBrowserRouter(
  
  createRoutesFromElements(
      <Route path='/' element={<RootLayout/>} >

              <Route index element={<Home/>} />

              <Route exact path="signup" element={<Signup/>} />
                   
              <Route exact path="login" element={  <Login/>} />

              <Route exact path="cards" element={<CardsLayout/>} errorElement={<CardsError/>}  >

                        <Route exact path="" element={<AllCards/>}  />

                        <Route exact path=":card_id" element={<CardDetails/ >} loader={CardDetailsLoader}  />

                        <Route exact path="addcard" element={<AddCard/>} />

                        <Route exact path="editcard/:card_id" element={<EditCard/>} />
                  
              </Route>

          


              <Route  path="*" element={<NotFound/>} ></Route>
              
      </Route>
  )
)

*/

const router = createBrowserRouter(routesConfig)

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;