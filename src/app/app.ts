import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskBoardComponent} from './components/task-board/task-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskBoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TaskBoard');
}
