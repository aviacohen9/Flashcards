
/**
 * 
 * @prop @param {String} title Text descibing what the user should 
 * @prop @param {String} field The variable that holds user's information in that field
 * @prop @param {String} type Describes what kind of input the user should enter
 * @prop @param {Boolean} required Detects whether the information requires is a must in order to submit the form
 * @prop @param {String} error Describes error that should be fixed
 * @prop @function onChangeField A function that takes the user input from keyboard on show it to the user
 * 
 * @returns An input component with a title label, describing the user 
 */

const Input = ( {title, field, type, required, error, onChangeField}) => {
    return ( 
            <div>
                <label>{ title }:</label>
                <input  title={ field }
                        type={type}
                        required={required} 
                        value={field}
                        onChange={onChangeField}/>
                {error && <label className="error">{ error }</label>}
            </div>
    );
}
 
export default Input;