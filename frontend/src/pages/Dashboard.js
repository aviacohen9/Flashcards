import { useEffect, useState } from "react";
import {  Link } from 'react-router-dom'

import { useAuthContext } from '../hooks/auth/useAuthContext';

//style
import '../styling/Dashboard.css';

import axios from "axios";

const Dashboard = () => {

    
    const [ isLoading, setIsLoading ] = useState(true)
    const { user } = useAuthContext()
    const [ cards, setCards ]= useState([])

    /**
     * fetch the user's latest cards every render
     */
    useEffect(()=>{

        const fetchCards = async () =>{
            if(cards.length===0)
            try {
                const res = await axios('http://localhost:8000/cards', { 
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${user.token}`
                                        }
                });
                const data = await res.data
                setIsLoading(false)
                setCards(data)
            }
            catch (errors) {
                console.log(errors)
            }
        }

        fetchCards()
        
    },[cards, user])


    return ( 
            <div className='dashboard'>
                <h1 className='welcome_title'>Hey {user && user.firstName}</h1>
                
                {   isLoading && cards.length===0?
                (<h2>Loading...</h2>)
                :(<div className='latest_cards'>
                    <div className='dashboard_cards_title'>
                        <h1>Your Latest Cards</h1>
                        <Link style={{ textDecoration: 'none'}}  to="/cards/"><h3 >View All</h3></Link>
                    </div>

                    <div className='grid_column'>
                        {cards && cards.map(card => (
                            <div className='card_preview'>
                                <h4 key={card._id}>{card.question}</h4>
                               <h4 key={card._id}>{card.answer}</h4>
                            </div>
                        ))}
                         
                    </div>
                    <Link to="/cards/addcard/"><span className="material-symbols-outlined symbol add_card_span">shadow_add</span></Link>
                </div>)}

                {   !isLoading 
                    && cards.length===0 
                    && <h4>No cards were added yet. You can create some cards <Link to={"/cards/addcard"}>here</Link></h4>
                }

            </div>
            );
}
 
export default Dashboard;