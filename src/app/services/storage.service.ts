import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TASKS_KEY = 'tasks';

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }

  loadTasks(): Task[] {
    const saved = localStorage.getItem(this.TASKS_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}
