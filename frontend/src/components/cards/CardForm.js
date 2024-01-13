import { useState } from "react";

//app components
import Alert from '../Alert'
import Input from '../Input'

//style
import '../../styling/Cards.css'

/**
 * @prop @param { Object {card} } card 
 * @prop @param { String } title Form title
 * @prop @param { String } btnTitle Button title describes user submission
 * @prop @param { Object { variant { mainColor: String, secondaryColor:String, symbol:String, text:String } } } variant Alert variant to display to the user
 * @prop @function cardFunction This function is a costum hooks that either create / edit card
 * 
 * @returns A form component to create / edit card 
 */

const CardForm = ({ card, title, btnTitle, variant, cardFunction}) => {

    const [ question, setQuestion] = useState(card?card.question:'')
    const [ answer, setAnswer ] = useState(card?card.answer:'')
    const [ explanation, setExplanation ] = useState(card?card.explanation:'' )
    const [ allSubjects , setAllSubjects ] = useState(card?card.allSubjects:[])
    const [ subject, setSubject ] = useState('')
    const [ alert, setAlert]  = useState(false)
    const [ errors, setErrors ] = useState({ question:'', answer:'', email: '', explanation: '', subject:''})


    /**
     * This function adds / edits a card, depend on the component task. Task is activated by a given costum hooks on component's props.
     * @function handleSubmit
     * @param {EventObject} e
     */
    const handleSubmit = async (e) => {
        
        //prevent that default action of the form when we submit a form which is to refresh the page
        e.preventDefault();

        //reset  & alert every submission
        setErrors({ question:'', answer:'', email: '', explanation: '', subject:''})
        setAlert(false)

        
        try{
            //fetching data
            await cardFunction(question, answer, explanation, allSubjects)

            //reset card's fields
            setQuestion('')
            setAnswer('')
            setExplanation('')
            setAllSubjects([])

            //display alert message 
            setAlert(true)
            //show the user a success message (+option to continue adding / go to homepage)
        }catch(err){
            console.log('error: '+err)
        }
    }

    /**
     * This function adds new subject before form submissio to a new distict subjects list 
     * @function addSubjectByKeyPress
     * @param { EventObject} e
     */
    const addSubjectByKeyPress = e => {

        setErrors({ errors, question:'', answer:'', email: '', explanation: '', subject: ''})

        if (e.key === "Enter" && subject!=null) {
            e.preventDefault();
            if(subject===''){
                setErrors({ errors, question:'', answer:'', email: '', explanation: '', subject: 'Please add a subject.'})
            }else if (allSubjects.includes(subject)) {
                setErrors({ errors, question:'', answer:'', email: '', explanation: '', subject: 'Oops... '+subject+' was already added.'})
            } else {
                setAllSubjects(subjects => [...subjects, subject])
                setSubject('')
            }
            
        }
    };

    /**
     * This function removes subject added by the user before form submission
     * @function removeSubjecFromList 
     * @param {String} itemToRemove 
     */
    const removeSubjecFromList = (itemToRemove) => {                               
        let filteredArray = allSubjects.filter(s => s !== itemToRemove)
        setAllSubjects(filteredArray)
      }
    

    const listItems = allSubjects.map((item) => <li key={item}>
                                                    <div >
                                                        <p>{item}</p>
                                                                <span className="material-symbols-outlined symbol inline-icon"
                                                                        onClick={(e) => removeSubjecFromList(item)}>close</span>
                                                       
                                                    </div>
                                                </li>);

    return ( 
        <div>
        <div className="create">
            
            <form onSubmit={handleSubmit}>
                
                <h2>{title}</h2>

                <Input title={'Questaion:'} field={question} onChangeField={(e)=>setQuestion(e.target.value)} error={ errors.question } type={'text'} required={true}/>

                <Input title={'Answer:'} field={answer} onChangeField={(e)=>setAnswer(e.target.value)} error={ errors.answer } type={'text'} required={true}/>

                <Input title={'Explanation:'} field={explanation} onChangeField={(e)=>setExplanation(e.target.value)} error={ errors.explanation } type={'text'} required={false}/>
                
                <label>What subjects are related to this question?</label>
                <input  type="text" value={subject} onChange={(e)=>setSubject(e.target.value)} onKeyPress={addSubjectByKeyPress}/>
                <label className="error">{ errors.subject }</label>
                
                <button >{ btnTitle }</button>
            </form>

            <ul >{listItems}</ul>
        </div>
        { alert && <Alert variant={variant} />}
        </div>
      );
}
 
export default CardForm;