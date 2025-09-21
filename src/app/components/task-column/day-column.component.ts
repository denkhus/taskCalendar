import {Component, output, input, ChangeDetectionStrategy} from '@angular/core';
import {Task, DayOfWeek} from '../../models/task';
import {TaskItemComponent} from '../task-item/task-item.component';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-day-column',
  standalone: true,
  imports: [TaskItemComponent, DragDropModule],
  templateUrl: './day-column.component.html',
  styleUrls: ['./day-column.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayColumnComponent {
  public id = input.required<DayOfWeek>();
  public title = input.required<string>();
  public tasks = input.required<Task[]>();

  public dragStart = output<{task: Task, day: DayOfWeek}>();
  public dragEnd = output<void>();
  public dropItem = output<{task: Task, toDay: DayOfWeek}>();
  public completed = output<string>();

  public onDrop(event: CdkDragDrop<Task[]>): void {
    const isMovingInsideTheSameList = event.previousContainer === event.container;
    if (isMovingInsideTheSameList) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.dropItem.emit({
        task: event.item.data,
        toDay: event.container.id as DayOfWeek,
      })
    }
  }
}
