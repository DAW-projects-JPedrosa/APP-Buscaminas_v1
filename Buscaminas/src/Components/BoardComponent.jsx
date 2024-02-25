import React from 'react';
import { useState, useEffect} from 'react';
import CellComponent from './CellComponent';
import GameOver from './GameOver';
import Timer from './timer';

const explosionSound = new Audio('/explosion.mp3');
const defuseSound = new Audio('/click.mp3');

function BoardComponent({board}){

  const [internalBoard, setBoard] = useState(board); // Tablero de juego
  const [playExplosionSound, setPlayExplosionSound] = useState(false); //Sonido explosión
  const [playDefuseSound, setPlayDefuseSound] = useState(false); //Sonido desvelar celda
  const [grid, setGrid] = useState(null); // array con las celdas del tablero
  const [win, setWin] = useState(null); // true si has ganado
  const [remainingMines, setRemainingMines] = useState(null); // Minas restantes (Minas totales - celdas con bandera)

  /**
   * Recorre el board y crea un array con todas las celdas del tablero 
   * usando el componente CellComponent
   * @returns {Array} array con CellComponents con los datos obtenidos de board
   */
  const generateGrid = () => {
    const internalGrid = [];

    internalBoard.columns.forEach((row, rowIndex) => {
      const cellsInRow = row.map((cell, columnIndex) => (
        <CellComponent 
        key={`${rowIndex}-${columnIndex}-${Date.now()}`} 
        cell={cell} 
        onClick={() => handleClick(rowIndex, columnIndex)}
        onContextMenu={(e) => handleRightClick(e, rowIndex, columnIndex)}
        />
      ));
      internalGrid.push(<div key={rowIndex} className="row">{cellsInRow}</div>);
    });
    return internalGrid;
  };

  /**
   * Comprueba si el jugador ha ganado el juego
   * @param {Object} internalBoard 
   */
  function checkWin(internalBoard){
    let win = true;
    internalBoard.columns.forEach((row) => {
      row.forEach((cell) => {
        if(!cell.hasMine && !cell.defused){
          win = false;
        } 
      })
    })
    setWin(win);
  }

  /**
   * Manejador del click izquierdo. 
   * A partir de las coordenadas de la celda, la explota si tiene mina o la desactiva si no.
   * @param {Number} row 
   * @param {Number} column 
   * @returns objeto cell
   */
  function handleClick(row, column){
    const cell = internalBoard.getCellBy(column, row);
    const defuseCondition = !cell.defused && !cell.exploded && !cell.flagged && !board.lost && !win;

    if(defuseCondition){
      if(cell.hasMine){
        setPlayExplosionSound(true);
        setBoard(explodeAll(internalBoard))
      }else{
        setPlayDefuseSound(true);
        setBoard(board.defuse(column, row))
      }
    }
    return cell;
  }

  /**
   * Explota todas las minas del tablero
   * @param {Object} board 
   * @returns board
   */
  function explodeAll(internalBoard) {
    internalBoard.mines.forEach((mine) => {
      internalBoard.exploded(mine.row, mine.column);
    });
    return internalBoard;
  }

  /**
   * Se activa cuando modificamos las variables de sonido o el tablero.
   * Comprueba si hemos activado algún sonido y lo reproduce.
   * Comprueba si el jugador ha ganado el juego.
   * Vuelve a generar el grid con los nuevos valores de board.
   */
  useEffect(() => {
    if (playExplosionSound) {
      explosionSound.play();
      setPlayExplosionSound(false); 
    }
    if (playDefuseSound){
      defuseSound.play();
      setPlayDefuseSound(false); 
    }

    const minesCount = internalBoard.getRemainigMinesCount();
    setRemainingMines(minesCount);
    checkWin(internalBoard);
    setGrid(generateGrid());
  
  }, [playExplosionSound, playDefuseSound, internalBoard]);

  /**
   * Controlador del click derecho.
   * Pone una bandera o la quita, si la celda no está ni desactivada ni explotada.
   * @param {Event} e 
   * @param {Number} row 
   * @param {Number} column 
   * @returns objeto cell
   */
  function handleRightClick(e, row, column){
    e.preventDefault();
    const cell = internalBoard.getCellBy(column, row);
    const flagCondition = !cell.defused && !cell.exploded && !internalBoard.lost && !win;

    if (flagCondition){
      setBoard(internalBoard.flag(column, row))
      setRemainingMines(internalBoard.getRemainigMinesCount)
    }
    setGrid(generateGrid());
    return cell;
  }

  return(
    <>
      <div className='container'>
        <div className='board'>
          <div className='mines-counter'>
            <span className='counter'>
              {remainingMines >= 0 ? `💣 ${remainingMines}` : '¡Hay más banderas que minas!'}
            </span>
            <span className='counter'>
              ⏰ <Timer isRunning={win || board.lost? false: true}></Timer>
            </span>
          </div>
          <div className="minesweeper-board">
            {grid? grid: generateGrid()}
          </div>
        </div>
        {(internalBoard.lost || win) &&
          <GameOver win={win}></GameOver>}
      </div>
    </>
  )
}

export default BoardComponent;