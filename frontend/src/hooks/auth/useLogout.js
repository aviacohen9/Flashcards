import { useNavigate } from "react-router-dom";
import { delete_cookie, read_cookie } from 'sfcookies';

//app context + hooks
import { useAuthContext } from './useAuthContext'
import { useCardsContext } from '../cards/useCardsContext'


/**
 * @returns a costum hook the log the user out by removing token from the user's cookies + dispatch logout action & set empty array action
 */


export const useLogout = () => {
  
    const { dispatch } = useAuthContext()
    const { dispatch: cardsDispatch } = useCardsContext()
    const navigate = useNavigate();

    const logout = () => {

      // remove user from cookies
      const cookie = 'flash_user'
      delete_cookie(cookie)
      console.log('from the nav logout '+read_cookie(cookie))

      //dispatch logout action
      dispatch({ type: 'LOGOUT' })

      //dispatch set cards action - clear user's cards
      cardsDispatch({ type: 'SET_CARDS' , payload: []})

      //redirect to homepage
      navigate('/');
    }

  return { logout }
}