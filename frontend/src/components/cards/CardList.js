//app component
import CardPreview from "./CardPreview";

//style
import '../../styling/CardsList.css'

/**
 * @prop @param { Array {Card} } cards Array of card objects
 * @prop @param { Array { Object{ {String: title, Boolean: filter}}} } subjects Distinct array of string
 * @prop @function filterBySubject @param { Object {String: title, Boolean: filter} } itemToRemove This funcion updates subject list by given a given filter and filters the cards display on the page accordingly
 * @prop @function editCardOnClick @param { Object{Card} } card This function navigates to the card page by card id & sends card's details for editing
 * @prop @function deleteCardOnClick @param { String } card_id This function removes card from the DB
 * @returns A list component to display all user's cards.
 */

const CardList = ({ cards, subjects, filterBySubject, editCardOnClick, deleteCardOnClick}) => {
    return ( 
        <div>

            <div className="filtered-categories">
                {subjects && subjects.map(subject=>(
                        <div className="button-perspective inline-icon" key={subject.title} onClick={()=>filterBySubject(subject)}>
                            <h2 style={subject.filter?{fontWeight: "bold"}:{fontWeight: "lighter"}}>{ subject.title }</h2>
                                {subject.filter?
                                (<span className="material-symbols-outlined symbol">select_check_box</span>)
                                :(<span className="material-symbols-outlined symbol">check_box_outline_blank</span>)}
                        </div>
                ))}
            </div>

            <div className="cards">
                    {cards && cards.map(card => (
                        <div className="card_preview" key={card._id} >
                            <CardPreview card={ card } deleteCardOnClick={deleteCardOnClick} editCardOnClick={editCardOnClick}/>
                        </div>
                    ))}
            </div>
        </div>
     );
}
 
export default CardList;