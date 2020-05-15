import express from 'express';
import validator from 'validator';
import cors from 'cors';
import { getRandomBoard, getWordScore, isValidWord, getWordFromSelection } from './boggle';

const app = express()
app.use(cors())
const port = 3000

app.get('/getrandomboard', ({ query }, res) => {
  const { id } = query;

  if (id && !validator.isInt(id, { min: 0, max: 100000000000 })) {
    return res.send({ error: "invalid ID" });
  }

  const seed = !id ? Math.floor(Math.random() * 100000000001) : id;
  const board = getRandomBoard(seed);

  res.send({ board, id: seed });
});

app.get('/getwordscore', ({ query }, res) => {
  const { word } = query;

  if (!word) {
    return res.send({error: 'You must provide a word'});
  }

  if (!validator.isAlpha(word) || word.length < 3) {
    return res.send({ error: "invalid word" });
  }

  res.send({ score: getWordScore(word)});
});

app.get('/iswordvalid', ({ query }, res) => {
  const id = query.id;
  let selection = query.selection;

  if (typeof selection === 'string') {
    selection = selection.split(',');
  }

  const word = getWordFromSelection(id, selection);

  if (!id || !selection) {
    return res.send(false);
  }

  if (!validator.isInt(id, { min: 0, max: 100000000000 })) {
    return res.send(false);
  }

  if (selection.length < 3){
    return res.send(false);
  }

  const validWord = isValidWord(id, selection);

  res.send({validWord, word});
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
