import React, { Component } from 'react';
import './App.css';
import shuffle from 'lodash.shuffle'
import Card from'./Card'

import im1 from './images/im1.jpg'
import im2 from './images/im2.jpg'
import im3 from './images/im3.jpg'
import im4 from './images/im4.jpg'
import im5 from './images/im5.jpg'
import im6 from './images/im6.jpg'

const HEIGHT = 3
const WIDTH = 4
const SYMBOLS = [
  im1,
  im2,
  im3,
  im4,
  im5,
  im6
]


class App extends Component {

  state = {
    cards: this.generateCards(),
    currentPair: []
  }

  generateCards() {
    console.log("Fonction generateCards")


    const result = []
    const size = HEIGHT * WIDTH
    const candidates = shuffle(SYMBOLS)
    console.log("Variables Début : ")
    console.log("result : "+ result)
    console.log("size : " + size)
    console.log("candidates : " + candidates)
    while (result.length < size) {
      const im = candidates.pop()
      console.log("image : " + im)
      result.push(im, im)
    }

    console.log("Variables fin : ")
    console.log("result : " + result)
    return shuffle(result)
  
  }

  handleCardClick = index => {
    console.log("Entrée HandleCardClick")

    const { currentPair } = this.state

    console.log("CurrentPair : " + currentPair)

    console.log(index, this)

    this.setState({currentPair: [index]})
    console.log("CurrentPair : " + currentPair)
    
  }

  getCardFeedBack(index) {
    console.log("Entrée dans getCardFeedback")

    const { currentPair } = this.state

    console.log("CurrentPair : " + currentPair)

    if (currentPair.includes(index)) {
      console.log("Carte retournée")
      return 'visible'
    } else {
      return 'hidden'
    }
    
  }


  render(){
    console.log("render de APP")
    const {cards, currentPair} = this.state
    console.log("Etat de app : " + cards)
    return(
      
      <div className="memory">
        <h1>Memory</h1>
        <div className="board">
          {cards.map((card, index) => (
            <Card
              image= {card}
              feedback= {this.getCardFeedBack(index)}
              index = {index}
              key= {index}
              onClick = {this.handleCardClick}
            />
          ))}
        </div>       
      </div>
    )
    
  }
}

export default App;
