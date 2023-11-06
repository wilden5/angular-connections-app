import { Component } from '@angular/core';
import { SearchService } from './youtube/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'youtube-client-app';

  constructor(protected searchService: SearchService) {}
}
