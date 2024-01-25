import { useRef } from 'react'

//style
import '../styling/Home.css';

//components
import Footer from '../components/homepage/Footer';
import Faq from '../components/homepage/Faq'

const LandingPage = () => {

    const data = [ {q:'Question1', a:'Answer1'}, {q:'Question2', a:'Answer2'}, {q:'Question3', a:'Answer3'}]
    
    const ref = useRef(null);

    //scrool down to FAQ
    const handleClick = () => {
      ref.current?.scrollIntoView({behavior: 'smooth'});
    };

  /*
    const { cards, dispatch  } = useCatdsContext()

    useEffect(() => {
        const fetchCards= async () => {
          const response = await fetch('http://localhost:8000/cards/')
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_CARDS', payload: json})
          }
        }
    
        fetchCards()
      }, [dispatch])
*/
    return ( 
      <div className="home">

          <div className="opening back">
                  <div className="yellow"></div>
                  <div className="topdots"></div>
                  <div className="personal-info">
                      <p>Let's make studying easy</p>
                      <h2>Brush up on what you know with flash cards</h2>
                      <p className='descrp'>All the tools you need to build confidence, double your chances at top exam scores<br/>
                        All the tools you need to build confidence, double your chances at top exam scores, double your chances at top exam scores
                      </p>
                      <button className='practice_btn' onClick={handleClick}>Explore More</button>
                      
                  </div>
                  <div className="bottomdots"></div>
                  <div className="pink"></div>
          </div>
          
          <div ref={ref}>
              <Faq data={data} />
          </div>

          <Footer/>
      </div>

     );
}
 
export default LandingPage;