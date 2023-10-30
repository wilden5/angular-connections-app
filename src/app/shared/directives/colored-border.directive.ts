import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { projectConstants } from '../../utils/project-constants';

@Directive({
  selector: '[appColoredBorder]',
})
export class ColoredBorderDirective implements OnInit {
  @Input() appColoredBorder: string | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const olderThan6Months = projectConstants.SIX_MONTHS_IN_SECONDS;
    const between1And6Months = projectConstants.ONE_MONTH_IN_SECONDS;
    const between7DaysAnd1Month = projectConstants.SEVEN_DAYS_IN_SECONDS;

    if (this.appColoredBorder) {
      const convertedDate = new Date(this.appColoredBorder);
      const dateDifference = currentDate.getTime() - convertedDate.getTime();

      switch (true) {
        case dateDifference > olderThan6Months:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
          break;
        case dateDifference >= between1And6Months:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
          break;
        case dateDifference >= between7DaysAnd1Month:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'green');
          break;
        default:
          this.renderer.setStyle(this.el.nativeElement, 'background-color', 'blue');
      }
    }
  }
}
