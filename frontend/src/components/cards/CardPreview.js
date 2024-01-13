import { Link } from 'react-router-dom'

 /**
 * @prop @param { Object { card } } card
 * @prop @function editCardOnClick @param { Object } card This function navigates to the card page by card id & sends card's details for editing
 * @prop @function deleteCardOnClick @param { String } card_id This function removes card from the DB
 * 
 * @returns A card preview component. Only shows as a part of a list.
 */ 

const Card = ( { card, editCardOnClick, deleteCardOnClick} ) => {
    return ( 
    <div key={card._id}>
        <div className="multi-button">
                <button className="fas fa-share-alt"  onClick={()=>editCardOnClick(card)}>
                    <span className="material-symbols-outlined symbol">edit</span>
                </button>
                <button className="fas fa-trash" onClick={()=>deleteCardOnClick(card._id)}>
                    <span className="material-symbols-outlined symbol" >delete</span>
                </button>
        </div>
        
        <div className="space">.</div>
        <div className="container"></div>
        <div className="card_content">
                <h3 >{card.question}</h3>
                <h5>{card.answer}</h5>
                <Link to={card._id}><button>practice</button></Link>
        </div>
    </div>
    );
}
 
export default Card;