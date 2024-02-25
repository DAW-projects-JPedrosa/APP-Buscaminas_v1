import React from 'react';
import Renderer from "react-test-renderer";
import GameOver from '../src/Components/GameOver'; 

it("Renders a message of game over when the player wins", () => {
    //Arrange
    const win = true;

    //Act
    const gameOverComponent = Renderer.create(
        <GameOver win={win}></GameOver>
    )

    //Assert
    let tree = gameOverComponent.toJSON();
    expect(tree).toMatchSnapshot();
});

it("Renders a message of game over when the player loses", () => {
    //Arrange
    const win = false;

    //Act
    const gameOverComponent = Renderer.create(
        <GameOver win={win}></GameOver>
    )

    //Assert
    let tree = gameOverComponent.toJSON();
    expect(tree).toMatchSnapshot();
})
