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
const VISUAL_PAUSE_MSECS = 750

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
    currentPair: [],
    indexmatched: [],
  }

  generateCards() {
    const result = []
    const size = HEIGHT * WIDTH
    const candidates = shuffle(SYMBOLS)

    while (result.length < size) {
      const im = candidates.pop()
      result.push(im, im)
    }

    return shuffle(result)
  
  }

  handleCardClick = index => {

    const { currentPair } = this.state

    if(currentPair.length === 0) {
      this.setState({ currentPair: [ index]})
      return
    }

    if( currentPair.length === 2) {
      return
    }

    this.handNewPairCloseBy(index)

  }

  handNewPairCloseBy(index){
    const {cards, currentPair, indexmatched } = this.state
    const newPair = [currentPair[0], index]
    this.setState({currentPair: [newPair[0], newPair[1]]})

    if (cards[newPair[0]] === cards[newPair[1]]) {
      this.setState({indexmatched: [ ...indexmatched, ...newPair]})
      this.setState({currentPair : []})
    } else{
      setTimeout(() => (this.setState({currentPair: []}), VISUAL_PAUSE_MSECS))
    }

  }

  getCardFeedBack(index) {
    const { currentPair, indexmatched } = this.state

    if(indexmatched.includes(index)){ return 'visible'}
    if(currentPair.includes(index)){return 'visible'}
    return 'hidden'
    
    
  }


  render(){
    console.log("render de APP")
    const {cards, currentPair, indexmatched} = this.state
    console.log("Etat de app cards: " + cards)
    console.log("Etat de App currentPair: " + currentPair)
    console.log("état de indexMatched : " + indexmatched)
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
