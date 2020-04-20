import { randomNumberGenerator } from './utils/math';
import express from 'express';
import validator from 'validator';

const app = express()
const port = 3000

function getRandomBoard(seed) {
  const dice = [
    ['R', 'I', 'F', 'O', 'B', 'X'],
    ['I', 'F', 'E', 'H', 'E', 'Y'],
    ['D', 'E', 'N', 'O', 'W', 'S'],
    ['U', 'T', 'O', 'K', 'N', 'D'],
    ['H', 'M', 'S', 'R', 'A', 'O'],
    ['L', 'U', 'P', 'E', 'T', 'S'],
    ['A', 'C', 'I', 'T', 'O', 'A'],
    ['Y', 'L', 'G', 'K', 'U', 'E'],
    ['Q', 'B', 'M', 'J', 'O', 'A'],
    ['E', 'H', 'I', 'S', 'P', 'N'],
    ['V', 'E', 'T', 'I', 'G', 'N'],
    ['B', 'A', 'L', 'I', 'Y', 'T'],
    ['E', 'Z', 'A', 'V', 'N', 'D'],
    ['R', 'A', 'L', 'E', 'S', 'C'],
    ['U', 'W', 'I', 'L', 'R', 'G'],
    ['P', 'A', 'C', 'E', 'M', 'D']
  ];

  const rng = randomNumberGenerator(seed);

  const board = [];

  for (const die of dice) {
    const randomDieValue = die[Math.floor(rng() * Math.floor(6))];
    board.push(randomDieValue);
  }

  return board;
}

app.get('/getrandomboard', ({ query }, res) => {
  const { id } = query;

  if (id && !validator.isInt(id, { min: 0, max: 100000000000 })) {
    return res.send({ error: "invalid ID" });
  }

  const seed = !id ? Math.floor(Math.random() * 100000000001) : id;

  const board = getRandomBoard(seed);

  res.send({ board, id: seed });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
