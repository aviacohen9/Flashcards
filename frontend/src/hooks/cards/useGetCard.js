import { useState } from "react";
import axios from "axios";

//app context + hooks
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useCardsContext } from './useCardsContext';

/**
 * A costum hook that gets user's card by validating user's autentication first 
 * @returns getCard function, a card from the DB and an error
 */

export const useGetCard = () => {

    const [ card, setCard ] = useState(null)
    const { user } = useAuthContext()
    const [error , setError ] = useState(null)

    /**
     * @async @function getCard getting a card
     * @param {String} card_id 
     */
    const getCard = async (card_id) => {
        
        //reset the error every submission
        setError(null)

        if(!user){
            setError('Unauthorized action. Please log in.')
            return
        }

        try {
            const res = await axios('http://localhost:8000/cards/'+card_id, { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
            });

            const data = await res.data
            
            setCard(data)    
        }
        catch (err) {
            if(err.response.data)
                setError(err.response.data)
        }
    }


    return { getCard, error, card}
}