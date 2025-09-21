import {Directive, HostListener, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[appScaleOnHover]'
})
export class ScaleOnHoverDirective {
  @Input() scaleValue = 1.1;
  @Input() transitionDuration = '0.3s';

  @HostBinding('style.transition') get transition(): string {
    return `transform ${this.transitionDuration} ease`;
  }

  @HostBinding('style.transform') scale = '';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.scale = `scale(${this.scaleValue})`;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.scale = '';
  }
}
