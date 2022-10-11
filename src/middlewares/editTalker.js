const { readFile, writeFile } = require('../utils/data');

const fileName = './src/talker.json';

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readFile(fileName);
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex === -1) {
    return res.status(400).json(
      { message: 'O id informado não foi encontrado!' },
    );
  }

  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };
  await writeFile(talkers);

  res.status(200).send(talkers[talkerIndex]);
};

module.exports = editTalker;