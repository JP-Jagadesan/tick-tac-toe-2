import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  statusMessage: string = "Player X's turn";

  makeMove(index: number): void {
    if (!this.board[index] && !this.checkWinner()) {
      this.board[index] = this.currentPlayer;
      const winner = this.checkWinner();
      if (winner) {
        this.statusMessage = `Player ${winner} wins!`;
      } else if (this.board.every(cell => cell)) {
        this.statusMessage = "It's a draw!";
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusMessage = `Player ${this.currentPlayer}'s turn`;
      }
    }
  }

  checkWinner(): string | null {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a];
      }
    }

    return null;
  }

  resetGame(): void {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.statusMessage = "Player X\'s turn";
  }
}
