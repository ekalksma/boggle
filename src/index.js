import $ from 'jquery';

class Boggle {
  constructor() {
    this.dice = [
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

    $('#board .letter').mousedown((event) => {
      this.isMouseDown = true;
      this.word.push($(event.target).text());
    });

    $('body').mouseup(this.onMouseUp.bind(this));

    $('#board .letter').mouseenter((event) => {
      if (this.isMouseDown) {
        this.word.push($(event.target).text());
      }
    });

    this.gameDurationInSeconds = 2;

    this.start();
  }

  start() {
    this.reset();

    this.play();
  }

  play() {
    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);

      // empty words + scores
      $('.scoreboard').children().remove();

      // display score
      console.log(this.getTotalScore());

      // start new game
      this.start();
    }, this.gameDurationInSeconds * 1000);
  }

  reset() {
    this.words = [];
    this.word = [];
    this.isMouseDown = false;

    const board = this.getRandomBoard(this.dice);
    this.drawBoard(board);
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.words.push(this.word);
    this.AddWordToScoreboard(this.word);
    this.word = [];
  }

  getRandomBoard(dice) {
    const board = [];

    for (const die of dice) {
      const randomDieValue = die[Math.floor(Math.random() * Math.floor(6))];
      board.push(randomDieValue);
    }

    return board;
  }

  drawBoard(board) {
    $('#board .letter').each(function (index) {
      $(this).text(board[index]);
    });
  }

  getTotalScore() {
    let score = 0;

    for (const word of this.words) {
      score += this.getWordScore(word);
    }

    return score;
  }

  getWordScore(word) {
    if (word.length >= 8) return 11;
    else if (word.length >= 7) return 5;
    else if (word.length >= 6) return 3;
    else if (word.length >= 5) return 2;
    else if (word.length >= 4) return 1;
    else if (word.length >= 3) return 1;
    else return 0;
  }

  AddWordToScoreboard(word) {
    const score = this.getWordScore(word);

    $('.scoreboard').append(`<div class= "word" >${word.join("")}</div>`);
    $('.scoreboard').append(`<div class= "score" >${score}</div>`);
  }
}

const boggle = new Boggle();
