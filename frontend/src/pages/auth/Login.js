import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { bake_cookie } from 'sfcookies';
import axios from "axios";

//app hook
import { useAuthContext } from "../../hooks/auth/useAuthContext";

//app component
import Input from "../../components/Input";

//style
import '../../styling/Auth.css'


/**
 * @returns a login page
 */


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ errors, setErrors ] = useState( { email: '', password: '' });
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const cookie = 'flash_user';

    
    /**
     * @async @function login
     * @param { EventObject } e 
     */
    const login = async (e) => {

        //prevent that default action of the form when we submit a form which is to refresh the page
       e.preventDefault();                

       //reset the errors every time we press submit
       setErrors( { ...errors ,email: '', password: '' })
       
       //fetching data
       try{
            const res = await axios.post('/login',
                                    { email, password },
                                    {headers: {
                                            'Content-Type': 'application/json'}
                                    });
                       
               const data = await res.data;

               //save user to cookies
               bake_cookie(cookie, data);

               //update the auth context
               dispatch({type: 'LOGIN', payload: data})

               //redirect
               navigate('/homepage');
               
       }catch(err){
            if(err.response.data.errors)
                setErrors({
                            ...errors,
                            email: err.response.data.errors.email,
                            password: err.response.data.errors.password})
        
       }
       
   }

    return (  
            
        <div className="login">
            
            <form onSubmit={login}>

                <h2>Log In</h2>
                
                <Input title={'Email'} field={email} onChangeField={ (e) => setEmail(e.target.value) } error={ errors.email } type={'email'} required={true}/>

                <Input title={'Passowrd'} field={password} onChangeField={ (e) => setPassword(e.target.value) } error={ errors.password } type={'password'} required={true}/>

                <button>Log In</button>

            </form>
            
           <footer>Don't have an account yet? <Link to="/signup"> Sign up here </Link></footer>

        </div>
     );
}
 
export default Login;