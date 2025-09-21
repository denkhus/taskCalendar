import {Directive, ElementRef, HostBinding, HostListener, inject, input, Renderer2} from '@angular/core';
import {TaskStore} from '../store/task.store';

@Directive({
  selector: '[appSelectTask]'
})
export class SelectDirective {
  public clickColor = input('#f0f8ff');
  public originalColor = input('transparent');
  public taskId = input.required<string>();
  private store = inject(TaskStore);
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostBinding("style.background-color")
  public get selectedColor(): string {
    if (this.store.selectedTask()) {
      const res = this.store.selectedTask()!.id === this.taskId();
      return res ? this.clickColor() : this.originalColor();
    }
    return this.originalColor();
  }

  constructor() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }

  @HostListener('click') onMouseEnter(): void {
    if (this.store.selectedTask() && this.store.selectedTask()!.id === this.taskId()) {
      this.store.selectTask(null);
    } else {
      this.store.selectTask(this.taskId());
    }
  }
}
