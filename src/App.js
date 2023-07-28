import { useState, useEffect } from 'react';
import './App.css';
import header from './img/header.png';
import Otacon from './components/otacon/Otacon';
import Cards from './components/card/Cards';
import './fonts/dogicapixel.ttf'

const cardImages = [
  {"src": "/img/pics-card/buffalo.png", matched: false},
  {"src": "/img/pics-card/cheetah.png", matched: false},
  {"src": "/img/pics-card/raven.png",   matched: false},
  {"src": "/img/pics-card/sparrow.png", matched: false},
  {"src": "/img/pics-card/panther.png", matched: false},
  {"src": "/img/pics-card/octopus.png", matched: false}
]

const otaconGif = [
  {"src": "/img/otacon/gif_base.gif"},
  {"src": "/img/otacon/gif_missed.gif"},
  {"src": "/img/otacon/gif_think.gif"},
  {"src": "/img/otacon/gif_thumb.gif"},
]

export default function App() {
  
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [otacon, setOtacon] = useState(otaconGif[0])

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    
    // Reset choices
    setChoiceOne(null)
    setChoiceTwo(null)
    setOtacon(otaconGif[0])
    setCards(shuffledCards)
  }

  // Handle a card choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Otacon animation when the first card is selected (not working)
  useEffect(() => {
    // If the first card is selected
    if (choiceOne) {
      setOtacon(otaconGif[2])
    }
  }, [choiceOne, setOtacon])

  // Compare two selected cards
  useEffect(() => {
    // If both choices are not null
    if (choiceOne && choiceTwo) {
      // Disable cards during the comparison
      setDisabled(true)
      // If the two cards are the same
      if (choiceOne.src === choiceTwo.src) {

        // Otacon animation play and reset after 3 seconds
        setOtacon(otaconGif[3])
        setTimeout(() => resetOtacon(), 3000)

        // Set matched to true and reset choices
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {            
              return {...card, matched: true}
            }
            else {
              return card
            }
          })
        })
        // Reset choices after 1 second
        resetTurn()
      } else {
        // Otacon animation and reset after 3 seconds
        setOtacon(otaconGif[1])
        setTimeout(() => resetOtacon(), 3000)

        // Reset choices after 1 second
        setTimeout(() => resetTurn(), 1000)
      }
    }
    // Define the dependencies of useEffect (setOtacon is used to maintain the animation)
  }, [choiceOne, choiceTwo, setOtacon])

  // Shuffle cards at the beginning of the game
  useEffect(() => {
    shuffleCards()
  }, [])

  // reset choices after each turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }

  // reset Otacon animation after each turn
  const resetOtacon = () => {
    setOtacon(otaconGif[0])
  }

  return (
    <div className='App'>
      <header id='header'>
        <img id='headerpic' src={header} alt='header'/>
      </header>
      
      <div className='body'>
        <div id='side'>
          <div className='otacon'>
            <Otacon
              otacon={otacon}
            />
          </div>
          <p className='textside'>Aide Venom Snake à <br/> retrouver tous les <br/> membres de la <br/> Motherbase !</p>
        </div>

        <button onClick={shuffleCards}>Nouvelle Partie</button>

        <div className='playground'>
          {cards.map(card => (
            <Cards 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}