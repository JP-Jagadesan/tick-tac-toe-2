import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDisabled',
  standalone: true,
})
export class DisabledPipe implements PipeTransform {
  transform(value: number[], index: number): boolean {
    return value.length === 3 && value[0] === index;
  }
}
