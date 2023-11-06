import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { projectConstants } from '../../utils/project-constants';

@Directive({
  selector: '[appBaseStyle]',
})
export abstract class BaseStyleDirective implements OnInit {
  @Input() appDate: string | undefined;

  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const olderThan6Months = projectConstants.SIX_MONTHS_IN_SECONDS;
    const between1And6Months = projectConstants.ONE_MONTH_IN_SECONDS;
    const between7DaysAnd1Month = projectConstants.SEVEN_DAYS_IN_SECONDS;

    if (this.appDate) {
      const convertedDate = new Date(this.appDate);
      const dateDifference = currentDate.getTime() - convertedDate.getTime();

      let styleValue: string;
      switch (true) {
        case dateDifference > olderThan6Months:
          styleValue = this.getOlderThanSixMonthsStyle();
          break;
        case dateDifference >= between1And6Months:
          styleValue = this.getBetweenOneAndSixMonthsStyle();
          break;
        case dateDifference >= between7DaysAnd1Month:
          styleValue = this.getBetweenSevenDaysAndOneMonthStyle();
          break;
        default:
          styleValue = this.getDefaultStyle();
      }
      this.setStyle(styleValue);
    }
  }

  abstract getOlderThanSixMonthsStyle(): string;
  abstract getBetweenOneAndSixMonthsStyle(): string;
  abstract getBetweenSevenDaysAndOneMonthStyle(): string;
  abstract getDefaultStyle(): string;
  abstract setStyle(value: string): void;
}
