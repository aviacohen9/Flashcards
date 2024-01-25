import {  Link } from 'react-router-dom'
import moment from 'moment';

const PreviewLatestElements = ({isLoading, elementsList, elementTitle}) => {
    console.log()
    return ( 
        <div>
                {  ( isLoading && !elementsList)?
                (<h2>Loading...</h2>)
                :(<div className='latest_elements'>
                    <div className='elements_title'>
                        <h1>Your Latest {elementTitle}</h1>
                        <Link style={{ textDecoration: 'none'}}  to="/cards/"><h3 >View All</h3></Link>
                    </div>

                    <div className='grid_column'>
                        {elementsList && elementsList.map(element => (
                            <div className='element_preview' key={element._id}> 
                                <h6>Created {moment(element.createdAt).fromNow()}</h6>
                            </div>
                        ))}  
                        <Link to="/cards/addcard/"><span className="material-symbols-outlined symbol add_card_span"
                        style={elementsList?{position: 'sticky', bottom: '40%', left: '91%'}:{display: 'none'}} >shadow_add</span></Link>
                    </div>

                    
                </div>)}

                {   !isLoading 
                    && !elementsList 
                    &&  <div className="noDataMessage">
                            <h4>No cards were added yet.<br/>
                            You can create some cards <Link style={{textDecoration: 'none'}} to={"/cards/addcard"}>here.</Link></h4>
                        </div>
                }
        </div>
     );
}
 
export default PreviewLatestElements;