import React from 'react';
import { useState } from 'react'

function CellComponent({cell, onClick, onContextMenu}) {
  const [internalCell, setCell] = useState(cell);

  function handleClick(){
    setCell(onClick())
  }

  function handleRightClick(e){
    setCell(onContextMenu(e))
  }

  return <>
        <div
        className={`cell ${internalCell.defused ? 'defused' : ''} ${internalCell.flagged ? 'flagged' : ''} ${internalCell.exploded ? 'exploded' : ''}`}
        id={`${internalCell.row}-${internalCell.column}`}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        >
          {internalCell.defused && internalCell.surroundingMinesCount > 0 && internalCell.surroundingMinesCount}
          {internalCell.flagged && '🚩'}
          {internalCell.exploded && '💣'}
        </div>
    </>
};

export default CellComponent;
