import { createContext, useReducer, useEffect } from 'react'
import { read_cookie } from 'sfcookies';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

useEffect(() => {

  //extract user details from cookies
  const cookie = 'flash_user'
  const user = read_cookie(cookie)

  //update payload
  if (user!==null &&  user !==undefined && user.length!==0) {
     dispatch({ type: 'LOGIN', payload: user }) 
  }
}, [])
  
return (
  
  <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
  </AuthContext.Provider>
  )

}