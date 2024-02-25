const app = require('../app');

const levelsDB = require("../data/levelsdb");

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateMines = (level) => {
    const minesToGenerate = Math.floor((level.rows * level.columns) / 8);

    let mines = [];

    for(let i = 0; i < minesToGenerate; i++){
        let mine = generateMine(level.rows, level.columns);

        while(mines.some(x => x.row === mine.row && x.column === mine.column)){
            mine = generateMine(level.rows, level.columns);
        }

        mines.push(mine);
    }

    return mines;
};

const generateMine = (rows, columns) => {
    return {row: randomIntFromInterval(0, rows - 1), column: randomIntFromInterval(0, columns - 1)};
}


app.get('/game/:level', (request, result) => {
    const level = request.params.level;

    if(!level || level > levelsDB.levels.length){
        result.status(404).send('Level not found');
    }

    let levelData = levelsDB.levels[level];

    levelData.mines = generateMines(levelData);

    result.status(200).json(levelData);
});