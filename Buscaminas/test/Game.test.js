import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import MinesweeperGame from '../src/Components/MinesweeperGame';

describe('MinesweeperGame tests', () => {
  test('Renders level selection buttons initially', () => {
    //Act
    render(<MinesweeperGame />);

    //Assert
    expect(screen.getByText('Elige un nivel de dificultad')).toBeInTheDocument();
    expect(screen.getByText('Fácil')).toBeInTheDocument();
    expect(screen.getByText('Medio')).toBeInTheDocument();
    expect(screen.getByText('Difícil')).toBeInTheDocument();
  })

  test('Renders boardComponent after level selection', () => {
    //Act
    render(<MinesweeperGame />);
    const startButton = screen.getByText('Fácil');
    
    //Assert
    fireEvent.click(startButton);

    expect(screen.queryByText('Elige un nivel de dificultad')).toBeNull();
    expect(screen.getByText('Elegir nivel')).toBeInTheDocument();
  })

  test('allows changing level after selection', () => {
    //Act
    render(<MinesweeperGame />);
    
    //Assert
    fireEvent.click(screen.getByText('Fácil'));
    fireEvent.click(screen.getByText('Elegir nivel'));

    expect(screen.queryByText('Elegir nivel')).toBeNull();
    expect(screen.getByText('Fácil')).toBeInTheDocument();
  })
})
