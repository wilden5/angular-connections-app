import { Directive, Input } from '@angular/core';
import { BaseStyleDirective } from './base-style.directive';

@Directive({
  selector: '[appColoredItemFilter]',
})
export class ColoredItemFilterDirective extends BaseStyleDirective {
  @Input('appColoredItemFilter') override appDate: string | undefined;

  getOlderThanSixMonthsStyle(): string {
    return 'drop-shadow(0.5rem 1rem 1rem rgba(185, 19, 19, 0.25))';
  }

  getBetweenOneAndSixMonthsStyle(): string {
    return 'drop-shadow(0.5rem 1rem 1rem rgba(250, 241, 2, 0.25))';
  }

  getBetweenSevenDaysAndOneMonthStyle(): string {
    return 'drop-shadow(0.5rem 1rem 1rem rgba(52, 120, 48, 0.25))';
  }

  getDefaultStyle(): string {
    return 'drop-shadow(0.5rem 1rem 1rem rgba(47, 128, 237, 0.25))';
  }

  setStyle(value: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'filter', value);
  }
}
