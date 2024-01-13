import {  Link } from 'react-router-dom'

//style
import '../../styling/Home.css'

/**
 * 
 * @returns A Footer component filled with links to contact info & general page such as AboutUs and TermsOfUse
 * Displays on of the bottom of the home page for a non-authenticated user
 */

const Footer = () => {
    return(
            <div className='footer'>
                <div className="about_us">
                    <h3>About us</h3>
                    <Link to="aboutUs" style={{textDecoration: 'none'}} ><p>Who We Are</p></Link>
                    <Link to="termsOfUse" style={{textDecoration: 'none'}} ><p>Terms Of Use</p></Link>
                </div>

                <div className="contact">
                    <h3>Stay Connected</h3>
                    <Link to="/"><span className="material-symbols-outlined">mail</span> </Link>
                </div>
                
                <p style={{fontSize: '12px'}} >© 2023 Flashcards.   All rights reserved.</p>
            </div>
    )
}

export default Footer;