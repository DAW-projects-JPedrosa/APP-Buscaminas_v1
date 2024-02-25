import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import GameOver from '../src/Components/GameOver'; 

describe('GameOver tests', () => {
    test("Renders a message of game over when the player wins", () => {
        //Arrange
        const win = true;
        const expectedMssg = 'Has ganado';
    
        //Act
        render(<GameOver win={win}></GameOver>);
    
        screen.debug();
    
        //Assert
        expect(screen.getByText(expectedMssg)).toBeInTheDocument();
    });
    
    test("Renders a message of game over when the player loses", () => {
        //Arrange
        const win = false;
        const expectedMssg = 'Has perdido';
    
        //Act
        render(<GameOver win={win}></GameOver>);
    
        screen.debug();
    
        //Assert
        expect(screen.getByText(expectedMssg)).toBeInTheDocument();
    });

    test("Render a message with a button that closes the message by clicking", () => {
        //Arrange
        const win = true;
    
        //Act
        render(<GameOver win={win}></GameOver>);
        const closeButton = screen.getByText('Cerrar');
        
        //Assert
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);
        expect(screen.queryByText('Cerrar')).toBeNull();
        expect(screen.queryByText('Has ganado')).toBeNull();
    })
})
