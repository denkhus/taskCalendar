import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {NgClass} from '@angular/common';

@Component({
  selector: "app-color-picker",
  templateUrl: "./color-picker.component.html",
  styleUrls: ["./color-picker.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
  imports: [
    NgClass
  ]
})
export class ColorPickerComponent implements ControlValueAccessor {
  colors = ["#7489ff", "#43d65d", "#d65943", "#d643a7"];
  selectedColor = "";

  protected onChange: (value: string | null) => void = () => {};
  protected onTouch: (value: boolean | null) => void = () => {};
  private _isDisabled = false;

  public get isDisabled(): boolean {
    return this._isDisabled;
  }

  colorClicked(color: string): void {
    this.selectedColor = color;
    this.onChange(this.selectedColor);
    this.onTouch(true);
  }

  writeValue(obj: string): void {
    this.selectedColor = obj;
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (value: boolean | null) => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
}
