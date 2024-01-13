import { useState } from 'react'

//style
import '../../styling/Home.css'

/**
 * 
 * @param {Array {Object{a: String, q:String}}} data 
 * @returns An Frequently Asked Questions from the home page for a non-authenticated user. Accordion design.
 */

const Faq = ({data}) => {

    const [ selected , setSelected ] = useState(null)

    const toggle = (i)=>{
        if(selected===i) { return setSelected(null); }
        setSelected(i)
    }

    return(
            <div >
                <h1 className='faqt'>Frequently Asked Questions</h1>
                    <div className="faqwarpper" >
                        
                        <div className="accordion">
                        {data.map((item, i)=>(
                            <div className="faqitem" key={item.q}>
                            <div className="faqtitle" onClick={() =>toggle(i)}>
                                <h3>{ item.q }</h3>
                                <span>{ selected===i?'-' :'+'}</span>
                            </div>
                            <div className={selected===i?'faq show':'faq'}>
                                {item.a}
                            </div>
                            </div>
                        ))}

                        </div>
                    </div>
            </div>
    )
}


export default Faq;