import { Component } from '@angular/core';
import { ProjectPages } from '../../../../environment/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  protected readonly ProjectPages = ProjectPages;

  protected readonly alert = alert;
}
