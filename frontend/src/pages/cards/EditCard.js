import { useLocation } from 'react-router-dom';
import { useEditCard } from '../../hooks/cards/useEditCard';
import CardForm from "../../components/cards/CardForm";

const EditCard = () => {

    const location = useLocation();

    const title = "Let's make some changes...";
    const btnTitle= 'Update';
    const variant = {
                    mainColor: "#FFF4E5",
                    secondaryColor: "#FFA117",
                    symbol: "contract_edit",
                    text: "Card details were successfully updated. "
    }

    const { editCard, editError } = useEditCard()

    return (
        
        <div>
            <CardForm card={location.state.card} title={title} btnTitle={ btnTitle } variant={variant} cardFunction={editCard} error={editError} />
        </div>
    );
}
 
export default EditCard;