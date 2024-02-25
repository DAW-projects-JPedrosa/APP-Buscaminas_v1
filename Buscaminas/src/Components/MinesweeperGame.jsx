import React, { useState } from 'react';
import BoardComponent from './BoardComponent';
import logo from '../assets/mina.png';
import { PulseLoader } from 'react-spinners';
import ApiClient from '../Services/ApiClient';
import Board from '../Domain/Board';

const API_GAME = 'http://localhost:9988';

const MinesweeperGame = () => {
  const [loading, setLoading] = useState(false); 
  const [board, setBoard] = useState(null);

  const handleLevelClick = (selectedLevel) => {
      fetchData(selectedLevel);
  }

  const fetchData = async (level) =>{
    const api = new ApiClient(API_GAME);
    try{
      setLoading(true);
      const data = await api.getLevel(level);
      setLoading(false);
      setBoard(new Board(data.rows, data.columns, data.mines, level));
    }catch(error){
      setLoading(false);
      console.error('Error fetching level data: ', error);
    }
  }

  return (
    <div className="container">
      {board === null && !loading? (
        <div>
          <div className='title'>BUSCAMINAS</div>
          <div className='buttons-container'>
            <img className='logo' src={logo}/>
            <h1>Elige un nivel de dificultad</h1>
            <button className='game-button' onClick={() => handleLevelClick(0)}>Fácil</button>
            <button className='game-button' onClick={() => handleLevelClick(1)}>Medio</button>
            <button className='game-button' onClick={() => handleLevelClick(2)}>Difícil</button>
          </div>
        </div>
      ):
      loading? 
        <>
          <h1>Cargando</h1>
          <PulseLoader />
        </>
      :
        <div className='container'>
          <div className='button-level'>
            <button className='game-button' onClick={() => setBoard(null)}>Elegir nivel</button>
          </div>
          <BoardComponent board={board} />
        </div>
      }
    </div>
  )
}

export default MinesweeperGame;
