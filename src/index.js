import $ from 'jquery';

class Boggle {
  constructor() {
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

    this.word = [];
    this.isMouseDown = false;
    const board = this.getRandomBoard(dice);

    this.drawBoard(board);

    $('#board .letter').mousedown((event) => {
      this.isMouseDown = true;
      this.word.push($(event.target).text());
    });

    $('body').mouseup(() => {
      this.isMouseDown = false;
      console.log(this.word);
      this.word = [];
    });

    $('#board .letter').mouseenter((event) => {
      if (this.isMouseDown) {
        this.word.push($(event.target).text());
      }
    });
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
}

const boggle = new Boggle();
