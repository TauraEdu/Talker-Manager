const express = require('express');
const fs = require('fs').promises;
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const { readFile, writeFile } = require('../utils/data');
const editTalker = require('../middlewares/editTalker');

const fileName = './src/talker.json';

const router = express.Router();

router.get('/', async (req, res) => {
    const talkers = await readFile();
    if (!talkers) return res.status(200).json([]);
    return res.status(200).json(talkers);
});

router.get(
  '/search',
  validateToken,
  async (req, res) => {  
  const talkersList = JSON.parse(await fs.readFile(fileName, 'utf8'));
  const { q } = req.query; 

  const filterTalkers = talkersList.filter((search) => search.name.includes(q));
 
  res.status(200).json(filterTalkers);
},
);

router.get('/:id', async (req, res) => {
    const talkers = await readFile();
    const { id } = req.params;
    const findTalker = talkers.find((talker) => talker.id === Number(id));
  
    if (!findTalker) {
        return res.status(404).json(
          { message: 'Pessoa palestrante não encontrada' },
        );
    }
    return res.status(200).json(findTalker);
});

router.post(
    '/',
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    async (req, res) => {
        const { name, age, talk: { watchedAt, rate } } = req.body;
        const talkers = await readFile(fileName);
        const newTalker = {
          name,
          age,
          id: (talkers.length + 1),
          talk: {
            watchedAt,
            rate,
          },
        };
        talkers.push(newTalker);
        writeFile(talkers);
        return res.status(201).send(newTalker);
    },
);

router.put(
    '/:id',
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    editTalker,  

);

router.delete(
  '/:id',
  validateToken,
  async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile(fileName, 'utf-8');
  const talkerIndex = talkersList.findIndex((position) => position.id === Number(id));
  talkersList.splice(talkerIndex, 1);
  await writeFile((talkersList));
  res.status(204).end();
},
);
  
module.exports = router;
