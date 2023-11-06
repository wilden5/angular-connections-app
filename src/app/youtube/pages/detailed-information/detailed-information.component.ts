import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ISearchItem } from '../../models/search-item.model';
import { YoutubeItemService } from '../../services/youtube-item.service';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss'],
})
export class DetailedInformationComponent implements OnInit, OnDestroy {
  @Input() searchItem: ISearchItem | undefined;

  private itemSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private youtubeItemService: YoutubeItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.itemSubscription = this.youtubeItemService.getSpecificItemById(itemId).subscribe((data) => {
        this.searchItem = data;
      });
    }
  }

  ngOnDestroy(): void {
    this.itemSubscription?.unsubscribe();
  }

  onBackButtonClick(): void {
    this.location.back();
  }
}
