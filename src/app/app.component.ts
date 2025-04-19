import { Component, inject } from '@angular/core';

import { DisabledPipe } from './pipes/disabled.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgClass, DisabledPipe],
  providers: [DisabledPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  statusMessage: string = "Player X's turn";
  moveHistory: { [key: string]: number[] } = { X: [], O: [] };
  disable = inject(DisabledPipe);

  makeMove(index: number): void {
    const history = this.moveHistory[this.currentPlayer];
    if (
      !this.board[index] &&
      !this.checkWinner() &&
      !this.disable.transform(history, index)
    ) {
      this.board[index] = this.currentPlayer;
      history.push(index);

      const winner = this.checkWinner();
      if (winner) {
        this.statusMessage = `Player ${winner} wins!`;
      } else {
        if (history.length === 4) {
          const removedIndex = history.shift();
          if (removedIndex !== undefined) {
            this.board[removedIndex] = '';
          }
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusMessage = `Player ${this.currentPlayer}'s turn`;
      }
    }
  }

  checkWinner(): string | null {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return this.board[a];
      }
    }

    return null;
  }

  resetGame(): void {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.statusMessage = "Player X's turn";
    this.moveHistory = { X: [], O: [] };
  }
}
