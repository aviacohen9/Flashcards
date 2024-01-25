import { useState } from "react";
import axios from "axios";

//app context + hooks
import { useCardsContext } from './useCardsContext';
import { useAuthContext } from "../../hooks/auth/useAuthContext";

/**
 * a costum hook that deletes a card by validating user's autentication first + dispatch delete card action
 * @returns deleteCard function and an error
 */

export const useDeleteCard = () => {

    const { dispatch } = useCardsContext()
    const { user } = useAuthContext()
    const [error , setError ] = useState(null)

    /**
     * @async @function  deleteCard deleting a card by a given card id
     * @param {String} card_id 
     */
    const deleteCard = async (card_id) => {
        
        //reset the error every submission
        setError(null)
        if(!user){
            setError('User is not authenticated. Please log in.')
            return
        }

        try {
            const res = await axios.delete('/cards/'+card_id, { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }}
            );
            const data = await res.data
            dispatch({type: 'DELETE_CARD', payload: data._id})
        }
        catch (err) {
            if(err.response.data)
                setError(err.response.data)
        }
    }


    return { deleteCard, error}
}