const Level = require('../model/level');

class LevelsDB {
    constructor(){
        this.levels = [
            {
                "columns": 10,
                "rows": 10
            },
            {
                "columns": 25,
                "rows": 25
            }
            ,
            {
                "columns": 35,
                "rows": 35
            }
        ].map(levelData => {
            let level = new Level();
    
            level = {...levelData};
    
            return level;
        });
    }
}

const levelsDB = new LevelsDB();

module.exports = levelsDB;