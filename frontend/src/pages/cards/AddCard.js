//app component
import CardForm from '../../components/cards/CardForm'

//app hook
import { useAddCard } from "../../hooks/cards/useAddCard";

//style
import '../../styling/Cards.css'

/**
 * @returns create card page
 */

const AddCard = () => {

    const title = 'What question should we practice next?';
    const btnTitle= 'Create';
    const variant = {   mainColor: "#EDFEEE",
                        secondaryColor: "#5CB660",
                        symbol: "library_add",
                        text: " New card was successfully added. "}
    const { addCard, addError } = useAddCard()
   


    return ( 
        <div > 
            <CardForm  title={title} btnTitle={ btnTitle } variant={variant} cardFunction={addCard} error={addError} />
        </div>
     );
}
 
export default AddCard;