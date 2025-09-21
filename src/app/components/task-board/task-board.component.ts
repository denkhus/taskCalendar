import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import { TaskStore } from '../../store/task.store';
import {DayColumnComponent} from '../task-column/day-column.component';
import {CdkDropListGroup} from '@angular/cdk/drag-drop';
import {DayOfWeek, Task} from '../../models/task';
import {TaskCreateFormComponent} from '../task-create-form/task-create-form.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [DayColumnComponent, CdkDropListGroup, TaskCreateFormComponent],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskBoardComponent {
  private taskStore = inject(TaskStore);

  public get canEdit(): boolean | null {
    return this.taskStore.selectedTask() && this.taskStore.selectedTask()!.id !== '';
  }

  public get days(): {
    tasks: Task[];
    id: DayOfWeek;
    title: string;
    color: string;
  }[]  {
    return this.taskStore.days();
  }

  public get showForm(): boolean | null {
    return this.taskStore.action() && !!this.taskStore.selectedTask() && !!this.taskStore.action()
  }

  constructor() {
    this.taskStore.loadInitialTasks();
  }

  public onView(): void {
    this.taskStore.viewTask();
  }

  public onCompleted(id: string): void {
    this.taskStore.completeTask(id);
  }

  public onEdit(): void {
    this.taskStore.editTask();
  }

  public onAdd(): void {
    this.taskStore.addTask();
  }

  public onDrop(event: { task: Task; toDay: DayOfWeek }): void {
    console.log(event);
    this.taskStore.moveTask({
      taskId: event.task.id,
      fromDay: event.task.dayOfWeek,
      toDay: event.toDay,
    });
  }
}
