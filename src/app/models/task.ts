export interface Task {
  id: string;
  title: string;
  color: string;
  dayOfWeek: DayOfWeek;
  priority: Priority;
  createdAt: string;
  completed: boolean;
}

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type ActionMode = 'add' | 'edit' | 'view' | null;

export enum Priority {
  low = 0,
  medium = 1,
  high = 2
}

export interface DayColumn {
  id: DayOfWeek;
  title: string;
  color: string;
  tasks: Task[];
}

export interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  action: ActionMode | null;
}

export interface MoveTaskData {
  taskId: string;
  fromDay: DayOfWeek;
  toDay: DayOfWeek;
}
