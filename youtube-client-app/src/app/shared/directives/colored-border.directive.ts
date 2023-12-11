import { Directive, Input } from '@angular/core';
import { BaseStyleDirective } from './base-style.directive';

@Directive({
  selector: '[appColoredBorder]',
})
export class ColoredBorderDirective extends BaseStyleDirective {
  @Input('appColoredBorder') override appDate: string | undefined;

  getOlderThanSixMonthsStyle(): string {
    return 'red';
  }

  getBetweenOneAndSixMonthsStyle(): string {
    return 'yellow';
  }

  getBetweenSevenDaysAndOneMonthStyle(): string {
    return 'green';
  }

  getDefaultStyle(): string {
    return 'blue';
  }

  setStyle(value: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', value);
  }
}
