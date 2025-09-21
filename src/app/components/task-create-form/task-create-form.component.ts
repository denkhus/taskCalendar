import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActionMode, DayColumn, DayOfWeek, Priority, Task} from '../../models/task';
import {TaskStore} from '../../store/task.store';
import {ColorPickerComponent} from '../../shared/color-picker/color-picker.component';
import {TitlePipe} from '../../pipes/title-pipe';

export interface TaskCreateForm {
  id: FormControl<string | null>;
  title: FormControl<string>;
  priority: FormControl<Priority>;
  color: FormControl<string | null>;
  dayOfWeek: FormControl<DayOfWeek>;
}

@Component({
  selector: 'app-task-create-form',
  templateUrl: './task-create-form.component.html',
  styleUrls: ['./task-create-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormsModule, ColorPickerComponent, TitlePipe],
})
export class TaskCreateFormComponent {
  public form: FormGroup | undefined;
  public get priorities(): { id: string; value: string }[] {
    return Object.keys(Priority)
      .filter((value => !isNaN(Number(value))))
      .map(key => ({ id: key, value: Priority[+key] }));
  }
  public get days(): DayColumn[] {
    return this.taskStore.days();
  }

  public get action(): ActionMode | null {
    return this.taskStore.action();
  }

  public get canSave(): boolean | undefined {
    return this.taskStore.action() !== 'view' && this.form?.valid;
  }

  private fb = inject(FormBuilder);
  private taskStore = inject(TaskStore);

  constructor() {
    effect(() => {
      const selectedTask = this.taskStore.selectedTask();
      this.form = this.fb.group<TaskCreateForm>({
        id: this.fb.control<string | null>(selectedTask!.id),
        dayOfWeek: this.fb.control<DayOfWeek>(selectedTask!.dayOfWeek, {nonNullable: true, validators: [Validators.required]}),
        priority: this.fb.control<Priority>(selectedTask!.priority, {nonNullable: true, validators: [Validators.required]}),
        color: this.fb.control<string | null>(selectedTask!.color),
        title: this.fb.control<string>(selectedTask!.title, {nonNullable: true, validators: [Validators.required]}),
      });
      if (this.taskStore.action() === 'view'){
        this.form.disable();
      }
    });
  }

  public onSave(): void {
    const task: Task = this.form!.value;
    switch (this.taskStore.action()){
      case 'add': this.taskStore.saveTask(task); break;
      case 'edit': this.taskStore.updateTask(task.id, task); break;
    }
  }
}
