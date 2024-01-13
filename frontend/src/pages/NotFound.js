import { Link } from "react-router-dom";

const NotFound = () => {
    return (  
        <div className="not-found">
            <h2>Oops. Look like you're lost...</h2>
            <p>That Page Cannot Be Found</p>
            <Link to="/">Back to the homepage...</Link>
        </div>
    );
}
 
export default NotFound;
