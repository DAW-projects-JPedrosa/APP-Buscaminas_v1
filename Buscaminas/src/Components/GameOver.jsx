import { useState} from 'react';

function GameOver({win}) {
  const [isVisible, setIsVsible] = useState(true);

  function closeMessage(){
    setIsVsible(false);
  }

    return isVisible?(
        <>
          <div id='game-over-msg' className={win? 'win': 'lost'}>
            <div className='game-over'>{win? 'Has ganado': 'Has perdido'}</div>
            <button className='close' onClick={closeMessage}>Cerrar</button>
          </div>
        </>
      ) : null;
}

export default GameOver;