import { useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import { bake_cookie } from 'sfcookies';
import axios from "axios";
import isVarName from 'is-var-name';

//app context+hook
import { useAuthContext } from '../../hooks/auth/useAuthContext';

//app component
import Input from "../../components/Input";

//style
import '../../styling/Auth.css'


/**
 * 
 * @returns a sign up page
 */


const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ errors, setErrors ] = useState( { firstName:'', lastName:'', email: '', password: '' });
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const cookie = 'flash_user';

    
    /**
     * @async @function signUp
     * @param {EventObject} e 
     */
    const signUp = async (e) => {

        //prevent that default action of the form when we submit a form which is to refresh the page
        e.preventDefault();                

        //reset the errors every time we press submit
       setErrors( { ...errors, firstName:'', lastName:'', email: '', password: '' })

        //names validation
       if(!isVarName(firstName) ){
                setErrors( { ...errors, firstName: 'Please fill your first name.', lastName: '', email: '', password: '' })
                return;
        }
        if( !isVarName(lastName) ){
                setErrors( { ...errors, firstName: '', lastName: 'Please fill your last name.', email: '', password: '' })
                return;
        }
        
        //fetching data
        try{
                const res = await axios.post('/signup',
                                        { firstName, lastName, email, password },
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
                                firstName: '',
                                lastName: '',
                                email:err.response.data.errors.email,
                                password: err.response.data.errors.password
                        })
        }
    }

    return (  
            
        <div className="signup">
            
            <form onSubmit={signUp}>

                <h2>Create a new account</h2>

                <Input title={'First Name'} field={firstName} onChangeField={ (e) => setFirstName(e.target.value) } error={ errors.firstName } type={'text'} required={true}/>

                <Input title={'Last Name'} field={lastName} onChangeField={ (e) => setLastName(e.target.value) } error={ errors.lastName } type={'text'} required={true}/>

                <Input title={'Email'} field={email} onChangeField={ (e) => setEmail(e.target.value) } error={errors.email} type={'email'} required={true}/>

                <Input title={'Passowrd'} field={password} onChangeField={ (e) => setPassword(e.target.value) } error={errors.password} type={'password'} required={true}/>

                <button>Sign Up</button>

            </form>
            
            <footer>Already have an account? <Link to="/login"> Login </Link></footer>
        </div>
     );
}
 
export default Signup;