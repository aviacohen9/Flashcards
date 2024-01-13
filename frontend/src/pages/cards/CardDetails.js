import { useLoaderData, useParams, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { read_cookie } from 'sfcookies';
import axios from "axios";

//app hooks
import { useDeleteCard } from '../../hooks/cards/useDeleteCard'

//style
import '../../styling/Cards.css'

/**
 * @returns a page with the card's data + options to edit/delete
 */

export default function CardDetails () {
    
    const card  = useLoaderData();
    const navigate = useNavigate();
    const { card_id } = useParams();
    const { deleteCard, error} = useDeleteCard();
    const [ flip, setFlip ] = useState(false);
    

    /**
     * @function deleteCardOnClick delete card 
     * @param {String} card_id 
     */
    const deleteOnClick = async (card_id) => {
        await deleteCard(card_id)
        if(error){
            console.log(error)
        }else navigate('/cards')
    }

    /**
     * @function editCardOnClick navigets to an edit card page with the card information 
     * @param {Object{Card}} card 
     */
    const editOnClick = async () => {
        navigate('/cards/editcard/'+card._id, { state: { card: card } });
    }

    return ( 
        <div className='card-details'>

            { error && <span>{error}</span>}
            
            <div className="container">

                <div className={`card ${flip ? "flip" : ""}`}>
                    <div className="effect"></div>
                    <div className="front"onClick={()=> setFlip(!flip)}>
                        <h3 className="filtered-category" >{ card.question }</h3>
                    </div>
                    <div className="back" onClick={() => setFlip(!flip)}>
                        <h3>{ card.answer }</h3>
                    </div>
                </div>

                <div className="card-buttons-info">
                        <button>Explanation</button>
                        <button>Status</button>
                </div>
           </div>

           
           <div className="card-buttons-edit">
                <button><span className="material-symbols-outlined symbol">arrow_back</span></button>
                <button><span className="material-symbols-outlined symbol">arrow_forward</span></button>
                <button onClick={()=> editOnClick(card_id)}><span className="material-symbols-outlined symbol">edit</span></button>
                <button onClick={()=> deleteOnClick(card_id)}><span className="material-symbols-outlined symbol">delete</span></button>
           </div>
           

        </div>
    );
}


// card loader
export const CardDetailsLoader = async ({ params }) => {

    const { card_id } = params
    const cookie_key = 'flash_user';

    if(read_cookie(cookie_key).length===0)
        return

    const  user  = read_cookie(cookie_key)
    const res = await axios('http://localhost:8000/cards/'+card_id, { 
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`}
                            });
    const data = await res.data;
    if(data){
        return data;
    }else return
}