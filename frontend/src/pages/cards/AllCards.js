import { useEffect, useState } from "react";
import { useNavigate, useLoaderData, Link } from "react-router-dom";
import axios from "axios";

//app hooks
import { useDeleteCard } from '../../hooks/cards/useDeleteCard'
import { useCardsContext } from "../../hooks/cards/useCardsContext";

//app components
import CardList from "../../components/cards/CardList";
import Alert from '../../components/Alert';

//style
import '../../styling/Cards.css'

/**
 * @returns a page that display all user's cards with a filter option
 */

const AllCards = () => {
    
    const navigate = useNavigate();
    const  user  = useLoaderData()

    const { cards, dispatch } = useCardsContext()
    const { deleteCard, error} = useDeleteCard()

    const [ subjects , setSubjects ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [alert, setAlert] = useState(false)
    const [cardsToDisplay, setCards] = useState(cards)
    const variant = {
                    mainColor: "#FFC0CB",
                    secondaryColor: "#FF69B4",
                    symbol: "delete",
                    text: "Card was successfully deleted. "
    }



    /**
     * @function deleteCardOnClick delete card 
     * @param {String} card_id 
     */
    const deleteCardOnClick = async(card_id) =>{
        
        await deleteCard(card_id)
        if(error) {
            console.log(error) 
            return
        }
        
        setCards(cardsToDisplay.filter(card =>  card._id!==card_id));
        setAlert(true)
    }

    /**
     * @function editCardOnClick navigets to an edit card page with the card information 
     * @param {Object{Card}} card 
     */
    const editCardOnClick = (card) =>{
        navigate('/cards/editcard/'+card._id, { state: { card: card } });
    }

    /**
     * @function filterBySubject update selected subjects by the user and update cardsToDisplay on the screen accordingly
     * @param {String} itemToRemove 
     */
    const filterBySubject = (itemToRemove) => {  

        //update filtered subjects
        const filteredSubjects = subjects.map((subject) => {
            if (subject.title === itemToRemove.title) {
              return  ({...subject, title:itemToRemove.title, filter:!itemToRemove.filter });
            } else return subject;
        });
        setSubjects(filteredSubjects);

        //update cards to display according to filtered subjects
        let tempArray =[];
        cards?.forEach( (card) => {
            card['allSubjects']?.forEach((sub)=>{
                filteredSubjects?.forEach(filteredSub=>{
                    if(filteredSub.filter && sub.includes(filteredSub.title) && tempArray.length===0){
                        tempArray.push(card)
                    }else if(filteredSub.filter && sub.includes(filteredSub.title) && !tempArray.includes(card) )
                        tempArray.push(card)
                })
            })
        });
        if(tempArray.length===0)
            setCards(cards)
        else setCards(tempArray)
    }


    

    /**
     * fetch all user's cards every render
     * update cards list & distict subjects list so the user can filter cards
     */
    useEffect(()=>{

        const setAllSubjects = (cards) =>{
            let tempArray =[];
            cards?.forEach( (card) => {
                card['allSubjects']?.forEach((sub)=>{
                    if(tempArray.length===0){
                        tempArray.push({ title: sub, filter: false} )
                    }else if(tempArray && !tempArray.some(object=>object.title===sub))
                        tempArray.push({ title: sub, filter: false} )
                })
            });
            return tempArray;
        }

        const fetchCards = async () =>{
            try {
                const res = await axios('http://localhost:8000/cards', { 
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${user.token}`
                                        }
                });
                const data = await res.data
                setIsLoading(false)
                dispatch({type:'SET_CARDS', payload: data})
                setCards(data)
                setSubjects(setAllSubjects(data))
            }
            catch (errors) {
                console.log(errors)
            }
        }

        fetchCards()
        
    },[dispatch, user])

    return ( 
        <div>
                {   isLoading && cardsToDisplay.length===0?
                        (<h1 className="loading">Loading...</h1>)
                        :(<CardList cards={cardsToDisplay}
                                    filterBySubject={filterBySubject}
                                    subjects={subjects}
                                    deleteCardOnClick={deleteCardOnClick}
                                    editCardOnClick={editCardOnClick}/>)
                }
                {   !isLoading 
                    && cardsToDisplay.length===0 
                    && <h4>You have'nt created any card yet. Youc can create a new one
                        <Link style={{textDecoration: 'none'}} to={"/cards/addcard"}> here.</Link></h4>
                }
            { alert && <Alert variant={variant} />}
        </div>
     );
}
export default AllCards;