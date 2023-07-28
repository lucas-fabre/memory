import './Cards.css'

export default function Cards({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }
    
    return (
    <div className='card'>
        <div className={flipped ? "flipped" : ""}>
            <img className='front' src={card.src} alt='front card'/>
            <img 
                className='back' 
                src='/img/backcard.png' 
                onClick={handleClick} 
                alt='back card'
            />
        </div>
    </div>   
    )
}