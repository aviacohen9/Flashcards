import { useEffect, useState } from "react";
import axios from "axios";

//hooks
import { useAuthContext } from '../hooks/auth/useAuthContext';

//components
import PreviewLatestElements from "../components/homepage/PreviewLatestElements";

//style
import '../styling/Homepage.css';


const Homepage = () => {

    const [ isLoading, setIsLoading ] = useState(true)
    const { user } = useAuthContext()
    const [ cards, setCards ]= useState([])
    const cardsTitle = 'Cards';

    /**
     * fetch the user's latest cards every render
     */
    useEffect(()=>{

        const fetchCards = async () =>{
            if(cards.length===0 && user!==null)
            try {
                const res = await axios('/cards', { 
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${user.token}`
                                        }
                });
                const data = await res.data
                setIsLoading(false)
                setCards(data)
            }catch (errors) {
                console.log(errors)
            }
        }

        fetchCards()
        
    },[cards, user])


    return ( 
                <div className='dashboard'>

                    <h1 className='welcome_title'>Hey {user && user.firstName}</h1>

                    { isLoading && !cards?
                        (<h2>Loading...</h2>):
                        cards &&  (<PreviewLatestElements isLoading={isLoading} elementsList={cards} elementTitle={cardsTitle} />)}
                
                </div>
            );
}
 
export default Homepage;