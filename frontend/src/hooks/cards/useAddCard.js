import { useState } from "react";
import axios from "axios";

//app context + hooks
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useCardsContext } from './useCardsContext';

/**
 * A costum hook that adds a new card by validating user's autentication first + dispatch create a card action
 * @returns addCard function and an error
 */

export const useAddCard = () => {

    const { dispatch } = useCardsContext()
    const [ error , setError ] = useState(null)
    const { user } = useAuthContext()

    /**
     * @async @function  addCard adding a new card
     * @param {String} question 
     * @param {String} answer 
     * @param {String} explanation 
     * @param {Array{String}} allSubjects 
     */
    const addCard = async (question, answer, explanation, allSubjects) => {
        
        //reset the error every submission
        setError(null)

        if(!user){
            setError('Unauthorized action. Please log in.')
            return
        }

        try {
            const res = await axios.post('/cards/addCard',
                                        { question, answer, explanation, allSubjects },
                                        { headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${user.token}`}
                                        });
            const data = await res.data

            dispatch({type: 'CREATE_CARD', payload: data})
        }
        catch (err) {
            if(err.response.data)
                setError(error.response.data)
        }
    }


    return { addCard, error}
}