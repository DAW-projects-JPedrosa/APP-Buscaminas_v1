/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
    return {
      verbose: true,
      "moduleNameMapper": {
        "^.+\\.(css|less|scss|png|mp3)$": "babel-jest"
      }
    };
  };