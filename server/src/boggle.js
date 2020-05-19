import { randomNumberGenerator } from './utils/math';
import fs from 'fs';

export function getRandomBoard(seed) {
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

export function getWordScore(word) {
  if (word.length >= 8) return  11;
  else if (word.length >= 7) return 5;
  else if (word.length >= 6) return 3;
  else if (word.length >= 5) return 2;

  return 1;
}

export function isValidWord(id, selection) {
  const board = getRandomBoard(id);
  let word = getWordFromSelection(id, selection);
  word = word.toLowerCase();

  console.log(isWordInDict(word));

  return isWordInDict(word);
}

export function getWordFromSelection(id, selection) {
  const board = getRandomBoard(id);
  let word = "";

  for (const index of selection) {
    word += board[index];
  }

  return word;
}

function isWordInDict(word) {
  const dictionary = fs.readFileSync('./src/dictionaries/dutch.txt', "utf8").toString().split('\n');

  return dictionary.indexOf(word) >= 0;
}

// function isWordOnBoard (board, word) {
//   word = word.toLowerCase();
//   const firstLetter = word[0];
//   const firstLetterBoardIndices = [];
//   const board2d = boardTo2DArray(board);

//   for (const [index, letter] of Object.entries(board)) {
//     if (firstLetter === letter.toLowerCase()) {
//       firstLetterBoardIndices.push(index);
//     }
//   }

//   if (!firstLetterBoardIndices.length) {
//     return false;
//   }

//   let foundWord = false;

//   for (const startIndex of firstLetterBoardIndices) {
//     if (depthFirstSearch(board2d, startIndex, word)) {
//       foundWord = true;
//     }
//   }

//   return foundWord;
// };

// function boardTo2DArray (board, boardWidth = 4, boardHeight = 4) {
//   const board2d = [];

//   for (let i = 0; i < boardHeight; i++) {
//     const row = [];

//     for (let j = 0; j < boardWidth; j++) {
//       row.push({
//         index: i * boardWidth + j,
//         visited: false,
//         letter: board[i * boardWidth + j]}
//       );
//     }
//     board2d.push(row);
//   }

//   return board2d;
// }

// function depthFirstSearch (board, startIndex, word, wordIndex = 1, boardWidth = 4, boardHeight = 4) {
//   if (word.length === wordIndex) {
//     return true;
//   }

//   const x = startIndex % boardWidth;
//   const y = parseInt(startIndex / boardWidth);

//   const neighboringCells = {
//     n: null,
//     s: null,
//     e: null,
//     w: null,
//     ne: null,
//     nw: null,
//     se: null,
//     sw: null,
//   };

//   if (y - 1 >= 0) {
//     neighboringCells.n = board[y - 1][x];

//     if (x + 1 < boardWidth) {
//       neighboringCells.ne = board[y - 1][x + 1];
//     }

//     if (x - 1 >= 0) {
//       neighboringCells.nw = board[y - 1][x - 1];
//     }
//   }

//   if (x - 1 >= 0) neighboringCells.w = board[y][x - 1];
//   if (x + 1 < boardWidth) neighboringCells.e = board[y][x + 1];

//   if (y + 1 < boardHeight) {
//     neighboringCells.s = board[y + 1][x];

//     if (x + 1 < boardWidth) {
//       neighboringCells.se = board[y + 1][x + 1];
//     }

//     if (x - 1 >= 0) {
//       neighboringCells.sw = board[y + 1][x - 1];
//     }
//   }

//   for (const cell of Object.values(neighboringCells)) {
//     if (!cell || cell.visited) {
//       continue;
//     }

//     const x = cell.index % boardWidth;
//     const y = parseInt(cell.index / boardWidth);

//     board[y][x].visited = true;

//     if (cell.letter.toLowerCase() === word[wordIndex]) {
//       return depthFirstSearch(board, cell.index, word, ++wordIndex);
//     }
//   }

//   return false;
// }
