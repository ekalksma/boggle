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

app.get('/getwordscore', ({ query }, res) => {
  const { word } = query;

  if(word && !validator.isAlpha(word)){
    return res.send({ error: "string contains numbers" });
  }

  if (word.length >= 8) return res.send({ score: 11});
  else if (word.length >= 7) return res.send({ score: 5});
  else if (word.length >= 6) return res.send({ score: 3});
  else if (word.length >= 5) return res.send({ score: 2});
  else if (word.length >= 4) return res.send({ score: 1});
  else if (word.length >= 3) return res.send({ score: 1});
});

app.get('/isValidWord', ({ query }, res) => {
  const id = query.id;
  const word = query.word;

  const board = getRandomBoard(id);
  let board2d = [];

  const boardWidth = 4;
  const boardHeight = 4;

  for (let i = 0; i < boardHeight; i++) {
    const row = [];

    for (let j = 0; j < boardWidth; j++) {
      row.push({
        index: i * boardWidth + j,
        visited: false,
        letter: board[i * boardWidth + j]}
      );
    }

    board2d.push(row);
  }

  const depthFirstSearch = (startIndex, word, wordIndex = 1) => {
    if (word.length === wordIndex) {
      return true;
    }

    const x = startIndex % boardWidth;
    const y = parseInt(startIndex / boardWidth);

    const neighboringCells = {
      n: null,
      s: null,
      e: null,
      w: null,
      ne: null,
      nw: null,
      se: null,
      sw: null,
    };

    if (y - 1 >= 0) {
      neighboringCells.n = board2d[y - 1][x];

      if (x + 1 < boardWidth) {
        neighboringCells.ne = board2d[y - 1][x + 1];
      }

      if (x - 1 >= 0) {
        neighboringCells.nw = board2d[y - 1][x - 1];
      }
    }

    if (x - 1 >= 0) neighboringCells.w = board2d[y][x - 1];
    if (x + 1 < boardWidth) neighboringCells.e = board2d[y][x + 1];

    if (y + 1 < boardHeight) {
      neighboringCells.s = board2d[y + 1][x];

      if (x + 1 < boardWidth) {
        neighboringCells.se = board2d[y + 1][x + 1];
      }

      if (x - 1 >= 0) {
        neighboringCells.sw = board2d[y + 1][x - 1];
      }
    }

    for (const cell of Object.values(neighboringCells)) {
      if (!cell || cell.visited) {
        continue;
      }

      const x = cell.index % boardWidth;
      const y = parseInt(cell.index / boardWidth);

      board2d[y][x].visited = true;

      if (cell.letter.toLowerCase() === word[wordIndex].toLowerCase()) {
        console.log(cell);
        return depthFirstSearch(cell.index, word, ++wordIndex);
      }
    }

    return false;
  };

  const isWordFound = (word) => {
    const firstLetter = word[0];
    const firstLetterBoardIndices = [];

    for (const [index, letter] of Object.entries(board)) {
      if (firstLetter.toLowerCase() === letter.toLowerCase()) {
        firstLetterBoardIndices.push(index);
      }
    }

    if (!firstLetterBoardIndices.length) {
      return false;
    }

    let foundWord = false;

    for (const startIndex of firstLetterBoardIndices) {
      if (depthFirstSearch(startIndex, word)) {
        foundWord = true;
      }
    }

    return foundWord;
  };

  const fs = require('fs');

  const dictionary = fs.readFileSync('./src/dictionaries/dutch.txt', "utf8");
  let isWordInDictionary = dictionary.indexOf(word) >= 0;

  res.send(isWordFound(word) && isWordInDictionary);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
