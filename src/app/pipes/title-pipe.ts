import { Pipe, PipeTransform } from "@angular/core";
import {ActionMode, Priority} from '../models/task';

@Pipe({
  name: "title",
  standalone: true
})
export class TitlePipe implements PipeTransform {
  transform(value: ActionMode): string {
    switch (value){
      case 'add': return  'Создание задачи';
      case 'edit': return  'Редактирование задачи';
      case 'view': return  'Просмотр';
      default: return  '';
    }
  }
}
