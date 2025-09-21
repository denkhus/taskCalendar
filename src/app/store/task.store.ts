import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {DayColumn, DayOfWeek, MoveTaskData, Priority, Task, TaskState} from '../models/task';
import {inject} from '@angular/core';
import {StorageService} from '../services/storage.service';

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  action: null
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ tasks }) => ({
    days: () => {
      const daysConfig: DayColumn[] = [
        { id: 'mon', title: 'Понедельник', color: '#ff6b6b', tasks: [] },
        { id: 'tue', title: 'Вторник', color: '#4ecdc4', tasks: [] },
        { id: 'wed', title: 'Среда', color: '#1dd1a1', tasks: [] },
        { id: 'thu', title: 'Четверг', color: '#54a0ff', tasks: [] },
        { id: 'fri', title: 'Пятница', color: '#5f27cd', tasks: [] },
        { id: 'sat', title: 'Суббота', color: '#ff9f43', tasks: [] },
        { id: 'sun', title: 'Воскресенье', color: '#feca57', tasks: [] }
      ];

      const tasksByDay = new Map<DayOfWeek, Task[]>();
      daysConfig.forEach(day => tasksByDay.set(day.id, []));

      tasks().forEach(task => {
        const dayTasks = tasksByDay.get(task.dayOfWeek);
        if (dayTasks) {
          dayTasks.push(task);
        }
      });

      return daysConfig.map(day => ({
        ...day,
        tasks: (tasksByDay.get(day.id) || [])
          .sort((a, b) => b.priority - a.priority)
      }));
    },
  })),
  withMethods((store,storageService = inject(StorageService)) => ({
    loadInitialTasks() {
      const saved = storageService.loadTasks();
      const initialTasks = saved ? saved : [];
      patchState(store, { tasks: initialTasks });
    },
    selectTask(taskId: string | null) {
      if (taskId) {
        const task = store.tasks().find(t => t.id === taskId);
        patchState(store, { selectedTask: task });
      } else {
        patchState(store, { selectedTask: null });
      }
    },
    completeTask(taskId: string) {
      const task = store.tasks().find(t => t.id === taskId);
      if (task) {
        this.updateTask(taskId, { completed: !task.completed });
      }
    },
    viewTask() {
      patchState(store, { action: 'view' });
    },
    updateTask(taskId: string, updates: Partial<Task>) {
      const updatedTasks = store.tasks().map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );

      patchState(store, { action: null, selectedTask: null, tasks: updatedTasks });
      this.saveToStorage(updatedTasks);
    },
    editTask() {
      const task = store.tasks().find(t => t.id === store.selectedTask()?.id);
      if (task) {
        patchState(store, { selectedTask: task, action: 'edit' });
      }
    },
    addTask() {
      const newTask: Task = {
        id: '',
        title: '',
        color: '',
        dayOfWeek: 'mon',
        completed: false,
        priority: Priority.medium,
        createdAt: new Date().toISOString()
      };
      patchState(store, { selectedTask: newTask, action: 'add' });
    },
    saveTask(task: Task) {
      task.id = Date.now().toString();
      const updatedTasks = [...store.tasks(), task];
      patchState(store, { tasks: updatedTasks, action: null, selectedTask: null });
      this.saveToStorage(updatedTasks);
    },
    moveTask({ taskId, toDay }: MoveTaskData) {
      const tasks = store.tasks().map(task => {
        if (task.id === taskId) {
          return { ...task, dayOfWeek: toDay };
        }
        return task;
      });

      const targetDayTasks = tasks
        .filter(t => t.dayOfWeek === toDay)
        .sort((a, b) => a.priority - b.priority)
        .map((task, index) => ({ ...task, position: index }));

      const finalTasks = tasks
        .filter(t => t.dayOfWeek !== toDay)
        .concat(targetDayTasks);

      patchState(store, { tasks: finalTasks });
      this.saveToStorage(finalTasks);
    },
    saveToStorage(tasks: Task[]) {
      storageService.saveTasks(tasks);
    },
  }))
);
