import React from 'react'
import PropTypes from 'prop-types'

import './Card.css'

import card1 from './images/CartesFleuries_anemone-de-mer_signed.jpg'

function Card ({card, feedback, index, onClick}) {
    return (
        <div className='card'>
            <img src={card1} alt='La jolie fleur'/>
        </div>
    )
}

Card.defaultProps = {
    card: {card1},
    feedback: 'hidden'

}

Card.propTypes = {
    card: PropTypes.object,
    feedback: PropTypes.oneOf([
        'hidden',
        'visible',
        'justMatched',
        'justMisMatched'
    ]),
    index: PropTypes.number,
    onClick:PropTypes.func
}

export default Card