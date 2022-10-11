const fs = require('fs').promises;

const fileName = './src/talker.json';

const readFile = async () => {
    const talkers = await fs.readFile(fileName, 'utf-8');
    return JSON.parse(talkers);
};

const writeFile = (data) => fs.writeFile(fileName, JSON.stringify(data));
  
module.exports = { readFile, writeFile };