import {Component, input, ChangeDetectionStrategy, output} from '@angular/core';
import {Task} from '../../models/task';
import {PriorityPipe} from '../../pipes/priority.pipe';
import {SelectDirective} from '../../directives/select-directive';
import {ScaleOnHoverDirective} from '../../directives/scale-on-hover.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  imports: [
    PriorityPipe,
    SelectDirective,
    ScaleOnHoverDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  public selected = input<boolean>();
  public task = input.required<Task>();
  public completed = output<string>();

  public get canComplete(): boolean {
    return !this.task().completed;
  }

  public onToggleComplete(id: string): void {
    this.completed.emit(id);
  }
}
