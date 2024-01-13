import {  Link, NavLink } from 'react-router-dom'

//app hooks
import { useLogout } from '../hooks/auth/useLogout'
import { useAuthContext } from "../hooks/auth/useAuthContext";

/**
 * @returns A Navbar component display on each and every page. Contained in the App root component.
 */

const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick =()=>{
      logout()
    }


    return ( 
          <nav className="navbar">
            
            <Link to="/"><h1>FlashCards</h1></Link>
            
            <div className="links">
                {user?
                (
                  <div> 
                    <button className="logout_button" onClick={handleClick}>Log out</button>
                    </div>
                ):
                 (
                    <div>
                          <NavLink to="login">Login</NavLink>  
                          <NavLink to="signup">Sign Up</NavLink>
                    </div>  
                )}
            </div>
          </nav>
     );
}
 
export default Navbar;

