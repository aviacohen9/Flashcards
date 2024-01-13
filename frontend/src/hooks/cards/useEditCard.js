import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//app context + hooks
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useCardsContext } from './useCardsContext';

/**
 * A costum hook that edits a card by validating user's autentication first + dispatch cset card action
 * @returns editCard function and an error
 */

export const useEditCard = () => {
    
    const { dispatch } = useCardsContext()
    const { user } = useAuthContext()
    const [error , setError ] = useState(null)
    const { card_id } = useParams() 
    
    /**
     * @async @function  editCard editing a new card
     * @param {String} question 
     * @param {String} answer 
     * @param {String} explanation 
     * @param {Array{String}} allSubjects 
     */
    const editCard = async (question, answer, explanation, allSubjects) => {
        
        //reset the error every submission
        setError(null)

        if(!user){
            setError('Unauthorized action. Please log in.')
            return
        }
        try {
            const res = await axios.patch(
                'http://localhost:8000/cards/editcard/'+card_id,
                { question, answer, explanation, allSubjects },
                { 
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`}
                },
                
                );

            const data = await res.data

            dispatch({type: 'SET_CARDS', payload: data})
        }
        catch (err) {
            if(err.response.data)
                setError(err.response.data)
        }
    }


    return { editCard, error}
}