import React from 'react'
import PropTypes from 'prop-types'

import './Card.css'


function Card ({image, index}) {
    return (
        <div className='card'>
            <img src={image} alt='La jolie fleur'/>
        </div>
    )
}


Card.propTypes = {
    card: PropTypes.string,
    index: PropTypes.number
}

export default Card