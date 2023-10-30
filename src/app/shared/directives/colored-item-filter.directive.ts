import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { projectConstants } from '../../utils/project-constants';

@Directive({
  selector: '[appColoredItemFilter]',
})
export class ColoredItemFilterDirective implements OnInit {
  @Input() appColoredItemFilter: string | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const olderThan6Months = projectConstants.SIX_MONTHS_IN_SECONDS;
    const between1And6Months = projectConstants.ONE_MONTH_IN_SECONDS;
    const between7DaysAnd1Month = projectConstants.SEVEN_DAYS_IN_SECONDS;

    if (this.appColoredItemFilter) {
      const convertedDate = new Date(this.appColoredItemFilter);
      const dateDifference = currentDate.getTime() - convertedDate.getTime();

      switch (true) {
        case dateDifference > olderThan6Months:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(185, 19, 19, 0.25))'
          );
          break;
        case dateDifference >= between1And6Months:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(250, 241, 2, 0.25))'
          );
          break;
        case dateDifference >= between7DaysAnd1Month:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(52, 120, 48, 0.25))'
          );
          break;
        default:
          this.renderer.setStyle(
            this.el.nativeElement,
            'filter',
            'drop-shadow(0.5rem 1rem 1rem rgba(47, 128, 237, 0.25))'
          );
      }
    }
  }
}
