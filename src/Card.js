import React from 'react'
import PropTypes from 'prop-types'

import './Card.css'


function Card ({image, feedback, index}) {
    return (
        <div className={`card ${feedback}`}>
            <img src={image} className={feedback} alt='La jolie fleur'/>
            
        </div>
    )
}


Card.propTypes = {
    card: PropTypes.string,
    feedback: PropTypes.oneOf([
        'hidden',
        'visible',
        'justmacthed',
        'justmismatched'
    ]),
    index: PropTypes.number
}

Card.defaultProps = {
    feedback :'hidden'
}

export default Card