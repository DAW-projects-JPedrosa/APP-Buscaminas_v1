import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import CellComponent from '../src/Components/CellComponent'; 

describe('CellComponent tests', () => {
    test("Renders a cell with flagged state", () => {
        //Arange
        const cell = {row:0, column:0, flagged:true, exploded:false, defused:false, surroundingMinesCount: 0};

        //Act
        render(<CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>);
        const cellElement = screen.getByText('🚩');

        //Assert
        expect(cellElement).toBeInTheDocument();
        expect(cellElement).toHaveClass('cell');
        expect(cellElement).not.toHaveClass('defused');
        expect(cellElement).toHaveClass('flagged');
        expect(cellElement).not.toHaveClass('exploded');
        expect(cellElement).toHaveTextContent('🚩');
        expect(cellElement).not.toHaveTextContent('💣');
    })

    test("Renders a cell with exploded state", () => {
        //Arange
        const cell = {row:0, column:0, flagged:false, exploded:true, defused:false, surroundingMinesCount: 0};

        //Act
        render(<CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>);
        const cellElement = screen.getByText('💣');

        //Assert
        expect(cellElement).toBeInTheDocument();
        expect(cellElement).toHaveClass('cell');
        expect(cellElement).not.toHaveClass('defused');
        expect(cellElement).not.toHaveClass('flagged');
        expect(cellElement).toHaveClass('exploded');
        expect(cellElement).not.toHaveTextContent('🚩');
        expect(cellElement).toHaveTextContent('💣');
    })

    test("Renders a cell with defused state and 2 mines around", () => {
        //Arange
        const cell = {row:0, column:0, flagged:false, exploded:false, defused:true, surroundingMinesCount: 2};

        //Act
        render(<CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>);
        const cellElement = screen.getByText('2');

        //Assert
        expect(cellElement).toBeInTheDocument();
        expect(cellElement).toHaveClass('cell');
        expect(cellElement).toHaveClass('defused');
        expect(cellElement).not.toHaveClass('flagged');
        expect(cellElement).not.toHaveClass('exploded');
        expect(cellElement).not.toHaveTextContent('🚩');
        expect(cellElement).not.toHaveTextContent('💣');
    })

    test("Calls onClick when cell is clicked", () => {
        //Arange
        const cell = {row:0, column:0, flagged:false, exploded:false, defused:true, surroundingMinesCount: 2};
        const onClickMock = jest.fn().mockReturnValue(cell);

        //Act
        render(<CellComponent cell={cell} onClick={onClickMock} onContextMenu={()=>{}}></CellComponent>);
        const cellElement = screen.getByText('2');
        fireEvent.click(cellElement);

        //Assert
        expect(onClickMock).toHaveBeenCalledTimes(1);
    })

    test("Calls onContextMenu when cell is right-clicked", () => {
        //Arange
        const cell = {row:0, column:0, flagged:false, exploded:false, defused:true, surroundingMinesCount: 2};
        const onClickMock = jest.fn().mockReturnValue(cell);

        //Act
        render(<CellComponent cell={cell} onClick={() => {}} onContextMenu={onClickMock}></CellComponent>);
        const cellElement = screen.getByText('2');
        fireEvent.contextMenu(cellElement);

        //Assert
        expect(onClickMock).toHaveBeenCalledTimes(1);
    })
})