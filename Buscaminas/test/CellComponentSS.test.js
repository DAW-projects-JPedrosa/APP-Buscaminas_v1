import React from 'react';
import Renderer from "react-test-renderer";
import CellComponent from '../src/Components/CellComponent';

it("Renders a cell without any state", () => {
    //Arrange
    const cell = {row:0, column:0, flagged:false, exploded:false, defused:false, surroundingMinesCount: 0};

    //Act
    const cellComponent = Renderer.create(
        <CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>
    )

    //Assert
    let tree = cellComponent.toJSON();
    expect(tree).toMatchSnapshot();
});

it("Renders a cell with defused state and 0 mines around", () => {
    //Arrange
    const cell = {row:1, column:2, flagged:false, exploded:false, defused:true, surroundingMinesCount: 0};

    //Act
    const cellComponent = Renderer.create(
        <CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>
    )

    //Assert
    let tree = cellComponent.toJSON();
    expect(tree).toMatchSnapshot();
})

it("Renders a cell with defused state and 3 mines around", () => {
    //Arrange
    const cell = {row:1, column:2, flagged:false, exploded:false, defused:true, surroundingMinesCount: 3};

    //Act
    const cellComponent = Renderer.create(
        <CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>
    )

    //Assert
    let tree = cellComponent.toJSON();
    expect(tree).toMatchSnapshot();
})

it("Renders a cell with flagged state", () => {
    //Arrange
    const cell = {row:1, column:3, flagged:true, exploded:false, defused:false, surroundingMinesCount: 3};

    //Act
    const cellComponent = Renderer.create(
        <CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>
    )

    //Assert
    let tree = cellComponent.toJSON();
    expect(tree).toMatchSnapshot();
})

it("Renders a cell with exploded state", () => {
    //Arrange
    const cell = {row:1, column:3, flagged:false, exploded:true, defused:false, surroundingMinesCount: 3};

    //Act
    const cellComponent = Renderer.create(
        <CellComponent cell={cell} onClick={()=>{}} onContextMenu={()=>{}}></CellComponent>
    )

    //Assert
    let tree = cellComponent.toJSON();
    expect(tree).toMatchSnapshot();
})