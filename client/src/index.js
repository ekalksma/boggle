import $ from 'jquery';

$.ajaxSetup({
  async: false
});

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
    $('#board').mouseup(this.onMouseUp.bind(this));
    $('#board').mouseleave(this.handleMouseLeave.bind(this));
    $('#board .letter').mouseenter(this.onMouseEnter.bind(this));

    this.name = "Emiel";
    this.gameDurationInSeconds = 30;
    this.highScores = [];
    this.selectedIndices = [];
    this.highScoresLimit = 8;
    this.fps = 60;

    this.start();
  }

  start() {
    this.reset();

    this.play();
  }

  play() {
    const currentTime = Date.now();
    this.timeBar = setInterval(() => {
      const elapsedTimeInSeconds = (Date.now() - currentTime) / 1000;
      const width = 100 / this.gameDurationInSeconds * elapsedTimeInSeconds;

      $('.time-bar').width(`${width}%`);
    }, 1000 / this.fps);

    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      clearTimeout(this.timeBar);

      this.addScoreToHighscores(this.score);

      this.start();
    }, this.gameDurationInSeconds * 1000);
  }

  reset() {
    this.words = [];
    this.word = [];
    this.isMouseDown = false;

    $('.scoreboard').children().remove();

    $.getJSON(`http://localhost:3000/getrandomboard`, (result) => {
      this.id = result.id;
      this.drawBoard(result.board);
    });
  }

  onMouseUp() {
    if (!this.isMouseDown) {
      return;
    }

    this.isMouseDown = false;

    $.getJSON(`http://localhost:3000/isValidWord?id=${this.id}&word=${this.word.join('')}`, (isFound) => {
      console.log(isFound);
      if (!isFound) return;

      if (!this.words.includes(this.word.join(''))) {
        this.words.push(this.word.join(''));

        $.getJSON(`http://localhost:3000/getwordscore?word=${this.word.join('')}`, (result) => {
          this.addWordToScoreboard(this.word.join(''), result.score);
        });
      }
    });

    this.selectedIndices = [];
    this.word = [];

    $('.letter').removeClass('selected');
  }

  handleMouseLeave() {
    if (!this.isMouseDown) {
      return;
    }

    this.isMouseDown = false;

    this.selectedIndices = [];
    this.word = [];

    $('.letter').removeClass('selected');
  }

  onMouseDown(event) {
    this.isMouseDown = true;

    const index = $('.letter').index(event.currentTarget);

    if (!this.isSelectedIndex(index)) {
      this.selectedIndices.push(index);
      this.word.push($(event.currentTarget).children('span').text());

      $(event.currentTarget).addClass('selected');
    }
  }

  onMouseEnter(event) {
    if (this.isMouseDown) {
      const index = $('.letter').index(event.currentTarget);

      if (!this.isSelectedIndex(index)) {
        this.selectedIndices.push(index);
        this.word.push($(event.currentTarget).children('span').text());

        $(event.currentTarget).addClass('selected');
      }
    }
  }

  isSelectedIndex(index) {
    return this.selectedIndices.includes(index);
  }

  drawBoard(board) {
    $('#board .letter').each(function (index) {
      $(this).children('span').text(board[index]);
    });
  }

  getTotalScore() {
    let score = 0;

    // for (const word of this.words) {
    //   score += this.getWordScore(word);
    // }

    return score;
  }

  addWordToScoreboard(word, score) {
    $('.scoreboard').append(`<div class= "word" >${word}</div>`);
    $('.scoreboard').append(`<div class= "score" >${score}</div>`);
  }

  addScoreToHighscores(words) {
    const score = this.getTotalScore(words);

    this.highScores.push(score);
    this.highScores.sort((a, b) => {return b-a});

    this.clearHighscoresElement();

    for (let i = 0; i < this.highScores.length; i++) {
      if (i + 1 <= this.highScoresLimit) {
        $('.highscores').append(`<div class= "highscore-index" >${i+1}.</div>`);
        $('.highscores').append(`<div class= "highscore-name" >${this.name}</div>`);
        $('.highscores').append(`<div class= "highscore" >${this.highScores[i]}</div>`);
      }
    }
  }

  clearHighscoresElement() {
    $('.highscores').children().remove();
  }
}

const boggle = new Boggle();
