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

    $('#board .letter').mousedown(this.onMouseDown.bind(this));
    $('body').mouseup(this.onMouseUp.bind(this));
    $('#board .letter').mouseenter(this.onMouseEnter.bind(this));

    this.name = "Emiel";
    this.gameDurationInSeconds = 5;
    this.highScores = [];
    this.highScoresLimit = 8;

    this.start();
  }

  start() {
    this.reset();

    this.play();
  }

  play() {
    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      // display score
      this.AddScoreToHighscores(this.score);

      // start new game
      this.start();
    }, this.gameDurationInSeconds * 1000);
  }

  reset() {
    this.words = [];
    this.word = [];
    this.isMouseDown = false;

    $('.scoreboard').children().remove();

    const board = this.getRandomBoard(this.dice);
    this.drawBoard(board);
  }

  onMouseUp() {
    this.isMouseDown = false;

    if (this.isValidWordLength(this.word)) {
      this.words.push(this.word);
      this.AddWordToScoreboard(this.word);
    }

    this.word = [];
  }

  onMouseDown(event) {
    this.isMouseDown = true;
    this.word.push($(event.target).text());
  }

  onMouseEnter() {
    if (this.isMouseDown) {
      console.log($(event.target));
      this.word.push($(event.target).text());
    }
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

  isValidWordLength(word) {
    return word.length >= 3;
  }

  getWordScore(word) {
    if (word.length >= 8) return 11;
    else if (word.length >= 7) return 5;
    else if (word.length >= 6) return 3;
    else if (word.length >= 5) return 2;
    else if (word.length >= 4) return 1;
    else if (word.length >= 3) return 1;
  }

  AddWordToScoreboard(word) {
    const score = this.getWordScore(word);

    $('.scoreboard').append(`<div class= "word" >${word.join("")}</div>`);
    $('.scoreboard').append(`<div class= "score" >${score}</div>`);
  }

  AddScoreToHighscores(words) {
    const score = this.getTotalScore(words);
    this.highScores.push(score);
    this.highScores.sort((a, b) => {return b-a});

    this.clearHighscoresElement()

    for (let i = 0; i < this.highScoresLimit; i++) {
      $('.highscores').append(`<div class= "highscore-index" >${i+1}.</div>`);
      $('.highscores').append(`<div class= "highscore-name" >${this.name}</div>`);
      $('.highscores').append(`<div class= "highscore" >${this.highScores[i]}</div>`);
    }
  }

  clearHighscoresElement() {
    $('.highscores').children().remove();
  }
}

const boggle = new Boggle();
