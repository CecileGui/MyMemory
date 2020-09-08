import React, { Component } from 'react';
import './App.css';
import shuffle from 'lodash.shuffle'
import Card from'./Card'

/**
 * Les chemins vers images représenatnt les cartes du jeu
 */
import im1 from './images/im1.jpg'
import im2 from './images/im2.jpg'
import im3 from './images/im3.jpg'
import im4 from './images/im4.jpg'
import im5 from './images/im5.jpg'
import im6 from './images/im6.jpg'

// Tableau contenant tous les chemins des imagesq
const SYMBOLS = [
  im1,
  im2,
  im3,
  im4,
  im5,
  im6
]

/**
 * Hauteur plateau
 * largeur plateau
 * Temps pendant lequel une carte est visible avant d'être masquée, si les deux cartes retournées n'étaient pas identiques
 */
const HEIGHT = 3
const WIDTH = 4
const VISUAL_PAUSE_MSECS = 750




class App extends Component {

  /**
   * cards : toutes les images en double, mélangées à chaque nouvelle partie
   * currentPair : la paire de carte retournée. Contient une puis deux cartes au fur et à mesure qu'elles sont retournées
   * indexmatched : la liste de tous les index de cartes trouvées (une paire trouvée => 2 index ajoutés)
   */
  state = {
    cards: this.generateCards(),
    currentPair: [],
    indexmatched: []
  }

  /**
   * A partir de la liste liste de SYMBOLS, un symbole étant un string représentant le chemin d'accès à une image
   * Génère un tableau contenant une paire de chaque symbole, mélangé aléatoirement 
   */
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

  /**
   * Gère le clique sur une carte 
   * cas 1: aucune carte n'est retournée, la carte cliquée est retournée
   * cas 2: une carte était déjà retourné, traduit par currentPair[] contient une carte : appel à la fonction handleNewPairClosedBy
   * cas 3: 2 cartes sont déjà retournées, traduit par currentPair[] contient deux cartes : rien ne se passe 
   * @param {*} index unique représentant la carte cliquée
   */
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

  /**
   * Fonction appelée lorsque 2 cartes sont retournées
   * Elles sont identiques : cartes ajoutées à la liste des cartes trouvées, currentPair[] vidé
   * Elles sont différentes : currentpair[] vidé
   * @param {*} index unique représentant la carte cliquée
   */
  handNewPairCloseBy(index){
    console.log(" -----------------------------------------------Fonction handNewPairCloseBy début")

    const {cards, currentPair, indexmatched } = this.state
    const newPair = [currentPair[0], index]
    this.setState({currentPair: [newPair[0], newPair[1]]})
    
    // cartes identiques
    if (cards[newPair[0]] === cards[newPair[1]]) {
      console.log("Cartes identiques")
      // les index des cartes trouvées sont rajoutés à la liste contenant tous les index trouvés (indexmatched)
      this.setState({indexmatched: [ ...indexmatched, ...newPair]})
      // currentPair[] est vidé
      this.setState({currentPair : []})
    } else{
      console.log("cartes différentes")
      // currentPair[] est vidé après un certain temps pour que le joueur est le temps de visualisé les cartes
      
      setTimeout(() => {
        console.log("TIMEOUT")
        this.setState({currentPair: []})
      }, VISUAL_PAUSE_MSECS);
    }
    console.log("------------------------------------------------------------ Fonction handNewPairCloseBy fin")
  }


  /**
   * Fonction qui renvoie l'état d'une carte, visible ou cachée
   * @param {*} index unique représentant la carte
   */
  getCardFeedBack(index) {
    const { currentPair, indexmatched } = this.state

    if(indexmatched.includes(index)){ return 'visible'}
    if(currentPair.includes(index)){return 'visible'}
    return 'hidden'
    
    
  }

  /**
   * Surveille si la partie est gagnée
   * Condition de victoire : toutes les cartes sont retournées
   */
  isTheGameOver() {
    console.log("FONCTION IS THE GAME OVER")
    
    const {cards, indexmatched } = this.state
    console.log("indexMatched.length : " + indexmatched.length)
    if( indexmatched.length === cards.length){
      return true
    }
    return false
  }

  render(){
    console.log("render de APP")
    const {cards, currentPair, indexmatched} = this.state
    const victory = this.isTheGameOver()
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
        {victory && (
          <h2>!!! VICTORY !!!</h2>
        )}       
      </div>
    )
    
  }
}

export default App;
