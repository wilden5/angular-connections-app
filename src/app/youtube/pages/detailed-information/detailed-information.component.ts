import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ISearchItem } from '../../models/search-item.model';
import { YoutubeItemService } from '../../services/youtube-item.service';
import { AppState } from '../../../redux/app.state';
import { selectSpecificCustomItem } from '../../../redux/selectors/items.selectors';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss'],
})
export class DetailedInformationComponent implements OnInit {
  @Input() searchItem$: Observable<ISearchItem | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private youtubeItemService: YoutubeItemService,
    private location: Location,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    /* if (itemId) {
      this.searchItem$ = this.youtubeItemService.getYoutubeSpecificItemById(itemId);
    } */
    if (itemId) {
      console.log(itemId);
      this.searchItem$ = this.store.select(selectSpecificCustomItem(itemId));
    }
  }

  onBackButtonClick(): void {
    this.location.back();
  }
}
